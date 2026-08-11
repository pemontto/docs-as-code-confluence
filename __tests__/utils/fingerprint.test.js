const fs = require('fs');
const crypto = require('crypto');
const SyncConfluence = require('../../utils/confluence');
const { attachmentMatches, FINGERPRINT } = require('../../utils/confluence');

jest.mock('fs');

const BYTES = Buffer.from('image-bytes');
const HASH = crypto.createHash('sha256').update(BYTES).digest('hex');

describe('attachmentMatches', () => {
  beforeEach(() => {
    fs.readFileSync.mockReturnValue(BYTES);
  });

  it('matches when the fingerprint equals the local file hash', () => {
    expect(attachmentMatches({ comment: FINGERPRINT + HASH }, 'diagram.png')).toBe(true);
  });

  it('does not match when the file has changed', () => {
    const otherHash = crypto.createHash('sha256').update('different').digest('hex');
    expect(attachmentMatches({ comment: FINGERPRINT + otherHash }, 'diagram.png')).toBe(false);
  });

  it('does not match an attachment uploaded before fingerprinting', () => {
    expect(attachmentMatches({ comment: '' }, 'diagram.png')).toBe(false);
  });

  it('does not match an attachment carrying an unrelated comment', () => {
    expect(attachmentMatches({ comment: 'Screenshot from the incident' }, 'diagram.png')).toBe(false);
  });

  it('does not match when the record has no comment field at all', () => {
    expect(attachmentMatches({}, 'diagram.png')).toBe(false);
    expect(attachmentMatches(undefined, 'diagram.png')).toBe(false);
  });
});

describe('putContent', () => {
  const CONTENT = '<h1>Title</h1><p>Body</p>';
  const CONTENT_FINGERPRINT = FINGERPRINT + crypto.createHash('sha256').update(CONTENT).digest('hex');

  function clientReturning(page) {
    const client = new SyncConfluence('https://x/wiki', 'Basic abc', 'SPACE', '1');
    client.request = jest.fn(async (method) =>
      method === 'GET' ? page : { _links: { base: 'https://x', webui: '/p/1' } }
    );
    return client;
  }

  it('skips the write when the fingerprint and title both match', async () => {
    const client = clientReturning({
      title: 'Title', version: { number: 4, message: CONTENT_FINGERPRINT },
    });

    await expect(client.putContent('1', 'Title', CONTENT)).resolves.toBe(false);
    expect(client.request).toHaveBeenCalledTimes(1);
  });

  it('writes when the content changed', async () => {
    const client = clientReturning({
      title: 'Title', version: { number: 4, message: FINGERPRINT + 'stale' },
    });

    await expect(client.putContent('1', 'Title', CONTENT)).resolves.toBe(true);
    expect(client.request).toHaveBeenCalledTimes(2);
  });

  it('writes when the title changed even though the body did not', async () => {
    const client = clientReturning({
      title: 'Old title', version: { number: 4, message: CONTENT_FINGERPRINT },
    });

    await expect(client.putContent('1', 'Title', CONTENT)).resolves.toBe(true);
  });

  it('writes when the page was last edited by hand in Confluence', async () => {
    const client = clientReturning({
      title: 'Title', version: { number: 4, message: 'fixed a typo' },
    });

    await expect(client.putContent('1', 'Title', CONTENT)).resolves.toBe(true);
  });

  it('writes when the page has no version message at all', async () => {
    const client = clientReturning({ title: 'Title', version: { number: 1 } });

    await expect(client.putContent('1', 'Title', CONTENT)).resolves.toBe(true);
  });

  it('stamps the fingerprint and the next version number onto the write', async () => {
    const client = clientReturning({
      title: 'Title', version: { number: 4, message: '' },
    });

    await client.putContent('1', 'Title', CONTENT);

    const [, , options] = client.request.mock.calls[1];
    expect(options.json.version).toEqual({ number: 5, message: CONTENT_FINGERPRINT });
    expect(options.json.body.value).toBe(CONTENT);
  });
});
