## Purpose

Let users retain non-actionable reference material inside the same system as their tasks, organized by project or area for later lookup, without it ever polluting actionable GTD lists.

## ADDED Requirements

### Requirement: Reference State Exclusion from Actionable Lists
Tasks with `state: 'reference'` SHALL be excluded from all actionable lists: Inbox, Next, Waiting, Scheduled, Someday, and Focus.

#### Scenario: Reference item absent from Next list
- **WHEN** a task has `state: 'reference'`
- **THEN** it never appears in the Next, Waiting, Scheduled, Someday, Focus, or Inbox views

### Requirement: Filing Reference Material by Project or Area
Reference items SHALL support the same optional `projectId` and `areaId` associations as actionable tasks, used to organize and browse them.

#### Scenario: Filing a reference item under a project
- **WHEN** a user assigns a reference item to an existing Project
- **THEN** the item appears when browsing that project's reference material

### Requirement: Reference View
The system SHALL provide a dedicated Reference view listing every Task with `state: 'reference'`, grouped by Project and then by Area, with free-text search over title and notes.

#### Scenario: Browsing reference material
- **WHEN** a user opens the Reference view
- **THEN** reference items are grouped by their associated Project and Area

#### Scenario: Searching reference material
- **WHEN** a user types a search term in the Reference view
- **THEN** only reference items whose title or notes contain that term are shown

### Requirement: Reference Items Can Be Trashed
Reference items SHALL be deletable using the same soft-delete mechanism as actionable tasks, moving them to `state: 'trash'`.

#### Scenario: Deleting a reference item
- **WHEN** a user deletes a reference item
- **THEN** its `state` becomes `'trash'` and it disappears from the Reference view
