import type { Metadata } from "next";
import { Suspense } from "react";
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
    keywords: [
      "Ruben Christoffer Damsgaard",
      "Ruben Damsgaard",
      "Ruben CD",
      "AI Agents",
      "Machine Learning",
      "Embedding Models",
      "UI/UX",
    ],
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

function JsonLd({ locale }: { locale: string }) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rubencd.com";

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ruben Christoffer Damsgaard",
    alternateName: ["Ruben Damsgaard", "Ruben CD"],
    url: siteUrl,
    jobTitle: "AI & Software Engineer",
    knowsAbout: [
      "AI Agents",
      "Machine Learning",
      "Embedding Models",
      "UI/UX Design",
      "Startups",
      "SaaS",
    ],
    sameAs: [],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Ruben Christoffer Damsgaard — Blog",
    alternateName: "Ruben CD Blog",
    url: siteUrl,
    inLanguage: [locale === "nb" ? "nb-NO" : "en-US"],
    author: { "@type": "Person", name: "Ruben Christoffer Damsgaard" },
    description:
      "Writing about AI Agents, Machine Learning, Embedding Models, UI/UX, startups, and design.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <ScrollShell>
      <JsonLd locale={locale} />
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-12 md:py-24 lg:px-24" id="articles">
        <header className="mb-16 max-w-4xl md:mb-24">
          <h2 className="font-serif text-5xl leading-[1.1] font-light text-[#1a1a1a] italic md:text-7xl">
            {t("articles.heading")} <br />
            {t("articles.headingItalic")}
          </h2>
        </header>
        <Suspense>
          <BlogSection />
        </Suspense>
        <NewsletterSection />
      </div>
    </ScrollShell>
  );
}
