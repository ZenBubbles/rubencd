import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AboutContent } from "@/features/about";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: `${t("title")} — Ruben Christoffer Damsgaard`,
    description:
      "Learn about Ruben Christoffer Damsgaard — AI & Software Engineer writing about AI Agents, Machine Learning, Embedding Models, UI/UX, and startups.",
    keywords: ["Ruben Christoffer Damsgaard", "Ruben Damsgaard", "about", "AI Engineer"],
    openGraph: {
      title: `${t("title")} — Ruben Christoffer Damsgaard`,
      description:
        "Learn about Ruben Christoffer Damsgaard — AI & Software Engineer writing about AI Agents, Machine Learning, and UI/UX.",
      type: "profile",
    },
    alternates: { languages: { en: "/en/about", nb: "/nb/about" } },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-8 text-3xl font-bold">{t("title")}</h1>
      <AboutContent />
    </section>
  );
}
