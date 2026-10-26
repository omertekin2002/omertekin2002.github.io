import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { after, describe, it } from "node:test";
import { fileURLToPath } from "node:url";

import { checkSite, parseTags } from "./check-links.mjs";

const SCRIPT = fileURLToPath(new URL("./check-links.mjs", import.meta.url));
const ORIGIN = "https://omertekin2002.github.io";

const tempRoots = [];
after(() => {
  for (const root of tempRoots) rmSync(root, { recursive: true, force: true });
});

// Write a tiny site into a fresh temp directory. `files` maps relative paths to contents.
function makeSite(files) {
  const root = mkdtempSync(path.join(tmpdir(), "check-links-"));
  tempRoots.push(root);
  for (const [rel, content] of Object.entries(files)) {
    mkdirSync(path.dirname(path.join(root, rel)), { recursive: true });
    writeFileSync(path.join(root, rel), content);
  }
  return root;
}

const PAGE = `<!DOCTYPE html>
<html lang="en">
<head>
  <link rel="icon" href="/favicon.ico?v=8" />
  <link rel="manifest" href="/assets/site.webmanifest" />
  <link rel="stylesheet" href="/assets/css/main.css">
  <link rel="canonical" href="${ORIGIN}/" />
</head>
<body>
  <svg width="0" height="0"><symbol id="i-doc"></symbol></svg>
  <div id="top">
    <a href="#top">home</a>
    <a href="#contact">contact</a>
    <a href="#">top</a>
    <a href="${ORIGIN}/resume/" target="_blank">CV</a>
    <a href="https://www.linkedin.com/in/example">LinkedIn</a>
    <a href="mailto:someone@example.com">mail</a>
    <svg><use href="#i-doc"/></svg>
    <img src="assets/img/logo.svg" alt="">
    <iframe src="https://forms.office.com/Pages/ResponsePage.aspx?id=x&amp;embed=true" title="form"></iframe>
    <!-- <a href="/commented-out.css">ignored</a> -->
    <section id="contact"></section>
  </div>
  <script src="/assets/js/app.js"></script>
</body>
</html>
`;

const MANIFEST = JSON.stringify({
  icons: [{ src: "/assets/icon-192.png?v=8" }, { src: "icon-512.png" }],
});

const GOOD_SITE = {
  "index.html": PAGE,
  "favicon.ico": "",
  "assets/site.webmanifest": MANIFEST,
  "assets/css/main.css": "",
  "assets/img/logo.svg": "",
  "assets/js/app.js": "",
  "assets/icon-192.png": "",
  "assets/icon-512.png": "",
  "sitemap.xml": `<?xml version="1.0" encoding="UTF-8"?>\n<urlset><url><loc>${ORIGIN}/</loc></url></urlset>\n`,
  "robots.txt": `User-agent: *\nAllow: /\n\nSitemap: ${ORIGIN}/sitemap.xml\n`,
};

function siteWith(overrides) {
  const files = { ...GOOD_SITE, ...overrides };
  for (const [rel, content] of Object.entries(overrides)) if (content === null) delete files[rel];
  return makeSite(files);
}

describe("checkSite", () => {
  it("passes a page whose references all resolve, skipping external URLs", () => {
    const { problems, checked } = checkSite(makeSite(GOOD_SITE));
    assert.deepEqual(problems, []);
    assert.ok(checked >= 12, `expected the fixture's references to be checked, got ${checked}`);
  });

  it("reports a missing root-absolute asset, naming it", () => {
    const { problems } = checkSite(siteWith({ "assets/css/main.css": null }));
    assert.equal(problems.length, 1);
    assert.match(problems[0], /^index\.html:6: <link href="\/assets\/css\/main\.css"> no such file: assets\/css\/main\.css$/);
  });

  it("reports a missing relative asset and a missing script", () => {
    const { problems } = checkSite(siteWith({ "assets/img/logo.svg": null, "assets/js/app.js": null }));
    assert.equal(problems.length, 2);
    assert.match(problems[0], /<img src="assets\/img\/logo\.svg"> no such file: assets\/img\/logo\.svg/);
    assert.match(problems[1], /<script src="\/assets\/js\/app\.js"> no such file: assets\/js\/app\.js/);
  });

  it("reports a dangling fragment link", () => {
    const { problems } = checkSite(siteWith({ "index.html": PAGE.replace('href="#contact"', 'href="#contactx"') }));
    assert.deepEqual(problems, ['index.html:13: <a href="#contactx"> points at a missing id "contactx"']);
  });

  it("reports an SVG <use> pointing at a missing symbol", () => {
    const { problems } = checkSite(siteWith({ "index.html": PAGE.replace('<use href="#i-doc"/>', '<use href="#i-nope"/>') }));
    assert.deepEqual(problems, ['index.html:18: <use href="#i-nope"> points at a missing id "i-nope"']);
  });

  it("checks legacy xlink:href too", () => {
    const { problems } = checkSite(siteWith({ "index.html": PAGE.replace('<use href="#i-doc"/>', '<use xlink:href="#i-gone"/>') }));
    assert.deepEqual(problems, ['index.html:18: <use xlink:href="#i-gone"> points at a missing id "i-gone"']);
  });

  it("reports a missing manifest icon, resolving src against the manifest", () => {
    const { problems } = checkSite(siteWith({ "assets/icon-512.png": null }));
    assert.deepEqual(problems, ['assets/site.webmanifest: icons[1].src "icon-512.png" no such file: assets/icon-512.png']);
  });

  it("reports a manifest that is not valid JSON", () => {
    const { problems } = checkSite(siteWith({ "assets/site.webmanifest": "{ nope" }));
    assert.equal(problems.length, 1);
    assert.match(problems[0], /^assets\/site\.webmanifest: is not valid JSON/);
  });

  it("reports sitemap entries that are off-site or have no page in the repo", () => {
    const sitemap = `<urlset>\n<url><loc>${ORIGIN}/</loc></url>\n<url><loc>${ORIGIN}/missing/</loc></url>\n<url><loc>https://example.com/</loc></url>\n</urlset>\n`;
    const { problems } = checkSite(siteWith({ "sitemap.xml": sitemap }));
    assert.deepEqual(problems, [
      `sitemap.xml:3: <loc>${ORIGIN}/missing/</loc> no such file: missing/index.html`,
      `sitemap.xml:4: <loc>https://example.com/</loc> is not on ${ORIGIN}/`,
    ]);
  });

  it("reports a robots.txt Sitemap line that does not resolve", () => {
    const { problems } = checkSite(siteWith({ "sitemap.xml": null }));
    assert.deepEqual(problems, [`robots.txt:4: Sitemap: ${ORIGIN}/sitemap.xml no such file: sitemap.xml`]);
  });

  it("requires files to be tracked when a tracked-file list is given", () => {
    const tracked = new Set(Object.keys(GOOD_SITE).filter((rel) => rel !== "assets/js/app.js"));
    const { problems } = checkSite(makeSite(GOOD_SITE), { trackedFiles: tracked });
    assert.deepEqual(problems, ['index.html:24: <script src="/assets/js/app.js"> no such tracked file: assets/js/app.js']);
  });
});

describe("parseTags", () => {
  it("ignores tags inside comments and decodes entities in attribute values", () => {
    const tags = parseTags('<!-- <a href="/x"> -->\n<a href="/a?x=1&amp;y=2" id=\'k\'>');
    assert.equal(tags.length, 1);
    assert.equal(tags[0].attrs.get("href"), "/a?x=1&y=2");
    assert.equal(tags[0].attrs.get("id"), "k");
    assert.equal(tags[0].line, 2);
  });
});

describe("check-links CLI", () => {
  it("exits 0 on a good site", () => {
    const run = spawnSync(process.execPath, [SCRIPT, makeSite(GOOD_SITE)], { encoding: "utf8" });
    assert.equal(run.status, 0, run.stderr);
    assert.match(run.stdout, /check-links: OK/);
  });

  it("exits 1 and names the broken reference", () => {
    const run = spawnSync(process.execPath, [SCRIPT, siteWith({ "assets/css/main.css": null })], { encoding: "utf8" });
    assert.equal(run.status, 1);
    assert.match(run.stderr, /1 broken reference:/);
    assert.match(run.stderr, /assets\/css\/main\.css/);
  });
});
