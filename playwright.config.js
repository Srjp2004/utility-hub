const { defineConfig, devices } = require("@playwright/test");
module.exports = defineConfig({
  testDir: "./tests/e2e",
  timeout: 30000,
  expect: { timeout: 5000 },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: process.env.CI ? [["line"], ["html", { outputFolder: "playwright-report", open: "never" }]] : "list",
  use: { baseURL: "http://127.0.0.1:4173", trace: "retain-on-failure", screenshot: "only-on-failure", video: "retain-on-failure", serviceWorkers: "block" },
  webServer: { command: "node tests/e2e/static-server.js", url: "http://127.0.0.1:4173/index.html", reuseExistingServer: !process.env.CI, timeout: 10000 },
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile-chromium", use: { ...devices["Pixel 5"] } },
    { name: "mobile-webkit", use: { ...devices["iPhone 13"] } }
  ]
});
