const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadTools(values) {
  const elements = Object.fromEntries(Object.entries(values).map(([id, value]) => [id, { value, innerHTML: "", textContent: "" }]));
  const context = { document: { getElementById: (id) => elements[id] }, console, Number, Math, Date, TextEncoder, TextDecoder, btoa, atob, setTimeout, clearTimeout };
  vm.createContext(context);
  const source = fs.readFileSync("tool-pages.js", "utf8");
  vm.runInContext(source, context, { filename: "tool-pages.js" });
  return { context, elements };
}

test("percentage calculator handles normal input", () => {
  const { context, elements } = loadTools({ part: "25", whole: "200", result: "" });
  context.calcPercentage();
  assert.match(elements.result.textContent, /12\.5%/);
});

test("percentage calculator rejects zero total", () => {
  const { context, elements } = loadTools({ part: "25", whole: "0", result: "" });
  context.calcPercentage();
  assert.equal(elements.result.textContent, "Total must not be zero.");
});

test("percentage calculator rejects arithmetic overflow", () => {
  const { context, elements } = loadTools({ part: "1.7976931348623157e308", whole: "5e-324", result: "" });
  context.calcPercentage();
  assert.equal(elements.result.textContent, "These values are too large for a reliable percentage.");
});

test("discount calculator calculates sale price", () => {
  const { context, elements } = loadTools({ price: "100", disc: "20", result: "" });
  context.calcDiscount();
  assert.match(elements.result.innerHTML, /Final price: 80/);
  assert.match(elements.result.innerHTML, /You save 20/);
});

test("discount calculator rejects arithmetic overflow", () => {
  const { context, elements } = loadTools({ price: "1.7976931348623157e308", disc: "99", result: "" });
  context.calcDiscount();
  assert.equal(elements.result.textContent, "These values are too large for a reliable discount result.");
});

test("loan calculator handles zero interest", () => {
  const { context, elements } = loadTools({ loanAmount: "1200", loanRate: "0", loanMonths: "12", result: "" });
  context.calcLoan();
  assert.match(elements.result.innerHTML, /100 per month/);
});

test("compound interest calculates final balance", () => {
  const { context, elements } = loadTools({ cp: "1000", cr: "12", cy: "1", cm: "12", result: "" });
  context.calcCompound();
  assert.match(elements.result.innerHTML, /Final balance: 1126\.83/);
});

test("break-even rejects non-positive contribution margin", () => {
  const { context, elements } = loadTools({ fixed: "5000", sell: "30", variable: "30", result: "" });
  context.calcBreakEven();
  assert.equal(elements.result.textContent, "Enter valid costs. Selling price must be greater than variable cost.");
});

test("ROI handles a loss", () => {
  const { context, elements } = loadTools({ inv: "1000", ret: "750", result: "" });
  context.calcRoi();
  assert.match(elements.result.innerHTML, /ROI: -25\.00%/);
});

test("text counter handles empty text", () => {
  const { context, elements } = loadTools({ tc: "", result: "" });
  context.calcText();
  assert.match(elements.result.innerHTML, /0 words/);
  assert.match(elements.result.innerHTML, /0 characters/);
});

test("unit converter rejects negative physical quantities", () => {
  const { context, elements } = loadTools({ uv: "-5", uf: "kg", ut: "lb", result: "" });
  context.calcConvert();
  assert.equal(elements.result.textContent, "Length and weight values cannot be negative.");
});

test("unit converter converts kilometers to miles", () => {
  const { context, elements } = loadTools({ uv: "1", uf: "km", ut: "mi", result: "" });
  context.calcConvert();
  assert.match(elements.result.innerHTML, /0\.62/);
});

test("invalid JSON is reported instead of throwing", () => {
  const { context, elements } = loadTools({ jsonInput: "{bad", result: "" });
  context.formatJson();
  assert.match(elements.result.textContent, /^Invalid JSON:/);
});


test("percentage change rejects zero original value", () => {
  const { context, elements } = loadTools({ oldv: "0", newv: "10", result: "" });
  context.calcChange();
  assert.equal(elements.result.textContent, "Enter valid values. Original value must not be zero.");
});

test("business days counts weekdays inclusively", () => {
  const { context, elements } = loadTools({ bdStart: "2026-09-14", bdEnd: "2026-09-18", result: "" });
  context.calcBusinessDays();
  assert.match(elements.result.innerHTML, /5 weekdays/);
});

test("base64 preserves Unicode text", () => {
  const { context, elements } = loadTools({ b64: "✓ café", result: "" });
  context.encodeBase64();
  assert.equal(elements.result.textContent, "4pyTIGNhZsOp");
  elements.b64.value = elements.result.textContent;
  context.decodeBase64();
  assert.equal(elements.result.textContent, "✓ café");
});


test("image resize chooses a filename extension matching the output MIME type", () => {
  const source = require("node:fs").readFileSync("tool-pages.js", "utf8");
  assert.ok(source.includes('const outputType=f.type==="image/png"?"image/png":"image/jpeg",extension=outputType==="image/png"?"png":"jpg";'), "image resize must derive output type and extension before encoding");
  assert.match(source, /downloadBlob\(b,"resized\."\+extension\)/);
});


test("image resize completes with a PNG output filename for PNG input", async () => {
  class FakeFile { constructor() { this.size = 100; this.type = "image/png"; } }
  class FakeImage {
    constructor() { this.naturalWidth = 100; this.naturalHeight = 50; }
    set src(_) { this.onload(); }
  }
  const elements = {
    resizeFile: { files: [new FakeFile()] },
    resizeWidth: { value: "200" },
    result: { innerHTML: "", textContent: "" }
  };
  let downloadedName = "";
  const context = {
    document: {
      getElementById: (id) => elements[id],
      body: { appendChild() {} },
      createElement: (tag) => tag === "canvas"
        ? {
            width: 0,
            height: 0,
            getContext: () => ({ drawImage() {} }),
            toBlob: (cb) => cb({ size: 1, type: "image/png" })
          }
        : {
            href: "",
            download: "",
            click() { downloadedName = this.download; },
            remove() {}
          }
    },
    console,
    Number,
    Math,
    Date,
    TextEncoder,
    TextDecoder,
    btoa,
    atob,
    setTimeout,
    clearTimeout,
    File: FakeFile,
    Image: FakeImage,
    URL: {
      createObjectURL: () => "blob:fake",
      revokeObjectURL() {}
    }
  };
  vm.createContext(context);
  const source = fs.readFileSync("tool-pages.js", "utf8");
  vm.runInContext(source, context, { filename: "tool-pages.js" });
  await context.imageResize();
  assert.equal(downloadedName, "resized.png");
  assert.match(elements.result.textContent, /Done: 200 x 100 px\./);
});

test("profit margin reports undefined markup when cost is zero", () => {
  const { context, elements } = loadTools({ rev: "1000", cost: "0", result: "" });
  context.calcMargin();
  assert.match(elements.result.innerHTML, /Profit margin: 100\.00%/);
  assert.match(elements.result.innerHTML, /Markup on cost: undefined \(cost is zero\)/);
});


test("break-even rejects negative cost inputs", () => {
  const { context, elements } = loadTools({ fixed: "5000", sell: "50", variable: "-10", result: "" });
  context.calcBreakEven();
  assert.equal(elements.result.textContent, "Enter valid costs. Selling price must be greater than variable cost.");
});


test("timestamp converter provides and uses an explicit input unit", () => {
  const { context, elements } = loadTools({ ts: "1750000000", tsUnit: "seconds", result: "" });
  context.timestampToDate();
  assert.match(elements.result.textContent, /^2025-/);
  elements.ts.value = "1750000000000";
  elements.tsUnit.value = "milliseconds";
  context.timestampToDate();
  assert.match(elements.result.textContent, /^2025-/);
});


test("QuotePulse analyzes a quote and detects document issues", () => {
  const { context, elements } = loadTools({
    quoteText: "Site visit $50\nLabour $480\nMaterials $620\nDeposit 60%\nTotal $1150\n12-month warranty",
    result: "",
    qpMessage: "",
    tool: ""
  });
  context.analyzeQuote();
  assert.match(elements.result.innerHTML, /Clarity score/);
  assert.match(elements.result.innerHTML, /above 50%/);
  assert.match(elements.qpMessage.innerHTML, /Negotiation message/);
});

test("QuotePulse flags a total mismatch", () => {
  const { context, elements } = loadTools({
    quoteText: "Labour $400\nMaterials $300\nTotal $900\nWarranty 12 months",
    result: "",
    qpMessage: "",
    tool: ""
  });
  context.analyzeQuote();
  assert.match(elements.result.innerHTML, /do not reconcile with the stated total/);
});

test("QuotePulse renderer is registered", () => {
  const { context, elements } = loadTools({ tool: { innerHTML: "" } });
  context.renderTool("quotePulse", "tool");
  assert.match(elements.tool.innerHTML, /QuotePulse/);
});

test("QuotePulse detects missing commercial terms and keeps quote analysis local", () => {
  const { context, elements } = loadTools({
    quoteText: "Labour $400\nMaterials $300\nTotal $700",
    result: "",
    qpMessage: ""
  });
  context.analyzeQuote();
  assert.match(elements.result.innerHTML, /No warranty or guarantee language was detected/);
  assert.match(elements.result.innerHTML, /No change-order rule was detected/);
  assert.match(elements.result.innerHTML, /No cancellation or refund terms were detected/);
  assert.match(elements.result.innerHTML, /Taxes or fees are not mentioned/);
  assert.match(elements.qpMessage.innerHTML, /Copy message/);
});


test("Base64 rejects invalid UTF-8 instead of silently replacing bytes", () => {
  const { context, elements } = loadTools({ b64: "/w==", result: "" });
  context.decodeBase64();
  assert.equal(elements.result.textContent, "Invalid Base64 input.");
});


test("timestamp converter rejects unsupported input units", () => {
  const { context, elements } = loadTools({ ts: "1750000000", tsUnit: "weeks", result: "" });
  context.timestampToDate();
  assert.equal(elements.result.textContent, "Choose a supported timestamp unit.");
});
