import { defineCatalog } from "@json-render/core";
import { schema } from "@json-render/react/schema";
import { shadcnComponentDefinitions } from "@json-render/shadcn/catalog";
import { z } from "zod";

export const catalog = defineCatalog(schema, {
  components: {
    // Layout
    Card: shadcnComponentDefinitions.Card,
    Stack: shadcnComponentDefinitions.Stack,
    Grid: shadcnComponentDefinitions.Grid,
    Separator: shadcnComponentDefinitions.Separator,
    Tabs: shadcnComponentDefinitions.Tabs,
    Accordion: shadcnComponentDefinitions.Accordion,
    Collapsible: shadcnComponentDefinitions.Collapsible,

    // Content
    Heading: shadcnComponentDefinitions.Heading,
    Text: shadcnComponentDefinitions.Text,
    Image: shadcnComponentDefinitions.Image,
    Avatar: shadcnComponentDefinitions.Avatar,
    Badge: shadcnComponentDefinitions.Badge,
    Alert: shadcnComponentDefinitions.Alert,
    Table: shadcnComponentDefinitions.Table,
    Progress: shadcnComponentDefinitions.Progress,

    // Input
    Button: shadcnComponentDefinitions.Button,
    Link: shadcnComponentDefinitions.Link,
    Input: shadcnComponentDefinitions.Input,
    Textarea: shadcnComponentDefinitions.Textarea,
    Select: shadcnComponentDefinitions.Select,
    Checkbox: shadcnComponentDefinitions.Checkbox,
    Switch: shadcnComponentDefinitions.Switch,
    Slider: shadcnComponentDefinitions.Slider,

    // Overlay
    Dialog: shadcnComponentDefinitions.Dialog,
    Tooltip: shadcnComponentDefinitions.Tooltip,
    Popover: shadcnComponentDefinitions.Popover,
  },
  actions: {
    copyToClipboard: {
      params: z.object({
        text: z.string().describe("The literal text to copy to the clipboard"),
      }),
      description:
        'Copy text to the clipboard. Wire to a Button via: "on": { "press": { "action": "copyToClipboard", "params": { "text": "the text to copy" } } }',
    },
    openUrl: {
      params: z.object({
        url: z.string().describe("The URL to navigate to"),
        newTab: z.boolean().optional().describe("Open in a new tab (default true)"),
      }),
      description:
        'Open a URL. Wire to a Button via: "on": { "press": { "action": "openUrl", "params": { "url": "https://example.com" } } }',
    },
    showToast: {
      params: z.object({
        message: z.string().describe("The message to display"),
        variant: z.enum(["default", "success", "error"]).optional().describe("Toast style"),
      }),
      description:
        'Show a notification. Wire to a Button via: "on": { "press": { "action": "showToast", "params": { "message": "Done!", "variant": "success" } } }',
    },
    submitForm: {
      params: z.object({
        successMessage: z.string().optional().describe("Toast message on success (default: 'Submitted!')"),
      }),
      description:
        'Submit the current form state to Blanc. Collects all $bindState values and saves them as a submission. Wire to a Button via: "on": { "press": { "action": "submitForm", "params": {} } }. The page creator can view submissions in the dashboard.',
    },
  },
});
