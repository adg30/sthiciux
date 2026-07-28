# Voucher High-Fidelity Foundation Tickets

These tickets split the approved design in `docs/superpowers/specs/2026-07-28-voucher-high-fidelity-foundation-design.md` into tracer-bullet implementation slices.

## Order

- `001-token-and-primitives.md`
- `002-dashboard-and-discovery-adoption.md`
- `003-score-scarcity-mesh-adoption.md`
- `004-focused-tests-and-verification.md`

## Blocking Edges

- `001` has no blockers
- `002` blocks on `001`
- `003` blocks on `001`
- `004` blocks on `002` and `003`

## Scope Guardrails

- Preserve the current single-app routing structure
- Do not change trust, consent, scarcity verification, exchange confirmation, or vouching rules
- Do not add backend, auth, or unrelated prototype features
- Keep the app mobile-first around `420px`, and verify at `360px`
