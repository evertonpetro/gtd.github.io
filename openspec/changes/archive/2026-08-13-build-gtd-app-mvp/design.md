## Context

This is a greenfield build: `src/` is empty today. `AGENTS.md` and `architecture_and_structure.md` already fix most technical decisions (React + TypeScript + Vite, Tailwind, Dexie.js/IndexedDB, Zustand, `dexie-react-hooks`, Feature-Sliced Design, repository layer between UI and Dexie, no network calls whatsoever). This design only covers the decisions those documents leave open, plus how the 11 capabilities in `proposal.md` map onto that structure. See `proposal.md` - Why/What Changes for motivation and scope, and `specs/*/spec.md` for the exact behavioral contracts.

## Goals / Non-Goals

**Goals:**
- Map each of the 11 capabilities to concrete Dexie repositories, feature modules, and pages so implementation in `tasks.md` has an unambiguous home for every piece of logic.
- Pin down the exact query/algorithm for the two trickiest cross-cutting behaviors: the sequential-project Next list and the Boot Engine date evaluation.
- Fix the extended Dexie schema (the `'reference'` state addition and the recurrence rules from `.mvp/ambiguity_resolutions.md`) as the schema every repository is built against.

**Non-Goals:**
- No dedicated "Weekly Review" wizard/flow — the PRD only requires that the Logbook exist and be sortable for the user to review manually; it is not listed in the PRD's "Próximos Passos" as an MVP deliverable.
- No automated test suite — explicitly out of scope per user instruction; verification is manual/exploratory (see `tasks.md`).
- No multi-device real-time sync, conflict resolution, or partial merge on import — the PRD mandates Hard Replace only.
- No server, no auth, no analytics/telemetry.

## Decisions

### 1. Dexie schema (final, version 2)

Adopt `prd_gtd_app_schema_v2.md` verbatim, with the single amendment agreed in `.mvp/ambiguity_resolutions.md`:

```ts
interface Task {
  id: string;
  title: string;
  notes: string;
  type: 'action' | 'reference';
  state: 'inbox' | 'next' | 'waiting' | 'scheduled' | 'someday' | 'logbook' | 'reference' | 'trash';
  focus: boolean;
  projectId?: string;
  areaId?: string;
  timeEstimate?: 5 | 15 | 30 | 60 | 120;
  energyLevel?: 1 | 2 | 3;
  contact?: string;
  startDate?: number;
  dueDate?: number;
  completedAt?: number;
  checklist: Array<{ id: string; text: string; isCompleted: boolean }>;
  recurrenceRule?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  createdAt: number;
  updatedAt: number;
}
```

`Project`, `Tag`, `Area`, `TaskTag`, and the Dexie `stores()` index list are unchanged from `prd_gtd_app_schema_v2.md`. Alternative considered: keep `state` as-is and represent Reference via `type` alone, filtering reference lists by `type === 'reference'` regardless of `state`. Rejected because it forces every other query (Next, Waiting, Scheduled, Someday, Focus) to additionally exclude `type === 'reference'`, whereas a dedicated `'reference'` state keeps every existing state-based query correct by construction and matches the resolution already agreed with the user.

### 2. Repository layer owns all state transitions

Per `architecture_and_structure.md` §B, components never call `db.*` directly. One repository per aggregate, under `src/db/repositories/`:
- `taskRepo.ts`: `capture()`, `clarify()`, `updateDetails()`, `assignProject()`, `assignArea()`, `toggleTag()`, `toggleFocus()`, `complete()` (implements the recurrence generation + state routing from `task-completion-and-recurrence`), `softDelete()`, `restore()`.
- `projectRepo.ts`: `create()`, `updateType()`, `complete()`, `softDelete()`, `restore()`.
- `areaRepo.ts` / `tagRepo.ts`: simple CRUD.
- `syncRepo.ts` (backing `features/sync`): `exportAll()`, `importReplace()`.

Rationale: keeps every spec's business rule (recurrence math, sequential visibility, area inheritance) in one testable-by-inspection place instead of scattered across components, matching the "Regra de Ouro" in `AGENTS.md`.

### 3. Sequential-project Next query

Implemented as a pure function in `features/gtd-engine/rules.ts`, consumed by `features/tasks/hooks/useNextActions.ts` (a `useLiveQuery`):

1. Fetch all tasks with `state === 'next'`.
2. Group by `projectId` (tasks with no `projectId`, or belonging to a `'parallel'` project, pass through unfiltered).
3. For each group whose project is `'sequential'`, keep only the task with the minimum `createdAt`; drop the rest.
4. Concatenate and return.

This is a client-side reduction over an already-small (`state === 'next'`) index-backed Dexie query, not a raw table scan — acceptable at MVP scale (single local user, thousands of tasks at most).

### 4. Boot Engine

`features/gtd-engine/useBootEngine.ts`, mounted once in `App.tsx`:
- Runs `evaluateDates()` in a `useEffect` on mount, and again on `window.addEventListener('focus', evaluateDates)`.
- `evaluateDates()`: query `tasks` where `state === 'scheduled' AND startDate <= Date.now()` (using the compound/indexed `startDate` field already in the schema), and bulk-update their `state` to `'next'` in a single Dexie transaction.
- Debounced with a simple in-flight guard (a module-level boolean) so overlapping mount+focus firings never double-run, satisfying the Idempotent Evaluation requirement without needing a queue or lock library.
- Comparisons use start-of-local-day boundaries (`new Date().setHours(0,0,0,0)`) so a task scheduled for "today" promotes regardless of time-of-day.

### 5. Recurrence generation

Inside `taskRepo.complete(id)`:
1. Update the task: `state = 'logbook'`, `completedAt = now`.
2. If `recurrenceRule` is set, compute `nextStartDate = addInterval(now, recurrenceRule)` (utility in `utils/dateUtils.ts`) applied to `completedAt`, never to the original `startDate`/`dueDate` — this is the anchor-to-completion decision from `.mvp/ambiguity_resolutions.md`.
3. Clone the task with a new `id`, no `completedAt`, `startDate = nextStartDate`, `dueDate` shifted by the same delta if it was set.
4. Route state: `nextStartDate > todayEnd ? 'scheduled' : 'next'`; if routed to `'next'` and the shifted `dueDate` falls on today, also set `focus = true`.
5. Insert the clone in the same Dexie transaction as step 1, so a completion never leaves the system in a state with zero live instances of a recurring task.

### 6. Focus List and cross-filtering as derived queries, not stored state

Both are implemented as `useLiveQuery` selectors over `tasks` (optionally combined with `projects` for area inheritance), not as materialized/cached lists — Dexie's reactivity already gives instant UI updates on any write, per `architecture_and_structure.md` §3, so there is no need for a separate cache layer or manual invalidation.

### 7. Export/Import format

`syncRepo.exportAll()` produces:
```json
{ "version": 2, "exportedAt": <timestamp>, "tasks": [...], "projects": [...], "tags": [...], "areas": [...], "taskTags": [...] }
```
`importReplace(file)` validates the top-level shape (five arrays present) before wiping and reloading; on any validation failure it aborts with no changes to the existing database. This keeps the operation reversible up to the point of confirmation while still being a full Hard Replace as required by the PRD (no field-level merge logic).

### 8. PWA shell

`vite-plugin-pwa` in `autoUpdate` mode with a minimal app-shell precache (static assets only — there is no API to cache since there's no network layer). `manifest.json` declares `display: 'standalone'`; safe-area handling is CSS-only (`env(safe-area-inset-*)` applied to the floating action button and bottom nav containers in `components/layout/`), needing no library.

## Risks / Trade-offs

- **[Risk]** Client-side reduction for the sequential-project rule re-scans all `'next'` tasks on every change. → **Mitigation**: acceptable at single-user MVP scale; if it ever matters, add a `sequenceOrder` field and push the filter into the Dexie query — not needed now.
- **[Risk]** `window.addEventListener('focus', ...)` does not fire for a tab left open and never blurred/refocused across midnight, so a same-day promotion could lag until the next interaction. → **Mitigation**: acceptable per PRD §3.3 wording ("sempre que for aberto ou trazido para o primeiro plano"); noted here rather than silently expanded, since adding a polling timer is a scope decision, not a bug — left for a future change if the user wants it.
- **[Risk]** Hard-Replace import is destructive by design. → **Mitigation**: explicit confirmation dialog (see `data-backup-sync` spec) and validation-before-wipe (Decision 7) so a malformed file cannot corrupt the database mid-import.
- **[Risk]** No automated tests means regressions in the sequential/recurrence/boot-engine logic (the three most stateful rules) can only be caught manually. → **Mitigation**: `tasks.md` includes explicit manual verification steps for each of these rules; accepted as a deliberate scope trade-off for this MVP.
