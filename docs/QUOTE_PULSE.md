# QuotePulse - Product and Engineering Specification

## Purpose

QuotePulse is a browser-local quote and estimate document checker inside UtilityHub. It is designed for a high-intent moment: a person receives a contractor, freelancer, agency, repair, moving, event, IT, or service quotation and wants a fast second-pass check before agreeing.

The MVP deliberately checks the **document itself** rather than claiming to know whether the quoted market price is fair.

## User promise

Paste a quote or estimate. QuotePulse checks for common document-level inconsistencies and missing terms, then gives the user a short set of questions they can send back to the provider.

## Current MVP scope

### Input

- Plain text pasted into the QuotePulse text area.
- No account required.
- No server upload.
- No external API or AI model required.

### Checks

The current analyzer can detect or estimate:

1. Line-item monetary amounts.
2. A stated total.
3. Arithmetic mismatch between detected line items and the stated total.
4. Deposit/down-payment percentage or amount.
5. Deposit risk thresholds:
   - above 50% is treated as a higher-priority flag.
   - above 30% is treated as a watch item when the stronger threshold is not met.
6. Vague scope language, including terms such as miscellaneous, other, TBD, allowance, provisional, as required, and contingency.
7. Missing warranty/guarantee language.
8. Missing change-order/variation/extra-work rules.
9. Missing cancellation/refund language.
10. Missing tax/fee language.
11. Duplicate-looking line items.
12. A document clarity score based on detected flags.
13. A negotiation-message draft containing questions derived from the detected issues.

## Output

The report UI uses structured metric cards, issue panels, detected-line-item rows and dedicated print CSS so browser Save as PDF produces a report-oriented layout instead of the normal interactive page.

The renderer presents:

- Clarity score.
- Detected issues and watch items.
- Supporting checks where applicable.
- A negotiation message.
- Copy-to-clipboard action.
- Print/save-PDF flow using the browser print dialog.
- A clear disclaimer that the tool is not professional, legal, financial, trade, or market-price advice.

## Privacy model

QuotePulse is intentionally browser-local in the current MVP.

The quote text is processed by JavaScript in the user's browser. The current implementation does not require a backend, account, analytics endpoint, external AI provider, or quote-storage database.

This privacy behavior is part of the product contract. Any future analytics, cloud history, AI processing, sharing, or subscription features must update the privacy/disclosure documentation before being enabled.

## Important non-goals

QuotePulse must not:

- Claim that a quote is objectively fair or unfair.
- Claim knowledge of local market pricing without a real, documented pricing dataset.
- Predict contractor/vendor trustworthiness from document text alone.
- Provide legal conclusions.
- Replace a professional inspection or estimate.
- Invent missing facts.
- Upload private quote contents merely to provide the core MVP analysis.

## Files

### Application

- `tool-pages.js`
  - QuotePulse renderer.
  - Quote analysis logic.
  - Flag generation.
  - Clarity scoring.
  - Negotiation-message generation.
  - Copy and print actions.

- `tools/quote-pulse.html`
  - Dedicated SEO/indexable page.
  - WebApplication metadata.
  - Product explanation and FAQ-style content.
  - Related UtilityHub links.

- `index.html`
  - Homepage tool card.

- `tools.html`
  - Directory card.

- `styles.css`
  - QuotePulse result, metric, flag, list, and responsive styles.

- `sitemap.xml`
  - Dedicated QuotePulse URL.

### Verification

- `tests/tool-pages.test.js`
  - Analyzer registration.
  - Deposit detection.
  - Total mismatch detection.
  - Renderer registration.

### Documentation

- `docs/CHANGELOG.md`
  - Release/change history entry.

- `docs/PROJECT_DOCUMENTATION.md`
  - Current tool inventory and architectural description.

- `docs/CONTINUATION_STATE.md`
  - Durable handoff state and next work queue.

## 2026-09-25 - QuotePulse quality upgrade
- Upgraded the existing QuotePulse workspace presentation without creating a new tool or backend.
- Added a reproducible example loader and dedicated print-report styling.
- Preserved the browser-local, document-only scope and non-market-price claims.
- Added regression coverage for the example action.

## Current engineering status

QuotePulse source integration has been committed to the main branch in commit `34571721c5b2da4e6edc93517df79d2b8377907f`.

At the time this specification was written, no fresh GitHub Actions result had been associated with that QuotePulse commit through the available GitHub integration. Therefore the implementation is **not** described as CI-verified.

Browser/device QA has also not been completed. Source-level tests and documentation do not substitute for real browser testing.

## Verification plan

Before treating QuotePulse as production-ready:

1. Run `npm test` through GitHub Actions on the QuotePulse commit.
2. Confirm both supported Node versions complete successfully.
3. Open the dedicated page in a real browser.
4. Test:
   - empty input;
   - normal quote;
   - mismatched total;
   - deposit percentage;
   - deposit amount;
   - vague scope;
   - missing warranty;
   - missing change-order terms;
   - missing cancellation/refund terms;
   - missing tax/fee terms;
   - duplicate-looking items;
   - copy action;
   - print/save-PDF action;
   - mobile layout.
5. Check console errors and responsive overflow.
6. Verify the live URL after deployment.
7. Verify canonical, robots, sitemap, Open Graph metadata, and structured data in production.

## Monetization direction

The free checker is the acquisition surface. Monetization should be introduced only after the tool demonstrates useful traffic and repeat intent.

Potential future paid capabilities:

- Unlimited quote audits.
- Side-by-side quote comparison.
- Quote history.
- Advanced scope comparison.
- Exportable reports.
- Custom checklists.
- Team/business workflows.
- Vendor quote normalization for business users.

Potential acquisition channels include search pages around specific quote/estimate use cases, educational content, communities where users ask about estimates, and direct sharing of the free checker.

No revenue or traffic outcome is guaranteed. The product should be measured by actual usage and conversion evidence rather than assumed demand.

## Future architecture triggers

Do not add a backend, database, authentication, or paid AI dependency just to make the product look more advanced.

A server-side architecture becomes justified when there is a demonstrated requirement for:

- saved quote history;
- accounts;
- paid subscriptions;
- server-side document processing;
- team workspaces;
- authenticated exports;
- secure cloud storage;
- external pricing/data integrations.

Any such change should preserve a free browser-only path where practical and must be documented before implementation.
