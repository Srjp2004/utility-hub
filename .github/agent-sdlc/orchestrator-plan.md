# Agent-Native SDLC Orchestrator Plan

## Objective
Connect the existing Meta-Agent Generator, SDLC state machine, QA/DevSecOps workflows and independent verification into one bounded execution pipeline.

## Execution stages
1. Intake: validate mission, risk, repository and source SHA.
2. Discover: collect repository state and durable documentation.
3. Specify: produce observable acceptance criteria and non-goals.
4. Plan: create disjoint work cards with ownership and dependency ordering.
5. Implement: execute only approved work cards in isolated branches/workspaces.
6. Test: run unit/integration/E2E and retain raw results.
7. Secure: run security/dependency/secrets/header checks and retain results.
8. Verify: independent verifier checks implementation, tests, security, scope and evidence.
9. Deliver: open/update a focused PR; never bypass repository protections.
10. Observe: collect CI/deployment/runtime evidence.
11. Learn: record outcomes and update durable documentation.

## Autonomous repair
A failed gate must produce a diagnosis before repair. Repairs consume the risk-level retry budget. Every repair requires a fresh retest. Repeated failure or critical security findings transition the mission to blocked/human-review.

## Parallelism
Parallelize only disjoint specialist reviews. Never allow two workers to mutate the same ownership boundary concurrently without an explicit merge protocol.

## Evidence model
Every stage emits a machine-readable result containing mission ID, source SHA, agent role, status, changed files, evidence, blockers and recommendation. Artifacts must be retained and linked to the mission issue/PR.

## Human control
The runtime may automate analysis, implementation, testing, repair and PR preparation within policy. Merge, production release and high-risk/security-policy actions remain protected by repository controls and approval.

## Current limitation
The repository currently contains the control contracts and intake/generation workflows. A provider-neutral worker runtime/delegation mechanism still needs to be connected before claiming end-to-end autonomous execution.
