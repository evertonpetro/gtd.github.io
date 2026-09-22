## ADDED Requirements

### Requirement: Cancelling or Exiting the Weekly Review
The system SHALL provide a visible close ("X") action button in the wizard banner across all steps that allows the user to immediately exit the review wizard in a single click, deactivating the wizard, hiding the banner, and resetting the wizard step without navigating away from the current route.

#### Scenario: Cancelling the review at any step
- **WHEN** a user clicks the close ("X") button on the wizard banner while on any step
- **THEN** the wizard becomes inactive, the wizard step resets to Step 1 (index 0), the banner disappears, and the user remains on the current view

#### Scenario: Restarting after cancellation
- **WHEN** a user starts a new review after cancelling a previous review
- **THEN** the new review begins fresh at Step 1 (Get Clear) and navigates to the Inbox
