# UtilityHub Changelog

This file records major implementation steps so future work can continue from documented state.

## 2026-09 - Product foundation
- Created UtilityHub as a separate project from MachineMind and LeaseGuard.
- Established a global-first utility web-app concept.
- Chose lightweight static HTML/CSS/JavaScript architecture.
- Added homepage, tool directory and core information/legal pages.
- Added deployment compatibility for Vercel, Netlify and GitHub Pages.
- Added PWA manifest and favicon foundation.

## 2026-09 - Tool expansion
Added percentage, percentage-change, discount, age, loan payment, interest, tip/bill split, BMI, date difference, unit conversion, word/character count, compound interest, profit margin, ROI and break-even tools.

Added browser utilities for image compression, image resizing, image conversion, JSON formatting/validation, case conversion, password generation, time duration and business days.

Added random number generation, aspect ratio calculation, Unix timestamp conversion and Base64 encoding/decoding.

## 2026-09 - Discovery and SEO
- Rebuilt the tool directory to remove duplicate/messy sections.
- Added instant search/filter.
- Added new utilities to the directory and sitemap.
- Corrected a Git branch/tree state issue and independently re-fetched main to confirm pages were reachable.
- Added canonical/robots metadata to dedicated pages.
- Added homepage canonical, robots, Open Graph and Twitter metadata.
- Added homepage WebSite JSON-LD and verified the JSON parses.
- Strengthened homepage internal links to useful tools.

## 2026-09 - Responsive hardening
- Added mobile-first responsive safeguards.
- Added touch-friendly controls and 16px form controls.
- Added small-screen rules at 420px.
- Added reduced-motion support and overflow/wrapping safeguards.
- Hardened image tools for mobile performance with a 25 MB practical input guard and object URL cleanup.

## Verification record
Fresh GitHub reads and focused checks are used instead of trusting write-operation responses alone. Checks performed include JavaScript syntax validation, duplicate-function detection, sitemap count/uniqueness checks, tool-directory link checks, required-file checks, metadata checks and JSON-LD parsing.

If a connector/tool limit prevents a complete audit, remaining checks are recorded as unverified rather than assumed to pass.

## 2026-09 - Functional audit repair
- Found and repaired two shared-directory/runtime wiring defects during the bounded functional audit: the tool directory contained duplicate `id="toolGrid"` values, and the four newer utility renderers referenced `el(...)` without a shared helper definition.
- Updated the directory filter to collect all tool cards and assigned the secondary card group a unique ID.
- Added the shared `el` alias used by the Random Number, Aspect Ratio, Unix Timestamp and Base64 utilities.
- Structural verification after the repair is required before treating the audit as complete.

## Next milestone
Complete the remaining full functional audit in bounded batches, test representative tools on real mobile and desktop browsers, improve high-intent tool-page UX/internal linking, establish analytics readiness, prepare legitimate monetization surfaces, then deploy and measure real user behavior.

## 2026-09 - Functional directory audit
- Audited the searchable tool directory structure after the 27-tool expansion.
- Fixed the secondary tool-group wrapper so all tool cards live under the single `toolGrid` container used by search and category filtering.
- Verified from the integrated GitHub state that the directory contains 27 tool cards, exactly one `toolGrid` container, and no `toolGridMore` wrapper.
## 2026-09 - Functional audit: word counter repair
- Completed source-level runtime wiring coverage for all 27 tool pages; each page's `renderTool(...)` type matches a registered shared renderer.
- Found and repaired the Word & Character Counter whitespace regex so normal whitespace-separated text is counted correctly.
- Verification remains source-level; real browser interaction and download behavior still require browser testing.

## 2026-09 - Image utility input-path hardening
- Hardened the shared image loader to accept a File directly as well as a file-input element.
- This matches the current image tool callers and avoids relying on a `.files` property when a File object is passed.
- Verified the updated loader source was written to `main`; browser execution remains pending.

## 2026-09 - Tool directory functional correction
- Moved the four newest tool cards back inside the single `toolGrid` container used by search and category filtering.
- This restores consistent filtering behavior across the full 27-tool directory.
- Fresh source verification: one `toolGrid` container and 27 tool-card links.
## 2026-09 - Functional audit: validation and randomness hardening
- Hardened Tip & Bill Split input validation to reject non-finite values and non-integer party counts.
- Hardened Compound Interest validation to reject non-finite values and non-integer compounding frequencies.
- Hardened Random Number and Aspect Ratio inputs to require safe integers.
- Added a secure-randomness availability check to Password Generator and removed modulo bias from password character selection using rejection sampling.
- Fresh source verification passed for the targeted functions, duplicate function detection and brace balance. Real browser execution remains pending.

## 2026-09 - Tool directory integration repair
- Re-fetched the current main branch during continuation and found the four newest tool cards had drifted back into the "Start with a task" section instead of the main searchable tool grid.
- Moved those four cards back into the single `toolGrid` container so directory search and filtering cover all 27 published tools consistently.
- Fresh source verification: 27 tool-card links, exactly one `toolGrid`, no `toolGridMore` wrapper, and the newest four cards are inside the main grid.
- Browser-level QA remains pending.

## 2026-09 - Functional audit: finite-input hardening
- Hardened Percentage, BMI, Date Difference, Profit Margin, ROI and Break-Even calculators against non-finite numeric input before calculations.
- Preserved existing zero-denominator and domain validation behavior while making invalid browser/form values fail with a clear message instead of producing `NaN`/`Infinity` output.
- Fresh source verification after the change: 39 functions, no duplicate function names, balanced braces, 2 object-URL creations with 2 corresponding revocations, and targeted finite-input guards present.
- Browser-level execution remains pending.

## 2026-09 - Functional audit: date, time and financial review
- Re-fetched the shared calculator source and reviewed the remaining Priority 1 date/time and financial paths after the earlier validation hardening.
- Confirmed finite-input checks are present for Discount, Interest, Compound Interest, Loan Payment, Tip & Bill Split, Date of Birth, Time Duration and Business Days calculations.
- Confirmed Date of Birth, Date Difference and Business Days reject invalid parsed dates before calculation.
- No additional source mutation was made in this bounded review because the inspected paths already contained the required guards.
- Browser-level execution remains pending.

## 2026-09 - Functional audit: remaining date/time and discount guards
- Re-checked the live `main` source and hardened Discount against non-finite numeric input.
- Added invalid-date rejection to Age and Business Days calculations before date arithmetic.
- Added explicit range/finite validation to Time Duration inputs before overnight-duration calculation.
- Fresh re-fetch verification: 39 functions, zero duplicate function names, balanced braces, 2 object-URL creations with 2 corresponding revocations, and all targeted guards present.
- Browser-level execution remains pending.

## 2026-09 - Functional audit: developer utility pages
- Re-fetched the shared renderer and the dedicated Percentage Change, Unit Converter, JSON Formatter, Password Generator, Random Number, Aspect Ratio, Unix Timestamp and Base64 pages.
- Confirmed the dedicated pages dispatch to existing shared renderers and the inspected developer utilities contain explicit invalid-input handling where applicable.
- Corrected one documentation-copy mismatch on the Password Generator page: the page now describes the actual length control rather than claiming selectable character sets that are not exposed by the UI.
- No calculator logic was changed in this batch because the inspected implementations did not present a sufficiently clear defect requiring mutation.
- Browser-level execution remains pending.

## 2026-09 - Functional audit: image processing safeguards
- Hardened Image Resizer input validation to require a finite whole-number width from 1 to 16384 px and to reject output dimensions above the same practical browser-processing ceiling.
- Added canvas-context availability checks to Image Resizer and Image Compressor so unsupported browser environments fail with a clear message instead of throwing on a missing rendering context.
- Fresh source verification: 39 functions, zero duplicate function names, balanced braces, 2 object-URL creations with 2 corresponding revocations, and the new image safeguards are present.
- Browser-level execution remains pending.

## 2026-09-20
- Fixed a shared enhancement-layer compatibility bug in `tool-enhancements.js`: its global `loadImage` now accepts both File objects and file-input elements, matching the image utility callers.
- Added a fail-safe check to the enhancement-layer password generator so it reports when the browser does not expose the Web Crypto random source instead of throwing.
- Re-fetched the updated file and verified brace balance, image object-URL cleanup, File handling and password fallback source invariants.
