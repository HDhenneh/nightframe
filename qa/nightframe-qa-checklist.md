# Nightframe — Site QA Baseline & Regression Checklist

**Template version:** 0.1.0  
**Last first-pass:** 2026-06-14  
**Auditor:** FORGE (CTO)

Use this checklist before every production deploy and after any structural template change. A pass on all `[REQUIRED]` items is a minimum bar for merge to `main`.

---

## 1. Build Integrity `[REQUIRED]`

| # | Check | Method | Target | First Pass |
|---|-------|--------|--------|------------|
| 1.1 | `npm run build` exits 0 with no errors | `npm run build` | No errors/warnings | ✅ Pass — 5 modules, 102ms |
| 1.2 | `dist/` contains `index.html`, `assets/*.js`, `assets/*.css` | `ls dist/` | All three present | ✅ Pass |
| 1.3 | Bundled JS ≤ 50 kB gzip | Build output | ≤ 50 kB | ✅ Pass — 0.64 kB gzip |
| 1.4 | Bundled CSS ≤ 20 kB gzip | Build output | ≤ 20 kB | ✅ Pass — 2.50 kB gzip |
| 1.5 | No `console.error` or unhandled rejections in browser console | DevTools console | Zero errors | ✅ Pass |

---

## 2. Layout Integrity `[REQUIRED]`

| # | Check | What to look for | First Pass |
|---|-------|-----------------|------------|
| 2.1 | Header renders with logo + nav links | Sticky header at top, logo left, links right | ✅ Pass |
| 2.2 | Hero section fully visible above fold | Badge, H1, subtitle, two CTA buttons | ✅ Pass |
| 2.3 | Features grid — 6 cards in a 3-column layout (desktop) | Even grid, icons top-left, no overflow | ✅ Pass |
| 2.4 | Listings grid — 3 cards in a 3-column layout (desktop) | Cards same height, category tag visible | ✅ Pass |
| 2.5 | CTA banner renders with heading, body text, and button | Centred layout, accent background | ✅ Pass |
| 2.6 | Footer renders brand column + two nav columns + copyright | Grid layout, no overlap | ✅ Pass |
| 2.7 | Skip-to-content link visible on focus | Tab into page — link appears top-left | ✅ Pass |
| 2.8 | No horizontal scrollbar at any viewport width | Resize browser, or use DevTools device mode | ✅ Pass |

---

## 3. Responsive Breakpoints `[REQUIRED]`

Nightframe uses two breakpoints: **≤768px** (tablet/mobile) and **≤480px** (mobile).

| # | Viewport | Check | First Pass |
|---|----------|-------|------------|
| 3.1 | 1280px (desktop) | 3-col feature grid, 3-col listing grid, horizontal nav | ✅ Pass |
| 3.2 | 768px (tablet boundary) | Nav collapses to hamburger; grids collapse to 2-col | ✅ Pass |
| 3.3 | 480px (mobile boundary) | Grids collapse to 1-col; hero text scales down | ✅ Pass |
| 3.4 | 375px (iPhone SE) | No clipping, all content readable, buttons full-width | ✅ Pass |
| 3.5 | 320px (minimum) | Content not cut off, no horizontal scroll | ✅ Pass |

---

## 4. Navigation & Link Behaviour `[REQUIRED]`

| # | Check | Expected | First Pass |
|---|-------|---------|------------|
| 4.1 | Logo link navigates to `/` | Page scroll to top | ✅ Pass |
| 4.2 | `#features` anchor scrolls to Features section | Smooth scroll | ✅ Pass |
| 4.3 | `#listings` anchor scrolls to Listings section | Smooth scroll | ✅ Pass |
| 4.4 | `#about` anchor scrolls to CTA banner | Smooth scroll | ✅ Pass |
| 4.5 | Hamburger toggle opens nav menu on mobile | `aria-expanded` flips; menu appears | ✅ Pass |
| 4.6 | Nav link click closes hamburger menu | `aria-expanded` resets; menu hides | ✅ Pass |
| 4.7 | `Escape` key closes open mobile menu and returns focus to toggle | Focus returns to hamburger button | ✅ Pass |
| 4.8 | All external links have `rel="noopener noreferrer"` | Inspect link elements in source | ✅ Pass |
| 4.9 | Footer GitHub/Company/Privacy/Terms links are present and non-broken | Visual + hover check | ✅ Pass (placeholder URLs — must replace per deployment) |
| 4.10 | Listing card "View listing →" links have `aria-label` attributes | Inspect in DevTools | ✅ Pass |
| 4.11 | Tab order is logical — skip link → logo → nav → main → footer | Tab through entire page | ✅ Pass |

---

## 5. Netlify Build & Deploy `[REQUIRED]`

| # | Check | Expected | First Pass |
|---|-------|---------|------------|
| 5.1 | `netlify.toml` present and valid | `[build]`, `[[redirects]]`, `[[headers]]` sections | ✅ Pass |
| 5.2 | SPA fallback redirect configured (`/* → /index.html, 200`) | Navigating to any deep URL returns 200 | ✅ Pass |
| 5.3 | Security headers set: `X-Frame-Options`, `X-Content-Type-Options`, `CSP`, `Referrer-Policy`, `Permissions-Policy` | Verified in `netlify.toml` | ✅ Pass |
| 5.4 | Hashed asset cache headers set (`max-age=31536000, immutable` for `/assets/*`) | Verified in `netlify.toml` | ✅ Pass |
| 5.5 | `NODE_VERSION = "20"` set in `[build.environment]` | Verified in `netlify.toml` | ✅ Pass |
| 5.6 | Branch deploy context configured (`develop` → ephemeral URL) | `[context.branch-deploy]` present | ✅ Pass |
| 5.7 | Deploy preview context configured (PRs get preview URLs) | `[context.deploy-preview]` present | ✅ Pass |
| 5.8 | GitHub Actions CI passes (`Build & lint` job) | All steps green on push/PR | ✅ Pass (workflow validated on `develop` and `main`) |

---

## 6. Lighthouse Score Targets `[REQUIRED]`

Targets enforced by `.github/lighthouse-budget.json` on every PR.

| Category | Target | Error threshold | First Pass (local estimate) |
|----------|--------|-----------------|-----------------------------|
| Performance | ≥ 90 | Error if < 90 | ✅ Expected >95 — static HTML, minimal JS, no render-blocking resources |
| Accessibility | ≥ 90 | Warn if < 90 | ✅ Expected >95 — ARIA labels, skip link, semantic HTML, keyboard nav |
| Best Practices | ≥ 90 | Warn if < 90 | ✅ Expected >90 — CSP headers, no console errors, HTTPS |
| SEO | ≥ 95 | Error if < 95 | ✅ Expected >95 — title, meta description, OG tags, robots meta, semantic headings |

> **Note:** First-pass scores are local estimates based on static analysis. Actual Lighthouse CI scores will be produced on the first PR against `develop` → `main` via the `treosh/lighthouse-ci-action@v11` workflow step.

---

## 7. Accessibility Spot-checks `[RECOMMENDED]`

| # | Check | Expected | First Pass |
|---|-------|---------|------------|
| 7.1 | All images and SVG icons have `aria-hidden="true"` or meaningful `alt` | Decorative SVGs are hidden from AT | ✅ Pass |
| 7.2 | All interactive elements are keyboard-reachable | Tab/Enter/Space activate buttons and links | ✅ Pass |
| 7.3 | Focus rings visible on all interactive elements | `outline` style applied via `:focus-visible` | ✅ Pass |
| 7.4 | Colour contrast ratio ≥ 4.5:1 for body text | Muted text `#8080a0` on `#0d0d14` ≈ 4.6:1 | ✅ Pass (borderline — monitor) |
| 7.5 | Page `lang` attribute set | `<html lang="en">` | ✅ Pass |

---

## 8. Per-Deployment Replacement Checklist `[REQUIRED on each deploy]`

These are template placeholders that **must** be swapped before going live.

- [ ] `<title>` — replace "Nightframe — Production-Ready Site Template"
- [ ] `<meta name="description">` — replace with site-specific copy
- [ ] `<meta property="og:title">` and `<meta property="og:description">` — update OG tags
- [ ] `<meta name="twitter:title">` and `<meta name="twitter:description">` — update Twitter card
- [ ] Hero H1 and subtitle copy
- [ ] Hero CTA `href` (GitHub link → real destination)
- [ ] Feature card titles and text (6 cards)
- [ ] Listing card titles, categories, and `href` values (3 cards, replace `#` with real URLs)
- [ ] CTA banner heading and body text
- [ ] Footer GitHub link — update to deployment repo
- [ ] Footer `glojo.ai`, `glojo.ai/privacy`, `glojo.ai/terms` — replace with client links
- [ ] Lighthouse CI `budgetPath` thresholds — review if site adds fonts, images, or scripts

---

## Regression Protocol

1. Run this checklist in full after any change to `index.html`, `src/style.css`, `src/main.js`, `netlify.toml`, or `.github/workflows/ci.yml`.
2. Record pass/fail per section, date, and reviewer in a comment on the relevant PR.
3. Any `[REQUIRED]` failure blocks merge to `main`.
4. Lighthouse failures (`categories:performance < 0.9` or `categories:seo < 0.95`) are CI-enforced errors and will block the PR automatically.
5. Post Lighthouse report URL in the PR description for every deploy preview.
