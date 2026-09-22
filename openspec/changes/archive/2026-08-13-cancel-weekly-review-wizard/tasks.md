## 1. Store Implementation

- [x] 1.1 Add `cancelReview: () => void` to `WeeklyReviewState` and implement in `useWeeklyReviewStore` to set `isActive: false` and `currentStep: 0`

## 2. Review Banner UI

- [x] 2.1 Add accessible `X` close icon button to `ReviewWizardBanner` wired to `cancelReview`
- [x] 2.2 Verify clicking `X` immediately dismisses the banner and leaves the user on the current screen

## 3. Verification

- [x] 3.1 Run TypeScript typecheck and build validation
- [x] 3.2 Run ESLint to ensure zero lint errors
- [x] 3.3 Validate OpenSpec change proposal with `openspec validate`
