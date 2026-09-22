## MODIFIED Requirements

### Requirement: Universal Quick Capture Entry Point
The system SHALL provide a capture mechanism reachable from every screen of the application: a visible interactive capture button accessible across viewports (a floating action button on mobile viewports and a visible capture action on desktop viewports) and a global keyboard shortcut on desktop viewports.

#### Scenario: Capture from any screen on mobile
- **WHEN** a user taps the floating capture button while viewing any page
- **THEN** a quick-entry field for a title is presented without navigating away from the current page's context

#### Scenario: Capture from desktop via click
- **WHEN** a user clicks the capture button in the desktop interface while viewing any page
- **THEN** a quick-entry field for a title is presented without navigating away from the current page's context

#### Scenario: Capture from any screen on desktop
- **WHEN** a user presses the global capture keyboard shortcut while the application window has focus, regardless of the current page
- **THEN** a quick-entry field for a title is presented
