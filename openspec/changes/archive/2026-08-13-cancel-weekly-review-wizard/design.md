## Context

The Weekly Review wizard guides users through 7 GTD review steps using a persistent banner (`ReviewWizardBanner`). Currently, once initiated, the only way to dismiss the banner without reloading the page is advancing through all 7 steps and clicking "Finalizar".

## Goals / Non-Goals

**Goals:**
- Provide a clear, accessible 1-click exit affordance (`X` icon button) in `ReviewWizardBanner`.
- Immediately deactivate the wizard (`isActive: false`) and reset `currentStep` to 0.
- Keep the user on whatever route they are currently viewing when cancelling.

**Non-Goals:**
- Persisting intermediate review state or review draft in IndexedDB (the weekly review is intentionally ephemeral).
- Confirmation modals or interruption dialogs (1-click direct exit preserves the Zen GTD experience).

## Decisions

### 1. Close Affordance: `X` Icon in Action Controls
- **Decision**: Place an `X` icon button (`lucide-react`) within the action button group of `ReviewWizardBanner`.
- **Rationale**: Minimal visual weight, universally understood close affordance, works seamlessly across desktop and mobile without crowding step navigation buttons.

### 2. Immediate 1-Click Exit vs Confirmation Modal
- **Decision**: Direct exit on click without confirmation prompts.
- **Rationale**: Since weekly review progress is ephemeral and does not destroy any user data (tasks/projects remain untouched), a single-click exit provides a frictionless, lightweight interaction.

## Risks / Trade-offs

- **[Risk] Accidental clicks on close button**:
  - *Mitigation*: Position the `X` button with slight margin (`ml-1`) after the primary action buttons (`Anterior`/`Próximo`/`Finalizar`) so it is distinct from step advancement controls.
