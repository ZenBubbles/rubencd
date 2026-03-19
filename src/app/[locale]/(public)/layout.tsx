import { setRequestLocale } from "next-intl/server";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { PublicShell } from "./components/public-shell";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function PublicLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <PublicShell>
      <ScrollToTop />
      {children}
    </PublicShell>
  );
}
