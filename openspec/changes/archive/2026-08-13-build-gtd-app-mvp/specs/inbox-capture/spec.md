## Purpose

Give users a single, frictionless entry point to capture any idea or task the instant it comes to mind, from any screen, without forcing them to decide where it belongs yet.

## ADDED Requirements

### Requirement: Universal Quick Capture Entry Point
The system SHALL provide a capture mechanism reachable from every screen of the application: a floating action button on mobile viewports and a global keyboard shortcut on desktop viewports.

#### Scenario: Capture from any screen on mobile
- **WHEN** a user taps the floating capture button while viewing any page
- **THEN** a quick-entry field for a title is presented without navigating away from the current page's context

#### Scenario: Capture from any screen on desktop
- **WHEN** a user presses the global capture keyboard shortcut while the application window has focus, regardless of the current page
- **THEN** a quick-entry field for a title is presented

### Requirement: Captured Items Land in the Inbox
Submitting a quick capture SHALL create a new Task with `type: 'action'` and `state: 'inbox'`, requiring only a title.

#### Scenario: Minimal capture
- **WHEN** a user submits a quick capture with only a title and no other fields
- **THEN** a Task is persisted with `state: 'inbox'`, `type: 'action'`, `createdAt`/`updatedAt` set to the current time, and no project, area, or tags assigned

### Requirement: Inbox List View
The system SHALL provide a dedicated Inbox view listing every Task with `state: 'inbox'`, ordered by `createdAt` ascending (oldest first).

#### Scenario: Viewing the inbox
- **WHEN** a user opens the Inbox view
- **THEN** all tasks with `state: 'inbox'` are listed ordered from oldest to newest

#### Scenario: Inbox item removed after clarification
- **WHEN** a user clarifies an inbox item into any other state (`next`, `waiting`, `scheduled`, `someday`, `reference`)
- **THEN** the item no longer appears in the Inbox view
