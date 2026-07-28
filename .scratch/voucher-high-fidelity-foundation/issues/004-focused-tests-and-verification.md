# Ticket 004: Focused Tests And Verification

## Goal

Lock in the high-fidelity foundation pass with targeted automated coverage and the standard prototype verification loop.

## Blockers

- `002-dashboard-and-discovery-adoption.md`
- `003-score-scarcity-mesh-adoption.md`

## Files

- affected test files near the adopted components/pages
- `src/test/setup.ts` only if the new tests require shared setup support

## Changes

1. Add or update tests only where the new shared primitives or semantic status rendering introduce meaningful conditional behavior.
2. Prefer coverage for:
   - distinct status treatments
   - representative page states that now rely on richer semantic inputs
   - any guardrail-sensitive copy or state rendering changed during adoption
3. Run the full verification loop:
   - `npm test`
   - `npm run lint`
   - `npm run build`
4. Perform manual browser review at:
   - `420×912`
   - `360×800`

## Acceptance Criteria

- automated tests cover the meaningful new conditional rendering introduced by the slice
- `npm test`, `npm run lint`, and `npm run build` pass
- the prototype remains comfortable at `420px` width and acceptable at `360px`
- no regressions are introduced in product-rule-critical flows

## Notes

Do not add low-value tests that simply mirror styling. Keep coverage focused on behaviorally meaningful rendering and guardrail-sensitive states.
