# @blanc/mcp-server

MCP server for [Blanc](https://blanc.dev) — lets AI agents create, read, update, and list live web pages.

## Setup

### Claude Code

```bash
claude mcp add blanc --transport http https://blanc.dev/api/mcp
```

### Cursor

```json
{
  "mcpServers": {
    "blanc": {
      "type": "streamable-http",
      "url": "https://blanc.dev/api/mcp"
    }
  }
}
```

### VS Code

```json
{
  "mcp": {
    "servers": {
      "blanc": {
        "type": "streamable-http",
        "url": "https://blanc.dev/api/mcp"
      }
    }
  }
}
```

### Standalone (stdio)

```bash
npx @blanc/mcp-server
```

No API key required. Free tier: 50 pages/month.

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `BLANC_API_KEY` | No | — | API key for authenticated access with higher limits |
| `BLANC_BASE_URL` | No | `https://blanc.dev` | Override the API endpoint |

## Tools

### render-ui

Create a live, shareable web page from a JSON spec. Returns a URL.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `spec` | `object` | Yes | A json-render spec describing the page UI |
| `title` | `string` | No | Title for the page (shown in browser tab and OG metadata) |

**Returns:** `{ id, url, created_at }`

### get-page

Fetch an existing page by its short ID.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The short ID of the page (from the URL) |

**Returns:** The full spec, title, and metadata.

### list-pages

List pages you have created. Supports pagination.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `limit` | `number` | No | Max pages to return (default 50, max 100) |
| `offset` | `number` | No | Number of pages to skip (default 0) |

**Returns:** `{ pages: [...], total, limit, offset }`

### update-page

Update an existing page's spec or title. You must be the owner of the page.

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | `string` | Yes | The page ID (UUID, not the short ID) |
| `spec` | `object` | No | The updated json-render spec |
| `title` | `string` | No | Updated title |

**Returns:** The updated page with spec, title, and metadata.

## Example

```
User: Create a dashboard showing our team's weekly metrics.

Agent: I'll use Blanc to create that.

→ render-ui {
    "spec": { "root": "page", "elements": { ... } },
    "title": "Weekly Metrics"
  }

← { "id": "cf6e...", "url": "https://blanc.dev/d/Ab3x9_Kw" }

Agent: Here's your dashboard: https://blanc.dev/d/Ab3x9_Kw
```

## Development

```bash
pnpm --filter @blanc/mcp-server build
pnpm --filter @blanc/mcp-server dev   # watch mode
```
