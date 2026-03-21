import type { MetadataRoute } from "next";
import { sanityFetch } from "@/lib/sanity/live";
import { defineQuery } from "next-sanity";

const sitemapPostsQuery = defineQuery(`*[_type == "post" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubencd.com";

  const staticPages = [
    { path: "", priority: 1.0 },
    { path: "/blog", priority: 0.8 },
    { path: "/about", priority: 0.7 },
    { path: "/contact", priority: 0.6 },
  ];

  const staticEntries: MetadataRoute.Sitemap = staticPages.flatMap(({ path, priority }) => [
    {
      url: `${siteUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority,
    },
    {
      url: `${siteUrl}/nb${path}`,
      lastModified: new Date(),
      changeFrequency: path === "" ? "weekly" : "monthly",
      priority: Math.round((priority - 0.1) * 10) / 10,
    },
  ]);

  // Static article pages (hardcoded routes that are NOT in Sanity)
  const staticArticleSlugs = ["is-software-and-saas-dying", "claude-skills"];

  const staticArticles: MetadataRoute.Sitemap = staticArticleSlugs.flatMap((slug) => [
    {
      url: `${siteUrl}/en/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    {
      url: `${siteUrl}/nb/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    },
  ]);

  let postEntries: MetadataRoute.Sitemap = [];
  try {
    const { data: posts } = await sanityFetch({ query: sitemapPostsQuery });
    postEntries = (posts ?? [])
      .filter(
        (post: { slug: string | null }) =>
          post.slug != null && !staticArticleSlugs.includes(post.slug),
      )
      .flatMap((post: { slug: string | null; _updatedAt: string }) => [
        {
          url: `${siteUrl}/en/blog/${post.slug}`,
          lastModified: new Date(post._updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.7,
        },
        {
          url: `${siteUrl}/nb/blog/${post.slug}`,
          lastModified: new Date(post._updatedAt),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        },
      ]);
  } catch {
    // Sanity fetch may fail during build without token — static pages still generated
  }

  return [...staticEntries, ...staticArticles, ...postEntries];
}
