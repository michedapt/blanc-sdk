import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { catalog } from "./catalog.js";
import { appCatalog } from "./app-catalog.js";

// ---------------------------------------------------------------------------
// Config from environment
//
// Resolution order for the API base URL:
//  1. BLANC_BASE_URL       — explicit override
//  2. BLANC_API_KEY        — optional API key for authenticated access
//  3. Falls back to https://blanc.dev
// ---------------------------------------------------------------------------

const BASE_URL = (
  process.env.BLANC_BASE_URL ?? "https://blanc.dev"
).replace(/\/$/, "");

const API_KEY = process.env.BLANC_API_KEY;

// ---------------------------------------------------------------------------
// API helpers
// ---------------------------------------------------------------------------

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};
if (API_KEY) {
  headers.Authorization = `Bearer ${API_KEY}`;
}

async function apiRequest<T>(
  method: string,
  path: string,
  body?: unknown,
): Promise<T> {
  const url = `${BASE_URL}/api/v1${path}`;
  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    const message = data.error ?? `HTTP ${res.status}`;
    const details = data.details
      ? ` — ${Array.isArray(data.details) ? data.details.join("; ") : data.details}`
      : "";
    throw new Error(`${message}${details}`);
  }
  return data as T;
}

function toolResult(data: unknown, isError = false) {
  return {
    content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
    ...(isError && { isError: true }),
  };
}

function errorResult(action: string, error: unknown) {
  return toolResult(
    `Failed to ${action}: ${error instanceof Error ? error.message : String(error)}`,
    true,
  );
}

// ---------------------------------------------------------------------------
// MCP Server
// ---------------------------------------------------------------------------

const server = new McpServer(
  {
    name: "blanc",
    version: "0.1.0",
  },
  {
    instructions: `Blanc is a universal render surface. Send a json-render spec, get a live, shareable web page or multi-page app.

Tools:
- render-ui — Create a single page from a spec. Returns a URL.
- render-app — Create a multi-page app with routes, layouts, and navigation. Returns a URL.
- get-page — Fetch an existing page/app by its short ID.
- update-page — Update an existing page/app.
- list-pages — List your pages and apps.

Free tier: No API key required. 50 pages/month.`,
  },
);

// -- list-pages --
server.tool(
  "list-pages",
  "List pages you have created. Returns titles, URLs, and IDs. Supports pagination via limit and offset.",
  {
    limit: z
      .number()
      .optional()
      .describe("Max pages to return (default 50, max 100)"),
    offset: z
      .number()
      .optional()
      .describe("Number of pages to skip (default 0)"),
  },
  async (params) => {
    try {
      const qs = new URLSearchParams();
      if (params.limit !== undefined) qs.set("limit", String(params.limit));
      if (params.offset !== undefined) qs.set("offset", String(params.offset));
      const query = qs.toString() ? `?${qs}` : "";
      const result = await apiRequest("GET", `/specs${query}`);
      return toolResult(result);
    } catch (error) {
      return errorResult("list pages", error);
    }
  },
);

// -- render-ui --
const renderUiDescription = `Create a live, shareable web page from a json-render spec. Returns a URL to the rendered page. Output the spec as the "spec" argument.\n\n${catalog.prompt()}`;

server.tool(
  "render-ui",
  renderUiDescription,
  {
    spec: z
      .record(z.string(), z.unknown())
      .describe("A json-render spec conforming to the catalog"),
    title: z
      .string()
      .optional()
      .describe("Title for the page (shown in browser tab)"),
  },
  async (params) => {
    try {
      const result = await apiRequest<{ id: string; url: string }>(
        "POST",
        "/specs",
        {
          spec: params.spec,
          title: params.title,
        },
      );
      return toolResult(result);
    } catch (error) {
      return errorResult("render UI", error);
    }
  },
);

// -- render-app --
const renderAppDescription = `Create a live, shareable multi-page app from a NextAppSpec. The spec defines routes, layouts, metadata, and navigation. Returns a URL to the rendered app.\n\n${appCatalog.prompt()}`;

server.tool(
  "render-app",
  renderAppDescription,
  {
    spec: z
      .record(z.string(), z.unknown())
      .describe("A NextAppSpec with routes, layouts, and metadata"),
    title: z
      .string()
      .optional()
      .describe("Title for the app (shown in browser tab)"),
  },
  async (params) => {
    try {
      const result = await apiRequest<{ id: string; url: string }>(
        "POST",
        "/specs",
        {
          spec: params.spec,
          title: params.title,
        },
      );
      return toolResult(result);
    } catch (error) {
      return errorResult("render app", error);
    }
  },
);

// -- get-page --
server.tool(
  "get-page",
  "Fetch an existing page or app by its short ID. Returns the spec, title, and metadata.",
  {
    id: z.string().describe("The short ID of the page (from the URL)"),
  },
  async ({ id }) => {
    try {
      const result = await apiRequest("GET", `/specs/${id}`);
      return toolResult(result);
    } catch (error) {
      return errorResult("get page", error);
    }
  },
);

// -- update-page --
server.tool(
  "update-page",
  "Update an existing page's spec, title, or visibility. You must be the owner of the page (same API key or free-tier identity that created it). Use get-page first to retrieve the current spec, modify it, then pass the full updated spec here.",
  {
    id: z.string().describe("The page ID (UUID, not the short ID)"),
    spec: z
      .record(z.string(), z.unknown())
      .optional()
      .describe("The updated json-render spec"),
    title: z
      .string()
      .optional()
      .describe("Updated title for the page"),
    public: z
      .boolean()
      .optional()
      .describe("Set to true for public, false for private"),
  },
  async (params) => {
    try {
      const body: Record<string, unknown> = {};
      if (params.spec) body.spec = params.spec;
      if (params.title !== undefined) body.title = params.title;
      if (params.public !== undefined) body.public = params.public;
      const result = await apiRequest("PATCH", `/specs/${params.id}`, body);
      return toolResult(result);
    } catch (error) {
      return errorResult("update page", error);
    }
  },
);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
