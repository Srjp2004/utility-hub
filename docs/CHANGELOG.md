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

## Next milestone
Complete the remaining full functional audit in bounded batches, test representative tools on real mobile and desktop browsers, improve high-intent tool-page UX/internal linking, establish analytics readiness, prepare legitimate monetization surfaces, then deploy and measure real user behavior.
