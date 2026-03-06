import "@testing-library/jest-dom";
import { vi } from "vitest";
import messages from "../../messages/en.json";

type Messages = Record<string, unknown>;

// Resolve a dotted key path against a nested object
function resolveKey(obj: Messages, key: string): unknown {
  const parts = key.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current && typeof current === "object" && part in (current as Messages)) {
      current = (current as Messages)[part];
    } else {
      return key; // key not found, return key itself
    }
  }
  return current;
}

function createTranslator(namespace?: string) {
  const base = namespace ? resolveKey(messages, namespace) : messages;
  return function t(key: string): string {
    if (typeof base === "object" && base !== null) {
      const value = resolveKey(base as Messages, key);
      return typeof value === "string" ? value : key;
    }
    return key;
  };
}

// Mock next-intl (client hooks)
vi.mock("next-intl", () => ({
  useTranslations: (namespace?: string) => createTranslator(namespace),
  useLocale: () => "en",
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock next-intl/server
vi.mock("next-intl/server", () => ({
  getTranslations: async (namespaceOrOpts?: string | { locale: string; namespace: string }) => {
    const namespace =
      typeof namespaceOrOpts === "string" ? namespaceOrOpts : namespaceOrOpts?.namespace;
    return createTranslator(namespace);
  },
  setRequestLocale: () => {},
}));

// Mock @/i18n/routing
vi.mock("@/i18n/routing", () => ({
  Link: ({
    children,
    href,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require("react");
    return React.createElement("a", { href, ...props }, children);
  },
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  redirect: vi.fn(),
  getPathname: vi.fn(),
}));
