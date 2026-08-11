const { getInput, setFailed } = require('../../utils/actions');

describe('getInput', () => {
  const saved = process.env;

  beforeEach(() => {
    process.env = { ...saved };
  });

  afterAll(() => {
    process.env = saved;
  });

  it('reads the INPUT_ variable for a simple name', () => {
    process.env['INPUT_FOLDER'] = 'docs';
    expect(getInput('folder')).toBe('docs');
  });

  it('uppercases the name and keeps hyphens', () => {
    process.env['INPUT_SPACE-KEY'] = 'MYSPACE';
    expect(getInput('space-key')).toBe('MYSPACE');
  });

  it('replaces spaces with underscores', () => {
    process.env['INPUT_MY_INPUT'] = 'value';
    expect(getInput('my input')).toBe('value');
  });

  it('trims surrounding whitespace', () => {
    process.env['INPUT_EMAIL'] = '  bot@example.com \n';
    expect(getInput('email')).toBe('bot@example.com');
  });

  it('returns an empty string when the input is not set', () => {
    expect(getInput('missing')).toBe('');
  });

  it('throws for a required input that is not set', () => {
    expect(() => getInput('space-key', { required: true }))
      .toThrow('Input required and not supplied: space-key');
  });

  it('throws for a required input that holds only whitespace', () => {
    process.env['INPUT_SPACE-KEY'] = '   ';
    expect(() => getInput('space-key', { required: true }))
      .toThrow('Input required and not supplied: space-key');
  });

  it('does not throw for a required input that is set', () => {
    process.env['INPUT_SPACE-KEY'] = 'MYSPACE';
    expect(getInput('space-key', { required: true })).toBe('MYSPACE');
  });
});

describe('setFailed', () => {
  let logged;

  beforeEach(() => {
    logged = [];
    jest.spyOn(console, 'log').mockImplementation((line) => logged.push(line));
    process.exitCode = 0;
  });

  afterEach(() => {
    console.log.mockRestore();
    process.exitCode = 0;
  });

  it('writes the error workflow command and sets a failing exit code', () => {
    setFailed('it broke');

    expect(logged).toEqual(['::error::it broke']);
    expect(process.exitCode).toBe(1);
  });

  it('encodes newlines so the whole message survives', () => {
    setFailed('line one\nline two');
    expect(logged[0]).toBe('::error::line one%0Aline two');
  });

  it('encodes carriage returns and percent signs', () => {
    setFailed('100% done\ragain');
    expect(logged[0]).toBe('::error::100%25 done%0Dagain');
  });
});
