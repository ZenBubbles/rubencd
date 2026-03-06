export const locales = ["en", "nb"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
