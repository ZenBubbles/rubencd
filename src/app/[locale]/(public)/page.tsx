import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ScrollShell } from "./components/scroll-shell";
import { BlogSection } from "./components/blog-section";
import { NewsletterSection } from "./components/newsletter-section";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
    openGraph: {
      title: t("homeTitle"),
      description: t("homeDescription"),
      type: "website",
      images: [{ url: "/images/hero.png", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: t("homeTitle"),
      description: t("homeDescription"),
    },
    alternates: {
      languages: { en: "/en", nb: "/nb" },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <ScrollShell>
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24 lg:px-24" id="articles">
        <header className="mb-16 max-w-4xl md:mb-24">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-[#12271d]" aria-hidden="true" />
            <span className="text-xs font-bold tracking-[0.2em] text-[#12271d] uppercase">
              {t("articles.latestWriting")}
            </span>
          </div>
          <h2 className="font-serif text-5xl leading-[1.1] font-light text-[#1a1a1a] md:text-7xl">
            {t("articles.heading")} <br />
            <span className="font-normal italic">{t("articles.headingItalic")}</span>
          </h2>
        </header>
        <BlogSection />
        <NewsletterSection />
      </div>
    </ScrollShell>
  );
}
