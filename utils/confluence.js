const fs = require("fs");
const path = require("path");

/**
 * Confluence Cloud client built on the v2 REST API.
 *
 * Pages and spaces use v2 throughout. Attachment uploads still use the v1
 * content API because v2 exposes attachments read-only: there is no v2
 * endpoint that creates or replaces attachment data.
 */
class SyncConfluence {
  /**
   * @param {string} baseUrl - normalised base URL ending in /wiki
   * @param {string} authorization - full Authorization header value
   * @param {string} spaceKey
   * @param {string} [spaceId] - skips the space lookup when supplied
   */
  constructor(baseUrl, authorization, spaceKey, spaceId) {
    this.baseUrl = baseUrl;
    this.authorization = authorization;
    this.spaceKey = spaceKey;
    this.spaceId = spaceId || undefined;
  }

  async request(method, url, options = {}) {
    const headers = Object.assign(
      { Authorization: this.authorization, Accept: "application/json" },
      options.headers || {}
    );

    let body;
    if (options.json !== undefined) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(options.json);
    } else if (options.body !== undefined) {
      body = options.body;
    }

    const res = await fetch(url, { method, headers, body });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      throw new Error(
        method + " " + stripQuery(url) + " failed with HTTP " + res.status +
          (detail ? ": " + truncate(detail) : "")
      );
    }

    if (res.status === 204) {
      return undefined;
    }
    return res.json();
  }

  /**
   * Resolve the numeric space id for the configured space key. Creating a page
   * in v2 needs the id; the key alone is not accepted.
   */
  async resolveSpaceId() {
    if (this.spaceId) {
      return this.spaceId;
    }

    const url =
      this.baseUrl + "/api/v2/spaces?keys=" + encodeURIComponent(this.spaceKey);
    const data = await this.request("GET", url);
    const space = (data.results || [])[0];

    if (!space) {
      throw new Error(
        "Space '" + this.spaceKey + "' not found, or the credential cannot see it. " +
          "Check the space key and the token's read:space scope."
      );
    }

    this.spaceId = space.id;
    return this.spaceId;
  }

  /**
   * Find a page by exact title within the configured space.
   * Returns undefined when no page matches.
   */
  async getPageIdByTitle(title) {
    const spaceId = await this.resolveSpaceId();
    const url =
      this.baseUrl +
      "/api/v2/pages?space-id=" + encodeURIComponent(spaceId) +
      "&title=" + encodeURIComponent(title) +
      "&status=current&limit=250";

    const data = await this.request("GET", url);
    const match = (data.results || []).find((page) => page.title === title);
    return match ? match.id : undefined;
  }

  async getPageVersion(pageId) {
    const url = this.baseUrl + "/api/v2/pages/" + encodeURIComponent(pageId);
    const data = await this.request("GET", url);
    return data.version.number;
  }

  /**
   * Create a page. Used both for the empty folder placeholder pages and,
   * indirectly, for content pages that do not exist yet.
   */
  async createEmptyParentPage(title, parentId) {
    const spaceId = await this.resolveSpaceId();
    const data = await this.request("POST", this.baseUrl + "/api/v2/pages", {
      json: {
        spaceId: spaceId,
        status: "current",
        title: title,
        parentId: parentId ? String(parentId) : undefined,
        body: { representation: "storage", value: "" },
      },
    });
    return data.id;
  }

  /**
   * Replace a page's body. The version is read immediately before the write so
   * concurrent edits surface as a 409 rather than being silently overwritten.
   */
  async putContent(pageId, title, content) {
    const version = await this.getPageVersion(pageId);
    const data = await this.request(
      "PUT",
      this.baseUrl + "/api/v2/pages/" + encodeURIComponent(pageId),
      {
        json: {
          id: String(pageId),
          status: "current",
          title: title,
          body: { representation: "storage", value: content },
          version: { number: version + 1, message: "Published by docs-as-code" },
        },
      }
    );

    const link = data._links || {};
    console.log(
      "Uploaded content successfully to page %s",
      (link.base || this.baseUrl) + (link.webui || "/pages/" + pageId)
    );
    return data;
  }

  async getAttachments(pageId) {
    const url =
      this.baseUrl + "/api/v2/pages/" + encodeURIComponent(pageId) +
      "/attachments?limit=250";
    const data = await this.request("GET", url);
    const results = data.results || [];
    return results.length ? results : undefined;
  }

  /**
   * Replace the binary data of an existing attachment. v1 only: see the class
   * comment. v2 attachment ids already carry the "att" prefix v1 expects, but
   * older responses omit it, so normalise both ways.
   */
  async updateAttachment(pageId, attachmentId, source) {
    const id = String(attachmentId).startsWith("att")
      ? attachmentId
      : "att" + attachmentId;
    const url =
      this.baseUrl + "/rest/api/content/" + encodeURIComponent(pageId) +
      "/child/attachment/" + encodeURIComponent(id) + "/data";

    const data = await this.request("POST", url, {
      headers: { "X-Atlassian-Token": "no-check" },
      body: attachmentForm(source),
    });
    return data;
  }

  async uploadAttachment(pageId, source) {
    const url =
      this.baseUrl + "/rest/api/content/" + encodeURIComponent(pageId) +
      "/child/attachment";

    const data = await this.request("POST", url, {
      headers: { "X-Atlassian-Token": "no-check" },
      body: attachmentForm(source),
    });
    return (data.results || [])[0];
  }
}

function attachmentForm(source) {
  const form = new FormData();
  const bytes = fs.readFileSync(source);
  form.set("file", new Blob([bytes]), path.basename(source));
  form.set("minorEdit", "true");
  return form;
}

function stripQuery(url) {
  const index = url.indexOf("?");
  return index === -1 ? url : url.slice(0, index);
}

function truncate(text) {
  return text.length > 500 ? text.slice(0, 500) + "..." : text;
}

module.exports = SyncConfluence;
