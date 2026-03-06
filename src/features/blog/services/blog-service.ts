import type { PostCardData } from "../types";
export const filterByCategory = (posts: PostCardData[], cat: string) =>
  posts.filter((p) => p.categories.includes(cat));
export const uniqueCategories = (posts: PostCardData[]) =>
  Array.from(new Set(posts.flatMap((p) => p.categories))).sort();
