const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function loadTools(values) {
  const elements = Object.fromEntries(Object.entries(values).map(([id, value]) => [id, { value, innerHTML: "", textContent: "" }]));
  const context = { document: { getElementById: (id) => elements[id], addEventListener: () => {} }, console, Number, Math, Date, TextEncoder, TextDecoder, btoa, atob, setTimeout, clearTimeout };
  vm.createContext(context);
  const source = fs.readFileSync("tool-pages.js", "utf8");
  vm.runInContext(source, context, { filename: "tool-pages.js" });
  return { context, elements };
}

test("numeric calculators reject empty required inputs", () => {
  const cases = [
    [{ part: "", whole: "200", result: "" }, "calcPercentage", "Enter valid numbers."],
    [{ price: "", disc: "20", result: "" }, "calcDiscount", "Enter a valid price and discount from 0 to 100%."],
    [{ loanAmount: "", loanRate: "7.5", loanMonths: "60", result: "" }, "calcLoan", "Enter a positive loan amount, non-negative rate, and whole number of months."],
    [{ principal: "", rate: "8", years: "3", result: "" }, "calcInterest", "Enter valid non-negative values."],
    [{ uv: "", uf: "km", ut: "mi", result: "" }, "calcConvert", "Enter a valid number."],
    [{ bill: "", tipRate: "15", people: "2", result: "" }, "calcTip", "Enter a valid bill, non-negative tip, and whole number of people."],
    [{ kg: "", cm: "175", result: "" }, "calcBmi", "Enter positive height and weight."],
    [{ cp: "", cr: "8", cy: "5", cm: "12", result: "" }, "calcCompound", "Enter valid values."],
    [{ rev: "", cost: "700", result: "" }, "calcMargin", "Enter valid revenue and cost."],
    [{ inv: "", ret: "1250", result: "" }, "calcRoi", "Enter valid values."],
    [{ fixed: "", sell: "50", variable: "30", result: "" }, "calcBreakEven", "Enter valid costs. Selling price must be greater than variable cost."]
  ];
  for (const [values, fn, expected] of cases) {
    const { context, elements } = loadTools(values);
    context[fn]();
    assert.equal(elements.result.textContent, expected);
  }
});

test("percentage change rejects an empty new value", () => {
  const { context, elements } = loadTools({ oldv: "100", newv: "", result: "" });
  context.calcChange();
  assert.equal(elements.result.textContent, "Enter valid values. Original value must not be zero.");
});

test("date calculators reject impossible calendar dates", () => {
  const cases = [
    ["calcDate", { d1: "2026-02-30", d2: "2026-03-01", result: "" }],
    ["calcBusinessDays", { bdStart: "2026-02-30", bdEnd: "2026-03-02", result: "" }],
    ["calcAge", { dob: "2026-02-30", result: "" }]
  ];
  for (const [fn, values] of cases) {
    const { context, elements } = loadTools(values);
    context[fn]();
    assert.match(elements.result.textContent, /valid date/);
  }
});

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

test("percentage calculator rejects empty input", () => {
  const { context, elements } = loadTools({ part: "", whole: "80", result: "" });
  context.calcPercentage();
  assert.equal(elements.result.textContent, "Enter valid numbers.");
});

test("percentage calculator rejects malformed scientific notation", () => {
  const { context, elements } = loadTools({ part: "1e", whole: "80", result: "" });
  context.calcPercentage();
  assert.equal(elements.result.textContent, "Enter valid numbers.");
});

test("percentage calculator normalizes negative zero", () => {
  const { context, elements } = loadTools({ part: "0", whole: "-80", result: "" });
  context.calcPercentage();
  assert.equal(elements.result.textContent, "0%");
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

test("BMI calculator provides category, scale and healthy-range weight", () => {
  const { context, elements } = loadTools({ kg: "70", cm: "175", result: "" });
  context.calcBmi();
  assert.match(elements.result.innerHTML, /22\.9/);
  assert.match(elements.result.innerHTML, /Healthy weight/);
  assert.match(elements.result.innerHTML, /bmi-track/);
  assert.match(elements.result.innerHTML, /56\.7-76\.3 kg/);
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
      addEventListener: () => {},
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


test("QuotePulse example action populates a reproducible quote", () => {
  const { context, elements } = loadTools({ quoteText: "", result: "" });
  context.quotePulseExample();
  assert.match(elements.quoteText.value, /Site visit \$50/);
  assert.match(elements.quoteText.value, /Total \$1150/);
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

test("QuotePulse does not treat warranty duration as a monetary line item", () => {
  const { context, elements } = loadTools({
    quoteText: "Labour $400\nMaterials $300\nTotal $700\n12-month warranty",
    result: "",
    qpMessage: ""
  });
  context.analyzeQuote();
  assert.ok(elements.result.innerHTML.includes("<strong>2</strong>"), "QuotePulse should detect exactly two monetary line items");
  assert.match(elements.result.innerHTML, /Detected line items/);
  assert.doesNotMatch(elements.result.innerHTML, /12-month warranty/);
});


test("interest calculator reports simple and compound interest", () => {
  const { context, elements } = loadTools({ principal: "1000", rate: "10", years: "2", result: "" });
  context.calcInterest();
  assert.match(elements.result.innerHTML, /Simple interest: 200/);
  assert.match(elements.result.innerHTML, /Compound interest: 210/);
});

test("interest calculator rejects negative inputs", () => {
  const { context, elements } = loadTools({ principal: "-1", rate: "10", years: "2", result: "" });
  context.calcInterest();
  assert.equal(elements.result.textContent, "Enter valid non-negative values.");
});

test("age calculator rejects a future date", () => {
  const { context, elements } = loadTools({ dob: "2999-01-01", result: "" });
  context.calcAge();
  assert.equal(elements.result.textContent, "Date of birth cannot be in the future.");
});

test("tip calculator splits the total between people", () => {
  const { context, elements } = loadTools({ bill: "100", tipRate: "20", people: "4", result: "" });
  context.calcTip();
  assert.match(elements.result.innerHTML, /30.00 per person/);
  assert.match(elements.result.innerHTML, /Tip: 20.00/);
});

test("tip calculator rejects fractional people", () => {
  const { context, elements } = loadTools({ bill: "100", tipRate: "20", people: "2.5", result: "" });
  context.calcTip();
  assert.equal(elements.result.textContent, "Enter a valid bill, non-negative tip, and whole number of people.");
});

test("BMI calculator handles a standard input", () => {
  const { context, elements } = loadTools({ kg: "70", cm: "175", result: "" });
  context.calcBmi();
  assert.match(elements.result.innerHTML, /22.9/);
});

test("BMI calculator rejects zero height", () => {
  const { context, elements } = loadTools({ kg: "70", cm: "0", result: "" });
  context.calcBmi();
  assert.equal(elements.result.textContent, "Enter positive height and weight.");
});

test("date difference is absolute and timezone-stable", () => {
  const { context, elements } = loadTools({ d1: "2026-09-20", d2: "2026-09-14", result: "" });
  context.calcDate();
  assert.match(elements.result.innerHTML, /6 days/);
});

test("tip calculator rejects unsafe people counts", () => {
  const { context, elements } = loadTools({ bill: "100", tipRate: "20", people: "9007199254740992", result: "" });
  context.calcTip();
  assert.equal(elements.result.textContent, "Enter a valid bill, non-negative tip, and whole number of people.");
});

test("text counter counts Unicode code points as characters", () => {
  const { context, elements } = loadTools({ tc: "😀 café", result: "" });
  context.calcText();
  assert.match(elements.result.innerHTML, /2 words/);
  assert.match(elements.result.innerHTML, /6 characters/);
});

test("text counter handles repeated whitespace", () => {
  const { context, elements } = loadTools({ tc: "  one\n\n two\tthree  ", result: "" });
  context.calcText();
  assert.match(elements.result.innerHTML, /3 words/);
  assert.match(elements.result.innerHTML, /19 characters/);
});

test("compound interest rejects unsafe compounding frequency", () => {
  const { context, elements } = loadTools({ cp: "1000", cr: "8", cy: "1", cm: "9007199254740992", result: "" });
  context.calcCompound();
  assert.equal(elements.result.textContent, "Enter valid values.");
});

test("compound interest rejects fractional compounding frequency", () => {
  const { context, elements } = loadTools({ cp: "1000", cr: "8", cy: "1", cm: "2.5", result: "" });
  context.calcCompound();
  assert.equal(elements.result.textContent, "Enter valid values.");
});

test("time duration handles overnight intervals", () => {
  const { context, elements } = loadTools({ startTime: "23:30", endTime: "01:15", result: "" });
  context.calcDuration();
  assert.match(elements.result.innerHTML, /1h 45m/);
});

test("time duration rejects malformed time values", () => {
  const { context, elements } = loadTools({ startTime: "25:00", endTime: "01:00", result: "" });
  context.calcDuration();
  assert.equal(elements.result.textContent, "Enter valid times.");
});

test("business days swaps reversed dates and remains inclusive", () => {
  const { context, elements } = loadTools({ bdStart: "2026-09-18", bdEnd: "2026-09-14", result: "" });
  context.calcBusinessDays();
  assert.match(elements.result.innerHTML, /5 weekdays/);
});

test("aspect ratio reduces dimensions by their greatest common divisor", () => {
  const { context, elements } = loadTools({ arw: "1920", arh: "1080", result: "" });
  context.calcAspect();
  assert.match(elements.result.innerHTML, /16:9/);
});

test("aspect ratio rejects fractional dimensions", () => {
  const { context, elements } = loadTools({ arw: "1920.5", arh: "1080", result: "" });
  context.calcAspect();
  assert.equal(elements.result.textContent, "Enter positive whole-number width and height.");
});

test("date to timestamp converts Unix epoch correctly", () => {
  const { context, elements } = loadTools({ dt: "1970-01-01T00:00", result: "" });
  context.dateToTimestamp();
  assert.equal(elements.result.textContent, "0");
});

test("case converter changes text using the selected mode", () => {
  const { context, elements } = loadTools({ caseInput: "hello world", caseType: "upper", result: "" });
  context.convertCase();
  assert.equal(elements.caseInput.value, "HELLO WORLD");
  assert.equal(elements.result.textContent, "Converted.");
});

test("JSON formatter pretty-prints valid JSON", () => {
  const { context, elements } = loadTools({ jsonInput: "{\"a\":1}", result: "" });
  context.formatJson();
  assert.equal(elements.result.textContent, "Valid JSON.");
  assert.equal(elements.jsonInput.value, '{\n  "a": 1\n}');
});

test("random number generator respects an inclusive mocked crypto result", () => {
  const elements = { rndMin: { value: "10" }, rndMax: { value: "12" }, result: { innerHTML: "", textContent: "" } };
  const crypto = { getRandomValues(buffer) { buffer[0] = 2; } };
  const context = {
    document: { getElementById: (id) => elements[id], addEventListener: () => {} },
    console, Number, Math, Date, TextEncoder, TextDecoder, btoa, atob, setTimeout, clearTimeout,
    BigInt, Uint32Array, crypto,
    window: { crypto }
  };
  vm.createContext(context);
  const source = fs.readFileSync("tool-pages.js", "utf8");
  vm.runInContext(source, context, { filename: "tool-pages.js" });
  context.generateRandom();
  assert.equal(elements.result.innerHTML, "<strong>12</strong>");
});

test("random number generator rejects ranges larger than the supported limit", () => {
  const elements = { rndMin: { value: "0" }, rndMax: { value: "4294967296" }, result: { innerHTML: "", textContent: "" } };
  const crypto = { getRandomValues() {} };
  const context = {
    document: { getElementById: (id) => elements[id], addEventListener: () => {} },
    console, Number, Math, Date, TextEncoder, TextDecoder, btoa, atob, setTimeout, clearTimeout,
    BigInt, Uint32Array, crypto,
    window: { crypto }
  };
  vm.createContext(context);
  const source = fs.readFileSync("tool-pages.js", "utf8");
  vm.runInContext(source, context, { filename: "tool-pages.js" });
  context.generateRandom();
  assert.equal(elements.result.textContent, "Use a range of up to 4,294,967,296 possible integers.");
});


test("loan calculator rejects unsafe month counts", () => {
  const { context, elements } = loadTools({ loanAmount: "1200", loanRate: "5", loanMonths: "9007199254740992", result: "" });
  context.calcLoan();
  assert.match(elements.result.textContent, /whole number of months/);
});

test("loan calculator rejects fractional month terms", () => {
  const { context, elements } = loadTools({ loanAmount: "1200", loanRate: "5", loanMonths: "12.5", result: "" });
  context.calcLoan();
  assert.match(elements.result.textContent, /whole number of months/);
});

test("unit converter rejects incompatible unit families", () => {
  const { context, elements } = loadTools({ uv: "10", uf: "km", ut: "kg", result: "" });
  context.calcConvert();
  assert.equal(elements.result.textContent, "Choose compatible units.");
});

test("profit margin rejects zero revenue", () => {
  const { context, elements } = loadTools({ rev: "0", cost: "100", result: "" });
  context.calcMargin();
  assert.match(elements.result.textContent, /valid/);
});

test("ROI rejects zero initial investment", () => {
  const { context, elements } = loadTools({ inv: "0", ret: "100", result: "" });
  context.calcRoi();
  assert.match(elements.result.textContent, /valid/);
});

test("date difference rejects invalid calendar dates", () => {
  const { context, elements } = loadTools({ d1: "not-a-date", d2: "2026-09-20", result: "" });
  context.calcDate();
  assert.match(elements.result.textContent, /valid/);
});

test("business days rejects invalid calendar dates", () => {
  const { context, elements } = loadTools({ bdStart: "not-a-date", bdEnd: "2026-09-20", result: "" });
  context.calcBusinessDays();
  assert.match(elements.result.textContent, /valid/);
});


test("discount calculator rejects negative price and out-of-range discount", () => {
  const { context, elements } = loadTools({ price: "-1", disc: "20", result: "" });
  context.calcDiscount();
  assert.equal(elements.result.textContent, "Enter a valid price and discount from 0 to 100%.");
  elements.price.value = "100";
  elements.disc.value = "100.1";
  context.calcDiscount();
  assert.equal(elements.result.textContent, "Enter a valid price and discount from 0 to 100%.");
});

test("loan calculator rejects negative rate and non-positive amount", () => {
  const { context, elements } = loadTools({ loanAmount: "1000", loanRate: "-1", loanMonths: "12", result: "" });
  context.calcLoan();
  assert.match(elements.result.textContent, /positive loan amount/);
  elements.loanRate.value = "5";
  elements.loanAmount.value = "0";
  context.calcLoan();
  assert.match(elements.result.textContent, /positive loan amount/);
});

test("age calculator rejects malformed birth dates", () => {
  const { context, elements } = loadTools({ dob: "not-a-date", result: "" });
  context.calcAge();
  assert.equal(elements.result.textContent, "Enter a valid date of birth.");
});

test("time duration returns zero for equal times", () => {
  const { context, elements } = loadTools({ startTime: "10:30", endTime: "10:30", result: "" });
  context.calcDuration();
  assert.equal(elements.result.innerHTML, "<strong>0h 0m</strong>");
});

test("business days returns zero for a weekend-only interval", () => {
  const { context, elements } = loadTools({ bdStart: "2026-09-19", bdEnd: "2026-09-20", result: "" });
  context.calcBusinessDays();
  assert.match(elements.result.innerHTML, /0 weekdays/);
});

test("random number generator accepts a single-value range", () => {
  const elements = { rndMin: { value: "7" }, rndMax: { value: "7" }, result: { innerHTML: "", textContent: "" } };
  const crypto = { getRandomValues(buffer) { buffer[0] = 0; } };
  const context = { document: { getElementById: id => elements[id], addEventListener: () => {} }, console, Number, Math, Date, TextEncoder, TextDecoder, btoa, atob, setTimeout, clearTimeout, BigInt, Uint32Array, crypto, window: { crypto } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync("tool-pages.js", "utf8"), context, { filename: "tool-pages.js" });
  context.generateRandom();
  assert.equal(elements.result.innerHTML, "<strong>7</strong>");
});

test("aspect ratio rejects zero and negative dimensions", () => {
  const { context, elements } = loadTools({ arw: "0", arh: "1080", result: "" });
  context.calcAspect();
  assert.equal(elements.result.textContent, "Enter positive whole-number width and height.");
  elements.arw.value = "-1920";
  context.calcAspect();
  assert.equal(elements.result.textContent, "Enter positive whole-number width and height.");
});

test("timestamp converter rejects unsafe timestamps", () => {
  const { context, elements } = loadTools({ ts: "9007199254740992", tsUnit: "seconds", result: "" });
  context.timestampToDate();
  assert.equal(elements.result.textContent, "Enter a whole-number timestamp within the supported safe range.");
});

test("date-to-timestamp rejects missing input", () => {
  const { context, elements } = loadTools({ dt: "", result: "" });
  context.dateToTimestamp();
  assert.equal(elements.result.textContent, "Choose a date and time.");
});

test("base64 encoder handles empty text without throwing", () => {
  const { context, elements } = loadTools({ b64: "", result: "" });
  context.encodeBase64();
  assert.equal(elements.result.textContent, "");
});

test("password generator clamps requested length to supported bounds", () => {
  const elements = { pwLength: { value: "1000" }, result: { innerHTML: "", textContent: "" } };
  const crypto = { getRandomValues(buffer) { buffer[0] = 0; } };
  const context = { document: { getElementById: id => elements[id], addEventListener: () => {} }, console, Number, Math, Date, TextEncoder, TextDecoder, btoa, atob, setTimeout, clearTimeout, Uint32Array, crypto, window: { crypto } };
  vm.createContext(context);
  vm.runInContext(fs.readFileSync("tool-pages.js", "utf8"), context, { filename: "tool-pages.js" });
  context.generatePassword();
  const generated = elements.result.innerHTML.replace("<strong>", "").replace("</strong>", "").split("<br>")[0];
  assert.equal(generated.length, 128);
});
