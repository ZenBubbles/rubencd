import { Anton, Inter, Merriweather, Oswald } from "next/font/google";

export const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const merriweather = Merriweather({
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-accent",
  display: "swap",
});
