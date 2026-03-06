"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Nav } from "./nav";
import { MobileMenu } from "./mobile-menu";
import { ScrollProvider, useScrollProgress } from "./scroll-context";

function ShellInner({ children }: { children: React.ReactNode }) {
  const t = useTranslations();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const handleClose = useCallback(() => setMobileMenuOpen(false), []);
  const { scrollProgress } = useScrollProgress();
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  return (
    <div
      className="flex min-h-screen flex-col font-sans antialiased"
      style={{ backgroundColor: "#FAFAF8", color: "#1a1a1a" }}
    >
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[60] focus:rounded-md focus:bg-[#12271d] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
      >
        {t("skipToContent")}
      </a>
      <Nav
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollProgress={scrollProgress ?? undefined}
        hamburgerRef={hamburgerRef}
      />
      <MobileMenu open={mobileMenuOpen} onClose={handleClose} triggerRef={hamburgerRef} />
      <main id="main-content" className="flex-1" inert={mobileMenuOpen || undefined}>
        {children}
      </main>
    </div>
  );
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <ScrollProvider>
      <ShellInner>{children}</ShellInner>
    </ScrollProvider>
  );
}
