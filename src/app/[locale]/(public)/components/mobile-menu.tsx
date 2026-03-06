"use client";

import { useEffect, useRef, useCallback } from "react";
import { useTranslations } from "next-intl";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
}

export function MobileMenu({ open, onClose, triggerRef }: MobileMenuProps) {
  const t = useTranslations("nav");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  const handleClose = useCallback(() => {
    onClose();
    requestAnimationFrame(() => {
      triggerRef?.current?.focus();
    });
  }, [onClose, triggerRef]);

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        handleClose();
        return;
      }

      if (e.key === "Tab") {
        const focusableElements = containerRef.current?.querySelectorAll<HTMLElement>(
          'button, a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const first = focusableElements[0] as HTMLElement | undefined;
        const last = focusableElements[focusableElements.length - 1] as HTMLElement | undefined;
        if (!first || !last) return;

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, handleClose]);

  if (!open) return null;

  const links = [
    { key: "articles" as const, href: "#articles" },
    { key: "contact" as const, href: "#contact" },
  ];

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={t("navigationMenu")}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-[#FAFAF8]"
    >
      <button
        ref={closeButtonRef}
        className="absolute top-6 right-6 flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm text-[#1a1a1a] focus-visible:ring-2 focus-visible:ring-[#12271d] focus-visible:outline-none"
        onClick={handleClose}
        aria-label={t("closeMenu")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          className="rounded-sm font-serif text-2xl font-medium text-[#1a1a1a] transition-colors hover:text-[#12271d] focus-visible:ring-2 focus-visible:ring-[#12271d] focus-visible:outline-none"
          onClick={handleClose}
        >
          {t(link.key)}
        </a>
      ))}
    </div>
  );
}
