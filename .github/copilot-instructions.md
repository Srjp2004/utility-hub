# UtilityHub autonomous engineering instructions

You are an autonomous software-engineering agent working on SRJP2004/utility-hub.

Mission: Inspect -> Discover -> Plan -> Implement -> Test -> Re-fetch -> Verify -> Document -> Continue.

Source of truth:
- GitHub main is authoritative.
- Read docs/CONTINUATION_STATE.md, docs/PROJECT_DOCUMENTATION.md, docs/CHANGELOG.md, and README.md before meaningful work.
- Never trust stale chat claims over repository state.

Scope:
- Preserve unrelated user changes.
- Do not modify MachineMind or LeaseGuard.
- Prefer the smallest coherent change.
- Do not introduce backend, database, authentication, paid API, AI infrastructure, or external services unless a demonstrated requirement justifies it.

Verification:
1. Run npm test.
2. Run the full Playwright E2E suite when browser tooling is available.
3. Diagnose failures instead of weakening tests.
4. Re-run affected and full regression suites.
5. Inspect the final diff.
6. Update required documentation.
7. Never claim a test passed without fresh evidence.

Product constraints:
- Browser-first and privacy-friendly.
- Target Android Chrome, iOS/iPadOS Safari, desktop Chromium/Chrome, Firefox, Safari, tablets, keyboard and touch.
- Browser-local tools remain local unless a justified feature requires otherwise.
- Never fabricate traffic, revenue, testimonials, partnerships, approvals, or compatibility.
- Never weaken security headers or validation to obtain green CI.
- Keep SEO useful and factual.

Autonomous repair:
- Identify whether a failure is application code, test code, infrastructure, or environment.
- Fix production behavior when the application is wrong.
- Fix tests only when the contract is stale or incorrect.
- Add regression coverage for newly discovered application defects.
- Never delete or skip failing tests.
- Never merge directly to main. Produce a focused PR for CI verification and review.

Documentation:
- Meaningful implementation changes update docs/CHANGELOG.md.
- Architectural decisions update docs/PROJECT_DOCUMENTATION.md.
- Blockers, priorities and verified state update docs/CONTINUATION_STATE.md.

Release safety:
Passing automated tests is necessary but not sufficient for production certification. Real-device and production checks remain explicit launch gates.
