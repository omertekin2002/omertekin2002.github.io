#!/usr/bin/env node
// Checks that every internal reference on the site resolves:
// local href/src targets, same-page #fragments (including SVG <use>),
// web manifest icons, sitemap <loc> entries and the robots.txt Sitemap line.
// External URLs are skipped, never fetched. No dependencies.
//
// Usage: node scripts/check-links.mjs [site-root]

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

export const SITE_ORIGIN = "https://omertekin2002.github.io";

const TAG_RE = /<([a-zA-Z][\w:-]*)((?:\s+[^\s"'>/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'>]+))?)*)\s*\/?>/g;
const ATTR_RE = /([^\s"'>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'>]+)))?/g;
const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'" };

function decodeEntities(value) {
  return value.replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, name) => {
    if (name[0] === "#") {
      const code = name[1].toLowerCase() === "x" ? parseInt(name.slice(2), 16) : parseInt(name.slice(1), 10);
      return String.fromCodePoint(code);
    }
    return ENTITIES[name.toLowerCase()] ?? match;
  });
}

// Blank out comments and raw-text element bodies, keeping offsets (and so line numbers) intact.
function maskNonMarkup(html) {
  const blank = (match) => match.replace(/[^\n]/g, " ");
  return html
    .replace(/<!--[\s\S]*?-->/g, blank)
    .replace(/(<(script|style)\b[^>]*>)([\s\S]*?)(<\/\2\s*>)/gi, (m, open, _tag, body, close) => open + blank(body) + close);
}

export function parseTags(html) {
  const source = maskNonMarkup(html);
  const tags = [];
  for (const match of source.matchAll(TAG_RE)) {
    const attrs = new Map();
    for (const attr of (match[2] ?? "").matchAll(ATTR_RE)) {
      const raw = attr[2] ?? attr[3] ?? attr[4] ?? "";
      attrs.set(attr[1].toLowerCase(), decodeEntities(raw));
    }
    const line = source.slice(0, match.index).split("\n").length;
    tags.push({ name: match[1].toLowerCase(), attrs, line });
  }
  return tags;
}

function isExternal(url) {
  return /^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith("//");
}

function splitUrl(url) {
  const hashAt = url.indexOf("#");
  const fragment = hashAt === -1 ? null : url.slice(hashAt + 1);
  const beforeHash = hashAt === -1 ? url : url.slice(0, hashAt);
  const queryAt = beforeHash.indexOf("?");
  return { pathname: queryAt === -1 ? beforeHash : beforeHash.slice(0, queryAt), fragment };
}

function listTrackedFiles(root) {
  try {
    const out = execFileSync("git", ["ls-files", "-z"], { cwd: root, encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] });
    return new Set(out.split("\0").filter(Boolean));
  } catch {
    return null;
  }
}

/**
 * Check a site directory. Returns `problems`, one human-readable line per broken reference
 * (empty when everything resolves), and `checked`, the number of references looked at.
 *
 * @param {string} root site root directory
 * @param {object} [options]
 * @param {string[]} [options.pages] HTML pages to scan, relative to root
 * @param {string} [options.origin] the site's public origin, for sitemap and robots URLs
 * @param {Set<string> | null} [options.trackedFiles] if set, files must also be in this set (POSIX paths relative to root)
 */
export function checkSite(root, { pages = ["index.html"], origin = SITE_ORIGIN, trackedFiles = null } = {}) {
  const problems = [];
  let checked = 0;

  const fileExists = (rel) => {
    const abs = path.join(root, rel);
    return existsSync(abs) && statSync(abs).isFile() && (!trackedFiles || trackedFiles.has(rel));
  };

  // Map a URL path to the repo file that would serve it, or null if nothing would.
  const resolveLocal = (pathname, fromFile) => {
    let decoded;
    try {
      decoded = decodeURIComponent(pathname);
    } catch {
      return { file: null, reason: "is not a valid URL path" };
    }
    const base = decoded.startsWith("/") ? "/" : path.posix.dirname("/" + fromFile);
    const target = path.posix.resolve(base, decoded);
    let rel = target.slice(1);
    if (rel === "" || decoded.endsWith("/")) rel = path.posix.join(rel, "index.html");
    else if (!fileExists(rel) && fileExists(path.posix.join(rel, "index.html"))) rel = path.posix.join(rel, "index.html");
    else if (!fileExists(rel) && fileExists(rel + ".html")) rel += ".html";
    return fileExists(rel) ? { file: rel } : { file: null, reason: `no such ${trackedFiles ? "tracked " : ""}file: ${rel}` };
  };

  const checkLocal = (where, label, url, fromFile) => {
    checked += 1;
    const { pathname } = splitUrl(url);
    if (pathname === "") return null;
    const result = resolveLocal(pathname, fromFile);
    if (!result.file) problems.push(`${where}: ${label} ${result.reason}`);
    return result.file;
  };

  const checkSiteUrl = (where, label, url) => {
    checked += 1;
    if (!url.startsWith(origin + "/")) {
      problems.push(`${where}: ${label} is not on ${origin}/`);
      return;
    }
    const { pathname } = splitUrl(url.slice(origin.length));
    const result = resolveLocal(pathname, "index.html");
    if (!result.file) problems.push(`${where}: ${label} ${result.reason}`);
  };

  for (const page of pages) {
    if (!fileExists(page)) {
      problems.push(`${page}: page not found`);
      continue;
    }
    const tags = parseTags(readFileSync(path.join(root, page), "utf8"));
    const ids = new Set(tags.filter((tag) => tag.attrs.has("id")).map((tag) => tag.attrs.get("id")));

    for (const tag of tags) {
      for (const attr of ["href", "src", "xlink:href"]) {
        const url = tag.attrs.get(attr)?.trim();
        if (url === undefined || isExternal(url)) continue;
        const where = `${page}:${tag.line}`;
        const label = `<${tag.name} ${attr}="${url}">`;

        if (url.startsWith("#")) {
          checked += 1;
          let id = url.slice(1);
          try {
            id = decodeURIComponent(id);
          } catch {}
          if (id !== "" && !ids.has(id)) problems.push(`${where}: ${label} points at a missing id "${id}"`);
          continue;
        }

        const file = checkLocal(where, label, url, page);
        const isManifest = tag.name === "link" && /(^|\s)manifest(\s|$)/i.test(tag.attrs.get("rel") ?? "");
        if (file && isManifest) checkManifest(file);
      }
    }
  }

  function checkManifest(file) {
    let manifest;
    try {
      manifest = JSON.parse(readFileSync(path.join(root, file), "utf8"));
    } catch (error) {
      problems.push(`${file}: is not valid JSON (${error.message})`);
      return;
    }
    for (const [i, icon] of (manifest.icons ?? []).entries()) {
      const src = typeof icon?.src === "string" ? icon.src.trim() : "";
      if (src === "") problems.push(`${file}: icons[${i}] has no src`);
      else if (!isExternal(src)) checkLocal(file, `icons[${i}].src "${src}"`, src, file);
    }
  }

  if (fileExists("sitemap.xml")) {
    const xml = readFileSync(path.join(root, "sitemap.xml"), "utf8");
    for (const match of xml.matchAll(/<loc>\s*([\s\S]*?)\s*<\/loc>/g)) {
      const line = xml.slice(0, match.index).split("\n").length;
      const url = decodeEntities(match[1]);
      checkSiteUrl(`sitemap.xml:${line}`, `<loc>${url}</loc>`, url);
    }
  }

  if (fileExists("robots.txt")) {
    const lines = readFileSync(path.join(root, "robots.txt"), "utf8").split("\n");
    lines.forEach((text, i) => {
      const match = /^\s*sitemap\s*:\s*(\S+)/i.exec(text);
      if (match) checkSiteUrl(`robots.txt:${i + 1}`, `Sitemap: ${match[1]}`, match[1]);
    });
  }

  return { problems, checked };
}

function main() {
  const scriptDir = path.dirname(fileURLToPath(import.meta.url));
  const root = path.resolve(process.argv[2] ?? path.join(scriptDir, ".."));
  const { problems, checked } = checkSite(root, { trackedFiles: listTrackedFiles(root) });
  if (problems.length > 0) {
    console.error(`check-links: ${problems.length} broken reference${problems.length === 1 ? "" : "s"}:`);
    for (const problem of problems) console.error(`  ${problem}`);
    process.exit(1);
  }
  console.log(`check-links: OK, ${checked} internal references resolve`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
