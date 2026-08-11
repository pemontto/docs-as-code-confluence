const { resolveAuthorization, normaliseBaseUrl } = require('../../utils/auth');

describe('normaliseBaseUrl', () => {
  it.each([
    ['https://mysite.atlassian.net', 'https://mysite.atlassian.net/wiki'],
    ['https://mysite.atlassian.net/', 'https://mysite.atlassian.net/wiki'],
    ['https://mysite.atlassian.net/wiki', 'https://mysite.atlassian.net/wiki'],
    ['https://mysite.atlassian.net/wiki/', 'https://mysite.atlassian.net/wiki'],
    ['https://api.atlassian.com/ex/confluence/abc', 'https://api.atlassian.com/ex/confluence/abc/wiki'],
    ['  https://api.atlassian.com/ex/confluence/abc/wiki  ', 'https://api.atlassian.com/ex/confluence/abc/wiki'],
  ])('normalises %s', (input, expected) => {
    expect(normaliseBaseUrl(input)).toBe(expected);
  });
});

describe('resolveAuthorization', () => {
  afterEach(() => {
    delete global.fetch;
  });

  it('uses basic auth for email and api token', async () => {
    const header = await resolveAuthorization({ email: 'bot@example.com', apiToken: 'tok' });
    expect(header).toBe('Basic ' + Buffer.from('bot@example.com:tok').toString('base64'));
  });

  it('uses basic auth for the legacy username and password', async () => {
    const header = await resolveAuthorization({ username: 'me@example.com', password: 'pw' });
    expect(header).toBe('Basic ' + Buffer.from('me@example.com:pw').toString('base64'));
  });

  it('prefers email and api token over username and password', async () => {
    const header = await resolveAuthorization({
      email: 'bot@example.com', apiToken: 'tok', username: 'me@example.com', password: 'pw',
    });
    expect(header).toBe('Basic ' + Buffer.from('bot@example.com:tok').toString('base64'));
  });

  it('falls back to bearer when only a token is given', async () => {
    const header = await resolveAuthorization({ apiToken: 'scoped-token' });
    expect(header).toBe('Bearer scoped-token');
  });

  it('exchanges client credentials for a bearer token', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: 'minted' }),
    });

    const header = await resolveAuthorization({ clientId: 'id', clientSecret: 'secret' });

    expect(header).toBe('Bearer minted');
    const [url, options] = global.fetch.mock.calls[0];
    expect(url).toBe('https://auth.atlassian.com/oauth/token');
    expect(options.body).toContain('grant_type=client_credentials');
  });

  it('takes client credentials over basic auth when both are present', async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ access_token: 'minted' }),
    });

    const header = await resolveAuthorization({
      clientId: 'id', clientSecret: 'secret', email: 'bot@example.com', apiToken: 'tok',
    });

    expect(header).toBe('Bearer minted');
  });

  it('does not leak the secret when the token request fails', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, status: 401 });

    await expect(resolveAuthorization({ clientId: 'id', clientSecret: 'super-secret' }))
      .rejects.toThrow(/HTTP 401/);
    await expect(resolveAuthorization({ clientId: 'id', clientSecret: 'super-secret' }))
      .rejects.not.toThrow(/super-secret/);
  });

  it('fails when no credentials are supplied', async () => {
    await expect(resolveAuthorization({})).rejects.toThrow(/No usable credentials/);
  });
});
