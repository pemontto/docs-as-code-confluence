# Docs as Code - Confluence

Publish a folder of documentation to Confluence.

Create a Confluence Page for each markdown file. Each folder will create a _parent_ page to reflect
the directory structure.

> This is a fork of [Bhacaz/docs-as-code-confluence](https://github.com/Bhacaz/docs-as-code-confluence).
> It adds Atlassian service account credentials, publishes through the Confluence v2 API, renders code
> blocks and task lists as Confluence macros, and skips pages that have not changed. See
> [Authentication](#authentication) and [API version](#api-version) for why the v2 move was necessary.
> Use `pemontto/docs-as-code-confluence` in `uses:`, not the upstream repository.

## Parameters

| Name                  | Description | Required |
|-----------------------| --- | --- |
| `folder`              | The folder to sync | true |
| `confluence-base-url` | Your Confluence URL, with or without the trailing `/wiki`. Either `https://mydomain.atlassian.net` or the platform gateway `https://api.atlassian.com/ex/confluence/<cloudId>` | true |
| `space-key`           | Confluence space key to publish the documentation. Located after `spaces` in the URL. `https://mydomain.atlassian.net/wiki/spaces/<<~1234>>`. <br> Or in _Space settings_ > _Space details_ > _Key_. | true |
| `parent-page-id`      | Page id under which the documentation will be published. Located after `pages` in the URL. `https://mydomain.atlassian.net/wiki/spaces/~1234/pages/<<1234>>/My+Parent+Page` | true |
| `space-id`            | Numeric space id. Supply it to skip the space-key lookup, which needs the `read:space` scope. | false |
| `email`               | Atlassian account or service account email. Use with `api-token`. | false |
| `api-token`           | Atlassian [API token](https://support.atlassian.com/atlassian-account/docs/manage-api-tokens-for-your-atlassian-account/). Use with `email`. | false |
| `client-id`           | OAuth 2.0 client id for an Atlassian service account. Use with `client-secret`. | false |
| `client-secret`       | OAuth 2.0 client secret for an Atlassian service account. Use with `client-id`. | false |
| `username`            | Legacy. Confluence username or email. Use with `password`. | false |
| `password`            | Legacy. Confluence password or API token. Use with `username`. | false |

## Authentication

Supply exactly one credential pair. When more than one is present they are tried in this order.

1. **OAuth 2.0 client credentials**, `client-id` and `client-secret`. Intended for an [Atlassian service account](https://support.atlassian.com/user-management/docs/manage-api-tokens-for-service-accounts/). The action exchanges them at `https://auth.atlassian.com/oauth/token` for a Bearer token that lives one hour. The secret itself does not expire, so there is nothing to rotate on a schedule.
2. **Email and API token**, `email` and `api-token`, sent as HTTP Basic. A service account scoped token also takes this shape, with the service account address as the email. Legacy `username` and `password` behave identically.
3. **API token alone**, `api-token` with no email, sent as a Bearer token. Scoped tokens are accepted this way by the platform gateway.

Scoped tokens and OAuth tokens only work against `https://api.atlassian.com/ex/confluence/<cloudId>`. Pointing them at `https://mydomain.atlassian.net` returns 401.

Required scopes: `read:page:confluence`, `write:page:confluence`, `read:space:confluence`, `read:attachment:confluence`, and `write:attachment:confluence`. You can drop `read:space:confluence` if you also supply `space-id`.

## Confluence rendering

Confluence storage format is not HTML. Markdown produces three things that Confluence cannot render, and Confluence discards them without an error. The page publishes, and it looks wrong. This action converts each one into the macro that Confluence does render.

| Markdown | Plain HTML result | What this action emits |
| --- | --- | --- |
| Fenced code block | `<pre><code>`, shown unstyled with no highlighting | `code` macro, with `language` set from the fence info string |
| `- [x] task` | `<input type="checkbox">` is stripped, leaving a plain bullet with the ticked state lost | `task-list` macro, preserving complete and incomplete |
| `<details>`/`<summary>` | both tags stripped, leaving the summary as a stray line above the body | `expand` macro, with the summary as its title |

Code goes inside a CDATA section, so the published code matches the source file exactly and needs no escaping. If Confluence does not know the fence language, the action sends no language. You get a plain code block instead of a broken one.

Everything else publishes as HTML: tables, nested lists, blockquotes, inline HTML, links, images, and unicode.

## Unchanged pages

The action writes a page only when the content changes. Before this, every run added a version to every page. The page history then could not show when the documentation last changed.

The check uses a fingerprint. Each write stores `docs-as-code sha256:<hash of the content>` as the version message. The next run compares that against the hash of the content it will publish. Attachments work the same way, with the fingerprint in the attachment comment.

The action cannot compare the stored content directly. Confluence rewrites what it receives. It adds `<tbody>` to tables, turns `café` into `caf&eacute;`, puts quotes around attribute values, and closes tags such as `<br>`. The page means the same thing, but the text no longer matches, so a direct comparison reports a change on every page on every run.

This design has two effects. If a person edits a page in Confluence, the fingerprint no longer matches, and the next run publishes over that edit: the repository is the source of truth, so manual edits do not survive. An attachment with no fingerprint, from an older version or from a person, is uploaded once more and is then stable.

## API version

Pages and spaces use the Confluence Cloud v2 REST API. Attachment upload uses the v1 content API, because v2 has no endpoint that creates an attachment or replaces its data. The [v2 attachment group](https://developer.atlassian.com/cloud/confluence/rest/v2/api-group-attachment/) is GET and DELETE only.

The move to v2 is what makes service accounts work. It is not a tidy-up.

Scope enforcement is per endpoint, not per API version. A service account credential carries granular scopes, and Atlassian maps those to some endpoints and not others. Measured against a live tenant:

| Endpoint | Result with a granular-scoped credential |
| --- | --- |
| `GET /wiki/rest/api/content` and the other v1 reads | 200 |
| `POST /wiki/rest/api/content`, page create | 401, `{"code":401,"message":"Unauthorized; scope does not match"}` |
| `POST /wiki/rest/api/content/{id}/child/attachment` | 200 |
| `POST /wiki/rest/api/content/{id}/child/attachment/{id}/data` | 200 |
| the v2 page endpoints | 200 |

So the v1 page writes are what a service account cannot do, and that is what the upstream action depends on. The v1 attachment endpoints do accept a granular credential, under `write:attachment:confluence`, which is why attachment upload can stay on v1 while pages move to v2.

The failure is quiet, which is the dangerous part. Every read succeeds, so a run against v1 looks healthy right up to the first page write.

## TODO

* Renaming a file
* Moving/Removing a file
* Add commit link to the new page version
* Add markdown images with url source

## Example of workflow

```yml
name: Sync Docs as Code - Confluence
on:
  push:
    branches:
      - main
    paths:
      - 'docs/**'
jobs:
  docs-as-code:
    runs-on: ubuntu-latest
    name: Sync Docs as Code - Confluence
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Sync Docs as Code - Confluence
        uses: pemontto/docs-as-code-confluence@v4
        with:
          folder: docs
          email: abc@xyz.com
          api-token: ${{ secrets.API_TOKEN }}
          confluence-base-url: https://mydomain.atlassian.net/wiki
          space-key: ~1234
          parent-page-id: 123456789
```

With an Atlassian service account over the platform gateway:

```yml
      - name: Sync Docs as Code - Confluence
        uses: pemontto/docs-as-code-confluence@v4
        with:
          folder: docs
          client-id: ${{ secrets.ATLASSIAN_OAUTH_CLIENT_ID }}
          client-secret: ${{ secrets.ATLASSIAN_OAUTH_CLIENT_SECRET }}
          confluence-base-url: https://api.atlassian.com/ex/confluence/<cloudId>
          space-key: MYSPACE
          parent-page-id: 123456789
```

## Example of usage in a repository

[Bhacaz/docs-as-code-confluence-demo](https://github.com/Bhacaz/docs-as-code-confluence-demo), which
uses the upstream action. The folder layout and the resulting page tree are the same here.

## Alternatives

* [markdown-confluence/publish-action](https://github.com/markdown-confluence/publish-action)
* [mbovo/mark2confluence](https://github.com/mbovo/mark2confluence)

## Development

**Test**

```bash
npm run test
```

**Build**

```bash
npm run build
```
