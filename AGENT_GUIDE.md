# Agent Setup Guide

This document is intended for future AI agents or developers who need to work on this static site.

## Overview

This is a plain static HTML/CSS/JS site — no build step and no runtime dependencies. The single `index.html` file is the entire site. The only dependency is `html-validate`, a dev-only tool used by the checks below.

## Running Locally

To preview the site locally, run this from the project root:

```bash
python3 -m http.server 4000
```

The site will be available at `http://127.0.0.1:4000/`. Press `Ctrl+C` to stop.

## Checks

Install the dev dependencies once, then run every check with one command from the project root:

```bash
bun install
bun run check
```

(`npm install && npm run check` works too.) `check` exits non-zero if any step fails. It runs:

1. **HTML validation:** `html-validate index.html`, with the rules in `.htmlvalidate.mjs` (`html-validate:recommended`; every rule that is changed or turned off has a comment saying why).
2. **Internal reference check:** `node scripts/check-links.mjs`. It fails, listing each broken reference with its file and line, if a local `href`/`src` in `index.html` doesn't resolve to a tracked file (query strings like `?v=8` are ignored), a same-page `#fragment` or SVG `<use href="#...">` has no matching `id`, an icon in `assets/site.webmanifest` is missing, or a `sitemap.xml` `<loc>` or the `robots.txt` `Sitemap:` line isn't on `https://omertekin2002.github.io/` or has no page in the repo. External URLs (LinkedIn, GitHub, Forms, `/resume/`, `/word-to-udf/`) are skipped, never fetched.
3. **Checker tests:** `node --test scripts/check-links.test.mjs`, which builds tiny fixture sites to prove the checker passes a good page and catches missing assets, dangling fragments and `<use>` ids, and missing manifest icons.

The tools need Node.js 22.22+ or 24.8+. CI runs the same `bun run check` on every pull request (any base branch) and on manual `workflow_dispatch`, via `.github/workflows/check.yml`.

## Deployment

The site is deployed to GitHub Pages via `.github/workflows/deploy.yml`. On push to `main` (or a manual `workflow_dispatch` run), the workflow uploads the repo contents directly as a Pages artifact — no build step required.

## Project Structure

- `index.html` — The full site (single page)
- `assets/css/main.css` — Styles
- `assets/js/clipboard.js` — Copy button for the `npx otekin` callout
- `assets/img/` — Images (social icons, etc.)
- `favicon.*` — Favicon files
- `robots.txt` / `sitemap.xml` — SEO files
- `package.json` / `bun.lock` — Dev-only check tooling (`bun run check`)
- `.htmlvalidate.mjs` — HTML validation rules
- `scripts/check-links.mjs` — Internal reference checker; `scripts/check-links.test.mjs` — its tests
- `.github/workflows/check.yml` — Pull-request checks; `.github/workflows/deploy.yml` — Pages deploy
