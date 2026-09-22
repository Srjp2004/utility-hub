# UtilityHub Agent-Native SDLC

The Agent-Native SDLC is a controlled state machine for software delivery. It coordinates discovery, specification, planning, implementation, testing, security, verification and delivery while preserving human control over merge and production actions.

## State contract

Every mission has an immutable mission ID, source commit SHA, risk level, lifecycle state, retry budget, acceptance criteria, evidence references, blockers and a decision log.

## Transition rules

A transition requires evidence from the preceding state. Failed verification moves to diagnosis/repair rather than silently advancing. Critical security findings, scope violations, missing evidence and exhausted retries stop the mission.

## Delivery

Agents may prepare changes and focused PRs. Merge and production release remain protected actions requiring repository controls/human approval according to risk.

## Observability

Mission state and evidence should be retained as workflow artifacts and linked to the corresponding GitHub issue/PR.
