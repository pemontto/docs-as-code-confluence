const { Marked } = require("marked");
const fs = require("fs/promises");

const { codeMacro } = require("./confluenceStorage");

// A private instance, so overriding the code renderer cannot leak into any
// other consumer of marked in the same process.
const marked = new Marked({
  renderer: {
    code({ text, lang }) {
      return codeMacro(text, lang);
    },
  },
});

/**
 * Read a markdown file and return it as Confluence-flavoured HTML. Fenced code
 * blocks become the code macro; see confluenceStorage for why.
 *
 * @param {string} path
 * @returns {Promise<string>}
 */
module.exports = async (path) => {
  const data = await fs.readFile(path, { encoding: "utf-8" });
  return marked.parse(data);
};
