import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles.article1" });
  const title = t("title");
  const description = t("excerpt");
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: "2026-03-05",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      languages: {
        en: "/en/blog/is-software-and-saas-dying",
        nb: "/nb/blog/is-software-and-saas-dying",
      },
    },
  };
}

export default async function SoftwareDyingPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 md:py-24">
      <header className="mb-12">
        <div className="mb-5 flex items-center gap-3 text-xs font-bold tracking-widest text-[#525252]">
          <span className="text-[#12271d] uppercase">{t("articles.article1.category")}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="font-normal text-gray-400">{t("articles.article1.date")}</span>
          <span className="h-1 w-1 rounded-full bg-gray-300" />
          <span className="font-normal text-gray-400">{t("articles.article1.readTime")}</span>
        </div>
        <h1 className="mb-6 font-serif text-4xl leading-[1.15] font-medium text-[#1a1a1a] md:text-5xl lg:text-6xl">
          {t("articles.article1.title")}
        </h1>
        <p className="text-xl leading-relaxed font-light text-[#525252]">
          {t("blog.articleSubtitle")}
        </p>
      </header>
      <div className="border-t border-[#E5E5E5] pt-12">
        <p className="text-lg leading-relaxed font-light text-[#525252]">
          {t("blog.articleComingSoon")}
        </p>
      </div>
    </article>
  );
}
