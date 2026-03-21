import { defineQuery } from "groq";
import { fetchSanity } from "@/lib/sanity/client";
import type { PostData } from "../types";

export const POST_PROJECTION = `{
  _id, title, "slug": slug.current, publishedAt, excerpt, body,
  mainImage, "categories": categories[]->{title, "slug": slug.current},
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 200) + 1
}`;

export const GET_POST_QUERY = defineQuery(`
  coalesce(
    *[_type == "post" && slug.current == $slug && language == $locale][0] ${POST_PROJECTION},
    *[_type == "post" && slug.current == $slug && language == "en"][0] ${POST_PROJECTION},
    *[_type == "post" && slug.current == $slug && !defined(language)][0] ${POST_PROJECTION}
  )
`);

export const GET_POST_SLUGS_QUERY = defineQuery(
  `*[_type == "post" && defined(slug.current) && (language == "en" || !defined(language))]{"slug": slug.current}`,
);

export const getPost = (slug: string, locale: string) =>
  fetchSanity<PostData | null>(GET_POST_QUERY, { slug, locale });

export const getPostSlugs = () => fetchSanity<{ slug: string }[]>(GET_POST_SLUGS_QUERY);
