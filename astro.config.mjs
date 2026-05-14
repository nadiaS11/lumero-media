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
      name: "Manrope",
      cssVariable: "--astro-font-manrope",
      weights: ["400", "500", "600", "700", "800"],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
});
