## Purpose

Let users turn a raw captured item into either an actionable task carrying the attributes needed to act on it, or into non-actionable reference material, following the GTD "clarify" step.

## ADDED Requirements

### Requirement: Classifying an Item as Action or Reference
When clarifying an item, the system SHALL let the user classify it as `type: 'action'` (has a next physical action) or `type: 'reference'` (informational, non-actionable). Setting `type` to `'reference'` SHALL set `state` to `'reference'`.

#### Scenario: Marking an item as reference
- **WHEN** a user marks an inbox item as "not actionable / reference"
- **THEN** the task's `type` is set to `'reference'` and its `state` transitions to `'reference'`

#### Scenario: Keeping an item actionable
- **WHEN** a user marks an inbox item as actionable
- **THEN** the task's `type` remains `'action'` and the user must additionally choose one of the GTD states below

### Requirement: Assigning a GTD State to Actionable Items
For items with `type: 'action'`, the system SHALL let the user set `state` to one of `'next'`, `'waiting'`, `'scheduled'`, or `'someday'`.

#### Scenario: Marking a task as a next action
- **WHEN** a user decides an item can be done now and has no dependency
- **THEN** `state` is set to `'next'`

#### Scenario: Deferring to Someday/Maybe
- **WHEN** a user marks an actionable item as "Someday/Maybe"
- **THEN** `state` is set to `'someday'` without requiring a `startDate` or `dueDate`

#### Scenario: Scheduling a task
- **WHEN** a user sets a Start Date on an actionable item and marks it Scheduled
- **THEN** `state` is set to `'scheduled'` and the `startDate` is persisted

#### Scenario: Delegating a task
- **WHEN** a user marks an actionable item as Waiting and optionally fills in a Contact
- **THEN** `state` is set to `'waiting'` and the `contact` value, if provided, is persisted

### Requirement: Rich Task Detail Fields
The system SHALL allow any actionable Task to optionally carry Markdown notes, a native checklist, a time estimate (5, 15, 30, 60, or 120 minutes), an energy level (Low, Medium, or High), a Start Date, and a Due Date.

#### Scenario: Adding a checklist
- **WHEN** a user adds checklist items to a task and marks one as complete
- **THEN** the checklist is persisted as an ordered array of `{id, text, isCompleted}` entries, with that item's `isCompleted` set to `true`, independent of the task's own `state`

#### Scenario: Setting time estimate and energy level
- **WHEN** a user sets the time estimate to 30 minutes and the energy level to "Low"
- **THEN** both attributes are persisted on the task and become available for filtering

#### Scenario: Editing notes
- **WHEN** a user writes Markdown notes on a task
- **THEN** the notes are persisted verbatim and rendered as formatted Markdown when the task is viewed

### Requirement: Optional Project and Area Association
The system SHALL allow a Task to optionally reference at most one Project (`projectId`) and one Area (`areaId`).

#### Scenario: Assigning a task to a project
- **WHEN** a user assigns a task to an existing Project
- **THEN** the task's `projectId` is set and the task appears in that project's task list

#### Scenario: Removing a task from a project
- **WHEN** a user unassigns a task from its project
- **THEN** the task's `projectId` is cleared and the task no longer appears in that project's task list
