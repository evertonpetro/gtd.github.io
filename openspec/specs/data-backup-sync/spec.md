# data-backup-sync Specification

## Purpose

Give users full ownership and portability of their data through manual JSON export/import, and nudge them to back up regularly since client-only storage can be wiped by the OS or browser at any time.

## Requirements

### Requirement: Full Data Export
The system SHALL let a user export a single JSON file containing the complete contents of every IndexedDB table: `tasks`, `projects`, `tags`, `areas`, and `taskTags`.

#### Scenario: Exporting a backup
- **WHEN** a user triggers "Export Backup"
- **THEN** a JSON file is generated and downloaded containing all records from every table

### Requirement: Hard-Replace Import
Importing a JSON backup SHALL warn the user that all current local data will be permanently replaced before proceeding, and upon confirmation SHALL delete all existing records and load the file's records verbatim.

#### Scenario: Import confirmation required
- **WHEN** a user selects a backup file to import
- **THEN** the system displays an explicit warning that existing data will be erased and requires confirmation before proceeding

#### Scenario: Confirmed import replaces all data
- **WHEN** a user confirms the import warning
- **THEN** all existing tasks, projects, tags, areas, and taskTags are deleted and replaced with the contents of the imported file

#### Scenario: Cancelled import preserves data
- **WHEN** a user cancels the import warning
- **THEN** no data is modified and the existing database remains untouched

### Requirement: Periodic Backup Reminder
The system SHALL track the timestamp of the last successful export (`lastBackupDate`) and display a dismissible reminder when 7 or more days have elapsed since then.

#### Scenario: Reminder shown after a week without backup
- **WHEN** 7 or more days have passed since `lastBackupDate` (or no backup has ever been made)
- **THEN** a dismissible reminder banner suggesting a backup is displayed

#### Scenario: Reminder cleared after a new export
- **WHEN** a user successfully exports a new backup
- **THEN** `lastBackupDate` is updated to now and the reminder banner no longer appears until 7 more days elapse
