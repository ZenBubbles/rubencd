import type { Route } from "next";

export const siteConfig = {
  name: "Ruben CD",
  description:
    "AI Agents, Machine Learning, Embedding Models, UI/UX by Ruben Christoffer Damsgaard",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  nav: [
    { label: "Home", href: "/" as Route },
    { label: "Blog", href: "/blog" as Route },
    { label: "About", href: "/about" as Route },
    { label: "Contact", href: "/contact" as Route },
  ],
};
