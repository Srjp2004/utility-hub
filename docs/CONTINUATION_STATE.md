# UtilityHub Continuation State

> Durable handoff document for continuing UtilityHub across chats, sessions and context limits.

## Project identity
- Repository: Srjp2004/utility-hub
- Integration branch: main
- Product: UtilityHub, a global-first browser utility web app
- Architecture: static HTML/CSS/JavaScript, browser-first, no required backend
- Do not modify: MachineMind (Srjp2004/machinemind) or LeaseGuard (Srjp2004/leaseguard-dashboard-development) during UtilityHub work.

## Primary goal
Make UtilityHub fully operational and functional before public launch. This means every published tool must work for valid and invalid inputs, navigation/search must work, responsive behavior must be usable across device classes, SEO/deployment configuration must be correct, and real browser QA must be completed before claiming production readiness.

## Current inventory
27 published tool pages. Authoritative directory: tools.html. Shared logic: tool-pages.js.

## Completed foundations
- 27-tool directory and shared renderer architecture
- Search/filter directory
- Responsive/mobile hardening including 420px rules, touch targets and reduced-motion support
- Image utilities hardened with 25 MB practical input guard and object URL cleanup
- Renderer mapping audit and repairs
- Word & Character Counter whitespace bug repaired
- Tool directory filtering structure repaired
- Homepage SEO metadata and WebSite JSON-LD
- robots.txt and sitemap.xml
- canonical metadata foundation
- PWA manifest and favicon
- 404, About, Privacy, Terms and Contact pages
- Project documentation in docs/
- No fake monetization, fake traffic, fake testimonials or fabricated provider approval

## Important known limitations
1. Real browser/device QA is still pending. GitHub source inspection is not browser testing.
2. Production domain is not yet known/configured. Never invent one.
3. No GitHub Actions CI suite currently exists.
4. Contact/support details must be finalized before public launch.
5. Privacy/disclosure text must be updated if analytics, ads, affiliate tracking or other third-party services are enabled.

## Engineering workflow
Inspect -> Plan -> Build -> Test -> Re-fetch -> Verify -> Document -> Continue.

For each meaningful change:
1. Read current GitHub main state.
2. Establish the exact observable outcome and affected files.
3. Make the smallest coherent change.
4. Verify source/syntax and relevant invariants.
5. Re-fetch changed files from GitHub.
6. Record the change in docs/CHANGELOG.md.
7. Update PROJECT_DOCUMENTATION.md for architectural decisions.
8. Do not claim browser/runtime success unless it was actually tested.

## Next work queue
### Priority 1: functional correctness
Audit tool-pages.js in bounded batches for real edge cases:
- Percentage and percentage-change zero/division cases
- Discount and financial input validation
- Loan zero-interest and invalid-term handling
- BMI unit/range handling
- Date difference semantics and invalid dates
- Unit converter supported-unit validation
- Compound interest invalid values
- Profit margin and ROI zero-denominator cases
- Break-even zero contribution margin
- Time duration and overnight behavior
- Business days date order
- Random number bounds and secure randomness fallback
- Aspect ratio/GCD validation
- Unix timestamp seconds/milliseconds and invalid dates
- Base64 Unicode/error handling
- JSON formatter/validator errors
- Password generator character-pool and randomness handling
- Image input/output errors and mobile memory limits

### Priority 2: integration correctness
- Confirm every tools/*.html page has the correct renderTool type.
- Confirm every renderTool type has exactly one renderer.
- Confirm all directory links resolve to existing pages.
- Confirm sitemap contains intended indexable pages without duplicates.
- Check metadata consistency across representative pages.

### Priority 3: browser QA
After a real deployment:
- Android Chrome
- iPhone Safari
- tablet viewport
- desktop Chromium/Firefox/Safari where available
- test homepage, directory search/filter, representative calculator, image utility, developer utility, 404, legal pages
- inspect console errors, layout overflow, touch controls and downloads

### Priority 4: launch readiness
- Set final production domain.
- Update sitemap/canonicals/OG/structured data.
- Verify robots.txt and sitemap in production.
- Finalize contact/support information.
- Configure legitimate analytics only if desired.
- Update privacy/disclosure text before trackers/ads/affiliate links.
- Deploy and verify live behavior.
- Only then consider AdSense/affiliate/premium/digital-product monetization.

## Cross-chat continuation rule
A future chat should treat this file plus:
- docs/PROJECT_DOCUMENTATION.md
- docs/CHANGELOG.md
- docs/DEVELOPMENT.md
- README.md
as the durable project context.

When a new chat says "Continue @GitHub @get-fable @Codex Engineering Guardrails" for UtilityHub:
1. Identify Srjp2004/utility-hub.
2. Fetch this continuation state and the latest relevant docs/files from main.
3. Check the current GitHub state rather than relying on old chat claims.
4. Resume from the first unfinished item in the work queue.
5. Preserve all constraints above.
6. Update this file whenever priorities, architecture, blockers or completed milestones materially change.

## Last verified state
- Main branch is the integration target.
- The 27-tool directory structure was freshly audited after the latest correction.
- Percentage and Discount arithmetic overflow guards were added with regression tests for extreme finite inputs.
- Shared tool-pages.js has been source-audited for duplicate functions, renderer dispatch, brace balance and object URL cleanup.
- Browser-level verification remains outstanding.
- The corrected test suite was re-run by GitHub Actions in run `35522219812` on commit `c11c26f...`; both Node 22.x and Node 20.x jobs completed successfully.
- Corrected remaining stale regression-harness assumptions and documented the Node Web API requirements for Base64 coverage. The first CI execution exposed six stale assertions rather than a production runtime/loader failure; those expectations have now been aligned with the current production contracts.
- Business Days calculation was hardened to use bounded week arithmetic while preserving inclusive weekday semantics.
- Homepage `app.js` calculator path was hardened for finite numeric results, whole-number loan months/people, supported unit validation, and UTC-stable date parsing.
- This document is the durable handoff anchor for future chats.

- Image Resize hardening now requires the computed output height to be a safe integer before canvas allocation.

- Image Compressor/Converter now validate decoded dimensions before canvas allocation; compressor quality and converter output MIME type are validated; Unix timestamp conversion rejects unsafe numeric values before Date construction.

- Sitemap coverage was checked against the current 27-tool inventory; the four newest developer/utility pages (Random Number, Aspect Ratio, Unix Timestamp, Base64) are explicitly included.

- Revenue architecture requirement: keep the core browser tools free while reserving non-blocking monetization surfaces for a measured rollout (ads, affiliate links, sponsored placements, premium utility packs/API). Monetization must not require uploading private local files or degrade core tool performance.

- Added `.github/workflows/test.yml` to execute `npm test` automatically on pushes to `main` and pull requests targeting `main`, across Node 20.x and 22.x; workflow creation was re-fetched successfully, but GitHub Actions runtime status remains unverified through the available connector.

- During the image audit, a duplicate `async` token was introduced in the `imageConvert` declaration while applying the hardening patch; this was caught by immediate source re-fetch verification and corrected in commit `cb45a5cd4a096c0a2a4f65d7796ac01ca9868d55`. Re-fetch confirms the declaration is now syntactically shaped as `async function imageConvert` and no `async async` remains.

- Verified GitHub Actions is executing `.github/workflows/test.yml`: recent run `35521794398` on commit `cc2cfdb...` completed with `failure` on both Node 20.x and 22.x. In each job, checkout and Node setup succeeded, while `Run regression tests` failed immediately. The available connector could not retrieve the job log body, so the exact npm-test error is not yet evidenced.

- CI diagnosis: the Actions jobs fail at `npm test` itself, while checkout and Node setup succeed on both Node 20.x and 22.x. The test script is `node --test tests/tool-pages.test.js`. The connector exposes step-level failure but not the process stderr, so the exact failing assertion/loader error remains unresolved; no blind production patch was made.

### 2026-09-20 - Integration test coverage expansion
- Added `tests/tool-pages.integration.test.js` to verify the 27 tool pages are wired to the shared renderer, expose their mount point, include indexable metadata, and appear in `sitemap.xml`.
- Updated `package.json` test script from the single regression file to `node --test tests/*.test.js`, so CI executes both behavioral regressions and page-level integration checks.
- Commit sequence: `25dcf025f093361b4c49a10a9c310e6dca465980`, then `2d93323d1407ce974ed0a21cbfc24b2af8524d56`.
- CI verification is pending for the new integration suite.

### 2026-09-20 - CI failure diagnosis and test correction
- Verified failed Actions run `35522449784` from its actual job log.
- The behavioral suite passed 15/15; the new integration suite failed on the first page because the assertion expected one exact quote style for the `tool` mount attribute.
- This was a test-harness brittleness issue, not a production defect. Updated the integration assertion to accept either single or double quotes around the `tool` id.
- Fix commit: `ff4c72080db0acf160661c82f9f52b89236acd80`.
- New CI verification is required before proceeding.
