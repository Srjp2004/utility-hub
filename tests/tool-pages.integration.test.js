const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

test("all tool pages are wired, indexable, and listed in the sitemap", () => {
  const toolsDir = path.join(process.cwd(), "tools");
  const pages = fs.readdirSync(toolsDir).filter((name) => name.endsWith(".html")).sort();
  const sitemap = fs.readFileSync("sitemap.xml", "utf8");
  const renderer = fs.readFileSync("tool-pages.js", "utf8");
  assert.equal(pages.length, 27);

  for (const page of pages) {
    const source = fs.readFileSync(path.join(toolsDir, page), "utf8");
    const match = source.match(/renderTool\("([^"]+)","tool"\)/);
    assert.ok(match, page + " must call renderTool");
    assert.ok(source.includes('<div id="tool">'), page + " must have a tool mount");
    assert.ok(source.includes("tool-pages.js"), page + " must load the shared renderer");
    assert.ok(source.includes('<meta name="description"'), page + " must have a description");
    assert.ok(source.includes('<link rel="canonical"'), page + " must have a canonical");
    assert.ok(source.includes('<meta name="robots" content="index,follow"'), page + " must be indexable");
    assert.ok(sitemap.includes("tools/" + page), page + " must be in sitemap.xml");
    assert.ok(renderer.includes(match[1] + ":"), page + " references an unknown renderer type");
  }
});
