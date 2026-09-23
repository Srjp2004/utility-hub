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


test.describe("UtilityHub functional smoke matrix",()=>{
  const cases=[
    ["percentage-calculator.html","#part","20","#whole","500","Calculate","4%"],
    ["percentage-change-calculator.html","#oldv","100","#newv","125","Calculate","25.00%"],
    ["discount-calculator.html","#price","100","#disc","20","Calculate","80"],
    ["loan-payment-calculator.html","#loanAmount","1200","#loanRate","0","#loanMonths","12","Calculate","100"],
    ["interest-calculator.html","#principal","1000","#rate","10","#years","2","Calculate","200"],
    ["compound-interest-calculator.html","#cp","1000","#cr","12","#cy","1","#cm","12","Calculate","1126.83"],
    ["profit-margin-calculator.html","#rev","1000","#cost","700","Calculate","30.00%"],
    ["roi-calculator.html","#inv","1000","#ret","1250","Calculate","25.00%"],
    ["break-even-calculator.html","#fixed","5000","#sell","50","#variable","30","Calculate","250.00 units"],
    ["tip-calculator.html","#bill","100","#tipRate","15","#people","2","Calculate","57.50"],
    ["bmi-calculator.html","#kg","70","#cm","175","Calculate","22.9"],
    ["date-difference-calculator.html","#d1","2026-09-14","#d2","2026-09-18","Calculate","4 days"],
    ["unit-converter.html","#uv","1","Convert","0.62"],
    ["word-counter.html","#tc","hello world","Count","2 words"],
    ["json-formatter.html","#jsonInput","{\"a\":1}","Format & Validate","Valid JSON"],
    ["case-converter.html","#caseInput","hello world","Convert","Converted."],
    ["time-duration-calculator.html","#startTime","23:00","#endTime","01:30","Calculate","2h 30m"],
    ["business-days-calculator.html","#bdStart","2026-09-14","#bdEnd","2026-09-18","Calculate","5 weekdays"],
    ["random-number-generator.html","#rndMin","5","#rndMax","5","Generate","5"],
    ["aspect-ratio-calculator.html","#arw","1920","#arh","1080","Calculate","16:9"],
    ["unix-timestamp-converter.html","#ts","1750000000","Convert timestamp","2025-06-15"],
    ["base64-encoder-decoder.html","#b64","✓ café","Encode","4pyTIGNhZsOp"],
    ["quote-pulse.html","#quoteText","Labour $480\\nMaterials $620\\nTotal $1100\\n12-month warranty","Analyze quote","Quote clarity"]
  ];

  test("core tools execute representative user flows",async({page})=>{
    for(const item of cases){
      const [path,...ops]=item;
      await page.goto("/tools/"+path,{waitUntil:"networkidle"});
      if(path==="unit-converter.html"){
        await page.locator("#uv").fill("1");
        await page.locator("#uf").selectOption("km");
        await page.locator("#ut").selectOption("mi");
        await page.getByRole("button",{name:"Convert"}).click();
        await expect(page.locator("#result")).toContainText("0.62");
        continue;
      }
      if(path==="base64-encoder-decoder.html"){
        await page.locator("#b64").fill(ops[1]);
        await page.getByRole("button",{name:ops[2]}).click();
        await expect(page.locator("#result")).toContainText(ops[3]);
        continue;
      }
      if(path==="quote-pulse.html"){
        await page.locator("#quoteText").fill(ops[1]);
        await page.getByRole("button",{name:ops[2]}).click();
        await expect(page.locator("#result")).toBeVisible();
        await expect(page.locator("#result")).toContainText("Quote");
        continue;
      }
      if(path==="unix-timestamp-converter.html"){
        await page.locator("#ts").fill(ops[1]);
        await page.locator("#tsUnit").selectOption("seconds");
        await page.getByRole("button",{name:"Convert timestamp"}).click();
        await expect(page.locator("#result")).toContainText(ops[3]);
        continue;
      }
      let i=0;
      while(i<ops.length){
        const key=ops[i++];
        if(key==="Calculate"||key==="Generate"||key==="Count"||key==="Format & Validate"||key==="Convert"||key==="Analyze quote"){
          await page.getByRole("button",{name:key}).click();
          await expect(page.locator("#result")).toContainText(ops[i]);
          break;
        }
        await page.locator(key).fill(ops[i++]);
      }
    }
  });
});
\n\ntest.describe("UtilityHub exhaustive interaction smoke",()=>{\n  test("every published tool executes its primary button flow without browser errors",async({page})=>{\n    const failures=[];\n    for(const pageName of toolPages){\n      const errors=[];\n      page.on("pageerror",e=>errors.push(String(e)));\n      page.on("console",m=>{if(m.type()==="error")errors.push(m.text())});\n      await page.goto("/tools/"+pageName,{waitUntil:"networkidle"});\n      const button=page.locator("#tool button").first();\n      await expect(button).toBeVisible();\n      await button.click();\n      await page.waitForTimeout(100);\n      const result=page.locator("#result");\n      await expect(result).toBeVisible();\n      const resultText=(await result.innerText()).trim();\n      if(!resultText) failures.push(pageName+": primary action produced no result");\n      if(errors.length) failures.push(pageName+": "+errors.join(" | "));\n    }\n    expect(failures,failures.join("\\n")).toEqual([]);\n  });\n});\n