# Ticket 002: Dashboard And Discovery Adoption

## Goal

Apply the new shared visual system to the Dashboard and one representative discovery screen so the prototype's entry experience feels more intentional and trust-aware.

## Blockers

- `001-token-and-primitives.md`

## Files

- `src/pages/DashboardPage.tsx`
- `src/pages/DashboardPage.module.css`
- `src/components/demo/FlowHubCard.tsx`
- `src/components/demo/FlowHubCard.module.css`
- one representative discovery page and its CSS module

## Changes

1. Update the Dashboard to better express:
   - hero, flow-hub, and current-network hierarchy
   - stronger visual consistency between the four flow cards
   - more polished presentation of score preview, scarcity preview, and trust activity
2. Apply the shared primitives from Ticket 001 rather than adding page-specific one-off styling where possible.
3. Choose the discovery page that best demonstrates trust framing early in the flow.
4. Improve that discovery page's visual distinction between:
   - visible versus locked opportunities
   - explanatory trust context versus actionable UI

## Acceptance Criteria

- the Dashboard is visibly more cohesive and higher-fidelity than the current medium-fidelity version
- the chosen discovery page uses the shared visual language rather than ad hoc restyling
- trust-related presentation is clearer without changing gate behavior
- the one-app narrative still feels continuous from Dashboard into discovery

## Notes

Do not alter route structure or discovery progression. This is a presentation-focused ticket.
