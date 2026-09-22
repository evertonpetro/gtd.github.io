## MODIFIED Requirements

### Requirement: Starting the Weekly Review
The system SHALL provide a "Iniciar Revisão Semanal" action, reachable from both the desktop Sidebar and the mobile navigation menu, that activates the review wizard at Step 1 regardless of the page currently being viewed.

#### Scenario: Starting a review from any page
- **WHEN** a user clicks "Iniciar Revisão Semanal" in the Sidebar while viewing any page
- **THEN** the wizard becomes active, its current step is set to Step 1 (Get Clear), and the app navigates to the Inbox

#### Scenario: Starting a review from mobile navigation
- **WHEN** a user taps "Iniciar Revisão Semanal" inside the mobile navigation menu while viewing any page
- **THEN** the mobile navigation drawer closes, the wizard becomes active, its current step is set to Step 1 (Get Clear), and the app navigates to the Inbox
