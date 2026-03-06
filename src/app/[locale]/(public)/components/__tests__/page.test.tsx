import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

describe("HomePage (page.tsx)", () => {
  const pagePath = path.resolve(__dirname, "../../page.tsx");
  const source = fs.readFileSync(pagePath, "utf-8");

  it("is a Server Component (no 'use client' directive)", () => {
    expect(source).not.toMatch(/^["']use client["']/m);
  });

  it("exports generateMetadata", () => {
    expect(source).toContain("export async function generateMetadata");
  });

  it("metadata includes openGraph config", () => {
    expect(source).toContain("openGraph");
    expect(source).toContain('"website"');
  });

  it("metadata includes twitter config", () => {
    expect(source).toContain("twitter");
    expect(source).toContain('"summary_large_image"');
  });

  it("metadata includes hreflang alternates", () => {
    expect(source).toContain("alternates");
    expect(source).toContain("/en");
    expect(source).toContain("/nb");
  });

  it("calls setRequestLocale", () => {
    expect(source).toContain("setRequestLocale");
  });
});
