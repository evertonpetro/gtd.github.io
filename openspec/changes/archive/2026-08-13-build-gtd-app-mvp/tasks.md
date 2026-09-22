## 1. Project Setup

- [x] 1.1 Scaffold the Vite + React + TypeScript (strict mode) project and install Tailwind CSS, Dexie.js, `dexie-react-hooks`, Zustand, `lucide-react`, `clsx`/`tailwind-merge`, and `vite-plugin-pwa`.
- [x] 1.2 Create the folder structure from `architecture_and_structure.md` (`db/`, `features/`, `store/`, `pages/`, `components/ui`, `components/layout/`, `types/`, `utils/`, `assets/`).
- [x] 1.3 Configure path aliases and ESLint/TypeScript strict settings (no `any`).

## 2. Data Layer — Schema and Repositories

- [x] 2.1 Implement `db/db.ts` with the Dexie `GTDDatabase` class and `version(2).stores(...)` exactly as in `design.md` §1, including the extended `state` enum with `'reference'`.
- [x] 2.2 Define all entity interfaces (`Task`, `Project`, `Tag`, `Area`, `TaskTag`) in `types/database.d.ts`.
- [x] 2.3 Implement `db/repositories/taskRepo.ts`: `capture()`, `clarify()`, `updateDetails()`, `assignProject()`, `assignArea()`, `toggleTag()`, `toggleFocus()`, `softDelete()`, `restore()`.
- [x] 2.4 Implement `db/repositories/projectRepo.ts`: `create()`, `updateType()`, `complete()`, `softDelete()`, `restore()`.
- [x] 2.5 Implement `db/repositories/areaRepo.ts` and `db/repositories/tagRepo.ts` (CRUD).
- [x] 2.6 Implement `db/seed.ts` with optional starter tags/areas for a fresh install.

## 3. UI Shell, Routing, and Global State

- [x] 3.1 Implement `store/uiStore.ts` (Zustand) for ephemeral UI state (panels, modals open/closed).
- [x] 3.2 Implement `store/filterStore.ts` for the active global Area filter, selected tags, energy, and time filters.
- [x] 3.3 Set up routing and the base pages: `InboxPage`, `NextActionsPage`, `WaitingPage`, `ScheduledPage`, `SomedayPage`, `FocusPage`, `ProjectsPage`, `ReferencePage`, `LogbookPage`, `TrashPage`, `SettingsPage` (backup/sync).
- [x] 3.4 Build `components/layout/` (Sidebar, Header, MobileBottomNav) with `env(safe-area-inset-*)` applied per `design.md` §8.
- [x] 3.5 Wire `App.tsx` as the route + provider root and `main.tsx` for React DOM render + service worker registration.

## 4. Inbox & Universal Capture (`inbox-capture`)

- [x] 4.1 Build the floating capture button (mobile) and global keyboard shortcut (desktop) that open a quick-entry title field from any page.
- [x] 4.2 Wire quick capture to `taskRepo.capture()`, creating a Task with `type: 'action'`, `state: 'inbox'`.
- [x] 4.3 Build `InboxPage` listing `state === 'inbox'` tasks via `useLiveQuery`, ordered by `createdAt` ascending.
- [x] 4.4 Verify manually: capturing from every page/route on both mobile and desktop viewports lands the item in the Inbox in creation order.

## 5. Clarify & Task Detail (`task-clarification`)

- [x] 5.1 Build the Clarify flow: choose Action vs Reference; setting Reference sets `type: 'reference'` and `state: 'reference'` via `taskRepo.clarify()`.
- [x] 5.2 Build the GTD state picker for actionable items (`next`, `waiting` + contact, `scheduled` + start date, `someday`).
- [x] 5.3 Build the Task Detail panel/form: Markdown notes editor, native checklist editor (add/check/remove items), time estimate selector, energy level selector, Start Date / Due Date pickers.
- [x] 5.4 Wire project/area assignment (single project, single area) on the task form.
- [x] 5.5 Verify manually: each scenario in `specs/task-clarification/spec.md` (reference conversion, each GTD state assignment, checklist toggling, project/area assignment/removal).

## 6. Projects (`project-management`)

- [x] 6.1 Build Project CRUD UI (`ProjectsPage`, create/edit form with `type: 'parallel' | 'sequential'`).
- [x] 6.2 Implement the sequential-project reduction described in `design.md` §3 in `features/gtd-engine/rules.ts`.
- [x] 6.3 Implement `features/tasks/hooks/useNextActions.ts` as the single source of truth for the global Next list, applying the sequential rule from 6.2.
- [x] 6.4 Implement area inheritance (task's own `areaId` OR parent project's `areaId`) as a shared query helper used by every area-filtered view.
- [x] 6.5 Build project completion action (`projectRepo.complete()`).
- [x] 6.6 Verify manually: two-task sequential project hides the second until the first is completed; a parallel project shows all next-state tasks; area inheritance surfaces a task with no own `areaId` under its project's area.

## 7. Areas, Tags, and Cross-Filtering (`areas-and-tags`)

- [x] 7.1 Build Area management UI (create/rename) and the global Area filter control.
- [x] 7.2 Build Tag management UI (create tags, attach/detach via `taskTags`) and a tag filter control.
- [x] 7.3 Build combined filter bar (Tag + Area + Energy + Time) applied as an AND-combined `useLiveQuery` filter across actionable views.
- [x] 7.4 Verify manually: combined filter scenario from `specs/areas-and-tags/spec.md`, and that clearing filters restores the unfiltered list.

## 8. GTD Boot Engine (`gtd-boot-engine`)

- [x] 8.1 Implement `features/gtd-engine/useBootEngine.ts` per `design.md` §4: mount-time run, `window` `focus` listener, in-flight guard for idempotency, local-day boundary comparison.
- [x] 8.2 Mount `useBootEngine` once at the top of `App.tsx`.
- [x] 8.3 Verify manually: a task scheduled for today (or earlier) promotes to `next` on app load and again after backgrounding/refocusing the tab; rapid refocus events do not double-promote or duplicate tasks.

## 9. Focus List (`focus-list`)

- [x] 9.1 Implement the Focus List query (starred OR `dueDate`/`startDate` <= today, excluding `logbook`/`trash`) as a `useLiveQuery` selector.
- [x] 9.2 Build `FocusPage` and the star/unstar toggle available from any task row.
- [x] 9.3 Verify manually: each scenario in `specs/focus-list/spec.md` (starred inclusion, overdue inclusion, future exclusion, logbook/trash exclusion).

## 10. Completion, Logbook, and Recurrence (`task-completion-and-recurrence`)

- [x] 10.1 Implement `taskRepo.complete(id)` per `design.md` §5: set `logbook`/`completedAt`, and when `recurrenceRule` is set, clone with completion-anchored dates and route state/`focus` per the rule.
- [x] 10.2 Wire the "complete" action from every task row/detail view to `taskRepo.complete()`.
- [x] 10.3 Build `LogbookPage` listing `state === 'logbook'` ordered by `completedAt` descending, read-only.
- [x] 10.4 Verify manually: completing a recurring daily/weekly/monthly/yearly task produces exactly one new instance with the correct date and state routing, including the "completed late" no-avalanche case and the "due today → also focused" case.

## 11. Reference Library (`reference-library`)

- [x] 11.1 Build `ReferencePage` listing `state === 'reference'` tasks grouped by Project then Area, with free-text search over title/notes.
- [x] 11.2 Confirm every actionable-list query (Inbox/Next/Waiting/Scheduled/Someday/Focus) excludes `state === 'reference'` by construction (schema-level exclusion from `design.md` §1, not an extra per-view filter).
- [x] 11.3 Verify manually: filing a reference item under a project surfaces it in that project's reference grouping; deleting a reference item moves it to trash and removes it from the Reference view.

## 12. Trash (`trash-management`)

- [x] 12.1 Build `TrashPage` listing `state === 'trash'` tasks and projects with Restore and individual delete actions.
- [x] 12.2 Wire soft-delete (`taskRepo.softDelete()` / `projectRepo.softDelete()`) from every list's delete action.
- [x] 12.3 Implement the manual "Empty Trash" action performing the two bulk deletes described in `.mvp/ambiguity_resolutions.md` §3 (no automatic/time-based purge).
- [x] 12.4 Verify manually: delete → restore round-trip preserves all fields; Empty Trash permanently removes trashed tasks and projects.

## 13. Backup and Sync (`data-backup-sync`)

- [x] 13.1 Implement `features/sync/ExportService.ts` dumping all five tables into the JSON shape from `design.md` §7.
- [x] 13.2 Implement `features/sync/ImportService.ts`: shape validation, explicit destructive-action confirmation dialog, then Hard Replace (wipe + bulk insert) inside a single Dexie transaction.
- [x] 13.3 Build the Settings/Sync UI: Export button, Import button + confirmation dialog, and the 7-day backup reminder banner driven by `localStorage.lastBackupDate`.
- [x] 13.4 Verify manually: export produces a loadable file; importing an invalid file aborts with no changes; confirmed import fully replaces existing data; reminder appears after 7 simulated days and clears after a fresh export.

## 14. PWA Platform (`pwa-platform`)

- [x] 14.1 Configure `vite-plugin-pwa` (manifest, icons, `autoUpdate` service worker, app-shell precache) per `design.md` §8.
- [x] 14.2 Verify installability on iOS Safari ("Add to Home Screen"), and on Desktop/Android Chrome (install prompt).
- [x] 14.3 Verify the installed app is fully usable with the network disabled (airplane mode / devtools offline).
- [x] 14.4 Verify safe-area-inset compliance on an iOS device/simulator with a home indicator (floating button and bottom nav never obscured).

## 15. Final Cross-Capability Pass

- [x] 15.1 Walk every scenario listed across the 11 `specs/*/spec.md` files once end-to-end in the running app and confirm each passes manually (no automated test suite for this MVP, per proposal.md - Impact).
- [x] 15.2 Run `openspec validate build-gtd-app-mvp --strict` and resolve any reported issues before archiving.
