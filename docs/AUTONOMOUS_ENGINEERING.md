# UtilityHub Autonomous Engineering System

## Objective

UtilityHub now has an automation architecture intended to continuously inspect, test, diagnose, delegate repairs, and verify changes without requiring a human to manually start every engineering step.

The system is deliberately autonomous but gated: automated agents may diagnose and prepare implementation PRs, while merge and production certification remain controlled release decisions.

## Lifecycle

Repository change or schedule
  -> deterministic CI
  -> Node regression + browser E2E + security
  -> pass: evidence ready
  -> fail: autonomous repair issue
  -> Copilot coding agent
  -> implementation PR
  -> CI + E2E + security
  -> pass: review gate
  -> fail: repair cycle

## Automated responsibilities

Deterministic automation:
- Node regression tests
- Cross-browser Playwright E2E
- dependency security audit
- dangerous-primitive source checks
- failure artifacts

Autonomous engineering:
- failed CI/E2E runs can create a repair issue;
- the issue can be assigned automatically to GitHub Copilot cloud agent;
- new engineering tasks can be created manually through workflow dispatch or by labeling an issue autonomous-engineering;
- the agent is instructed to inspect, implement, test, diagnose, document and open a focused PR.

GitHub documents Copilot cloud-agent issue assignment through the REST API and supports custom instructions for the assigned coding task. This is currently documented as a public-preview capability.

## Security model

Actions permissions are explicitly scoped. The repair workflow does not give test jobs arbitrary repository write access. Copilot delegation requires the repository secret COPILOT_AUTOMATION_TOKEN.

The autonomous agent is expected to create a PR, not merge directly to main.

## Required repository configuration

To activate automatic repair delegation:
1. Enable GitHub Copilot cloud agent for the repository.
2. Create a fine-grained token with the minimum repository permissions required for Copilot assignment.
3. Store it as the repository secret COPILOT_AUTOMATION_TOKEN.
4. Keep branch protection and required review gates enabled.
5. Never expose the token in logs.

## Important limitations

- Mobile Playwright profiles are emulations, not physical-device certification.
- Production deployment still requires live verification.
- Green automation is not permission to bypass review or production launch gates.
- Copilot cloud-agent API behavior may change because the capability is currently public preview.

## Operational rule

Never hide a failure to keep automation green. Every failed gate should preserve evidence and either repair the root cause or create a clearly documented blocker.
