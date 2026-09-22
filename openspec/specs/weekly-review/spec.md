# weekly-review Specification

## Purpose

Guide the user, step by step, through the GTD Weekly Review ritual — emptying the mind, driving the Inbox to zero, reviewing completed work, commitments from others, active projects, and incubated ideas, and finally choosing the week's focus — without requiring them to remember the correct order or jump between screens unaided.
## Requirements
### Requirement: Starting the Weekly Review
The system SHALL provide a "Iniciar Revisão Semanal" action, reachable from both the desktop Sidebar and the mobile navigation menu, that activates the review wizard at Step 1 regardless of the page currently being viewed.

#### Scenario: Starting a review from any page
- **WHEN** a user clicks "Iniciar Revisão Semanal" in the Sidebar while viewing any page
- **THEN** the wizard becomes active, its current step is set to Step 1 (Get Clear), and the app navigates to the Inbox

#### Scenario: Starting a review from mobile navigation
- **WHEN** a user taps "Iniciar Revisão Semanal" inside the mobile navigation menu while viewing any page
- **THEN** the mobile navigation drawer closes, the wizard becomes active, its current step is set to Step 1 (Get Clear), and the app navigates to the Inbox

### Requirement: Seven-Step Guided Sequence
The wizard SHALL guide the user through exactly seven steps, in order, each associating a target route with contextual instructional text:

1. Get Clear — `/inbox` — capture everything left in the user's head.
2. Empty the Inbox — `/inbox` — process every item to Inbox Zero (Waiting, Scheduled, Reference, Next, or deleted).
3. Review the Logbook — `/logbook` — review the past week's completed work and capture any follow-ups it surfaces.
4. Review Waiting For — `/waiting` — review items delegated to others.
5. Review Active Projects — `/projects` — review each active project's status.
6. Review Someday/Maybe — `/someday` — review incubated ideas.
7. Choose the Week's Focus — `/next` — star the next actions that are this week's top priority.

#### Scenario: Advancing through steps navigates the matching route
- **WHEN** a user clicks "Próximo" while on any step N (N < 7)
- **THEN** the wizard's current step becomes N+1 and the app navigates to that step's target route, displaying that step's instructional text

#### Scenario: Going back to a previous step
- **WHEN** a user clicks "Anterior" while on any step N (N > 1)
- **THEN** the wizard's current step becomes N-1 and the app navigates back to that step's target route

#### Scenario: Step 5 provides guidance only, no automated check
- **WHEN** a user is on Step 5 (Review Active Projects)
- **THEN** the wizard displays instructional text asking the user to verify every active project has a clear next action, without the system computing or flagging "orphan" projects automatically

### Requirement: Persistent Wizard Banner
While the wizard is active, the system SHALL display a global banner (fixed to the top or bottom of the viewport, persisting across navigation) showing the current step's instructional text and "Anterior"/"Próximo" controls (or "Finalizar" on the last step). The banner SHALL be hidden entirely whenever the wizard is not active.

#### Scenario: Banner visible during an active review
- **WHEN** the wizard is active
- **THEN** the banner is visible on every page the user navigates to, showing the current step's text

#### Scenario: Banner hidden outside a review
- **WHEN** the wizard is not active
- **THEN** no review banner is rendered anywhere in the application

### Requirement: Finishing the Review
On Step 7, the "Próximo" action SHALL be replaced with "Finalizar". Activating it SHALL deactivate the wizard and hide the banner, without navigating away from the current route.

#### Scenario: Finishing the review
- **WHEN** a user clicks "Finalizar" on Step 7
- **THEN** the wizard becomes inactive, the banner disappears, and the user remains on the Next Actions view

### Requirement: Review Progress Is Not Persisted
The wizard's active state and current step SHALL live only in ephemeral UI state (not IndexedDB). Closing the tab, reloading the app, or navigating away without using the wizard's own controls SHALL discard the in-progress review.

#### Scenario: Reload mid-review discards progress
- **WHEN** a user reloads the application while the wizard is active on any step
- **THEN** after reload the wizard is inactive, and starting a new review begins again at Step 1

#### Scenario: Restarting after an interrupted review
- **WHEN** a user starts a new Weekly Review after a previous one was interrupted (e.g., by a reload or manual navigation away)
- **THEN** the new review begins at Step 1 with no memory of the interrupted attempt's progress

### Requirement: Cancelling or Exiting the Weekly Review
The system SHALL provide a visible close ("X") action button in the wizard banner across all steps that allows the user to immediately exit the review wizard in a single click, deactivating the wizard, hiding the banner, and resetting the wizard step without navigating away from the current route.

#### Scenario: Cancelling the review at any step
- **WHEN** a user clicks the close ("X") button on the wizard banner while on any step
- **THEN** the wizard becomes inactive, the wizard step resets to Step 1 (index 0), the banner disappears, and the user remains on the current view

#### Scenario: Restarting after cancellation
- **WHEN** a user starts a new review after cancelling a previous review
- **THEN** the new review begins fresh at Step 1 (Get Clear) and navigates to the Inbox

