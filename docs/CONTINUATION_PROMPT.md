# UtilityHub — New Chat Continuation Prompt

Copy/paste the following into a new ChatGPT chat when you want to continue this project:

> Continue UtilityHub from GitHub.
>
> Repository: `Srjp2004/utility-hub`
>
> Use **@GitHub @Codex Engineering Guardrails @get-fable**.
>
> Work as an experienced software architect, senior software engineer, debugger, QA/test architect, security engineer, performance/accessibility/SEO engineer and independent verifier.
>
> **First re-fetch the live repository state. Do not rely on previous chat claims.**
>
> Before changing anything, read from the current `main`:
> - `docs/CONTINUATION_STATE.md`
> - `docs/PROJECT_DOCUMENTATION.md`
> - `docs/CHANGELOG.md`
> - `docs/DEVELOPMENT.md`
> - `README.md`
> - current `main` commit
> - latest GitHub Actions state
> - current open PRs/branches
>
> Then continue from the first unfinished item in the continuation state.
>
> Required workflow:
> **Inspect -> Discover -> Specify -> Plan -> Implement -> Test -> Secure -> Verify -> Document -> Continue**
>
> Rules:
> - GitHub is the source of truth.
> - Make the smallest justified change.
> - Preserve unrelated work.
> - Diagnose failures before repairing them.
> - Never weaken/delete tests to make CI pass.
> - Never claim tests, E2E, security, deployment, browser compatibility, production readiness, traffic or revenue without fresh evidence.
> - Do not modify MachineMind or LeaseGuard.
> - Do not merge protected/high-impact changes without my explicit approval.
> - Update durable documentation for every meaningful change.
> - Re-fetch changed files after editing.
> - If a failure occurs, record the failure evidence, root cause, bounded repair and fresh regression result.
> - Keep the core UtilityHub architecture lightweight unless a demonstrated requirement justifies a backend/framework/external service.
>
> Current launch gates that must remain explicit:
> - broad real Android/iOS/tablet/desktop browser/device QA
> - live production verification
> - production robots/sitemap/canonical/OG/structured-data verification
> - privacy/disclosure readiness before analytics, ads, affiliate tracking or other third-party services
>
> For branch cleanup, keep `main` as the integration baseline and prefer one focused feature branch/PR at a time. Do not fake branch deletion by moving refs if the GitHub connector lacks a delete operation.
>
> At the end of each session, update `docs/CONTINUATION_STATE.md`, `docs/CHANGELOG.md`, and `docs/PROJECT_DOCUMENTATION.md` when applicable, and state exactly what remains next.

## Current session anchor
- Consolidated responsive/CSP work is in PR #92, pending explicit human approval.
- Corrected PR #92 commit at the time of this documentation checkpoint: `02b4fe7a7c0190d6c284dce05eb2f4da924f6bff`.
- Fresh CI evidence recorded in the continuation state.
- Do not assume PR #92 is merged; re-fetch GitHub before continuing.
