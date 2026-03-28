---
name: blanc
description: Connect to the Blanc MCP server — a universal render surface. Send a spec, get a live page. No API key required.
---

# Blanc MCP Server

Blanc is a universal render surface. Send a json-render spec, get a live, shareable web page with a short URL.

## When to use

- When you need to create a live, shareable web page from a JSON spec
- When a user asks you to build a dashboard, form, report, invoice, or any visual page
- When you want to display data, charts, tables, or interactive UI as a shareable link
- When a user mentions "blanc", "render", "display", "create a page", or "build a page"

## Setup

Add the Blanc MCP server to Claude Code:

```bash
claude mcp add --transport http blanc https://blanc.dev/api/mcp
```

No API key required. Free tier: 50 pages/month.

## Tools

1. **render-ui** — Create a live page from a json-render spec. Returns a URL. The tool description includes the full component catalog — follow it exactly.
2. **get-page** — Fetch an existing page by its short ID.
3. **list-pages** — List pages you have created. Supports pagination via limit and offset.
4. **update-page** — Update an existing page's spec or title. You must be the owner.

## Example

```bash
# Tool: render-ui
# Params: {
#   "spec": {
#     "root": "root",
#     "elements": {
#       "root": { "type": "Stack", "props": { "gap": "lg" }, "children": ["h"] },
#       "h": { "type": "Heading", "props": { "content": "Hello from Blanc" }, "children": [] }
#     }
#   },
#   "title": "My Page"
# }
# Returns: { "url": "blanc.dev/d/Ab3x9_Kw" }
```

## Links

- [Documentation](https://blanc.dev/docs)
- [GitHub](https://github.com/michedapt/blanc)
