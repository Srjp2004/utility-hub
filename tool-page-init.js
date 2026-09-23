(() => {
  const filename = window.location.pathname.split("/").pop();
  const toolByPage = Object.freeze({
    "age-calculator.html": "age",
    "aspect-ratio-calculator.html": "aspect",
    "base64-encoder-decoder.html": "base64",
    "bmi-calculator.html": "bmi",
    "break-even-calculator.html": "breakEven",
    "business-days-calculator.html": "businessDays",
    "case-converter.html": "case",
    "compound-interest-calculator.html": "compound",
    "date-difference-calculator.html": "date",
    "discount-calculator.html": "discount",
    "image-compressor.html": "imageCompress",
    "image-converter.html": "imageConvert",
    "image-resizer.html": "imageResize",
    "interest-calculator.html": "interest",
    "json-formatter.html": "json",
    "loan-payment-calculator.html": "loan",
    "password-generator.html": "password",
    "percentage-calculator.html": "percentage",
    "percentage-change-calculator.html": "change",
    "profit-margin-calculator.html": "margin",
    "quote-pulse.html": "quotePulse",
    "random-number-generator.html": "random",
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