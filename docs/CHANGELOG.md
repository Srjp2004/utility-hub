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

## 2026-09-20
- Continued the functional-correctness audit of `tool-pages.js`.
- Removed stale duplicate renderer views for Random Number, Aspect Ratio, Unix Timestamp and Base64 tools so each tool type has one active view definition.
- Extended the Unix Timestamp Converter with explicit Seconds, Milliseconds and Auto-detect input modes. The converter still rejects non-finite values and unsupported date ranges.
- Re-fetched `tool-pages.js` after the change and verified the active renderer map contains the 27 expected tool types, with no duplicate function declarations.

## 2026-09-20
- Hardened the Random Number Generator range arithmetic against JavaScript Number precision issues at large safe-integer bounds.
- The generator now performs range and rejection-sampling arithmetic with `BigInt` while retaining safe-integer input validation and the Web Crypto source.
- Fresh source verification confirmed safe-integer guards, BigInt range arithmetic, rejection sampling, Web Crypto availability checks, and absence of `Math.random()` in the generator.

## 2026-09-20
- Hardened Image Converter failure handling by checking for a usable Canvas 2D context before processing and validating that the browser returned the requested output MIME type before download.
- Re-fetched `tool-pages.js` and verified the image-conversion guards alongside existing Base64 Unicode/error handling, JSON error handling, random BigInt arithmetic and single renderer-dispatch definition.

## 2026-09-20
- Tightened Aspect Ratio Calculator validation so width and height must be positive safe integers rather than silently rounding decimal inputs.
- Removed unnecessary rounding from the GCD calculation and result, making invalid fractional input explicit instead of silently changing the user's values.
- Fresh source verification confirmed positive safe-integer validation and direct GCD calculation.

## 2026-09-20
- Hardened Compound Interest Calculator against numeric overflow: after validating inputs, the calculator now rejects results that exceed JavaScript's finite numeric range instead of formatting `Infinity` as if it were a valid balance.
- Fresh source verification confirmed finite-input validation, integer compounding frequency validation, the compound-interest formula, and the explicit overflow guard.

## 2026-09-20
- Hardened Loan Payment Calculator against numeric overflow by rejecting non-finite monthly-payment or total-payment results instead of displaying invalid financial values.
- Fresh source verification confirmed the existing positive-input validation and zero-rate handling remain intact, with the new finite-result guard applied after the loan formula.

## 2026-09-20
- Completed a fresh shared-renderer source integrity pass after the recent calculator hardening work.
- Verified all 29 expected tool functions are declared exactly once in `tool-pages.js`.
- Re-verified key reliability invariants for Loan, Compound Interest, Aspect Ratio, Random Number, Unix Timestamp, Base64 and Image processing paths.
- No additional production-code mutation was required in this verification pass.
## 2026-09-20
- Fixed the tool-directory category filters so Percentage Change appears under Calculators and Random Number, Aspect Ratio, Unix Timestamp and Base64 appear under Text & developer tools.
- Fresh source verification confirmed the directory still contains 27 unique tool links and the category-filter term sets now cover all published cards by their intended category.
## 2026-09-20
- Hardened Interest, Tip & Bill Split, and BMI calculations against non-finite arithmetic results so extreme numeric inputs return a clear reliability message instead of displaying Infinity/NaN.
## 2026-09-20
- Made Date Difference and Business Days calculations timezone-stable by using UTC date construction and UTC day iteration.
- Date Difference now reports the exact whole-day interval rather than rounding a potentially timezone-shifted duration.
## 2026-09-20
- Added Vercel response headers for a static, CDN-cacheable deployment: security hardening headers plus differentiated caching for immutable-style assets and HTML documents.
- This keeps the current frontend stateless and horizontally scalable: requests do not require application servers, sessions, or a shared database.
