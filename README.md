# Lumero Media

Boutique post-production studio website — Astro + Alpine.js, Tailwind v4, MDX content collections.

## Stack

- **Astro 6** + **Alpine.js 3** (via `@astrojs/alpinejs`)
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **MDX** content collections for case studies (`src/content/work/*.mdx`)
- **View Transitions** for shared-element morphs between pages
- Self-hostable Inter / Fraunces / JetBrains Mono (currently loaded from Google Fonts — swap to self-hosted before ship)

## Structure

```
src/
  alpine.entry.js          Alpine plugin registration (intersect, collapse, focus)
  layouts/
    BaseLayout.astro       global shell + nav/footer + ClientRouter + JSON-LD
    ServiceLayout.astro    shared scaffold for /short-form, /long-form, /faceless
  components/
    Nav.astro
    Footer.astro
    MobileMenu.astro       full-screen overlay with staggered reveal
    WorkCard.astro         hover-to-preview tile
    VideoPlayer.astro      Alpine-controlled custom player
    Marquee.astro          CSS marquee, pause-on-hover
    FAQ.astro              x-collapse accordion
    Timecode.astro         requestAnimationFrame timecode
  pages/
    index.astro
    short-form.astro
    long-form.astro
    faceless.astro
    work/[...slug].astro
  content/
    config.ts              Zod schema for the `work` collection
    work/                  *.mdx case studies (3 samples included)
  styles/global.css        design tokens + Tailwind v4 import
public/
  fonts/                   (place self-hosted woff2 files here)
  posters/  reels/         (place poster JPGs + reel MP4/WebM masters here)
```

## Commands

```sh
pnpm install
pnpm dev          # http://localhost:4321
pnpm build
pnpm preview
```

## Next steps before shipping

1. Replace placeholder reels in `/public/reels/` with real masters (hero ≤ 2 MB, VP9 `.webm` + H.264 `.mp4`, poster always set).
2. Drop poster JPGs in `/public/posters/` for every reel referenced.
3. Swap testimonials on the homepage with real ones (search `// PLACEHOLDER`).
4. Self-host Fraunces / Inter / JetBrains Mono in `/public/fonts/` and replace the Google Fonts `<link>` in `BaseLayout.astro` with `@font-face` rules + `font-manrope: swap`. Preload the critical weights.
5. Generate `og-default.jpg` (1200×630) and per-case-study OG images.
6. Configure a deploy adapter (Vercel / Netlify / Cloudflare) and a contact-form backend if email-only is not enough.
7. Add analytics (Plausible or Umami — script in `BaseLayout.astro`).
8. Run a real WCAG audit and verify contrast on the amber accent against `--bg-elevated` for any text use.
9. Add the remaining 3–5 case-study MDX files; verify the asymmetric grid still reads at every breakpoint.
10. Replace placeholder social links in the footer with real handles.
