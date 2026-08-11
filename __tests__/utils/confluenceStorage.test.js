const { toStorageFormat, codeMacro, escapeXml } = require('../../utils/confluenceStorage');

describe('codeMacro', () => {
  it('emits the code macro with a mapped language', () => {
    expect(codeMacro('SELECT 1', 'sql')).toBe(
      '<ac:structured-macro ac:name="code" ac:schema-version="1">' +
      '<ac:parameter ac:name="language">sql</ac:parameter>' +
      '<ac:plain-text-body><![CDATA[SELECT 1]]></ac:plain-text-body>' +
      '</ac:structured-macro>'
    );
  });

  it.each([
    ['yml', 'yaml'],
    ['sh', 'bash'],
    ['py', 'python'],
    ['js', 'javascript'],
    ['SQL', 'sql'],
    ['  json  ', 'json'],
  ])('maps %s to %s', (input, expected) => {
    expect(codeMacro('x', input)).toContain(`<ac:parameter ac:name="language">${expected}</ac:parameter>`);
  });

  it.each(['kql', 'spl', 'sigma', '', undefined, null])('omits the language parameter for %s', (lang) => {
    expect(codeMacro('x', lang)).not.toContain('ac:parameter');
  });

  it('leaves code unescaped inside CDATA', () => {
    expect(codeMacro('a < b && c > d "q"', 'sql'))
      .toContain('<![CDATA[a < b && c > d "q"]]>');
  });

  it('splits a literal CDATA terminator so it cannot close the section early', () => {
    const out = codeMacro('const x = a[b[c]]> d;', 'javascript');
    expect(out).toContain(']]]]><![CDATA[>');
    expect(out.match(/]]><\/ac:plain-text-body>/g)).toHaveLength(1);
  });
});

describe('toStorageFormat task lists', () => {
  it('converts a checkbox list into a Confluence task list', () => {
    const html = '<ul>\n<li><input disabled="" type="checkbox"> Tuned</li>\n' +
      '<li><input checked="" disabled="" type="checkbox"> Reviewed</li>\n</ul>';

    const out = toStorageFormat(html);

    expect(out).toContain('<ac:task-list>');
    expect(out).toContain('<ac:task-status>incomplete</ac:task-status><ac:task-body>Tuned</ac:task-body>');
    expect(out).toContain('<ac:task-status>complete</ac:task-status><ac:task-body>Reviewed</ac:task-body>');
    expect(out).not.toContain('<input');
  });

  it('leaves an ordinary bullet list alone', () => {
    const html = '<ul>\n<li>One</li>\n<li>Two</li>\n</ul>';
    expect(toStorageFormat(html)).toBe(html);
  });

  it('keeps inline markup inside a task body', () => {
    const html = '<ul><li><input type="checkbox"> Check <code>eventName</code> and <strong>escalate</strong></li></ul>';
    expect(toStorageFormat(html))
      .toContain('<ac:task-body>Check <code>eventName</code> and <strong>escalate</strong></ac:task-body>');
  });
});

describe('toStorageFormat expands', () => {
  it('converts details and summary into the expand macro', () => {
    const html = '<details>\n<summary>Why IMDSv1 matters</summary>\n<p>Because SSRF.</p>\n</details>';

    const out = toStorageFormat(html);

    expect(out).toContain('<ac:structured-macro ac:name="expand" ac:schema-version="1">');
    expect(out).toContain('<ac:parameter ac:name="title">Why IMDSv1 matters</ac:parameter>');
    expect(out).toContain('<ac:rich-text-body><p>Because SSRF.</p></ac:rich-text-body>');
    expect(out).not.toContain('<details>');
  });

  it('falls back to a default title when there is no summary', () => {
    expect(toStorageFormat('<details><p>Body</p></details>'))
      .toContain('<ac:parameter ac:name="title">Details</ac:parameter>');
  });

  it('escapes a title containing markup characters', () => {
    expect(toStorageFormat('<details><summary>a &lt; b &amp; c</summary><p>x</p></details>'))
      .toContain('<ac:parameter ac:name="title">a &lt; b &amp; c</ac:parameter>');
  });
});

describe('toStorageFormat', () => {
  it('passes through content it does not need to change', () => {
    const html = '<h1>Title</h1><p>Text with <code>inline</code> and <a href="https://x/?a=1&amp;b=2">a link</a></p>';
    expect(toStorageFormat(html)).toBe(html);
  });

  it('leaves an already-generated code macro intact', () => {
    const html = '<p>a</p>' + codeMacro('SELECT * FROM t WHERE a < b', 'sql') + '<p>b</p>';
    expect(toStorageFormat(html)).toBe(html);
  });
});

describe('escapeXml', () => {
  it('escapes the five characters that matter', () => {
    expect(escapeXml('a < b > c & d "e"')).toBe('a &lt; b &gt; c &amp; d &quot;e&quot;');
  });
});
