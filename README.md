# UtilityHub

A global, mobile-first collection of useful calculators and productivity tools.

## Product direction

UtilityHub is not country-specific. The core tools are designed for users worldwide and avoid assumptions about a specific education system, payroll system or currency.

## Initial tool categories

- Math and everyday calculations
- Finance and loan calculations
- Date and time utilities
- Unit conversion
- Text and productivity tools
- Image utilities
- Career utilities

## Monetization-ready architecture

The product is designed for multiple revenue channels:
- Google AdSense after the site has enough original content, strong navigation and passes Google's review
- Clearly disclosed affiliate placements for relevant products and services
- Premium/pro tools
- Digital products
- Sponsorships and partnerships

No monetization method is treated as guaranteed or instant. The first priority is useful tools, search-friendly pages, good UX and repeat usage.

## Technical approach

The first version is a lightweight static site with browser-side calculations and no required backend. This keeps hosting and operating costs low and allows privacy-friendly tools that process inputs locally.

## Deployment

The authoritative production hostname for the current deployment is `https://utility-hub-ten.vercel.app`. Canonical URLs and the sitemap are configured for this hostname.


## Project documentation

Detailed project knowledge is maintained in `docs/` so development can continue without relying on chat history:

- [Project Documentation](docs/PROJECT_DOCUMENTATION.md) - product scope, architecture, decisions, device requirements and monetization roadmap.
- [Changelog](docs/CHANGELOG.md) - chronological implementation and verification history.
- [Development Guide](docs/DEVELOPMENT.md) - safe change procedure, functional/SEO/device acceptance and deployment checklist.

### Current engineering status

The repository is an active MVP build. The current architecture intentionally uses static HTML/CSS/browser JavaScript. A backend, database, authentication or framework migration is not required for the current tool set.

Current readiness work is evidence-driven: complete the remaining bounded functional audits, verify representative tools on real devices/browsers, maintain the current deployment configuration, verify live canonical/sitemap/robots/security behavior, and prepare legitimate monetization according to the relevant provider requirements. The production domain may change in future and is treated as deployment configuration.

### Documentation rule

Every meaningful future implementation change should update `docs/CHANGELOG.md`. Architectural decisions should also update `docs/PROJECT_DOCUMENTATION.md`. Testing/deployment procedure changes should update `docs/DEVELOPMENT.md`.


## 2026-09-25 - Production deployment documentation checkpoint
- Authoritative production hostname: `https://utility-hub-ten.vercel.app`.
- Current sitemap and robots.txt use this hostname.
- Historical references to `utility-hub-tau.vercel.app` describe an earlier failed/stale deployment and are retained only as historical evidence in the continuation log.
- Production readiness still requires broader physical-device/browser certification and live verification of SEO/security headers; repository CI alone does not establish those gates.
