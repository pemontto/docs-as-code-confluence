const parser = require("node-html-parser");

/**
 * Confluence storage format is not HTML. Several constructs that markdown
 * produces have no HTML equivalent Confluence will render, and Confluence
 * silently drops them rather than reporting an error:
 *
 *   - <pre><code> renders as unstyled preformatted text. Syntax highlighting
 *     comes only from the code macro.
 *   - <input type="checkbox"> is stripped, so a task list becomes plain
 *     bullets and the ticked state is lost.
 *   - <details>/<summary> is stripped, leaving the summary as a stray line of
 *     text above the body with nothing to expand.
 *
 * This module converts each into the macro Confluence does render.
 */

// Languages the code macro highlights. An unrecognised value makes Confluence
// fall back to plain text, so anything not listed here is sent without a
// language parameter rather than guessed at.
const LANGUAGES = {
  bash: "bash", sh: "bash", shell: "bash", zsh: "bash", console: "bash",
  c: "c", "c++": "cpp", cpp: "cpp", cs: "csharp", csharp: "csharp",
  css: "css", diff: "diff", go: "go", groovy: "groovy", html: "html",
  java: "java", javascript: "javascript", js: "javascript", json: "json",
  kotlin: "kotlin", perl: "perl", php: "php", powershell: "powershell",
  ps1: "powershell", python: "python", py: "python", rb: "ruby", ruby: "ruby",
  rust: "rust", scala: "scala", sql: "sql", swift: "swift", text: "text",
  plain: "text", ts: "typescript", typescript: "typescript", xml: "xml",
  yaml: "yaml", yml: "yaml",
};

function escapeXml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Render a fenced code block as the Confluence code macro.
 *
 * The body goes in a CDATA section so it needs no escaping, which keeps the
 * code byte-identical to the source file. A literal "]]>" inside the code
 * would close the section early, so it is split across two sections.
 */
function codeMacro(text, lang) {
  const language = LANGUAGES[String(lang || "").trim().toLowerCase()];
  const body = String(text).replace(/]]>/g, "]]]]><![CDATA[>");

  return (
    '<ac:structured-macro ac:name="code" ac:schema-version="1">' +
    (language
      ? '<ac:parameter ac:name="language">' + language + "</ac:parameter>"
      : "") +
    "<ac:plain-text-body><![CDATA[" + body + "]]></ac:plain-text-body>" +
    "</ac:structured-macro>"
  );
}

function convertTaskLists(root) {
  for (const list of root.querySelectorAll("ul")) {
    const items = list.childNodes.filter(
      (node) => node.tagName && node.tagName.toUpperCase() === "LI"
    );
    const isTaskList = items.some((item) => item.querySelector("input"));
    if (!isTaskList) {
      continue;
    }

    const tasks = items.map((item) => {
      const checkbox = item.querySelector("input");
      const complete = checkbox !== null && checkbox.hasAttribute("checked");
      if (checkbox) {
        checkbox.remove();
      }
      return (
        "<ac:task>" +
        "<ac:task-status>" + (complete ? "complete" : "incomplete") + "</ac:task-status>" +
        "<ac:task-body>" + item.innerHTML.trim() + "</ac:task-body>" +
        "</ac:task>"
      );
    });

    list.replaceWith(
      parser.parse("<ac:task-list>" + tasks.join("") + "</ac:task-list>")
    );
  }
}

function convertExpands(root) {
  for (const details of root.querySelectorAll("details")) {
    const summary = details.querySelector("summary");
    const title = summary ? summary.text.trim() : "Details";
    if (summary) {
      summary.remove();
    }

    details.replaceWith(
      parser.parse(
        '<ac:structured-macro ac:name="expand" ac:schema-version="1">' +
          '<ac:parameter ac:name="title">' + escapeXml(title) + "</ac:parameter>" +
          "<ac:rich-text-body>" + details.innerHTML.trim() + "</ac:rich-text-body>" +
          "</ac:structured-macro>"
      )
    );
  }
}

/**
 * Convert the HTML constructs Confluence drops into the macros it renders.
 * Code blocks are handled at render time instead, in markdownToHtml, because
 * the parser treats the contents of <pre> as opaque raw text.
 *
 * @param {string} html
 * @returns {string}
 */
function toStorageFormat(html) {
  const root = parser.parse(html);
  convertTaskLists(root);
  convertExpands(root);
  return root.toString();
}

module.exports = { toStorageFormat, codeMacro, escapeXml };
