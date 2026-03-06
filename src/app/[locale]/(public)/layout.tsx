import { setRequestLocale } from "next-intl/server";
import { PublicShell } from "./components/public-shell";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function PublicLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PublicShell>{children}</PublicShell>;
}
