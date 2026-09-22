# trash-management Specification

## Purpose

Provide a manual, reversible safety net before permanent deletion of tasks and projects, so accidental deletions can always be undone until the user explicitly empties the trash.

## Requirements

### Requirement: Soft Delete
Deleting a Task or Project SHALL set its `state` to `'trash'` rather than removing the record, preserving all of its other fields for potential recovery.

#### Scenario: Deleting a task
- **WHEN** a user deletes a task
- **THEN** the task's `state` becomes `'trash'` and all other fields (title, notes, checklist, dates, associations) remain unchanged

#### Scenario: Deleting a project
- **WHEN** a user deletes a project
- **THEN** the project's `state` becomes `'trash'`, independent of the states of the tasks that belong to it

### Requirement: Restore from Trash
The system SHALL allow restoring a trashed Task or Project to a valid non-trash state.

#### Scenario: Restoring a task
- **WHEN** a user restores a trashed task
- **THEN** the task's `state` is set back to `'inbox'` (or, when the prior state is known, back to that prior state) and it reappears in the corresponding list

#### Scenario: Restoring a project
- **WHEN** a user restores a trashed project
- **THEN** the project's `state` is set back to `'active'`

### Requirement: Manual Empty Trash
The system SHALL provide an explicit "Empty Trash" action that permanently deletes all `state: 'trash'` Tasks and Projects. No automatic time-based purge SHALL occur in this MVP.

#### Scenario: Emptying the trash
- **WHEN** a user confirms "Empty Trash"
- **THEN** every task and project with `state: 'trash'` is permanently removed and cannot be recovered

#### Scenario: No automatic purge
- **WHEN** a task or project remains in `state: 'trash'` for any length of time without the user emptying the trash
- **THEN** it is never automatically deleted
