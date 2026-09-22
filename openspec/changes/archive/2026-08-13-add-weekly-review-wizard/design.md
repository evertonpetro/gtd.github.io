## Context

This feature layers on top of the still-pending `build-gtd-app-mvp` change: it assumes React Router is set up with routes for Inbox, Logbook, Waiting, Projects, Someday, and Next Actions, and that `taskRepo`/UI actions for capture, clarify, and focus-toggle already exist (see that change's `design.md`). No Dexie schema changes are involved — this is a pure UI/state-orchestration feature. See `proposal.md` - Why/What Changes for motivation and scope.

## Goals / Non-Goals

**Goals:**
- Define the exact Zustand store shape and the step→route→copy table so implementation is a direct transcription, not a design exercise.
- Pin down the two details `prd_weekly_review_feature.md` left open: what Step 5 ("orphan project" check) actually requires building, and which route Step 7 targets.
- Keep the wizard fully decoupled from IndexedDB — it must not introduce any persistent state.

**Non-Goals:**
- No automated "orphan project" detection (a computed check for active projects with zero `next`-state tasks). The PRD's own §4 "Requisitos Técnicos" lists only the banner component, synced navigation, and non-persistence as integration requirements — it does not ask for a new query or visual flag. Step 5 is instructional copy only, pointing the user at the existing Projects page they can already inspect manually. Building automated orphan detection is a reasonable future enhancement but is out of scope here to avoid inventing a requirement the PRD didn't state.
- No history/tracking of past reviews (e.g., a "last reviewed on" timestamp analogous to the backup reminder's `lastBackupDate`). The PRD explicitly calls the flow non-persistent and intentional about losing progress on interruption; a review-cadence reminder is a different feature the PRD didn't request.
- No step reordering or jump-to-step navigation — the store only exposes `nextStep`/`previousStep`, matching the PRD's suggested interface exactly.

## Decisions

### 1. Step→route→copy as a static table, not per-step components

`features/weekly-review/steps.ts` exports a single ordered array, the source of truth for both the banner text and the router push:

```ts
export const REVIEW_STEPS = [
  { route: '/inbox', title: 'Esvazie a mente', body: '...' },
  { route: '/inbox', title: 'Processe a Inbox (Inbox Zero)', body: '...' },
  { route: '/logbook', title: 'Revise o Logbook', body: '...' },
  { route: '/waiting', title: 'Revise o que está Aguardando', body: '...' },
  { route: '/projects', title: 'Revise os Projetos Ativos', body: '...' },
  { route: '/someday', title: 'Revise o Someday/Maybe', body: '...' },
  { route: '/next', title: 'Escolha o foco da semana', body: '...' },
] as const;
```

Rationale: the PRD's steps are pure data (route + copy), so a lookup table keeps `weeklyReviewStore` and `ReviewWizardBanner` generic — neither needs a `switch` on `currentStep`. Alternative considered: one React component per step. Rejected as unnecessary indirection for what is, in every case, "navigate + show two lines of text."

### 2. Step 7 targets `/next`, not `/focus`

The PRD leaves this ambiguous ("`/focus` (ou `/next`)"). Resolved in favor of `/next`: the instructional text asks the user to *choose* which next actions to star for the week — that decision requires seeing the full Next Actions list (per `focus-list` and `project-management` in `build-gtd-app-mvp`), not the already-filtered Focus List, which at that point may still be empty or only show prior stars/due dates. `/focus` is where the result of this step is consumed afterward, not where the decision happens.

### 3. `weeklyReviewStore` shape — exactly as specified, with the route push as a side effect of `nextStep`/`previousStep`

```ts
interface WeeklyReviewState {
  isActive: boolean;
  currentStep: number; // 0-indexed into REVIEW_STEPS
  startReview: () => void;   // isActive = true, currentStep = 0, navigate(REVIEW_STEPS[0].route)
  nextStep: () => void;      // currentStep += 1 (clamped to last), navigate(REVIEW_STEPS[currentStep].route)
  previousStep: () => void;  // currentStep -= 1 (clamped to 0), navigate(REVIEW_STEPS[currentStep].route)
  finishReview: () => void;  // isActive = false; no navigation
}
```

Since Zustand actions cannot call `useNavigate()` directly (it's a hook), `ReviewWizardBanner` — the only consumer — reads `currentStep` reactively and calls `useNavigate()` in a `useEffect` keyed on `currentStep`, rather than the store holding a router reference. This keeps the store framework-agnostic and avoids threading the router instance through Zustand.

### 4. No persistence, by construction

`weeklyReviewStore` is a plain in-memory Zustand store with no `persist` middleware. A reload re-initializes it to `{ isActive: false, currentStep: 0 }`, which is exactly the PRD's intended behavior (§4.3) — no extra code needed to "discard" progress; it simply never survives a reload in the first place.

### 5. Banner placement and lifecycle

`ReviewWizardBanner` is mounted once, unconditionally, in the main layout (alongside the Boot Engine hook from `build-gtd-app-mvp`), and internally returns `null` when `isActive` is `false`. This matches the existing pattern for global, state-driven UI (`architecture_and_structure.md` §A) and requires no route-level wiring — it works on every page without each page needing to know the wizard exists.

## Risks / Trade-offs

- **[Risk]** Step routes (`/inbox`, `/logbook`, `/waiting`, `/projects`, `/someday`, `/next`) are assumed from `build-gtd-app-mvp`'s page list, but that change hasn't been implemented yet and its final route paths could differ. → **Mitigation**: routes live in one small `REVIEW_STEPS` table (Decision 1); if the MVP implementation lands with different paths, only that table needs updating.
- **[Risk]** A user can still navigate manually (via Sidebar/back button) to a page that doesn't match the wizard's `currentStep`, leaving the banner's text out of sync with the visible page. → **Mitigation**: accepted per Non-Goals — the PRD does not ask the wizard to lock navigation or force the user to stay on-step; the banner simply reflects wizard state, not actual route, until the user clicks Anterior/Próximo again.
- **[Risk]** Building this before `build-gtd-app-mvp` is implemented means the referenced pages/actions don't exist yet. → **Mitigation**: noted in `proposal.md` - Impact as a sequencing dependency; `tasks.md` for this change should be executed after (or at the tail end of) the MVP's own `tasks.md`.
