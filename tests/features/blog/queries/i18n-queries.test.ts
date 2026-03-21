import { describe, it, expect } from "vitest";

/**
 * Tests for the i18n GROQ query patterns.
 *
 * We set a dummy NEXT_PUBLIC_SANITY_PROJECT_ID so the Sanity client module
 * loads without throwing, then import the REAL query constants from source.
 * No mocking — just a required env var for module initialization.
 */

// Must be set before any import of the Sanity client module
const realSanityEnv = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
if (!realSanityEnv) {
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = "test-project-id";
}

// Now safe to import — the Sanity client module will find the env var
const { GET_POST_QUERY, GET_POST_SLUGS_QUERY } = await import("@/features/blog/queries/get-post");
const { GET_POSTS_QUERY } = await import("@/features/blog/queries/get-posts");

describe("i18n GROQ query patterns — get-post", () => {
  it("should use coalesce for locale fallback", () => {
    expect(GET_POST_QUERY).toMatch(/coalesce\(/);
  });

  it("should prioritise the requested locale first", () => {
    expect(GET_POST_QUERY).toContain("language == $locale");
  });

  it("should fall back to English as second priority", () => {
    expect(GET_POST_QUERY).toContain('language == "en"');
  });

  it("should fall back to legacy posts (no language field) as last priority", () => {
    expect(GET_POST_QUERY).toContain("!defined(language)");
  });

  it("should try locale before en, and en before undefined", () => {
    const localeIdx = GET_POST_QUERY.indexOf("language == $locale");
    const enIdx = GET_POST_QUERY.indexOf('language == "en"');
    const legacyIdx = GET_POST_QUERY.indexOf("!defined(language)");

    expect(localeIdx).toBeGreaterThan(-1);
    expect(enIdx).toBeGreaterThan(-1);
    expect(legacyIdx).toBeGreaterThan(-1);
    expect(localeIdx).toBeLessThan(enIdx);
    expect(enIdx).toBeLessThan(legacyIdx);
  });

  it("should include the field projection in each coalesce branch", () => {
    expect(GET_POST_QUERY).toContain("_id");
    expect(GET_POST_QUERY).toContain("title");
    expect(GET_POST_QUERY).toContain("estimatedReadingTime");
  });
});

describe("i18n GROQ query patterns — get-post-slugs", () => {
  it("should only include English and legacy posts for slug generation", () => {
    expect(GET_POST_SLUGS_QUERY).toContain('language == "en"');
    expect(GET_POST_SLUGS_QUERY).toContain("!defined(language)");
  });

  it("should not reference $locale — slugs are language-independent", () => {
    expect(GET_POST_SLUGS_QUERY).not.toContain("$locale");
  });
});

describe("i18n GROQ query patterns — get-posts", () => {
  it("should include posts matching the requested locale", () => {
    expect(GET_POSTS_QUERY).toContain("language == $locale");
  });

  it("should have a dedup guard using count subquery", () => {
    expect(GET_POSTS_QUERY).toContain("count(");
    expect(GET_POSTS_QUERY).toContain("^.slug.current");
    expect(GET_POSTS_QUERY).toContain("== 0");
  });

  it("should order results by publishedAt descending", () => {
    expect(GET_POSTS_QUERY).toContain("order(publishedAt desc)");
  });

  it("should project the language field", () => {
    // The projection should include "language" as a field
    // The query should select the language field somewhere in its projection
    // (not just in the filter). Check it appears after "order(publishedAt desc)"
    const orderIdx = GET_POSTS_QUERY.indexOf("order(publishedAt desc)");
    const afterOrder = GET_POSTS_QUERY.slice(orderIdx);
    expect(afterOrder).toContain("language");
  });
});

// ─── Integration Tests ──────────────────────────────────────────────────────

const hasRealSanityEnv = !!realSanityEnv && realSanityEnv !== "test-project-id";

describe.skipIf(!hasRealSanityEnv)(
  "i18n integration (requires NEXT_PUBLIC_SANITY_PROJECT_ID)",
  () => {
    it("should return null for a nonexistent slug in en locale", async () => {
      const { getPost } = await import("@/features/blog/queries/get-post");
      const result = await getPost("definitely-nonexistent-slug-xyz-12345", "en");
      expect(result).toBeNull();
    });

    it("should return null for a nonexistent slug in nb locale", async () => {
      const { getPost } = await import("@/features/blog/queries/get-post");
      const result = await getPost("definitely-nonexistent-slug-xyz-12345", "nb");
      expect(result).toBeNull();
    });

    it("should return an array with expected shape for getPosts", async () => {
      const { getPosts } = await import("@/features/blog/queries/get-posts");
      const result = await getPosts("en");
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        const first = result[0]!;
        expect(first).toHaveProperty("_id");
        expect(first).toHaveProperty("title");
        expect(first).toHaveProperty("slug");
        expect(typeof first.title).toBe("string");
      }
    });

    it("should return an array for getPosts with nb locale", async () => {
      const { getPosts } = await import("@/features/blog/queries/get-posts");
      const result = await getPosts("nb");
      expect(Array.isArray(result)).toBe(true);
    });

    it("should return slug objects from getPostSlugs", async () => {
      const { getPostSlugs } = await import("@/features/blog/queries/get-post");
      const result = await getPostSlugs();
      expect(Array.isArray(result)).toBe(true);
      if (result.length > 0) {
        expect(result[0]).toHaveProperty("slug");
        expect(typeof result[0]!.slug).toBe("string");
      }
    });
  },
);
