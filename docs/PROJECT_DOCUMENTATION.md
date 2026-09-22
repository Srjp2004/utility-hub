# UtilityHub Project Documentation

## Purpose
UtilityHub is a global-first web application providing free calculators and practical browser utilities. The business objective is to build genuine utility, acquire users, and create realistic revenue opportunities without unnecessary paid infrastructure.

## Product principles
1. Functional first: every published tool must perform its stated task.
2. Device agnostic: usable on Android, iPhone, tablets, laptops, desktops and touchscreens.
3. Global-first: avoid country-specific assumptions unless a tool explicitly requires them.
4. Privacy-friendly where practical: browser-only tools should process inputs locally when appropriate.
5. SEO through usefulness: create pages for real user needs, not thin keyword pages.
6. Low operating cost: avoid paid APIs and unnecessary dependencies until usage justifies them.
7. Monetization follows value: ads, affiliates, premium tools, digital products and sponsorships are opportunities, not guaranteed income.
8. Evidence before completion: changes are verified from the integrated GitHub state.

## Current architecture
- Static HTML pages
- Shared CSS in styles.css
- Shared browser-side JavaScript in tool-pages.js
- app.js for site-level JavaScript where required
- No required backend for the current MVP
- PWA manifest in manifest.webmanifest
- SEO files: robots.txt, sitemap.xml, canonical metadata and structured data
- GitHub as source repository
- Compatible deployment targets: Vercel, Netlify and GitHub Pages

This architecture is intentionally lightweight. A backend, database or framework migration should happen only when a demonstrated product requirement needs it.

## Current tool inventory
The directory currently exposes 28 tool pages covering calculations, finance, dates, units, text, images, JSON, passwords, timestamps, developer utilities and quote/estimate auditing. QuotePulse is a high-intent decision-support tool that checks quote-document consistency without making market-price claims. The authoritative list is tools.html and the files under tools/.

## Device compatibility
styles.css contains responsive safeguards including mobile breakpoints, a 420px small-screen breakpoint, touch-friendly controls, 16px form controls, overflow protection, responsive grids, wrapping for long links and reduced-motion support.

Image tools include a practical 25 MB browser-processing guard and temporary object URL cleanup.

## SEO foundation
Implemented: homepage title and description, canonical metadata, robots directives, Open Graph/Twitter metadata, homepage WebSite JSON-LD, dedicated tool pages, sitemap, robots.txt, internal tool links and directory search/filter.

Important deployment rule: replace relative canonical/sitemap URL values with the final production domain once the domain is known. Never invent a production hostname.

## Monetization roadmap
Phase A: deploy, test real devices, fix broken flows, publish useful pages and measure usage.
Phase B: improve search-intent coverage, titles/descriptions, internal linking and helpful supporting content.
Phase C: consider Google AdSense subject to current requirements and approval, relevant affiliate relationships with disclosures, premium/pro functionality, digital products, sponsorships and partnerships.

Never add fake ads, fake affiliate links, fake testimonials or fabricated traffic claims.

- The regression harness runs shared browser-oriented logic inside Node's VM. When a production tool depends on standard Web APIs, the harness must provide equivalent test-environment APIs explicitly so failures represent application behavior rather than missing browser globals.

## Development workflow
1. Define the observable outcome.
2. Inspect repository state.
3. Identify affected files and constraints.
4. Make the smallest coherent change.
5. Validate syntax or behavior.
6. Re-fetch the integrated GitHub state.
7. Check for regressions.
8. Record the change in project documentation.
9. Only then report completion.

## Deployment checklist
- All important pages load
- All tool links resolve
- Tool functions work
- Mobile, tablet and desktop layouts work
- 404 page works
- Favicon and manifest work
- robots.txt and sitemap are correct
- Canonicals use the final domain
- Privacy, Terms and Contact reflect actual services
- Real analytics identifiers are used if analytics is enabled
- Advertising disclosures and privacy text are updated before advertising or trackers are enabled

## Non-goals
Do not add paid AI APIs merely for appearance, mass-produce thin SEO pages, claim guaranteed revenue, claim AdSense approval before approval, add country-specific payroll logic to global tools without explicit scope, or modify MachineMind/LeaseGuard during UtilityHub work.

## Future architecture triggers
Consider React/Next.js, backend services, database, authentication or APIs only when requirements such as saved history, subscriptions, server-side processing, usage limits, teams, external APIs or advanced personalization justify them.

## Cross-chat continuity
`docs/CONTINUATION_STATE.md` is the durable handoff anchor for future chats and context limits. It records the current architecture, completed milestones, known limitations, engineering workflow and prioritized next work. Future UtilityHub sessions should re-fetch this file from `main` before continuing and should verify the live repository state rather than relying on stale chat context.


- Image-processing validation is intentionally bounded at the browser boundary: file size and output dimensions are checked before canvas allocation, and computed dimensions must be safe integers.


- Browser image tools enforce both input file-size and decoded-dimension limits before canvas allocation; output format/quality inputs are allowlisted or range-checked.

- Automated verification: `.github/workflows/test.yml` runs the existing Node regression suite on main pushes and pull requests using Node 20.x and 22.x. This is a verification mechanism, not evidence that a workflow run has already passed.


## 2026-09-22 - Vercel configuration decision
- Vercel rejected the previous asset-header `source` patterns during deployment validation because the extension separators were escaped in the route patterns.
- The configuration now uses Vercel-compatible asset/header source patterns without escaped extension separators. Security headers and the intended short HTML/static-asset cache policy are retained.
- This is a deployment-configuration correction only; no application runtime logic was changed.
