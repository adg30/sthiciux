# Ticket 003: Score, Scarcity, And Mesh Adoption

## Goal

Apply the shared visual system to the representative score, scarcity, and mesh screens so the prototype reads as one coherent product across the major flows.

## Blockers

- `001-token-and-primitives.md`

## Files

- `src/pages/VouchScorePage.tsx`
- `src/pages/VouchScorePage.module.css`
- `src/pages/scarcity/ScarcityFlowPage.tsx`
- `src/pages/scarcity/ScarcityFlowPage.module.css`
- `src/pages/mesh/MeshBoardPage.tsx`
- `src/pages/mesh/MeshBoardPage.module.css`
- `src/data/constants.ts` or small split fixture files if richer semantic status data is needed
- `src/context/PrototypeContext.tsx` only if small shape changes are necessary to feed the new UI consistently

## Changes

1. Update the Vouch Score screen to clarify:
   - score hierarchy
   - current status
   - next-threshold meaning
   - unlocked capability presentation
2. Update the Scarcity screen to clarify:
   - verified versus unverified states
   - evidence presentation
   - stronger visual distinction among resource statuses
3. Update the Mesh board to clarify:
   - relationship states for `connected`, `pending`, and `anonymous`
   - map/list pairing
   - identity protection and consent framing
4. Add light semantic fixture/state support only where the shared visual system needs better inputs.

## Acceptance Criteria

- the score, scarcity, and mesh pilot screens visibly share the same visual language
- state differences are easier to read without changing the underlying flow logic
- any fixture/state changes stay local, client-only, and minimal
- product-rule-sensitive behavior remains intact

## Notes

Avoid broad context refactors or new user paths. This ticket should still feel like a presentation pass with small supporting data cleanup.
