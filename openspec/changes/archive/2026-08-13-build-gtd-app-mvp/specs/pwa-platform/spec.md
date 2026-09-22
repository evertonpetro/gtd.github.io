## Purpose

Ensure the app is installable and comfortably usable as a standalone, offline-capable client on iOS, Android, and Desktop, with no backend of any kind.

## ADDED Requirements

### Requirement: Installability
The system SHALL be installable as a Progressive Web App on iOS via Safari's "Add to Home Screen", and on Android and Desktop Chrome/Firefox/Safari, by providing a valid web app manifest and a registered service worker.

#### Scenario: Installing on iOS
- **WHEN** a user opens the app in Safari on iOS and chooses "Add to Home Screen"
- **THEN** the app installs as a standalone icon that launches without browser chrome

#### Scenario: Installing on Desktop or Android Chrome
- **WHEN** a user opens the app in a Chromium-based browser
- **THEN** the browser recognizes it as installable and the app can be added as a standalone application

### Requirement: Offline Availability
Once loaded, the system SHALL remain fully functional without any network connectivity, since all data and business logic are local to the client.

#### Scenario: Using the app offline
- **WHEN** a user opens the installed app with no network connection available
- **THEN** every feature (capture, clarify, organize, focus, complete, backup export) continues to work exactly as when online

### Requirement: Safe-Area Compliance on iOS
On iOS devices, interactive controls SHALL respect the device's safe-area-inset so they are never obscured by system UI such as the home indicator.

#### Scenario: Floating capture button on iPhone
- **WHEN** the app is viewed on an iOS device with a home indicator
- **THEN** the floating capture button and bottom navigation remain fully visible and tappable above the safe-area inset
