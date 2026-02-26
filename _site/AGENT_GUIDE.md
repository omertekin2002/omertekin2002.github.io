# Agent Setup Guide

This document is intended for future AI agents or developers who need to work on this static site.

## Overview

This is a plain static HTML/CSS/JS site — no build tools, no dependencies. The single `index.html` file is the entire site.

## Running Locally

To preview the site locally, run this from the project root:

```bash
python3 -m http.server 4000
```

The site will be available at `http://127.0.0.1:4000/`. Press `Ctrl+C` to stop.

## Deployment

The site is deployed to GitHub Pages via `.github/workflows/deploy.yml`. On push to `main` or `Design-Experiments-Yeniden`, the workflow uploads the repo contents directly as a Pages artifact — no build step required.

## Project Structure

- `index.html` — The full site (single page)
- `assets/css/main.css` — Styles
- `assets/js/` — JavaScript files (theme toggle, mobile nav, clipboard, geometric float, kinetic type)
- `assets/img/` — Images (social icons, etc.)
- `favicon.*` — Favicon files
- `robots.txt` / `sitemap.xml` — SEO files
