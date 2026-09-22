# focus-list Specification

## Purpose

Give users one aggregated, always-relevant view of what to work on today, combining manually expressed intent (starring a task) with date-driven urgency (overdue or due-today items).

## Requirements

### Requirement: Focus List Composition
The Focus List SHALL include every actionable Task (not in `'logbook'` or `'trash'`) for which `focus` is `true`, or for which `dueDate` or `startDate` is today or earlier.

#### Scenario: Starred task included
- **WHEN** a task has `focus: true`, regardless of its `dueDate` or `startDate`
- **THEN** the task appears in the Focus List

#### Scenario: Overdue due date included
- **WHEN** a task's `dueDate` is earlier than or equal to today
- **THEN** the task appears in the Focus List even if `focus` is `false`

#### Scenario: Future scheduled task excluded
- **WHEN** a task's `startDate` and `dueDate` are both in the future and `focus` is `false`
- **THEN** the task does not appear in the Focus List

#### Scenario: Completed or trashed tasks excluded
- **WHEN** a task is in `state: 'logbook'` or `state: 'trash'`
- **THEN** the task never appears in the Focus List, regardless of its `focus` flag or dates

### Requirement: Manual Star Toggle
Users SHALL be able to toggle a Task's `focus` flag independently of its `state`, from any list where the task is displayed.

#### Scenario: Starring a task
- **WHEN** a user stars a task that is not due or scheduled for today
- **THEN** the task's `focus` becomes `true` and it immediately appears in the Focus List

#### Scenario: Unstarring a task
- **WHEN** a user unstars a task whose dates do not otherwise qualify it for the Focus List
- **THEN** the task's `focus` becomes `false` and it no longer appears in the Focus List
