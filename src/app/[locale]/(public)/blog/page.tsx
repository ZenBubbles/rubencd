import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPosts, PostList } from "@/features/blog";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("blogTitle"),
    alternates: {
      languages: { en: "/en/blog", nb: "/nb/blog" },
    },
  };
}

async function BlogContent() {
  await connection();
  const posts = await getPosts();
  return <PostList posts={posts} />;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-10 text-3xl font-bold">{t("title")}</h1>
      <Suspense fallback={<div>{t("loading")}</div>}>
        <BlogContent />
      </Suspense>
    </section>
  );
}
