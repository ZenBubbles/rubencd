import { defineQuery } from "groq";
import { fetchSanity } from "@/lib/sanity/client";
import type { PostCardData } from "../types";

export const GET_POSTS_QUERY = defineQuery(`
  *[_type == "post" && defined(slug.current) && (
    language == $locale ||
    (!defined(language) && count(*[_type == "post" && slug.current == ^.slug.current && language == $locale]) == 0)
  )] | order(publishedAt desc) {
    _id, title, "slug": slug.current, publishedAt, excerpt, language,
    mainImage,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200) + 1,
    "categories": categories[]->{title, "slug": slug.current}
  }
`);

export const getPosts = (locale: string) =>
  fetchSanity<PostCardData[]>(GET_POSTS_QUERY, { locale });
