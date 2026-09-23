(() => {
  const filename = window.location.pathname.split("/").pop();
  const toolByPage = Object.freeze({
    "age-calculator.html": "age",
    "aspect-ratio-calculator.html": "aspectRatio",
    "base64-encoder-decoder.html": "base64",
    "bmi-calculator.html": "bmi",
    "break-even-calculator.html": "breakeven",
    "business-days-calculator.html": "businessdays",
    "case-converter.html": "case",
    "compound-interest-calculator.html": "compound",
    "date-difference-calculator.html": "date",
    "discount-calculator.html": "discount",
    "image-compressor.html": "image-compressor",
    "image-converter.html": "image-converter",
    "image-resizer.html": "image-resizer",
    "interest-calculator.html": "interest",
    "json-formatter.html": "json",
    "loan-payment-calculator.html": "loan",
    "password-generator.html": "password",
    "percentage-calculator.html": "percentage",
    "percentage-change-calculator.html": "change",
    "profit-margin-calculator.html": "margin",
    "quote-pulse.html": "quotePulse",
    "random-number-generator.html": "randomNumber",
    "roi-calculator.html": "roi",
    "time-duration-calculator.html": "duration",
    "tip-calculator.html": "tip",
    "unit-converter.html": "convert",
    "unix-timestamp-converter.html": "timestamp",
    "word-counter.html": "text"
  });
  const tool = toolByPage[filename];
  if (tool && typeof window.renderTool === "function") window.renderTool(tool, "tool");
})();