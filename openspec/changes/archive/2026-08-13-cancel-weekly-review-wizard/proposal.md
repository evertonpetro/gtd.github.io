## Why

Users who start the GTD Weekly Review wizard currently cannot exit or cancel it before completing all 7 steps without reloading the entire web page. Adding a dedicated 1-click `X` (close) button directly to the review banner allows users to exit the wizard at any step immediately without modal friction, maintaining the lightweight, Zen GTD philosophy while keeping them on their current screen.

## What Changes

- Add an `X` (close) icon button to the `ReviewWizardBanner` component on all review steps.
- Add a `cancelReview` action to `useWeeklyReviewStore` to reset step counter to 0 and deactivate the wizard (`isActive: false`).
- Update the `weekly-review` OpenSpec specification to document the cancellation / early exit requirement and scenarios.

## Capabilities

### Modified Capabilities
- `weekly-review`: Add requirement for cancelling/exiting the Weekly Review wizard at any step via a single-click close affordance.

## Impact

- Affected files: `src/components/layout/ReviewWizardBanner.tsx`, `src/store/weeklyReviewStore.ts`.
- No database schema or persistence impact (review wizard state is purely ephemeral in Zustand).
