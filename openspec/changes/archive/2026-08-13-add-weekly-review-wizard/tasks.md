## 1. Prerequisites

- [x] 1.1 Confirm `build-gtd-app-mvp` routes for Inbox, Logbook, Waiting, Projects, Someday, and Next Actions exist and match (or update) the paths in `design.md` §1's `REVIEW_STEPS` table.

## 2. Wizard State

- [x] 2.1 Create `features/weekly-review/steps.ts` with the ordered `REVIEW_STEPS` table (route + title + instructional body for all 7 steps), per `design.md` §1.
- [x] 2.2 Implement `store/weeklyReviewStore.ts` (Zustand) with `isActive`, `currentStep`, `startReview()`, `nextStep()`, `previousStep()`, `finishReview()`, with step bounds clamped to `[0, REVIEW_STEPS.length - 1]`.

## 3. Guided UI

- [x] 3.1 Build `components/layout/ReviewWizardBanner.tsx`: renders `null` when `isActive` is `false`; otherwise shows the current step's title/body, "Anterior" (disabled on step 1), "Próximo" (steps 1-6), and "Finalizar" (step 7 only).
- [x] 3.2 In `ReviewWizardBanner`, sync navigation: a `useEffect` keyed on `currentStep` calls `useNavigate()` to `REVIEW_STEPS[currentStep].route` whenever the wizard is active and the step changes.
- [x] 3.3 Mount `ReviewWizardBanner` once, unconditionally, in the main layout (alongside the Boot Engine).
- [x] 3.4 Add "Iniciar Revisão Semanal" action to the Sidebar, calling `startReview()`.

## 4. Manual Verification

- [x] 4.1 Start a review from every page in the app and confirm it always lands on Step 1 / `/inbox`.
- [x] 4.2 Click "Próximo" through all 7 steps and confirm each navigation matches `REVIEW_STEPS` and the banner text updates accordingly.
- [x] 4.3 Click "Anterior" from steps 2-7 and confirm it navigates back one step each time; confirm it is disabled/no-op on step 1.
- [x] 4.4 On step 7, confirm the button reads "Finalizar", that clicking it deactivates the wizard (banner disappears) and leaves the user on the Next Actions view.
- [x] 4.5 Reload the app mid-review (e.g., on step 3 or 4) and confirm the wizard is inactive afterward, with no leftover step state.
- [x] 4.6 Manually navigate to an unrelated page (e.g., Settings) while the wizard is active and confirm the banner remains visible with its current step's text, unaffected by the manual navigation.
- [x] 4.7 Confirm no new IndexedDB table, field, or record is created or modified by any wizard action.
