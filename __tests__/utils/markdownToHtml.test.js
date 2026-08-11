const fs = require('fs/promises');
const Marked = require('marked');
const markdownForFile = require('../../utils/markdownToHtml');

jest.mock('fs/promises');
// A factory mock, not an automock. marked ships ESM that jest cannot parse under
// CommonJS, and an automock loads the real module to read its shape.
jest.mock('marked', () => {
  const parse = jest.fn();
  return { Marked: jest.fn(() => ({ parse })), __parse: parse };
});

describe('markdownForFile', () => {
  it('reads file and parses markdown when file exists', async () => {
    const mockData = '# Hello World';
    const mockHtml = '<h1>Hello World</h1>\n';
    fs.readFile.mockResolvedValueOnce(mockData);
    Marked.__parse.mockReturnValueOnce(mockHtml);

    await expect(markdownForFile('path/to/file')).resolves.toBe(mockHtml);
    expect(Marked.__parse).toHaveBeenCalledWith(mockData);
  });

  it('renders fenced code through the Confluence code macro', () => {
    const renderer = Marked.Marked.mock.calls[0][0].renderer;
    expect(renderer.code({ text: 'SELECT 1', lang: 'sql' })).toBe(
      '<ac:structured-macro ac:name="code" ac:schema-version="1">' +
      '<ac:parameter ac:name="language">sql</ac:parameter>' +
      '<ac:plain-text-body><![CDATA[SELECT 1]]></ac:plain-text-body>' +
      '</ac:structured-macro>'
    );
  });

  it('rejects when file does not exist', async () => {
    const mockError = new Error('File not found');
    fs.readFile.mockRejectedValueOnce(mockError);

    await expect(markdownForFile('path/to/nonexistent/file')).rejects.toThrow('File not found');
  });

  it('rejects when markdown parsing fails', async () => {
    const mockError = new Error('Markdown parsing error');
    fs.readFile.mockResolvedValueOnce('# Hello World');
    Marked.__parse.mockImplementationOnce(() => { throw mockError; });

    await expect(markdownForFile('path/to/file')).rejects.toThrow('Markdown parsing error');
  });
});
