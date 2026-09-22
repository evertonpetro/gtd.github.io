# areas-and-tags Specification

## Purpose

Provide two lightweight, orthogonal classification mechanisms — Areas of Focus for high-level life/work domains and Tags for flexible contexts — and the combined filtering they enable across every actionable list.

## Requirements

### Requirement: Areas of Focus
The system SHALL let users define Areas (e.g., "Personal", "Work") and assign at most one Area to a Task or a Project.

#### Scenario: Creating an area
- **WHEN** a user creates a new Area with a title
- **THEN** the Area becomes available for assignment to Tasks and Projects

### Requirement: Global Area Filter with Inheritance
Selecting an Area in the global filter SHALL restrict the entire UI to tasks whose own `areaId` matches the selected Area, or whose parent Project's `areaId` matches the selected Area.

#### Scenario: Filtering by area across the app
- **WHEN** a user selects the "Work" area in the global filter
- **THEN** every list in the application (Next, Waiting, Scheduled, Someday, Focus, Reference) shows only tasks matching that area directly or through their project

### Requirement: Tags and Contexts
The system SHALL let users define free-form Tags (e.g., "@home", "@phone") and assign zero or more Tags to a Task through a task-tag association.

#### Scenario: Tagging a task
- **WHEN** a user adds the tag "@phone" to a task
- **THEN** the association between the task and the tag is persisted and the task appears when filtering by "@phone"

### Requirement: Cross Filtering
The system SHALL let users combine Tag, Area, Energy Level, and Time Estimate filters simultaneously on any actionable list, showing only tasks matching all selected criteria.

#### Scenario: Combined filter
- **WHEN** a user filters by area "Work", tag "@phone", energy "Low", and time estimate "15 minutes or less"
- **THEN** only next actions matching all four criteria are displayed

#### Scenario: Clearing filters
- **WHEN** a user clears all active filters
- **THEN** the list returns to showing all tasks appropriate for that view, unfiltered
