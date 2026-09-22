# gtd-boot-engine Specification

## Purpose

Compensate for the absence of a server-side scheduler by re-evaluating date-driven state transitions every time the client application becomes active, so scheduled tasks surface without requiring a background service.

## Requirements

### Requirement: Date Evaluation on Startup and Refocus
The system SHALL run a date-evaluation routine when the application first mounts, and again whenever the browser tab or window regains focus after being backgrounded.

#### Scenario: App reopened after days away
- **WHEN** a user reopens the app 3 days after a scheduled task's `startDate` has passed
- **THEN** the evaluation routine runs on mount, before the user interacts with any list, and promotes that task

#### Scenario: Tab regains focus
- **WHEN** a user switches back to the app's browser tab after a scheduled task's `startDate` elapsed while the tab was in the background
- **THEN** the evaluation routine runs on the window focus event and promotes the task

### Requirement: Scheduled-to-Next Promotion
The evaluation routine SHALL move any Task with `state: 'scheduled'` to `state: 'next'` when its `startDate` is less than or equal to the current date, and SHALL leave tasks whose `startDate` is still in the future unchanged.

#### Scenario: Promotion when due
- **WHEN** a scheduled task's `startDate` is less than or equal to today at evaluation time
- **THEN** its `state` changes to `'next'`

#### Scenario: No premature promotion
- **WHEN** a scheduled task's `startDate` is still in the future at evaluation time
- **THEN** its `state` remains `'scheduled'`

### Requirement: Idempotent, Non-Destructive Evaluation
Running the evaluation routine multiple times in immediate succession SHALL NOT create duplicate transitions, duplicate tasks, or any side effect beyond the intended one-time state change per task.

#### Scenario: Rapid repeated focus events
- **WHEN** the window fires multiple focus events in quick succession while a task is eligible for promotion
- **THEN** the task is promoted exactly once and no other field is modified beyond `state` and `updatedAt`
