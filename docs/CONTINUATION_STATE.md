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
- This document is the durable handoff anchor for future chats.
