/**
 * The two pieces of the GitHub Actions toolkit this action uses.
 *
 * @actions/core is not a dependency because it pulls in @actions/http-client,
 * which pins undici 5.x. Every undici 5.x release carries open advisories and
 * there is no non-breaking upgrade. None of that code runs here: the action
 * reads two inputs and reports failure. Both behaviours are defined by the
 * runner contract below, so reimplementing them costs less than carrying the
 * dependency.
 *
 * See https://docs.github.com/actions/creating-actions/metadata-syntax-for-github-actions
 */

/**
 * Read an action input.
 *
 * The runner passes each input as an environment variable: the name uppercased,
 * spaces replaced with underscores, prefixed with INPUT_.
 *
 * @param {string} name
 * @param {{required?: boolean}} [options]
 * @returns {string} the value, trimmed, or "" when it is not set
 */
function getInput(name, options) {
  const variable = "INPUT_" + name.replace(/ /g, "_").toUpperCase();
  const value = process.env[variable] || "";

  if (options && options.required && !value.trim()) {
    throw new Error("Input required and not supplied: " + name);
  }
  return value.trim();
}

/**
 * Fail the step with a message.
 *
 * The runner reads the ::error:: workflow command from stdout and shows the
 * message against the step. The exit code is what actually fails the job.
 */
function setFailed(message) {
  process.exitCode = 1;
  console.log("::error::" + escapeData(message));
}

// Workflow commands are line-based, so these three characters have to be
// percent-encoded or the message truncates at the first newline.
function escapeData(value) {
  return String(value)
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A");
}

module.exports = { getInput, setFailed };
