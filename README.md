# Blanc SDK

Open-source packages for [Blanc](https://blanc.dev) — a universal render surface. Send a spec, get a live page.

## Packages

| Package | Description | npm |
|---------|-------------|-----|
| [`@blanc/mcp-server`](packages/mcp-server) | MCP server — lets any AI agent create live pages | [![npm](https://img.shields.io/npm/v/@blanc/mcp-server)](https://www.npmjs.com/package/@blanc/mcp-server) |

## Quick Start

### Install as a skill

```bash
npx skills add michedapt/blanc-sdk
```

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

Set `BLANC_API_KEY` for authenticated access with higher limits. No API key required for the free tier (50 pages/month).

## MCP Tools

| Tool | Description |
|------|-------------|
| `render-ui` | Create a live page from a json-render spec. Returns a URL. |
| `get-page` | Fetch an existing page by its short ID. |
| `list-pages` | List pages you have created. Supports pagination. |
| `update-page` | Update an existing page's spec, title, or visibility. |

## How it works

1. **Connect** — Add the MCP server to your agent, or call the [REST API](https://blanc.dev/docs/api) directly
2. **Describe** — Send a JSON spec describing the UI (cards, grids, forms, tables)
3. **Get a URL** — Blanc renders the spec as a live page at `blanc.dev/d/{id}`
4. **Share** — The URL is shareable, embeddable, and always live

## Spec format

A spec is a JSON object with `root`, `elements`, and optional `state`:

```json
{
  "root": "page",
  "elements": {
    "page": {
      "type": "Stack",
      "props": { "gap": "lg" },
      "children": ["heading"]
    },
    "heading": {
      "type": "Heading",
      "props": { "text": "Hello from Blanc" },
      "children": []
    }
  }
}
```

Blanc uses [json-render](https://json-render.dev) with shadcn/ui components:

- **Layout:** Card, Stack, Grid, Separator, Tabs, Accordion, Collapsible
- **Content:** Heading, Text, Image, Avatar, Badge, Alert, Table, Progress
- **Input:** Button, Link, Input, Textarea, Select, Checkbox, Switch, Slider
- **Overlay:** Dialog, Tooltip, Popover

See the [full documentation](https://blanc.dev/docs) for state, actions, forms, and more.

## Development

```bash
pnpm install
pnpm build
```

## License

MIT
