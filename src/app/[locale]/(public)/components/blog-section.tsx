import { connection } from "next/server";
import { getPosts, CategoryTabs } from "@/features/blog";
import { FeaturedArticle } from "./featured-article";

export async function BlogSection({ locale }: { locale: string }) {
  await connection();
  const posts = await getPosts(locale);

  return (
    <>
      <FeaturedArticle locale={locale} />
      <section className="mt-8">
        <CategoryTabs posts={posts} />
      </section>
    </>
  );
}
