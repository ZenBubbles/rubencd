import type { PostCardData } from "../types";

export const filterByCategory = (posts: PostCardData[], categorySlug: string) =>
  posts.filter((p) => p.categories.some((c) => c.slug === categorySlug));

export const uniqueCategories = (posts: PostCardData[]) =>
  Array.from(new Map(posts.flatMap((p) => p.categories).map((c) => [c.slug, c])).values()).sort(
    (a, b) => a.title.localeCompare(b.title),
  );
