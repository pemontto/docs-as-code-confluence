# Docs as Code - Confluence

Publish a folder of documentation to Confluence.

Create a Confluence Page for each markdown file. Each folder will create a _parent_ page to reflect
the directory structure.

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

## API version

Pages and spaces use the Confluence Cloud v2 REST API. Attachment uploads still use the v1 content API, because v2 exposes attachments read-only and offers no endpoint that writes attachment data.

The v2 move is what makes service accounts usable, not a tidy-up. A scoped token's granular scopes authorise v2 only, so `POST /wiki/rest/api/content` returns `{"code":401,"message":"Unauthorized; scope does not match"}` while every v1 read returns 200. A run against v1 therefore looks healthy until the first write. Attachment upload is the one v1 call left, and it is authorised by `write:attachment:confluence`.

## TODO

* Renaming a file
* Moving/Removing a file
* Not updating Confluence pages when there is no change
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
        uses: Bhacaz/docs-as-code-confluence@v4
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
        uses: Bhacaz/docs-as-code-confluence@v4
        with:
          folder: docs
          client-id: ${{ secrets.ATLASSIAN_OAUTH_CLIENT_ID }}
          client-secret: ${{ secrets.ATLASSIAN_OAUTH_CLIENT_SECRET }}
          confluence-base-url: https://api.atlassian.com/ex/confluence/<cloudId>
          space-key: MYSPACE
          parent-page-id: 123456789
```

## Example of usage in a repository

[Bhacaz/docs-as-code-confluence-demo](https://github.com/Bhacaz/docs-as-code-confluence-demo)

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
