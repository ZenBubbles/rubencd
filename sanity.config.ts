import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { documentInternationalization } from "@sanity/document-internationalization";
import { schemas } from "./sanity/schemas";
export default defineConfig({
  basePath: "/studio",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  title: "rubencdblog",
  plugins: [
    structureTool(),
    visionTool({ defaultApiVersion: "2025-01-01" }),
    documentInternationalization({
      supportedLanguages: [
        { id: "en", title: "English" },
        { id: "nb", title: "Norwegian" },
      ],
      schemaTypes: ["post"],
    }),
  ],
  schema: { types: schemas },
});
