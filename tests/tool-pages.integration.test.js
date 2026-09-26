const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("all tool pages are wired, indexable, and listed in the sitemap", () => {
  const toolsDir = path.join(process.cwd(), "tools");
  const pages = fs.readdirSync(toolsDir).filter((name) => name.endsWith(".html")).sort();
  const sitemap = fs.readFileSync("sitemap.xml", "utf8");
  const renderer = fs.readFileSync("tool-pages.js", "utf8");
  const bootstrap = fs.readFileSync("tool-page-init.js", "utf8");
  assert.equal(pages.length, 28);

  for (const page of pages) {
    const source = fs.readFileSync(path.join(toolsDir, page), "utf8");
    const mapping = new RegExp('"'+page+'"\\s*:\\s*"([^"]+)"');
    const match = bootstrap.match(mapping);
    assert.ok(match, page + " must have an external renderTool mapping");
    assert.match(source, /id=["']tool["']/, page + " must have a tool mount");
    assert.ok(source.includes("tool-pages.js"), page + " must load the shared renderer");
    assert.ok(source.includes('<meta name="description"'), page + " must have a description");
    assert.ok(source.includes('<meta property="og:type"'), page + " must have Open Graph type metadata");
    assert.equal((source.match(/<meta property="og:type"/g) || []).length, 1, page + " must have exactly one Open Graph type metadata tag");
    assert.equal((source.match(/<meta property="og:title"/g) || []).length, 1, page + " must have exactly one Open Graph title metadata tag");
    assert.equal((source.match(/<meta property="og:description"/g) || []).length, 1, page + " must have exactly one Open Graph description metadata tag");
    assert.equal((source.match(/<meta name="twitter:card"/g) || []).length, 1, page + " must have exactly one Twitter card metadata tag");
    assert.equal((source.match(/<meta name="twitter:title"/g) || []).length, 1, page + " must have exactly one Twitter title metadata tag");
    assert.equal((source.match(/<meta name="twitter:description"/g) || []).length, 1, page + " must have exactly one Twitter description metadata tag");
    assert.ok(source.includes('<meta property="og:title"'), page + " must have Open Graph title metadata");
    assert.ok(source.includes('<meta property="og:description"'), page + " must have Open Graph description metadata");
    assert.ok(source.includes('<meta name="twitter:card"'), page + " must have Twitter card metadata");
    assert.ok(source.includes('<meta name="twitter:title"'), page + " must have Twitter title metadata");
    assert.ok(source.includes('<meta name="twitter:description"'), page + " must have Twitter description metadata");
    assert.ok(source.includes('type="application/ld+json"'), page + " must have WebApplication structured data");
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

test("production UI code contains no inline event handlers", () => {
  const productionFiles = [
    "index.html",
    "app.js",
    "tool-pages.js",
    ...fs.readdirSync(path.join(process.cwd(), "tools")).filter((name) => name.endsWith(".html")).map((name) => path.join("tools", name))
  ];
  for (const file of productionFiles) {
    const source = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(source, /\bon[a-z]+\s*=\s*["']/i, file + " must not contain inline event handlers");
  }
});


test("tools directory script is CSP-compatible and externally loaded", () => {
  const toolsPage = fs.readFileSync("tools.html", "utf8");
  assert.ok(toolsPage.includes('<script src="tools-directory.js"></script>'));
  assert.equal(toolsPage.includes("<script>"), false);
  assert.doesNotMatch(toolsPage, /\\bon[a-z]+\\s*=\\s*["']/i);
  assert.ok(fs.existsSync("tools-directory.js"));
});


test("tool pages use CSP-compatible external bootstrap scripts", () => {
  const toolsDir = path.join(process.cwd(), "tools");
  const pages = fs.readdirSync(toolsDir).filter((name) => name.endsWith(".html"));
  const bootstrap = fs.readFileSync("tool-page-init.js", "utf8");
  assert.ok(bootstrap.includes("window.location.pathname"), "tool bootstrap must select the page from the current pathname");
  for (const page of pages) {
    const source = fs.readFileSync(path.join(toolsDir, page), "utf8");
    assert.ok(source.includes('<script src="../tool-page-init.js"'), page + " must load the external tool bootstrap");
    assert.equal(source.includes("<script>renderTool("), false, page + " must not use an inline renderTool bootstrap");
  }
});
test("tool bootstrap has exactly one mapping per published page", () => {
  const toolsDir = path.join(process.cwd(), "tools");
  const pages = fs.readdirSync(toolsDir).filter((name) => name.endsWith(".html")).sort();
  const bootstrap = fs.readFileSync("tool-page-init.js", "utf8");
  const entries = [...bootstrap.matchAll(/"([^"]+\.html)"\s*:\s*"([^"]+)"/g)];
  assert.equal(entries.length, pages.length, "tool bootstrap mapping count must match published page count");
  assert.deepEqual(entries.map((m) => m[1]).sort(), pages, "tool bootstrap must map exactly the published pages");
  const rendererNames = entries.map((m) => m[2]);
  assert.equal(new Set(rendererNames).size, rendererNames.length, "each published page must map to a distinct renderer type");
});

test("every mapped renderer is registered in the shared renderer", () => {
  const renderer = fs.readFileSync("tool-pages.js", "utf8");
  const bootstrap = fs.readFileSync("tool-page-init.js", "utf8");
  const entries = [...bootstrap.matchAll(/"([^"]+\\.html)"\\s*:\\s*"([^"]+)"/g)];
  for (const [, page, rendererName] of entries) {
    const escaped = rendererName.replace(/[.*+?^${}()|[\\]\\\\]/g, "\\\\$&");
    assert.match(renderer, new RegExp("\\b" + escaped + "\\s*:"), page + " must reference a registered renderer view");
  }
});


test("percentage change page closes its main content section before Related Tools", () => {
  const source = fs.readFileSync(path.join("tools", "percentage-change-calculator.html"), "utf8");
  const related = source.indexOf('<h2>Related tools</h2>');
  assert.ok(related > 0, "percentage change page must have Related Tools");
  const relatedSection = source.lastIndexOf('<section class="content-section">', related);
  assert.ok(relatedSection > 0, "Related Tools must be inside its own content section");
  assert.match(source.slice(0, relatedSection), /<\/section>\s*$/);
});


test("homepage has no retired modal implementation", () => {
  const home = fs.readFileSync("index.html", "utf8");
  assert.doesNotMatch(home, /id=["']modal["']/);
  assert.doesNotMatch(home, /data-action=["']closeTool["']/);
  assert.doesNotMatch(fs.readFileSync("app.js", "utf8"), /function\s+(?:tool|closeTool|calcPercentage|calcDiscount|calcLoan)/);
  assert.equal(fs.existsSync("tool-enhancements.js"), false);
});

test("published tool pages do not reference removed tool-enhancements module", () => {
  const toolsDir = path.join(process.cwd(), "tools");
  const pages = fs.readdirSync(toolsDir).filter((name) => name.endsWith(".html")).sort();
  for (const page of pages) {
    const source = fs.readFileSync(path.join(toolsDir, page), "utf8");
    assert.doesNotMatch(source, /tool-enhancements\\.js/, page + " must not reference the deleted tool-enhancements module");
  }
});

test("public trust pages expose current contact and policy surfaces", () => {
  const expectations = {
    "about.html": ["About UtilityHub", "Privacy-aware", "Contact"],
    "privacy.html": ["Privacy Policy", "utilityhub.support@gmail.com", "Cookies, analytics and advertising"],
    "terms.html": ["Terms of Use", "utilityhub.support@gmail.com", "Acceptable use"],
    "contact.html": ["Contact UtilityHub", "utilityhub.help@gmail.com", "utilityhub.support@gmail.com"]
  };
  for (const [page, markers] of Object.entries(expectations)) {
    const source = fs.readFileSync(path.join(process.cwd(), page), "utf8");
    for (const marker of markers) assert.ok(source.includes(marker), page + " must contain " + marker);
  }
});
