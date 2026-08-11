const fs = require('fs/promises');
const Marked = require('marked');
const markdownForFile = require('../../utils/markdownToHtml');

jest.mock('fs/promises');
// A factory mock, not an automock. marked ships ESM that jest cannot parse under
// CommonJS, and the automock loads the real module to read its shape.
jest.mock('marked', () => ({ parse: jest.fn() }));

describe('markdownForFile', () => {
  it('reads file and parses markdown when file exists', async () => {
    const mockData = '# Hello World';
    const mockHtml = '<h1 id="hello-world">Hello World</h1>\n';
    fs.readFile.mockResolvedValueOnce(mockData);
    Marked.parse.mockReturnValueOnce(mockHtml);

    await expect(markdownForFile('path/to/file')).resolves.toBe(mockHtml);
    expect(Marked.parse).toHaveBeenCalledWith(mockData);
  });

  it('rejects when file does not exist', async () => {
    const mockError = new Error('File not found');
    fs.readFile.mockRejectedValueOnce(mockError);

    await expect(markdownForFile('path/to/nonexistent/file')).rejects.toThrow('File not found');
  });

  it('rejects when markdown parsing fails', async () => {
    const mockError = new Error('Markdown parsing error');
    fs.readFile.mockResolvedValueOnce('# Hello World');
    Marked.parse.mockImplementationOnce(() => { throw mockError; });

    await expect(markdownForFile('path/to/file')).rejects.toThrow('Markdown parsing error');
  });
});
