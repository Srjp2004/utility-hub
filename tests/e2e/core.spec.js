const { test, expect } = require("@playwright/test");
const toolPages = [
  "percentage-calculator.html","percentage-change-calculator.html","discount-calculator.html","age-calculator.html",
  "loan-payment-calculator.html","interest-calculator.html","compound-interest-calculator.html","profit-margin-calculator.html",
  "roi-calculator.html","break-even-calculator.html","tip-calculator.html","bmi-calculator.html","date-difference-calculator.html",
  "unit-converter.html","word-counter.html","image-compressor.html","image-resizer.html","image-converter.html","json-formatter.html",
  "case-converter.html","password-generator.html","time-duration-calculator.html","business-days-calculator.html",
  "random-number-generator.html","aspect-ratio-calculator.html","unix-timestamp-converter.html","base64-encoder-decoder.html","quote-pulse.html"
];
test.describe("UtilityHub page health",()=>{
  test("homepage has no browser errors",async({page})=>{
    const errors=[]; page.on("pageerror",e=>errors.push(String(e))); page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
    await page.goto("/index.html",{waitUntil:"networkidle"}); await expect(page.locator("h1")).toContainText("Useful tools"); expect(errors,errors.join("\n")).toEqual([]);
  });
  test("directory search and category filters work",async({page})=>{
    await page.goto("/tools.html",{waitUntil:"networkidle"}); const search=page.locator("#toolSearch");
    await search.fill("password"); await expect(page.locator('a[href="tools/password-generator.html"]')).toBeVisible();
    await expect(page.locator('a[href="tools/percentage-calculator.html"]')).toBeHidden();
    await page.getByRole("link",{name:"Image tools"}).click(); await expect(page.locator('a[href="tools/image-compressor.html"]')).toBeVisible();
  });
  for(const pageName of toolPages){
    test("loads "+pageName+" without browser errors",async({page})=>{
      const errors=[]; page.on("pageerror",e=>errors.push(String(e))); page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});
      await page.goto("/tools/"+pageName,{waitUntil:"networkidle"}); await expect(page.locator("#tool")).toBeVisible(); await expect(page.locator("#tool button").first()).toBeVisible();
      expect(errors,errors.join("\n")).toEqual([]);
    });
  }
  test("representative calculators return expected results",async({page})=>{
    await page.goto("/tools/percentage-calculator.html"); await page.locator("#part").fill("20"); await page.locator("#whole").fill("500"); await page.getByRole("button",{name:"Calculate"}).click(); await expect(page.locator("#result")).toContainText("4%");
    await page.goto("/tools/discount-calculator.html"); await page.locator("#price").fill("100"); await page.locator("#disc").fill("20"); await page.getByRole("button",{name:"Calculate"}).click(); await expect(page.locator("#result")).toContainText("80");
    await page.goto("/tools/loan-payment-calculator.html"); await page.locator("#loanAmount").fill("1200"); await page.locator("#loanRate").fill("0"); await page.locator("#loanMonths").fill("12"); await page.getByRole("button",{name:"Calculate"}).click(); await expect(page.locator("#result")).toContainText("100");
  });
  test("keyboard operation works",async({page})=>{
    await page.goto("/tools/percentage-calculator.html"); await page.locator("#part").fill("20"); await page.locator("#whole").fill("500"); await page.getByRole("button",{name:"Calculate"}).press("Enter"); await expect(page.locator("#result")).toContainText("4%");
  });
  test("404 behavior is correct",async({page})=>{const response=await page.goto("/missing-utilityhub-e2e-route");expect(response.status()).toBe(404);await expect(page.locator("body")).toContainText("That page does not exist.")});
  test("refresh and history navigation work",async({page})=>{
    await page.goto("/tools/quote-pulse.html"); await expect(page.locator("#quoteText")).toBeVisible(); await page.reload(); await expect(page.locator("#quoteText")).toBeVisible();
    await page.goto("/tools/percentage-calculator.html"); await page.goBack(); await expect(page).toHaveURL(/quote-pulse\.html/); await page.goForward(); await expect(page).toHaveURL(/percentage-calculator\.html/);
  });
});
test("browser-local tool makes no external requests",async({page})=>{
  const external=[]; page.on("request",r=>{const u=new URL(r.url());if(!["127.0.0.1","localhost"].includes(u.hostname))external.push(r.url())});
  await page.goto("/tools/quote-pulse.html",{waitUntil:"networkidle"}); await expect(page.locator("#quoteText")).toBeVisible(); expect(external).toEqual([]);
});
