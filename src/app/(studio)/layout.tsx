import { inter } from "@/lib/fonts";
import "@/styles/globals.css";

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
