import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { ViralArticle } from "@/features/blog";

interface Props {
  params: Promise<{ locale: string }>;
}

const title = "The Difference Between 891 Users and 3.2 Million Is a Decimal Point";
const description =
  "What the viral coefficient (K-factor) is, how it compounds, and why tiny changes in K separate products that explode from products that fizzle out.";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await params;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: "2026-08-29",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      languages: {
        en: "/en/blog/viral-coefficient",
        nb: "/nb/blog/viral-coefficient",
      },
    },
  };
}

export default async function ViralCoefficientPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return <ViralArticle />;
}
