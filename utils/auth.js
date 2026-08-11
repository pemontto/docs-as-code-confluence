const TOKEN_URL = "https://auth.atlassian.com/oauth/token";

/**
 * Build the Authorization header value from the action inputs.
 *
 * Three credential shapes are supported, tried in this order:
 *
 *   1. OAuth 2.0 client credentials (Atlassian service account). Exchanges the
 *      client id and secret for a Bearer token that lives for one hour.
 *   2. Email plus API token, or the legacy username plus password. Sent as
 *      HTTP Basic. Scoped service-account tokens work here as long as the base
 *      URL is the api.atlassian.com gateway.
 *   3. An API token on its own, sent as Bearer. Scoped tokens are accepted
 *      directly by the gateway without a matching account identifier.
 *
 * @param {Object} inputs
 * @returns {Promise<string>} the full Authorization header value
 */
async function resolveAuthorization(inputs) {
  const clientId = inputs.clientId;
  const clientSecret = inputs.clientSecret;
  const user = inputs.email || inputs.username;
  const secret = inputs.apiToken || inputs.password;

  if (clientId && clientSecret) {
    const token = await fetchClientCredentialsToken(clientId, clientSecret);
    return "Bearer " + token;
  }

  if (user && secret) {
    return "Basic " + Buffer.from(user + ":" + secret).toString("base64");
  }

  if (secret) {
    return "Bearer " + secret;
  }

  throw new Error(
    "No usable credentials. Provide either client-id and client-secret, " +
      "or email and api-token, or api-token on its own."
  );
}

async function fetchClientCredentialsToken(clientId, clientSecret) {
  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });

  if (!res.ok) {
    // The response body can echo the client id, so report status only.
    throw new Error(
      "OAuth token request failed with HTTP " + res.status + ". " +
        "Check the client id, secret, and that the service account is enabled."
    );
  }

  const data = await res.json();
  if (!data.access_token) {
    throw new Error("OAuth token response contained no access_token.");
  }
  return data.access_token;
}

/**
 * Normalise a Confluence base URL to the form the v2 API expects.
 *
 * Accepts any of:
 *   https://mysite.atlassian.net
 *   https://mysite.atlassian.net/wiki
 *   https://api.atlassian.com/ex/confluence/<cloudId>
 *   https://api.atlassian.com/ex/confluence/<cloudId>/wiki
 *
 * and always returns the variant ending in /wiki.
 */
function normaliseBaseUrl(baseUrl) {
  const trimmed = baseUrl.trim().replace(/\/+$/, "");
  if (trimmed.endsWith("/wiki")) {
    return trimmed;
  }
  return trimmed + "/wiki";
}

module.exports = { resolveAuthorization, normaliseBaseUrl };
