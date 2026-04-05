import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("FeaturedArticle", () => {
  const source = fs.readFileSync(path.resolve(__dirname, "../featured-article.tsx"), "utf-8");

  it("is an async server component (uses getTranslations)", () => {
    expect(source).toContain("getTranslations");
    expect(source).toContain("async function FeaturedArticle");
  });

  it("links to the claude skills article", () => {
    expect(source).toContain("/blog/claude-skills");
  });

  it("uses translation key for read full story CTA", () => {
    expect(source).toContain('t("readFullStory")');
  });

  it("uses Link from i18n routing", () => {
    expect(source).toContain("@/i18n/routing");
  });
});
