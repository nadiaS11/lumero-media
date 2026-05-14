// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://lumeromedia.com",
  integrations: [
    alpinejs({ entrypoint: "/src/alpine.entry.js" }),
    mdx(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  experimental: {
    clientPrerender: true,
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Instrument Serif",
      cssVariable: "--astro-font-instrument",
      weights: ["400"],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Inter Tight",
      cssVariable: "--astro-font-inter-tight",
      weights: ["400", "500", "600", "700"],
      styles: ["normal"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--astro-font-jetbrains",
      weights: ["400", "500"],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
});
