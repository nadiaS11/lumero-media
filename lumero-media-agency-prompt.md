# Advanced Prompt — Lumero Media, Video Editing Agency Website

> A senior-level prompt for an Astro + Alpine.js multi-page agency site. Replace anything in `[BRACKETS]` with real info before sending.

---

## THE PROMPT

You are acting as a **senior frontend engineer + product designer hybrid** with 10+ years shipping award-winning agency sites at the Awwwards SOTD level. You have the visual sensibility of a Pentagram designer, the engineering rigor of a Vercel staff engineer, and the motion instincts of someone who studies Rauno Freiberg, Emil Kowalski, and the marketing teams behind Linear, Framer, and Arc. You do not produce generic "AI-looking" output — no purple-to-blue gradients, no glassmorphism for its own sake, no centered hero with three feature cards below, no stock-photo collages, no "Welcome to our agency" greeting.

I need you to design and build a **multi-page website for a video editing agency** called **Lumero Media**, based in **Bangladesh**, serving international clients. The agency offers three core services, each with its own dedicated page:

- **Short-form** — TikTok, Reels, YouTube Shorts, vertical 9:16 hook-driven cuts for creators and brands.
- **Long-form** — YouTube long-form, brand films, documentaries, podcasts, 16:9 storytelling with color and sound depth.
- **Faceless** — high-volume faceless YouTube content (history, philosophy, top-10s, motivation, cash-cow niches) with B-roll, motion graphics, and kinetic typography.

Contact: **medialumero@gmail.com**.

The strategic objective: position Lumero as a **premium boutique post-production studio that happens to be in Bangladesh, not "a Bangladeshi video editing service."** That framing matters. The site competes globally and needs to feel as polished as a Los Angeles or London studio's. Geography is a footer detail, not a sales pitch. The work and the craft of the site itself are the argument.

The vibe: **cinematic, confident, editorial.** Closer to A24's site energy, MSCHF's confidence, and Linear's polish than a freelancer template. The site should feel like Lumero cares about every frame — because that _is_ the service.

---

### 1. DESIGN SYSTEM (lock these tokens before writing any code)

**Color palette — cinematic dark, with one luminous accent that earns "Lumero" (light):**

- `--bg`: `#0A0A0B` (near-black with a hint of cool, not pure black)
- `--bg-elevated`: `#131316`
- `--surface`: `#1B1B1F`
- `--surface-hover`: `#22222A`
- `--border`: `#262630`
- `--border-strong`: `#33333E`
- `--text-primary`: `#F5F5F4` (warm off-white)
- `--text-secondary`: `#A3A3AA`
- `--text-muted`: `#666670`
- `--accent`: `#F5B544` (a luminous warm amber — used sparingly, max 3 places per viewport, treated like a spotlight)
- `--accent-soft`: `#F5B544` at 12% opacity for hover surfaces and focus rings
- `--accent-glow`: a `box-shadow: 0 0 60px -10px rgba(245, 181, 68, 0.35)` reserved for one or two key moments only

If a light theme variant is requested, mirror with `#FAFAF9` bg, `#0A0A0B` text, same amber.

**Typography — disciplined two-font system, with mono for technical signal:**

- **Display/headlines:** **"Fraunces"** (variable, optical sizing on) — editorial serif that gives "Lumero" a premium production-house feel. Use weight 400–500, NOT 700+. Restraint matters.
- **Body/UI:** **"Inter"** with `font-feature-settings: 'ss01', 'cv11'` enabled.
- **Mono (for timecodes, captions, service tags, metadata):** **"JetBrains Mono"** or **"Geist Mono"**. This is the _signature_ type for project metadata.

**Type scale** (fluid with `clamp()`):

- Hero display: `clamp(3.5rem, 10vw, 9rem)`, line-height `0.95`, tracking `-0.035em`, weight 400
- H1: `clamp(2.5rem, 5vw, 4.5rem)`, line-height `1.0`, tracking `-0.03em`
- H2: `clamp(1.75rem, 3vw, 2.5rem)`, line-height `1.1`
- Body large: `1.125rem` / `1.65` line-height
- Body: `1rem` / `1.6`
- Caption/label (mono, uppercase): `0.75rem`, tracking `0.08em`

**Spacing scale** (multiples of 4): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192. Use only these.

**Grid:** 12-column, 24px gutters, `max-width: 1440px`, with `clamp(20px, 5vw, 80px)` side padding.

**Border radius:** `2px` for cards, `4px` for buttons, `999px` for pills. No lazy `16px` rounded-everything.

---

### 2. INFORMATION ARCHITECTURE

Four pages total, all sharing the same global nav and footer:

```
/              → Home (overview, all three services teased, featured reel, selected work, clients, contact)
/short-form    → Short-form service page
/long-form     → Long-form service page
/faceless      → Faceless service page
```

Plus a dynamic case-study route (`/work/[slug]`) for individual project deep-dives, generated from an Astro content collection.

**Global elements (on every page):**

- **Sticky nav** — minimal, left-aligned wordmark `Lumero` in Fraunces, right-aligned links (`Short-form / Long-form / Faceless / Work / Contact`). On scroll: backdrop blur, hairline border below. Active page indicated by a subtle amber underline. Mobile: hamburger triggers an Alpine-powered full-screen overlay menu with staggered link reveal.

- **Footer** — generous, three-row.
  - Row 1: a huge editorial CTA — _"Have something worth cutting?"_ in Fraunces display, with `medialumero@gmail.com` as a primary mailto link with an underline animation.
  - Row 2: service column links, social column (Instagram, YouTube, Vimeo, LinkedIn, X), contact column (email, "Based in Bangladesh — working worldwide", response-time line like "Replies within 24h").
  - Row 3: hairline divider, then `© 2026 Lumero Media · All work © respective clients` on the left, a live mono timecode that's been ticking since page load on the right.

---

### 3. HOMEPAGE (`/`) — section-by-section

1. **Hero** — full-viewport, looping muted background reel (autoplay, `playsinline`, low-bitrate `webm` + `mp4` fallback, optimized aggressively). Over it:
   - Top caption, mono uppercase: `POST-PRODUCTION STUDIO · WORKING WORLDWIDE`
   - Headline in Fraunces, two lines: _"We cut the films,"_ break, _"shorts and stories"_ break, _"that move people."_ (Or generate two alternative headlines in the same tonal register.)
   - Below: a thin row with three mono links — `→ Short-form  ·  → Long-form  ·  → Faceless` — that hover-underline.
   - Bottom-left: a mono timecode (`00:00:12:04`) that actually increments via Alpine.
   - Bottom-right: a thin vertical scroll cue with a subtle animation.

2. **Services preview** — three large cards stacked or in a 3-column grid (depending on viewport), one per service. Each card is _substantial_: takes ~80vh on desktop. Contains a looping muted preview clip behind a slight dark overlay, the service name in Fraunces display, a one-line description, a few mono tags, and a `View service →` link. Hovering brightens the clip and reveals more detail via Alpine `x-show` + `x-transition`.

3. **Selected Work** — asymmetric grid of 6–8 case studies across all three service types, **not** uniform columns. Mix portrait (9:16), landscape (16:9), and ultrawide (2.39:1) tiles to signal format range. On hover: poster image swaps to a silent looping preview clip, a thin progress bar fills, and metadata (client, year, service category, duration) fades in. Use CSS `mask-image` reveals where appropriate. Below the grid: `View all work →` link.

4. **Reel** — a single, prominent featured reel section. Custom-built player with Alpine-controlled play/pause, scrubber, mute, fullscreen — styled in the design system, never the default browser chrome. Title above in Fraunces: _"Lumero Reel — 2026"_ with mono runtime caption.

5. **Clients/Trust** — horizontally scrolling marquee of client logos in `--text-muted`, brightening to `--text-primary` on hover. Alpine-driven pause-on-hover. Above it, a small mono caption: `TRUSTED BY · 2022 – PRESENT`.

6. **Process** — three-step row showing how Lumero works with clients (e.g., `01 Brief / 02 Edit / 03 Refine`). Mono numerals, Fraunces step titles, short body copy each. Restrained, no icons, no Lottie.

7. **Testimonials** — max 3, large-format pull quotes in Fraunces, with attribution in mono below. No card UI. A giant decorative serif quote glyph sits behind each in `--accent-soft`. Only include this section if there are real testimonials — otherwise omit entirely.

8. **Final CTA + footer** — full-bleed CTA section above the footer: _"Ready when you are."_ in Fraunces, with email link below.

---

### 4. SERVICE PAGES (`/short-form`, `/long-form`, `/faceless`)

All three share a **common scaffold** but each gets a distinct content treatment that reflects its format. The scaffold:

1. **Service hero** — caption + headline + supporting paragraph. No looping background video here (already used on homepage); instead a single large hero asset specific to the format.
2. **What we do** — 2–3 paragraphs in editorial voice describing the service depth.
3. **Recent work** — a service-filtered grid of 4–6 case studies.
4. **Process** — service-specific workflow.
5. **Deliverables & turnaround** — what the client gets and when.
6. **FAQ** — 5–7 service-specific questions, Alpine-powered accordion with smooth height transitions.
7. **CTA strip** — _"Start a [service] project →"_ with email link.

**Per-page distinct treatments:**

**`/short-form`** —

- Hero asset: a tall 9:16 vertical phone-frame mockup playing a real short on loop, set against negative space. Headline: _"Short-form that earns the scroll-stop."_
- Work grid leans vertical tiles, mimicking a social feed without copying it. Mono metadata shows hook duration, watch-through %, and platform.
- Process steps: `Hook / Pace / Caption / Deliver`.
- Deliverables row: vertical 9:16 master, captions burned + SRT, platform-ready cuts for TikTok/Reels/Shorts, optional thumbnail.
- Tone: kinetic but restrained — the page itself doesn't need to be flashy to prove they make flashy content.

**`/long-form`** —

- Hero asset: a full-bleed widescreen 2.39:1 cinematic still from a featured edit. Headline: _"Long-form that respects the runtime."_
- Work grid leans wide landscape tiles. Mono metadata shows runtime, format (Brand Film / Documentary / Podcast / YouTube), color pipeline, sound credit.
- Process steps: `Assembly / Story / Color / Sound / Master`.
- Deliverables row: master file in client-specified codec, color-graded passes, full sound mix, social cutdowns optional.
- Tone: editorial, considered, slower rhythm. The most cinematic of the three pages.

**`/faceless`** —

- Hero asset: a split-screen showing a faceless YouTube thumbnail and a clean editing timeline alongside. Headline: _"Faceless content, fully crafted."_ Sub-line addresses the elephant: _"Not template-spun — actually edited, with B-roll, sound design, and motion graphics that read as premium."_
- Work grid shows variety across niches (history / philosophy / motivation / lifestyle / commentary). Mono metadata shows niche, runtime, channel subs at time of work (with permission), and views.
- Process steps: `Script / Voice / B-roll / Motion / Master`.
- Deliverables row: edited master, thumbnail concept (optional), metadata copy assistance (optional), batch turnaround for channel networks.
- Tone: confident and explicitly counter-positioned against the low-effort faceless content flooding the niche. The differentiator is craft.

---

### 5. CASE STUDY ROUTE (`/work/[slug]`)

Generated from an Astro content collection. Each case study includes:

- Hero asset (full-bleed video or still)
- Client, year, service category, role/credits in mono
- 2–3 paragraphs of context: brief, challenge, approach
- Embedded video player (custom Alpine controls)
- Stills/B-roll gallery
- Outcome line (views, engagement, what shipped)
- "Next project →" link to the chronologically next case study

---

### 6. MOTION & INTERACTION (Alpine.js conventions)

- Transition curve: `cubic-bezier(0.65, 0, 0.35, 1)`. Durations: `200ms` micro, `400ms` layout, `600ms` page-level reveals.
- **Page transitions:** use **Astro View Transitions** API for smooth cross-page motion (`<ClientRouter />` in the base layout). Hero elements get `transition:name` attributes for shared-element morphs between home and service pages.
- **Intro:** a brief letterboxing intro — black bars collapse from top and bottom revealing the homepage hero. Once only, max 800ms, gated by `sessionStorage`. Skipped on service pages.
- **Scroll reveals:** use the **`@alpinejs/intersect` plugin**. Pattern: `x-data x-intersect.once="shown = true"` with `x-transition` for word-by-word headline reveals and tile fades. Do _not_ use letter-by-letter staggers (overused).
- **Hover previews on work tiles:** Alpine `x-data="{ hovering: false }" @mouseenter="hovering = true" @mouseleave="hovering = false"`, with the preview `<video>` `play()`/`pause()` called via `x-effect`. Posters shown by default; clips load on first hover (`preload="metadata"`).
- **Custom cursor:** on work grids, a small `▶ Play` pill follows the cursor over video tiles. Implemented in Alpine with `@mousemove` updating a CSS variable on a fixed element. Hidden on touch (`@media (hover: none)`).
- **FAQ accordions:** Alpine `x-data="{ open: null }"` with `x-show` + `x-collapse` plugin for smooth height transitions.
- **Mobile nav:** Alpine `x-data="{ open: false }"`, full-screen overlay with staggered link reveal using `x-transition:enter` delays.
- **Marquee:** CSS-only infinite scroll with Alpine pause-on-hover.
- Respect `prefers-reduced-motion: reduce` rigorously — all transitions collapse to instant, no autoplay, no parallax, no marquee.

---

### 7. TECH & CODE QUALITY

- **Stack:** **Astro 4+** with **Alpine.js 3+** (via `@astrojs/alpinejs` integration), **Tailwind CSS** (`@astrojs/tailwind`), **MDX** for case studies (`@astrojs/mdx`), **Astro Content Collections** with a Zod schema for type-safe work entries, **Sharp** for image optimization via Astro's `<Image />`.
- Required Alpine plugins: `@alpinejs/intersect`, `@alpinejs/collapse`, optionally `@alpinejs/focus` for the mobile menu.
- **No React, no Vue, no Svelte, no Framer Motion.** Astro components + Alpine sprinkles + CSS transitions only. The whole point of this stack is shipping near-zero JS by default.
- **File structure:**
  ```
  src/
    layouts/
      BaseLayout.astro
      ServiceLayout.astro
    components/
      Nav.astro
      Footer.astro
      WorkCard.astro          (Alpine: hover preview)
      VideoPlayer.astro       (Alpine: custom controls)
      Marquee.astro           (Alpine: pause-on-hover)
      FAQ.astro               (Alpine: accordion)
      Timecode.astro          (Alpine: ticking timer)
      MobileMenu.astro        (Alpine: overlay)
    pages/
      index.astro
      short-form.astro
      long-form.astro
      faceless.astro
      work/[...slug].astro
    content/
      config.ts               (Zod schema for work collection)
      work/
        *.mdx
    styles/
      global.css              (design tokens as CSS custom properties)
    assets/
      reels/
      posters/
  public/
    fonts/                    (self-hosted Fraunces, Inter, JetBrains Mono)
  ```
- **Semantic HTML** throughout — `<header>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<figcaption>`. Correct heading hierarchy per page.
- **Accessibility — non-negotiable:**
  - WCAG AA contrast minimums verified.
  - Visible focus rings using `--accent` with 2px offset on every interactive element.
  - Alpine accordions use proper `aria-expanded` and `aria-controls`.
  - Custom video controls fully keyboard-navigable with `aria-label` on each button.
  - All images have `alt`; decorative ones marked `aria-hidden`.
  - `prefers-reduced-motion` honored everywhere.
- **Performance budget:**
  - LCP under 1.5s on simulated 4G.
  - Hero videos: short, aggressively compressed `webm` (VP9) + `mp4` (H.264) fallbacks, `preload="metadata"`, `poster` always set.
  - Work preview clips: lazy-loaded, `preload="none"` until first hover.
  - Fonts: self-hosted, `font-manrope: swap`, preload critical weights only.
  - Images: AVIF/WebP via `<Image />`, sized appropriately, `loading="lazy"` below fold.
  - Total JS shipped per page should stay under 30kb gzipped (Alpine + tiny utilities). This is the Astro advantage; preserve it.
- **SEO:** every page has unique `<title>`, `<meta description>`, OG image, JSON-LD `Organization` schema on the homepage and `CreativeWork` on case studies. Generate a `sitemap.xml` via `@astrojs/sitemap`.
- **Responsive — mobile-first.** Design at 375 → 768 → 1280 → 1920. The hero display type must reflow gracefully at every breakpoint without horizontal scroll.
- **Code quality:** the codebase will be read. Sensible component naming, comments only where decisions need explaining, no dead code, Prettier + ESLint configs included.
- _"Add `robots.txt`, `sitemap.xml` config, and a JSON-LD `Organization` schema with `medialumero@gmail.com` and Bangladesh address."_

---

### 8. CONTENT PLACEHOLDERS

Generate the following placeholder content, clearly marked for swap:

- **Homepage hero headlines:** 2 alternatives in the same tonal register as the primary.
- **6–8 case studies** spanning all three services. Each gets a full MDX file with realistic invented project names (e.g., _"Northwind — Brand Film, 2025"_, _"Atlas Daily — Faceless YouTube, 2025"_, _"Vela — Music Video Short, 2024"_). Include plausible client names, runtimes, role credits, and 2–3 paragraphs of context. Mark all invented metrics with `// PLACEHOLDER: replace with real numbers`.
- **Service page bodies:** for each of `/short-form`, `/long-form`, `/faceless`, write the "What we do" copy (2–3 paragraphs in confident editorial voice), the process step descriptions, the deliverables list, and 5–7 FAQ entries with answers. Voice: brand-first, declarative, no buzzwords.
- **Testimonials:** write 3 plausible fictional testimonials that sound like real directors, creators, or brand managers — _not_ marketing copy. Attribute to invented people with realistic titles. Mark each as `// PLACEHOLDER: replace with real testimonial`.

---

### 9. WHAT I DO NOT WANT

- No purple/blue gradients. No glassmorphism. No 3D floating blobs. No mesh gradients.
- No "Welcome to Lumero Media" or wave-emoji greeting in the hero. Show the work; don't announce.
- No three-feature-card row with emoji icons.
- No "We are a passionate team of storytellers" copy. Strike: _passionate, driven, innovative, results-oriented, leveraging, journey, ecosystem, holistic_.
- No skill bars or percentage rings for "Premiere Pro 95%."
- No Lottie animations of cameras, film reels, or play buttons.
- No "Made with ❤️ in Bangladesh" footer. Lumero's location is a fact, not a pitch.
- No "Trusted by [stock-photo-of-fake-logos]" — if real client logos aren't ready, omit the section.
- No fake testimonials presented as real. Placeholders must be marked as placeholders.
- No `bg-gradient-to-r from-purple-500 to-pink-500` anywhere. If I see it, the brief was failed.
- No React, no Vue, no Next.js — this stack is Astro + Alpine deliberately.

---

### 10. DELIVERABLE FORMAT

Respond in this order:

1. A **design rationale** (max 180 words) — what visual language was chosen and _why it fits a Bangladesh-based agency positioning itself as a global premium studio_.
2. The **design tokens** as a single CSS `:root` block.
3. The **Astro project structure** (file tree) and `package.json` dependencies list.
4. The **full code**, file by file, in this order: `astro.config.mjs`, `tailwind.config.mjs`, `src/styles/global.css`, `src/content/config.ts`, `src/layouts/BaseLayout.astro`, `src/components/*.astro` (each component complete with its Alpine directives), `src/pages/index.astro`, `src/pages/short-form.astro`, `src/pages/long-form.astro`, `src/pages/faceless.astro`, `src/pages/work/[...slug].astro`, plus 2 sample MDX case studies (`src/content/work/northwind.mdx`, `src/content/work/atlas-daily.mdx`).
5. A **"Next steps"** checklist of 8–10 items Lumero should complete before shipping (replace placeholder reels with real masters at specified bitrates, swap testimonials, generate OG images, configure Vercel/Netlify deploy with Astro adapter, add Plausible or Umami analytics, set up a contact form backend, optimize hero reel to under 2MB, etc.).

Begin.

---

## HOW TO USE THIS PROMPT

- **First pass:** Send the full prompt as-is.
- **Refinement passes:** Quote the specific section. _"Rework section 4 `/faceless` — the hero asset description; I want something less literal than a split-screen."_ Surgical edits beat restarting.
- **If output drifts generic:** Quote the violated rule from section 9 and ask for a redo of that section only.
- **For variants:** Append _"Generate two distinct visual directions for the homepage hero — one editorial/serif-heavy as specified, one mono-typography-only — so I can pick."_

## OPTIONAL ADD-ONS

- _"Write the full MDX for 4 more case studies, one per service category plus one bonus, 400–600 words each."_
- _"Add a `/about` page with team bios (3 invented team members), studio philosophy, and a 'Working with us' section."_
- _"Add a working contact form using Astro server endpoints + a service like Resend, with Alpine-driven client-side validation."_
- _"Generate a `robots.txt`, `sitemap.xml` config, and a JSON-LD `Organization` schema with `medialumero@gmail.com` and Bangladesh address."_
- _"Add a blog/journal section using Astro content collections for SEO."_
