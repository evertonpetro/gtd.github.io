## Context

The GTD application operates as a responsive web app / PWA. Currently:
- The quick capture trigger is split between a mobile-only floating action button (`QuickCaptureButton` with `md:hidden`) and a desktop-only keyboard shortcut `c`. Desktop users without keyboard awareness or using pointing devices have no clear way to capture tasks.
- The Weekly Review trigger button is placed exclusively inside `Sidebar`, which is completely hidden on mobile viewports (`hidden md:flex`). As a result, mobile users have no entry point to trigger the review wizard.

## Goals / Non-Goals

**Goals:**
- Provide clear visual affordances for Quick Capture across all viewports, adding an explicit capture button to the desktop `Sidebar` (with shortcut badge `[C]`) while keeping the mobile floating action button and the `c` keyboard shortcut active.
- Expose the "Iniciar Revisão Semanal" action in the mobile navigation experience within the "Mais" drawer (`MobileBottomNav`), enabling mobile users to start the wizard seamlessly.
- Preserve consistent visual hierarchy, touch targets, and GTD Zen design standards across responsive breakpoints.

**Non-Goals:**
- Modifying the underlying 7-step logic of `weeklyReviewStore` or `ReviewWizardBanner`.
- Modifying IndexedDB database schemas or persistence logic.
- Redesigning the entire navigation bar or creating extra routing states.

## Decisions

### 1. Dedicated Quick Capture button in Desktop Sidebar
- **Decision**: Add a prominent `+ Nova Tarefa` (or `+ Capturar`) button at the top of the desktop `Sidebar` navigation, styled with a clean button appearance and keyboard indicator `[C]`.
- **Rationale**: Follows standard desktop GTD design (similar to NirvanaHQ and Todoist) where primary creation actions are top-level and easily clickable.
- **Alternatives considered**:
  - *Keep floating action button (FAB) on desktop*: While functional, a bottom-right FAB on wide desktop screens is often disconnected from the primary workflow area and navigation bar. Adding the action directly in the Sidebar aligns with desktop mental models.
  - *Button in Header*: Possible, but the header is currently reserved for view titles and task filter bars.

### 2. Weekly Review Entry Point in Mobile Navigation
- **Decision**: Add an "Iniciar Revisão Semanal" action button inside the `MobileBottomNav` secondary drawer ("Mais" modal), placed at the top of the list with the `RefreshCw` icon and high-contrast styling.
- **Rationale**: The "Mais" menu is already the mobile destination for secondary and periodic workflows. Placing the button at the top of this menu makes it readily discoverable without crowding the 4-item primary bottom navigation bar.
- **Alternatives considered**:
  - *Adding a 5th item to the bottom nav bar*: Would overcrowd mobile viewports and reduce touch target sizes.
  - *Adding an icon in the mobile Header*: Would add visual clutter to the clean header bar and differ from the desktop sidebar structure.

## Risks / Trade-offs

- **[Risk] Drawer closes while launching Weekly Review**: When tapping "Iniciar Revisão Semanal" in mobile nav, `closeMobileNav()` and `startReview()` must be called in tandem to avoid leaving the backdrop open.
  - *Mitigation*: Trigger both state updates in the button click handler.
- **[Risk] Redundant capture triggers**: Multiple entry points (Sidebar button, FAB on mobile, keyboard shortcut `c`).
  - *Mitigation*: Both visual and keyboard triggers invoke the same `useUIStore.openQuickCapture()` method, ensuring identical modal behavior and state consistency.
