const Marked = require("marked");
const fs = require("fs/promises");

/**
 * Read a markdown file and return it as HTML.
 *
 * @param {string} path
 * @returns {Promise<string>}
 */
module.exports = async (path) => {
  const data = await fs.readFile(path, { encoding: "utf-8" });
  return Marked.parse(data);
};
