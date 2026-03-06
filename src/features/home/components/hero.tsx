import { siteConfig } from "@/config/site.config";
import { FadeIn } from "@/components/ui/fade-in";

export function Hero() {
  return (
    <FadeIn>
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h1 className="text-5xl font-bold tracking-tight">{siteConfig.name}</h1>
        <p className="mt-4 text-xl text-neutral-600 dark:text-neutral-400">
          {siteConfig.description}
        </p>
      </section>
    </FadeIn>
  );
}
