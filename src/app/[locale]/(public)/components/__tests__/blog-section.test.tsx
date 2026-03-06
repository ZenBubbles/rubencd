import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("BlogSection", () => {
  const source = fs.readFileSync(path.resolve(__dirname, "../blog-section.tsx"), "utf-8");

  it("is a server component", () => {
    expect(source).toContain("async function BlogSection");
  });

  it("renders FeaturedArticle", () => {
    expect(source).toContain("<FeaturedArticle");
  });
});
