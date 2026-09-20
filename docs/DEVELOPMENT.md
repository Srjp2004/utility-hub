# UtilityHub Development Guide

## Source of truth
GitHub repository: Srjp2004/utility-hub
The main branch is the intended integration branch.

## Project structure
- index.html: homepage
- tools.html: searchable tool directory
- tools/: dedicated tool pages
- tool-pages.js: shared tool rendering and browser-side tool logic
- app.js: site-level JavaScript
- styles.css: global responsive styling
- manifest.webmanifest: PWA metadata
- favicon.svg: favicon
- robots.txt: crawler rules
- sitemap.xml: discoverable URLs
- 404.html: missing-page recovery
- about.html, privacy.html, terms.html, contact.html: information/legal/contact pages
- docs/: durable project documentation

## Safe change procedure
1. Inspect current main state and relevant files.
2. Define acceptance criteria.
3. Implement the smallest coherent change.
4. Validate syntax and behavior.
5. Re-fetch the changed files from GitHub.
6. Check links, sitemap and responsive behavior when relevant.
7. Document meaningful changes in docs/CHANGELOG.md.
8. Update docs/PROJECT_DOCUMENTATION.md when architecture decisions change.

## Functional acceptance
A tool is not complete merely because its HTML exists. It should accept valid input, explain invalid input, produce the intended result, display results clearly, work with touch interaction, avoid unnecessary network dependencies, remain usable on narrow screens and avoid unnecessary exposure of user data.

## SEO acceptance
Indexable pages should have a unique title, useful description, canonical URL, appropriate robots directive, meaningful visible content, working internal links and sitemap inclusion when intended. Structured data must describe content actually present on the page.

## Monetization acceptance
Before advertising or affiliate services are enabled, confirm current provider requirements, use real account/property identifiers, update privacy/disclosure text, avoid deceptive placement and monitor performance/user experience. Never add fake publisher IDs, affiliate URLs or ad code.

## Device acceptance
Target Android phones, iPhones, small and large tablets, laptops, desktops and touch-enabled desktops. Check for accidental horizontal scrolling, readable text, easy tap targets, responsive grids, long-text wrapping and contained images. Respect reduced-motion preferences.

## Deployment procedure
A Git commit does not prove that the live deployment works. After deployment, open the production URL and test the homepage, tool directory, representative tools, 404 behavior, browser console, mobile layout, desktop layout, robots.txt, sitemap and canonical URLs.

## Production domain
Do not invent a production hostname. Once the final domain is selected, update canonical URLs, sitemap URLs, Open Graph URLs and structured-data URLs consistently.
