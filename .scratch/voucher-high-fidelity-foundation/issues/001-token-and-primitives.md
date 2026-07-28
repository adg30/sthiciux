# Ticket 001: Token And Primitives

## Goal

Create the shared visual foundation for the high-fidelity-preparation pass without changing existing flow behavior.

## Blockers

- none

## Files

- `src/index.css`
- selected files under `src/components/ui`
- any new CSS modules needed for shared presentation primitives

## Changes

1. Expand the global token layer in `src/index.css` so it covers:
   - app/frame backgrounds
   - primary/muted/elevated surfaces
   - borders/dividers
   - primary/muted/inverse text
   - trust/scarcity/mesh relationship states
   - focus/interaction feedback
   - elevation/shadow variants
2. Keep token names semantic so the settled color scheme can be mapped in later without another naming pass.
3. Introduce the smallest reusable primitive set needed by the pilot screens:
   - section framing
   - surface/card variants
   - status pill or badge
   - evidence or metric row
   - relationship label treatment
4. Keep the new primitives presentational only. Do not build a large design-system abstraction layer.

## Acceptance Criteria

- shared tokens exist for the major surface, text, and state categories used by pilot screens
- at least one reusable primitive exists for repeated status/surface treatment
- no route or flow logic changes are introduced
- existing pages can adopt the new layer incrementally

## Notes

This ticket is the foundation blocker for all later adoption tickets.
