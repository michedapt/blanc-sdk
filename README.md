# Blanc SDK

Open-source packages for [Blanc](https://blanc.dev) — a universal render surface. Send a spec, get a live page.

## Packages

| Package | Description | npm |
|---------|-------------|-----|
| [`@blanc/mcp-server`](packages/mcp-server) | MCP server — lets any AI agent create live pages | [![npm](https://img.shields.io/npm/v/@blanc/mcp-server)](https://www.npmjs.com/package/@blanc/mcp-server) |

## Quick Start

### Claude Code

```bash
claude mcp add blanc --transport http https://blanc.dev/api/mcp
```

### Cursor / VS Code

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

Set `BLANC_BASE_URL` and `BLANC_API_KEY` environment variables for custom configuration. Defaults to `https://blanc.dev` with the free tier (50 pages/month).

## MCP Tools

| Tool | Description |
|------|-------------|
| `render-ui` | Create a live page from a json-render spec. Returns a URL. |
| `get-page` | Fetch an existing page by its short ID. |

## Development

```bash
pnpm install
pnpm build
```

## License

MIT
