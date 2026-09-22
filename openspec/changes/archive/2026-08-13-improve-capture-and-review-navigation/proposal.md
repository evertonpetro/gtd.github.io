## Why

Users on desktop viewports currently lack a visible, clickable affordance to initiate Quick Capture, relying solely on an undiscoverable `c` keyboard shortcut. Additionally, users on mobile viewports cannot trigger the GTD Weekly Review wizard because the "Iniciar Revisão Semanal" button is located exclusively within the desktop sidebar, which is hidden on mobile screens. Providing visible, accessible entry points for both actions across all device form factors improves discoverability and ensures parity between desktop and mobile experiences.

## What Changes

- Add a dedicated Quick Capture button (`+ Capturar` / `Nova Tarefa [C]`) in the desktop `Sidebar` and/or make the Quick Capture floating action button visible/accessible across viewport sizes, while retaining the global keyboard shortcut (`c`).
- Add the "Iniciar Revisão Semanal" entry point into the mobile navigation drawer (`MobileBottomNav` / menu "Mais"), allowing mobile users to start the Weekly Review wizard from any screen.
- Ensure appropriate positioning, styling, and keyboard shortcut indicators for desktop and mobile layouts.

## Capabilities

### Modified Capabilities
- `inbox-capture`: Update entry point requirements so that Quick Capture has visible click/tap affordances across all viewports (both desktop and mobile), alongside the global keyboard shortcut.
- `weekly-review`: Update the entry point requirement so that "Iniciar Revisão Semanal" is reachable from both the desktop Sidebar and mobile navigation controls.

## Impact

- Affected components: `Sidebar.tsx`, `MobileBottomNav.tsx`, `QuickCaptureButton.tsx`, and optionally `Header.tsx`.
- No database schema or state persistence changes needed (both actions interface with existing `uiStore` and `weeklyReviewStore`).
