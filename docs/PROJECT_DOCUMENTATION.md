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


## 2026-09-22 - SEO URL and search-scope decision
- The currently verified deployed hostname is `utility-hub-ten.vercel.app`. Sitemap and robots URLs were made absolute against that hostname after direct browser verification. If a final custom production domain is adopted, sitemap, robots, canonicals, Open Graph URLs and structured-data URLs must be updated together.
- Homepage search is intentionally scoped to the featured cards rather than silently pretending to search the complete directory. The homepage placeholder now states this scope; the full 28-tool inventory is available through the Tools directory search.

## 2026-09-22 - Autonomous engineering system
- Added repository-level autonomous engineering instructions at .github/copilot-instructions.md.
- Added autonomous repair orchestration that reacts to failed Node regression or browser E2E workflows, creates a diagnostic issue, and can delegate the issue to GitHub Copilot cloud agent when COPILOT_AUTOMATION_TOKEN is configured.
- Added autonomous task orchestration through workflow dispatch or an autonomous-engineering issue label.
- Added a scheduled/push/PR security workflow for dependency audit and dangerous JavaScript primitive detection.
- Added docs/AUTONOMOUS_ENGINEERING.md documenting lifecycle, safety gates, activation requirements and limitations.
- Automation is intentionally PR-gated: agents must produce focused PRs and cannot directly merge to main. Real-device and production verification remain explicit release gates.


## 2026-09-22 - DevSecOps automation expansion
- Expanded the security workflow into a DevSecOps gate covering dependency installation/audit, CycloneDX SBOM generation and artifact retention, CodeQL JavaScript/TypeScript SAST, pull-request dependency review, source security invariants, credential-pattern detection, security-header/CSP invariants, manifest/lockfile validation, and Chromium security-focused browser checks.
- Security automation uses least-privilege job permissions and keeps repository contents read-only except the CodeQL security-events permission and dependency-review PR commenting.
- Fresh workflow execution evidence is still required; implementation of the automation is not treated as proof that security checks pass.


## 2026-09-22 - Agent-native SDLC contract hardening
- Added `.github/agent-sdlc/state-machine.json` with explicit lifecycle states, allowed transitions and evidence requirements.
- Added `.github/agent-sdlc/mission-schema.json` defining required mission state, agent-result, evidence and delivery fields.
- The SDLC control plane now has explicit transition/evidence contracts rather than relying only on prose policy.
- This remains a governance/control-plane layer; no claim is made that an external autonomous agent runtime has been connected or that production delivery is autonomous.


## 2026-09-22 - Agent execution contract
- Added `.github/agent-sdlc/execution-contract.json` defining bounded worker isolation, evidence handoff, diagnosis-before-repair, fresh-retest requirements, retry-policy enforcement, and protected delivery semantics.
- Agent results now have a machine-readable contract requiring mission identity, source SHA, status, changed files, evidence, blockers and recommendation.
- This contract is intentionally runtime-neutral: it can govern an available agent/delegation runtime without assuming a specific AI provider.


## 2026-09-22 - Agent-native SDLC orchestration plan
- Added `docs/agent-sdlc/orchestrator-plan.md` defining the provider-neutral execution pipeline connecting intake, discovery, specification, planning, implementation, testing, security, independent verification, delivery, observation and learning.
- Defined bounded autonomous repair with diagnosis-before-repair, risk-based retry budgets and fresh retesting.
- Defined disjoint ownership rules for parallel workers and a machine-readable evidence handoff contract.
- Recorded the current limitation: repository control-plane contracts exist, but an actual worker/delegation runtime is still required before end-to-end autonomous execution can be claimed.


### CI gate repair
The current engineering gates are being repaired from fresh failure evidence rather than blind retries. The 404 E2E assertion now matches the actual 404 page, unsupported Dependency Review is removed from the active gate, and Vercel security-header validation is parsed as JSON to avoid shell-quoting false failures.
