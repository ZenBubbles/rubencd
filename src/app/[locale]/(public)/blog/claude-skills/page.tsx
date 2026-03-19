import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { SkillsArticle } from "@/features/blog";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Claude Without Skills Is Like a Smartphone Without Apps";
  const description =
    "Skills are the unlock that turns Claude from a generic chatbot into a personalized thinking partner. Learn what they are, why they matter, and how to build your own.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: "2026-03-19",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      languages: {
        en: "/en/blog/claude-skills",
        nb: "/nb/blog/claude-skills",
      },
    },
  };
}

export default async function ClaudeSkillsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <SkillsArticle />;
}
