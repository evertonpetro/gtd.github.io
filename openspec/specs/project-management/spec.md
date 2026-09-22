# project-management Specification

## Purpose

Let users group related tasks into Projects that can be worked in parallel or in a strict sequence, enforcing GTD's discipline of surfacing only the currently actionable next action for sequential projects.

## Requirements

### Requirement: Project Types
The system SHALL support two Project types: `'parallel'`, where every eligible task is independently actionable, and `'sequential'`, where only one task is actionable at a time.

#### Scenario: Creating a parallel project
- **WHEN** a user creates a Project and sets its type to `'parallel'`
- **THEN** every task in that project with `state: 'next'` appears in the global Next list

#### Scenario: Creating a sequential project
- **WHEN** a user creates a Project and sets its type to `'sequential'`
- **THEN** the project is subject to the Sequential Next-Action Visibility rule below

### Requirement: Sequential Project Next-Action Visibility
For a `'sequential'` project, when computing the global Next list, the system SHALL surface only the single task with `state: 'next'` that has the earliest `createdAt` among that project's tasks. All other `'next'`-state tasks belonging to that project SHALL be excluded from the Next list.

#### Scenario: Second task hidden until the first completes
- **WHEN** a sequential project has two tasks with `state: 'next'`, Task A created before Task B
- **THEN** only Task A appears in the global Next list; Task B is hidden from it

#### Scenario: Next task revealed after completion
- **WHEN** Task A from the previous scenario is completed and moves to `state: 'logbook'`
- **THEN** Task B now appears in the global Next list

#### Scenario: Non-next states are unaffected by the sequential lock
- **WHEN** a sequential project's earliest task is in `state: 'waiting'` or `'scheduled'` rather than `'next'`
- **THEN** that task is shown in its own Waiting or Scheduled list as normal, and any other task in that project with `state: 'next'` still appears in the Next list, because the sequential lock only filters among `'next'`-state tasks

### Requirement: Area Inheritance from Project
A Task without its own `areaId` SHALL inherit its parent Project's `areaId` for the purposes of area-based filtering (see `areas-and-tags`).

#### Scenario: Filtering by inherited area
- **WHEN** a Project has `areaId` "Work" and a Task within it has no `areaId` set
- **THEN** filtering the UI by the "Work" area includes that task

### Requirement: Project Completion
The system SHALL allow marking a Project as `state: 'completed'`, recording `completedAt`, without requiring its tasks to be deleted individually first.

#### Scenario: Completing a project
- **WHEN** a user marks a project as complete
- **THEN** the project's `state` is set to `'completed'` and `completedAt` is set to the current time, while its existing tasks retain their own individual states
