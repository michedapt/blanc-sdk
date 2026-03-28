# @proofofhuman/mcp-server

MCP server for Blanc — lets AI agents create reviews, submit attestations, and verify cryptographic proofs.

## Tools

| Tool | Description |
|------|-------------|
| `create-review` | Create a new human review session — accepts `document_content` or pre-computed `document_hash` |
| `get-review` | Get status and details of a review session |
| `submit-attestation` | Submit review evidence and generate cryptographic proof |
| `verify-attestation` | Verify the integrity of an attestation |

## Setup

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PROOFOFHUMAN_API_KEY` | No | — | Your Blanc API key. Omit to use free tier. |
| `PROOFOFHUMAN_BASE_URL` | No | Auto-detected | API base URL. Auto-detects from Vercel env vars, falls back to `http://localhost:3000`. |

### Claude Code (`.mcp.json`)

```json
{
  "mcpServers": {
    "proofofhuman": {
      "type": "stdio",
      "command": "node",
      "args": ["packages/mcp-server/dist/index.js"],
      "env": {
        "PROOFOFHUMAN_API_KEY": "your-api-key",
        "PROOFOFHUMAN_BASE_URL": "http://localhost:3000"
      }
    }
  }
}
```

### Cursor (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "proofofhuman": {
      "command": "node",
      "args": ["/absolute/path/to/packages/mcp-server/dist/index.js"],
      "env": {
        "PROOFOFHUMAN_API_KEY": "your-api-key",
        "PROOFOFHUMAN_BASE_URL": "http://localhost:3000"
      }
    }
  }
}
```

### npx (after publishing)

```json
{
  "mcpServers": {
    "proofofhuman": {
      "command": "npx",
      "args": ["@proofofhuman/mcp-server"],
      "env": {
        "PROOFOFHUMAN_API_KEY": "your-api-key"
      }
    }
  }
}
```

## Development

```bash
pnpm --filter @proofofhuman/mcp-server build
pnpm --filter @proofofhuman/mcp-server dev   # watch mode
```
