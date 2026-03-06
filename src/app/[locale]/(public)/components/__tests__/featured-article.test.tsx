import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("FeaturedArticle", () => {
  const source = fs.readFileSync(path.resolve(__dirname, "../featured-article.tsx"), "utf-8");

  it("is an async server component (uses getTranslations)", () => {
    expect(source).toContain("getTranslations");
    expect(source).toContain("async function FeaturedArticle");
  });

  it("links to the software and saas article", () => {
    expect(source).toContain("/blog/is-software-and-saas-dying");
  });

  it("uses translation keys for featured article content", () => {
    expect(source).toContain('t("featured.title")');
    expect(source).toContain('t("featured.excerpt")');
    expect(source).toContain('t("readFullStory")');
    expect(source).toContain('t("featured.imageAlt")');
  });

  it("uses Link from i18n routing", () => {
    expect(source).toContain("@/i18n/routing");
  });
});
