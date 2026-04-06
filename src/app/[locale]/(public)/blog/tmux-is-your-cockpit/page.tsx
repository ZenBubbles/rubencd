import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { TmuxArticle } from "@/features/blog";

interface Props {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const title =
    "You're Running 4 Terminal Windows in 2026. A 10x Engineer Just Walked Past Your Screen and Laughed.";
  const description =
    "The difference is not talent. It is Tmux. Why the terminal multiplexer is your cockpit in the AI agent era.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: "2026-04-05",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      languages: {
        en: "/en/blog/tmux-is-your-cockpit",
        nb: "/nb/blog/tmux-is-your-cockpit",
      },
    },
  };
}

export default async function TmuxArticlePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <TmuxArticle />;
}
