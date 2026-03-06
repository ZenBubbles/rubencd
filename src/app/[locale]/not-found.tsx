import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="mb-4 text-3xl font-bold">{t("title")}</h1>
      <p className="text-[#525252]">{t("description")}</p>
    </section>
  );
}
