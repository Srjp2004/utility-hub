## 2026-10-06 - Brand implementation completion decision
- The primary brand SVG must be consumed by the existing shared `.logo` component rather than merely existing as an unused repository asset.
- CSS integration was selected as the smallest coherent change because the repository already uses the same `.logo` markup across header/footer surfaces. It preserves accessible link text, avoids duplicating SVG markup across pages, and keeps the static architecture intact.
- The favicon remains a standalone SVG for browser/PWA use, and the existing manifest remains the source of PWA icon metadata.

## 2026-10-06 - Final 28-tool verification checkpoint
- The current production baseline is `ee08f53cfe0d54aa94b5cdf828143195d4b75e4f`.
- Fresh GitHub evidence establishes successful regression tests on Node 20/22, five-browser-profile E2E coverage, and DevSecOps coverage including dependency audit, SBOM, security browser checks, CodeQL and source invariants.
- The published 28-tool surface is exercised by the E2E suite both for route loading and primary user action flows.
- No verified application defect currently justifies a production-code change. Remaining autonomous-workflow failures are isolated infrastructure/control-plane evidence and are not treated as product defects.

## 2026-10-06 - Evidence-first Google indexing and autonomous workflow decision
- Search Console is now connected to the production UtilityHub URL-prefix property. Sitemap submission and homepage priority-crawl request are externally confirmed by Google; these are indexing signals, not guarantees of indexing.
- The autonomous engineering and repair workflows are intentionally event-bounded rather than push-driven in the current repository configuration. Their intended triggers are workflow dispatch/issues and workflow_run/workflow dispatch respectively.
- Historical push-triggered zero-job failures were investigated against the exact merge SHA and parent workflow revisions. Because the repository source does not contain the reported push trigger and the failed runs expose no jobs or step evidence, changing workflow logic would be speculative.
- The project therefore records the anomaly as unverified infrastructure/event history rather than silently modifying or weakening the autonomous control plane.

## 2026-10-03 - Image selection feedback architecture decision
- Existing browser-local image tools retain their current 20-file and 25 MB safeguards, but now preserve a per-tool rejected-file count so selection feedback reflects what the user actually supplied.
- Unsupported MIME types, files above the size limit and files beyond the batch limit are counted as skipped after filtering; accepted files continue through the existing local preview/processing pipeline.
- The change is intentionally incremental and does not introduce uploads, server-side processing, dependencies or a new image service.

## 2026-10-03 - Effective tool search architecture decision
- The existing homepage Finder and tool directory share a browser-local search utility rather than introducing a backend, third-party search provider or new dependency.
- Search normalization removes case/diacritic/punctuation differences, token scoring supports exact and prefix matches plus bounded typo tolerance, and relevance ordering keeps stronger matches first.
- Homepage live filtering remains limited to the featured cards while Enter transfers the query to the existing 28-tool directory through the static tools.html?q=... route.
- This is an incremental capability within the current static HTML/CSS/JavaScript architecture and does not change tool algorithms or the product backend-free boundary.

## 2026-10-02 - Directory taxonomy matching decision
- Category filters now use whole normalized tokens rather than substring matching. This reduces false-positive category membership while retaining the existing static taxonomy and explicit terms.

## 2026-10-02 - PR #179 verification repair decision
- Browser evidence initially exposed a count expectation mismatch during verification; the fixed numeric assertion was removed rather than retaining an incidental category count as a contract.
- The final regression uses semantic inclusion/exclusion checks so the test verifies calculator membership without coupling correctness to the current number of matches.

## 2026-10-02 - Directory category taxonomy decision
- The existing directory category filter remains a lightweight static classification rather than a new taxonomy service.
- The calculator category now explicitly includes the existing Aspect Ratio Calculator; Tip & Bill Split was already matched by the calculator terms. Regression coverage checks both tools are visible and image/JSON tools remain excluded.

## 2026-10-02 - PR #178 query-hydration repair decision
- The Finder handoff uses the existing directory query parameter. Browser verification demonstrated that URL state alone was insufficient because the visible directory search control did not reflect the transferred query.
- The repair makes URL state and visible input state consistent before filtering, improving both usability and deterministic browser verification.

## 2026-10-02 - PR #178 verification repair decision
- Browser verification identified that the new Finder filtering behavior relied on the native `hidden` attribute, while the redesigned homepage card stylesheet needed an explicit `display:none!important` rule for its card class.
- This was corrected as a concrete, diagnosis-driven repair. The existing test wording was also synchronized with the intentional featured-tool status message.
- The repair preserves the full-directory Finder behavior and does not weaken tests or security controls.

## 2026-10-02 - Utility Finder and visual consistency decision
- The homepage Finder now has two deliberate behaviors: live filtering of the 12 featured tools while typing, and full-directory search on Enter. This preserves instant feedback without limiting discoverability to the featured subset.
- Query state is transferred through the existing static directory as `tools.html?q=...`, avoiding backend state or a new search service.
- The homepage featured card system now uses one light visual surface. QuotePulse remains visually featured through placement/content rather than an unrelated dark theme, reducing cross-card contrast and typography drift.
- Shared controls use the existing system font stack and a consistent 44px minimum interactive height; specialized tool internals remain unchanged.
- Regression tests verify Finder handoff, directory query initialization, card surface equality, title font equality and action-size equality.

## 2026-10-02 - Responsive interface hardening delivery record
- PR #177 delivered the shared responsive interface layer at main commit `4f357cfa801803342762130468b6b4c2258d98f2`.
- The exact PR head was independently gated by the repository's Tests, Browser E2E, DevSecOps and Quality Gate workflows before merge.
- The change remains CSS-first and static-architecture compatible. It adds explicit 1100px, 760px and 480px responsive contracts and regression coverage without changing tool algorithms, dependencies, backend behavior or security controls.
- Production deployment status is reported successful by Vercel. This does not replace physical-device QA.
- Remaining verification scope is live browser/device coverage and detailed visual/interaction review across the 28 published tools.

## 2026-10-02 - Responsive interface system decision
- The existing CSS-first architecture is retained. The concrete responsive defect was a breakpoint gap: the four-column homepage grid remained active through a 799px viewport even though that width is commonly tablet/compact-landscape territory.
- The responsive contract now uses 1100px for desktop-to-tablet restructuring, 760px for phone/small-tablet stacking, and 480px for compact-phone spacing and control sizing.
- The shared contract applies to homepage cards, directory cards, navigation, tool workspaces, BMI/QuotePulse result layouts, image-tool controls and footer surfaces so individual pages do not drift into separate responsive systems.
- Regression coverage verifies computed grid structure and viewport containment at 799px and 390px.
- No framework, backend, dependency, tool algorithm, security-policy, MachineMind or LeaseGuard change was introduced.

## 2026-10-01 - Image drop-zone lifecycle hardening
- Fixed an identified lifecycle defect in the existing Image Resizer, Compressor and Converter: drag/drop listeners are delegated at document level so dynamically rerendered drop zones retain drag/drop behavior.
- No new tool, dependency, backend, security-policy, MachineMind or LeaseGuard change.
- PR #176 requires fresh Tests, Browser E2E, DevSecOps and Quality Gate evidence before delivery.

## 2026-10-01 - Interface system decision
- UtilityHub now uses an editorial utility-studio visual language: dark/charcoal anchors, a restrained lime action accent, large task-oriented typography, compact metadata, asymmetrical card hierarchy and focused workspace surfaces.
- The redesign remains CSS/HTML/JavaScript based and does not introduce a framework, backend, AI provider, database or expensive service.
- Shared styles intentionally preserve specialized QuotePulse, BMI and image-tool components while harmonizing their surrounding surfaces.

## 2026-10-01 - Image Resizer crop sizing consistency
- Image Resizer output sizing now derives locked dimensions and percentage scaling from the effective crop rectangle when square or custom cropping is selected.
- The preview and processing paths share the same output-dimension calculation, preventing crop-induced stretching.

## 2026-10-01 - Image Resizer custom crop architecture
- The existing Image Resizer now offers four crop modes: none, center-to-output-ratio, square, and custom rectangle.
- Custom cropping is source-pixel based and bounded to the selected image before the resize canvas is rendered; invalid or out-of-bounds rectangles are rejected.
- The feature remains browser-local and dependency-free, preserving existing file-size, dimension and batch safeguards.

## 2026-10-01 - Current delivery checkpoint
- PR #167 documentation synchronization is merged at `866c5e3227b1474b13cf7921210707c32d1a2e4d`. The GitHub `main` branch remains the authoritative source for the current SHA.
- PR #165 is merged at `8e722401d11db5e725c2d50ad6fccf949be47ea9`; its exact head passed Tests, Browser E2E, DevSecOps and Quality Gate before delivery.
- PR #166 exact head `a06a177a3ebfaf4885c1d6049229b433728a28a3` passed Tests, Browser E2E, DevSecOps and Quality Gate before delivery; Vercel reported the preview Ready.
- No post-merge GitHub Actions workflow runs are exposed for the current merge commit, so they are not treated as production evidence. Vercel currently reports a successful status for the merge commit.
- The next engineering focus remains concrete functional defects/missing regression coverage, followed by live browser/device verification.

## 2026-09-30 - Image Resizer crop architecture
- The existing Image Resizer now supports an optional deterministic crop stage before resizing.
- Center crop to output ratio removes excess image area symmetrically to match the requested output ratio; Square crop uses the largest centered square.
- Crop calculations operate on decoded source dimensions and preserve the existing canvas/output safeguards.
- The feature remains browser-local and dependency-free.

## 2026-09-30 - Age Calculator calendar-day consistency
- Age Calculator date-only inputs are represented internally as UTC calendar components to avoid timezone drift.
- Future-date validation and age arithmetic must use the same calendar-day representation; mixing UTC-parsed birth dates with local Date getters can shift the effective birth day in positive-offset timezones.
- The follow-up regression test locks the expected birthday boundary behavior without changing the public tool contract.

## 2026-09-25 - Existing-tool quality direction
- UtilityHub will improve the existing 28 published tools rather than creating additional tools during this quality wave.
- Tool quality includes correctness, validation, result formatting, visualization where appropriate, responsive/adaptive UX, accessibility, print/export behavior where applicable, security and regression coverage.
- QuotePulse uses a browser-local report-oriented UI and dedicated print CSS. BMI uses an adult-category scale and explanatory result details. The BMI result UI also uses a segmented visual gauge with an explicit marker, category legend, responsive stacking, and reduced-motion support.
- No framework, backend, database or paid AI service was introduced.

### 2026-09-23 - QuotePulse duration regression merged
- Merged PR #97 into main at merge commit `296c0c2716ed3e8a2d4bf23cc39521829d985bed`.
- QuotePulse now excludes duration-like and quantity-like numeric lines from monetary line-item detection.
- Regression coverage verifies that a `12-month warranty` is not treated as a monetary line item.
- Pre-merge Tests, Browser E2E, DevSecOps and Quality Gate evidence was green on the PR head.
- Post-merge deployment verification remains pending while Vercel status is pending.
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
- app.js for homepage search behavior
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


## 2026-09-23 - Responsive/CSP consolidation decision
- The Tools directory filter/search logic is now designed to load from external `tools-directory.js`, allowing the deployment CSP to keep `script-src 'self'` without requiring an inline directory script.
- Responsive behavior remains CSS-first and browser-native. The consolidated UI work adds adaptive header/navigation behavior, small-screen typography/card/result safeguards, touch-friendly controls, focus-visible states and reduced-motion handling without introducing a framework or backend.
- Homepage featured-tool search now has an explicit accessible label and `type="search"` semantics; its scope remains the featured cards rather than the full directory.
- The consolidated change intentionally does not alter calculator algorithms, add paid services, add a backend, or weaken existing tests.
- Fresh CI evidence for corrected PR #92 commit `02b4fe7a7c0190d6c284dce05eb2f4da924f6bff`: Tests, Browser E2E, DevSecOps and Quality Gate all passed. This verifies the repository/CI acceptance gates for that commit; physical-device and live-production verification remain separate launch gates.
\n\n## 2026-09-23 - PR #103 verification and documentation checkpoint\n- PR #103 merged the expanded functional regression suite at `afcf75672d4d6a0acddbabae8dac330f5a4616bb`; production runtime code was unchanged.\n- Exact-merge-commit GitHub Actions evidence is fresh and green: Tests `35892642427`, Browser E2E `35892642438`, and DevSecOps `35892642521`.\n- Browser E2E covered Chromium, Firefox, WebKit, mobile Chromium and mobile WebKit. DevSecOps covered dependency audit/SBOM, CodeQL, source security invariants and security-focused browser checks.\n- Vercel reports `success` with deployment completed for the exact merge commit.\n- These checks establish CI/deployment evidence only; real Android/iOS/desktop/tablet certification and independent live-runtime verification remain separate launch gates.\n- PR #102 is retained open for traceability but should be superseded by a documentation update based on current main rather than merged unchanged.\n

## 2026-09-24
- Security hardening follow-up: removed remaining runtime-generated inline event handlers from `tool-enhancements.js`; copy actions now use CSP-compatible delegated event handling. No calculator or tool algorithm was changed.
 - Exhaustive primary-flow E2E coverage
- PR #109 merged at `2e27aa54cbc533443ee715ca1509d103a27d1978`.
- The new test exercises the primary interaction path for all 28 published tools across Chromium, Firefox, WebKit, mobile Chromium and mobile WebKit.
- The harness uses valid type-aware seed inputs and a minimal PNG fixture for file-input tools, and records page/console errors while requiring observable result output.
- Failure handling followed diagnosis-before-repair. The observed failures were test-harness defects, so production code was not modified.
- Fresh final PR evidence: Browser E2E `35904335988`, DevSecOps `35904336097`, Tests `35904336039`, and Quality Gate `35904336016` all passed.
- Post-merge verification remains required on the new main SHA. Vercel build-rate-limit status does not establish deployment success.

## 2026-09-24 - Security hardening decision
- Reapplied the justified automation trust-boundary and browser-header hardening directly on current main rather than merging the previously divergent security branch.
- Autonomous repair/engineering workflows now keep secret-backed delegation in a separate trusted job and avoid shell interpolation of untrusted task/request content.
- Production header policy now includes HSTS and CORP same-origin and no longer permits CSP style-src unsafe-inline.
- PR #127 was verified on its exact head with the complete Tests, Browser E2E, DevSecOps and Quality Gate suite before any merge decision. No production algorithm changes were introduced.


## 2026-09-24 - CSP style policy consistency correction
- Fresh main re-fetch found a documentation/configuration mismatch: `vercel.json` still allowed `style-src 'unsafe-inline'` even though the prior security note said it had been removed.
- Re-checked production HTML and shared JavaScript for inline `<style>`, `style=` attributes, and CSSOM string setters. No inline style blocks or style attributes were found; the remaining runtime `element.style.display` assignment uses a directly set CSS property, which does not require `unsafe-inline` under CSP.
- Removed `style-src 'unsafe-inline'` from the Vercel CSP and strengthened the DevSecOps invariant to require HSTS, CORP, and the absence of `unsafe-inline`.
- This correction does not change calculator/tool algorithms. Fresh CI verification is required on the PR head.

## 2026-09-24 - Validation carry-forward architecture decision
- Remaining functional validation corrections are carried from stale stacked branches onto a clean current-main branch.
- Scope is limited to shared numeric-input validation, strict ISO calendar dates, and Percentage Change empty-input handling.
- Already-integrated Unicode and safe-integer hardening is not duplicated.


## 2026-09-25 - Production hostname continuity checkpoint
- The authoritative UtilityHub production hostname is `https://utility-hub-ten.vercel.app`.
- `sitemap.xml` contains 39 indexable URLs, including all 28 published tool pages, and `robots.txt` points to the absolute sitemap URL on this hostname.
- `utility-hub-tau.vercel.app` is not the authoritative production hostname and must not be used for current canonical, sitemap, robots, analytics, or monetization configuration.
- Physical-device/browser certification and live runtime SEO/security-header verification remain separate release gates.


## 2026-09-25 - SEO metadata integrity
- Published tool pages are expected to expose one canonical metadata set per social metadata field. The integration suite now guards against duplicate Open Graph and Twitter metadata. The 2026-09-25 audit found and removed duplicate social metadata on the Loan Payment, Compound Interest and Discount pages, preventing accidental head duplication from being treated as valid SEO markup.


## 2026-09-25 - Post-merge verification checkpoint
- PR #147 merged to `main` as `f25279e5a0a580f4919bfaf188f637f757ad2d95` after fresh PR-head Tests, Browser E2E, DevSecOps and Quality Gate success.
- Post-merge push verification completed successfully for Tests, Browser E2E and DevSecOps on the merge commit.
- The current Vercel status is a provider-side free-plan deployment-rate-limit failure (`api-deployments-free-per-day`). This is deployment evidence, not an application build/test failure. The existing verified deployment remains the runtime reference until Vercel permits a new deployment.


## 2026-09-25 - Clean-codebase refactor
- Removed the retired homepage modal calculator implementation after dedicated tool-page navigation made it unreachable.
- Reduced app.js to its active homepage search responsibility and removed the unused tool-enhancements.js module.
- Removed corresponding dead modal markup and CSS while preserving shared form/result styles used by published tools.
- Added regression guards so the retired implementation cannot silently return.

## 2026-09-25 - PR #149 verification repair
- The clean-codebase refactor correctly retired `tool-enhancements.js`, but six existing tool pages retained stale script references to that deleted module.
- This was a real browser/runtime integration defect exposed by fresh CI, not a reason to restore duplicate code.
- The bounded repair removes only the stale references and adds a repository-wide integration regression guard.

## 2026-09-26 - Public information page UX/content update
- About, Privacy, Terms and Contact are now treated as first-class public product pages with consistent navigation/footer structure and clearer disclosures.
- Contact provides separate help and support email channels: `utilityhub.help@gmail.com` and `utilityhub.support@gmail.com`.
- Privacy language distinguishes current browser-local core processing from future analytics/advertising/affiliate services and avoids claiming services that are not verified as active.
- No runtime tool algorithms, backend or dependencies were changed.


## 2026-09-26 - Release-state documentation checkpoint
- Current main includes the public trust/contact page update from PR #152 at `3d24fd1154fc59add1c33361a9c8943889707db8`.
- The public pages now provide clearer browser-local processing disclosures, acceptable-use/limitations language and separate support/help email channels without adding a backend, dependency or calculator algorithm changes.
- Stale documentation PRs #150 and #151 were closed rather than merged because their snapshots were based on an older main state.
- Release readiness still requires fresh post-merge CI evidence and real-device/live-runtime verification; these are not inferred from the successful PR-head gates.


## 2026-09-30 - Image Converter architecture decision
- The existing Image Converter now follows the established browser-local image-tool architecture shared with Image Resizer and Image Compressor: bounded file intake, object-URL previews, decoded-dimension validation before canvas allocation, allowlisted output MIME types, quality range validation, and per-file result rendering/downloads.
- Processing remains entirely client-side for the current tool set; no backend, external image-processing service, new dependency, MachineMind or LeaseGuard change was introduced.
- Converter E2E coverage uses an explicit primary-action selector because the page intentionally contains a separate file-picker action before conversion. This keeps the exhaustive interaction test aligned with the actual tool contract without weakening the smoke-test requirement.


## 2026-09-30 - Adaptive/lively UI architecture decision
- PR #161 introduced a lightweight CSS-first adaptive interaction layer for the existing UtilityHub interface.
- The layer adds subtle visual depth, responsive interaction surfaces, accessible homepage search status feedback, reduced-motion support and coarse-pointer safeguards while preserving the static HTML/CSS/browser-JavaScript architecture.
- Homepage search now uses semantic `hidden` state plus a `role="status"` live region instead of presentation-only inline display mutation, improving feedback for assistive technology and keeping filtering behavior explicit.
- No new tool, backend, database, framework, dependency, external processing service, MachineMind or LeaseGuard change was introduced.
- Pre-merge Tests, Browser E2E, DevSecOps and Quality Gate passed on exact PR #161 head `c29d8d3498fedae4b5c162215a903aae44627800`. Post-merge GitHub Actions for merge commit `6ab18eed41f907225a8a02fd36237b6cbfe3dffb` are not exposed by the current connector, so they are not claimed here.

### UI contrast repair — 2026-10-01
Shared styling now explicitly protects readable foreground/background contrast for primary CTAs, tool-panel buttons, image downloads, result emphasis, and dark command/search inputs. An E2E guard was added so visible shared controls cannot regress to transparent/unreadable surfaces.


### Shared tool UI contract — 2026-10-01
The shared tool workspace now has one presentation contract: light white panel, UtilityHub ink text, readable form controls and consistent primary/secondary actions. Specialized tools can have internal cards, but must not replace the shared workspace with an unrelated page-level theme. Browser coverage protects this contract across representative tools.

### Image picker accessibility repair - 2026-10-01
The image Resizer, Compressor and Converter drop zones retain a visible file-picker affordance while exposing one coherent keyboard-operable button-role surface. Enter and Space activate the associated hidden file input, avoiding nested interactive controls. E2E coverage guards this interaction contract across the supported Playwright browser matrix.
## 2026-10-03 - PR #179 delivery record
- PR #179 was squash-merged at `c12ee40cc7b1a8b66f92aecaf2ee28387740f47f` from exact head `4187be76574c39495cd3ec0b5c21fe580a56abd6`.
- Exact-head Tests, Browser E2E, DevSecOps and Quality Gate passed before protected delivery.
- Vercel production deployment for the merge SHA is READY.
- Post-merge GitHub Actions runs are not exposed by the connector and are not treated as verified evidence.
- No new tool, backend, dependency, security-policy, MachineMind or LeaseGuard change was introduced.

