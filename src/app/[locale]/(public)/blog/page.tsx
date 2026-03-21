import { Suspense } from "react";
import type { Metadata } from "next";
import { connection } from "next/server";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { getPosts, CategoryTabs } from "@/features/blog";

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

async function BlogContent({ locale }: { locale: string }) {
  await connection();
  const posts = await getPosts(locale);
  return <CategoryTabs posts={posts} />;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <section className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24 lg:px-24">
      <header className="mb-16 max-w-4xl">
        <div className="mb-6 flex items-center gap-3">
          <span className="h-px w-8 bg-[#12271d]" aria-hidden="true" />
          <span className="text-xs font-bold tracking-[0.2em] text-[#12271d] uppercase">
            {t("title")}
          </span>
        </div>
        <h1 className="font-serif text-5xl leading-[1.1] font-light text-[#1a1a1a] md:text-7xl">
          Articles & <span className="font-normal italic">insights</span>
        </h1>
      </header>
      <Suspense fallback={<div>{t("loading")}</div>}>
        <BlogContent locale={locale} />
      </Suspense>
    </section>
  );
}
