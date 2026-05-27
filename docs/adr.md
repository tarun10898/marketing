# Architecture Decision Log

This is a lightweight decision log for changes that materially affect route ownership, delivery strategy, and security posture.

## ADR-0001: Standardize Strategy Detail Routes

- Status: Accepted
- Decision: Standard strategy detail pages use `StrategyDetailPageShell` for shared breadcrumb, intro, navigation, and footer behavior.
- Why: Keeps route contracts consistent and avoids repeating shell wiring in each page.
- Consequence: Only materially different pages should bypass the shared shell.

## ADR-0002: Keep Feature Ownership Local First

- Status: Accepted
- Decision: Route-heavy features should keep `page.tsx`, `*.data.ts`, `*.model.ts`, and `*.view.tsx` beside the owning route before promoting anything into `shared/`.
- Why: Local ownership makes refactors safer and prevents premature cross-feature coupling.
- Consequence: Shared promotion now requires more than one real consumer.

## ADR-0003: Chunk Large Client Datasets On Demand

- Status: Accepted
- Decision: The hiring-tiers route no longer ships its full dataset in the initial client bundle. Lightweight metadata stays in the route shell, and the full dataset loads only when a user expands a tier or starts searching.
- Why: This reduces initial route JS cost while preserving the current interactive UX.
- Consequence: Tests that exercise tier expansion or search must wait for asynchronous dataset loading.

## ADR-0004: Enforce A Baseline Web Security Policy In Code And CI

- Status: Accepted
- Decision: The app defines CSP and security headers from a single config source, disables `x-powered-by`, and runs explicit security checks in CI for header policy, dependency audit, and dependency review on pull requests.
- Why: Security controls should be visible, testable, and enforced as part of the normal delivery pipeline.
- Consequence: Future changes to external assets, scripts, or dependencies must satisfy the security policy and CI checks.