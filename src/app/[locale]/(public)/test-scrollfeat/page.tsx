import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { VideoScrollAnimation } from "@/features/scroll-sequence";

interface Props {
  params: Promise<{ locale: string }>;
}

export const metadata: Metadata = {
  title: "Scroll Sequence Test",
  description:
    "Test page for scroll-driven image sequence animation. Extracts video frames client-side and plays them on a canvas controlled by scroll position.",
  robots: { index: false, follow: false },
};

export default async function TestScrollFeatPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main id="main-content">
      <section className="flex h-dvh flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-4 text-5xl font-bold tracking-tight">Scroll Sequence Test</h1>
        <p className="mb-8 max-w-lg text-lg text-neutral-500">
          This page extracts frames from a video and plays them back as you scroll. The animation is
          driven entirely by scroll position using GSAP ScrollTrigger.
        </p>
        <p className="text-sm text-neutral-400 motion-safe:animate-bounce">Scroll down</p>
      </section>

      <VideoScrollAnimation videoUrl="/images/Sun_setting_birds_202603210113.mp4" />

      <section className="flex h-dvh flex-col items-center justify-center px-6 text-center">
        <h2 className="mb-4 text-3xl font-semibold">End of Sequence</h2>
        <p className="max-w-md text-neutral-500">
          The scroll-driven animation is complete. Scroll back up to replay.
        </p>
      </section>
    </main>
  );
}
