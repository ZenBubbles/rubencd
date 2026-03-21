import { describe, it, expectTypeOf } from "vitest";
import type { PostCardData, PostData, CategoryData } from "@/features/blog/types";

/**
 * Compile-time type assertions for blog domain types.
 * These use Vitest's expectTypeOf (no runtime assertions needed).
 */
describe("Blog domain types", () => {
  describe("PostCardData", () => {
    it("should have a required _id field of type string", () => {
      expectTypeOf<PostCardData["_id"]>().toEqualTypeOf<string>();
    });

    it("should have an optional language field of type string", () => {
      expectTypeOf<PostCardData["language"]>().toEqualTypeOf<string | undefined>();
    });

    it("should have categories as an array of CategoryData", () => {
      expectTypeOf<PostCardData["categories"]>().toEqualTypeOf<CategoryData[]>();
    });

    it("should have optional mainImage", () => {
      expectTypeOf<PostCardData>().toHaveProperty("mainImage");
    });

    it("should have required estimatedReadingTime as number", () => {
      expectTypeOf<PostCardData["estimatedReadingTime"]>().toEqualTypeOf<number>();
    });
  });

  describe("PostData", () => {
    it("should extend PostCardData", () => {
      expectTypeOf<PostData>().toMatchTypeOf<PostCardData>();
    });

    it("should have a body field of type unknown[]", () => {
      expectTypeOf<PostData["body"]>().toEqualTypeOf<unknown[]>();
    });
  });
});
