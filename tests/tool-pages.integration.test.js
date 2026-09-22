const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("all tool pages are wired, indexable, and listed in the sitemap", () => {
  const toolsDir = path.join(process.cwd(), "tools");
  const pages = fs.readdirSync(toolsDir).filter((name) => name.endsWith(".html")).sort();
  const sitemap = fs.readFileSync("sitemap.xml", "utf8");
  const renderer = fs.readFileSync("tool-pages.js", "utf8");
  assert.equal(pages.length, 28);

  for (const page of pages) {
    const source = fs.readFileSync(path.join(toolsDir, page), "utf8");
    const match = source.match(/renderTool\(\s*"([^"]+)"\s*,\s*"tool"\s*\)/);
    assert.ok(match, page + " must call renderTool");
    assert.match(source, /id=["']tool["']/, page + " must have a tool mount");
    assert.ok(source.includes("tool-pages.js"), page + " must load the shared renderer");
    assert.ok(source.includes('<meta name="description"'), page + " must have a description");
    assert.ok(source.includes('<meta property="og:type"'), page + " must have Open Graph type metadata");
    assert.ok(source.includes('<meta property="og:title"'), page + " must have Open Graph title metadata");
    assert.ok(source.includes('<meta property="og:description"'), page + " must have Open Graph description metadata");
    assert.ok(source.includes('<meta name="twitter:card"'), page + " must have Twitter card metadata");
    assert.ok(source.includes('<meta name="twitter:title"'), page + " must have Twitter title metadata");
    assert.ok(source.includes('<meta name="twitter:description"'), page + " must have Twitter description metadata");
    assert.ok(source.includes('<link rel="canonical"'), page + " must have a canonical");
    assert.ok(source.includes('<meta name="robots" content="index,follow"'), page + " must be indexable");
    assert.ok(sitemap.includes("tools/" + page), page + " must be in sitemap.xml");
    const rendererKey = new RegExp("[\\\"\']?" + match[1] + "[\\\"\']?\\s*:");
    assert.match(renderer, rendererKey, page + " references an unknown renderer type");
  }
});


test("tool directory links resolve and directory SEO metadata is present", () => {
  const toolsPage = fs.readFileSync("tools.html", "utf8");
  const toolsDir = path.join(process.cwd(), "tools");
  const pages = new Set(fs.readdirSync(toolsDir).filter((name) => name.endsWith(".html")));
  const links = [...toolsPage.matchAll(/href="(tools\/[^"]+\.html)"/g)].map((m) => m[1].slice("tools/".length));

  assert.equal(new Set(links).size, links.length, "tools.html must not contain duplicate tool links");
  for (const page of links) {
    assert.ok(pages.has(page), "tools.html links to missing tool page: " + page);
  }
  assert.match(toolsPage, /<meta name="robots" content="index,follow"/, "tools.html must be indexable");
  assert.match(toolsPage, /<link rel="canonical" href="\/tools\.html">/, "tools.html must have a canonical");
});


test("homepage popular tool links resolve and avoid modal-only navigation", () => {
  const home = fs.readFileSync("index.html", "utf8");
  const toolsDir = path.join(process.cwd(), "tools");
  const pages = new Set(fs.readdirSync(toolsDir).filter((name) => name.endsWith(".html")));
  const hrefs = [...home.matchAll(/href="(tools\/[^"]+\.html)"/g)].map((m) => m[1].slice("tools/".length));
  assert.ok(hrefs.length >= 10, "homepage should expose crawlable popular tool links");
  for (const page of hrefs) {
    assert.ok(pages.has(page), "index.html links to missing tool page: " + page);
  }
  assert.doesNotMatch(home, /onclick="tool\('(convert|tip|bmi|date)'\)"/, "popular tools should navigate to dedicated pages");
});
test("sitemap contains unique valid URLs that map to existing HTML pages", () => {
  const sitemap = fs.readFileSync("sitemap.xml", "utf8");
  const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  assert.ok(locs.length > 0, "sitemap must contain at least one URL");
  assert.equal(new Set(locs).size, locs.length, "sitemap must not contain duplicate URLs");

  for (const loc of locs) {
    let parsed;
    try {
      parsed = new URL(loc, "https://utility-hub.test");
    } catch {
      assert.fail("sitemap contains an invalid URL: " + loc);
    }

    assert.ok(parsed.protocol === "https:" || parsed.protocol === "http:", "sitemap URL must use HTTP(S): " + loc);
    const pathname = decodeURIComponent(parsed.pathname);
    assert.ok(pathname.startsWith("/"), "sitemap URL must resolve to an absolute path: " + loc);
    const relative = pathname.slice(1);
    const target = relative === "" ? "index.html" : relative;
    assert.ok(fs.existsSync(target), "sitemap points to missing file: " + loc);
  }
});
