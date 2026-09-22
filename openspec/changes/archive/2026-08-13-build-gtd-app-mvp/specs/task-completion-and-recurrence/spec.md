## Purpose

Record completed work in an immutable history that supports the Weekly Review, and automatically regenerate recurring tasks using a completion-anchored schedule so that falling behind never causes a backlog "avalanche" of instances.

## ADDED Requirements

### Requirement: Completing a Task
Marking a Task complete SHALL set its `state` to `'logbook'` and its `completedAt` to the current timestamp, regardless of its prior state, except tasks already in `'trash'`.

#### Scenario: Completing a next action
- **WHEN** a user marks a task with `state: 'next'` as complete
- **THEN** the task's `state` becomes `'logbook'` and `completedAt` is set to now

#### Scenario: Trashed tasks cannot be completed directly
- **WHEN** a task is in `state: 'trash'`
- **THEN** it must be restored before it can be marked complete

### Requirement: Logbook Ordering and Immutability
The Logbook view SHALL list every Task with `state: 'logbook'` ordered by `completedAt` descending (most recently completed first), and completed tasks SHALL be read-only in this view (viewable but not editable in place).

#### Scenario: Viewing the logbook
- **WHEN** a user opens the Logbook view
- **THEN** completed tasks are listed from most to least recently completed

### Requirement: Recurrence Instance Generation Anchored to Completion
When a Task with a `recurrenceRule` is completed, the system SHALL clone it into a new Task with a new id and no `completedAt`, recalculating `startDate`/`dueDate` from the completion timestamp (`completedAt`) rather than from the original `startDate`/`dueDate`.

#### Scenario: Daily recurrence completed on time
- **WHEN** a daily-recurring task is completed today
- **THEN** a new task instance is created with `startDate` set to one day after today

#### Scenario: Recurrence completed late does not avalanche
- **WHEN** a weekly-recurring task is completed 10 days after it was originally due
- **THEN** the new instance's date is calculated as one week after the actual completion date, not as a backlog of missed weekly occurrences

### Requirement: Recurrence State Routing
The newly generated recurring instance SHALL receive `state: 'scheduled'` if its computed `startDate` is strictly after today, or `state: 'next'` if its computed `startDate` is today or in the past, or absent. If routed to `'next'` and its `dueDate` is today, it SHALL additionally receive `focus: true`.

#### Scenario: Future occurrence is scheduled
- **WHEN** the newly generated instance's computed `startDate` is after today
- **THEN** its `state` is set to `'scheduled'`

#### Scenario: Immediate occurrence becomes a next action
- **WHEN** the newly generated instance's computed `startDate` is today or earlier
- **THEN** its `state` is set to `'next'`

#### Scenario: Immediate occurrence due today is also focused
- **WHEN** the newly generated instance is routed to `'next'` and its `dueDate` equals today
- **THEN** its `focus` flag is set to `true`
