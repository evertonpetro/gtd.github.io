## Why

O MVP original (`build-gtd-app-mvp`) implementa todas as listas GTD (Inbox, Next, Waiting, Scheduled, Someday, Reference, Logbook, Trash) e a Focus List, mas deixa a Revisão Semanal — o ritual central do GTD para "esvaziar a mente" e recalibrar prioridades — como uma prática puramente manual, exigindo que o usuário pule sozinho de tela em tela. O `prd_weekly_review_feature.md` fecha essa lacuna com um wizard guiado que conduz o usuário pelas telas já existentes, na ordem correta, com instruções contextuais em cada etapa.

## What Changes

- Novo módulo de UI `WeeklyReviewWizard`: um estado transitório (Zustand, não persistido) que guia o usuário por 7 passos sequenciais (Get Clear → Inbox Zero → Logbook → Waiting → Projects → Someday/Maybe → Foco), navegando automaticamente para a rota de cada passo e exibindo um banner flutuante com instruções, botões "Anterior"/"Próximo" e "Finalizar".
- Botão "Iniciar Revisão Semanal" na Sidebar que ativa o wizard a partir do Passo 1.
- Navegação síncrona: avançar/retroceder passo também navega a rota correspondente (React Router).
- Encerramento do wizard (clique em "Finalizar" no último passo, ou fechar a aba/app no meio do fluxo) sempre desativa o estado sem persistir progresso — reiniciar a revisão depois sempre começa do Passo 1.
- Nenhuma tabela nova no Dexie e nenhuma alteração de schema: o wizard apenas orquestra navegação e reaproveita ações já existentes (capturar, esclarecer, marcar foco) definidas nas capacidades do MVP.

## Capabilities

### New Capabilities
- `weekly-review`: fluxo guiado (wizard) de 7 passos que conduz o usuário pelo ritual da Revisão Semanal GTD, sincronizando navegação e instruções contextuais sobre as views já existentes do MVP.

### Modified Capabilities
_Nenhuma — o wizard consome as views e ações de `inbox-capture`, `task-clarification`, `task-completion-and-recurrence` (Logbook), `project-management`, `focus-list` etc. sem alterar o comportamento ou os requisitos dessas capacidades._

## Impact

- **Código:** novo `store/weeklyReviewStore.ts` (Zustand), novo componente global `components/layout/ReviewWizardBanner.tsx` renderizado a partir de `App.tsx`/layout principal, e um botão de entrada na Sidebar. Não requer novas páginas — reutiliza `/inbox`, `/logbook`, `/waiting`, `/projects`, `/someday`, `/next` (ou `/focus`) já previstas em `build-gtd-app-mvp`.
- **Dependência de sequenciamento:** esta proposta assume que as rotas/páginas de `build-gtd-app-mvp` existirão (Inbox, Logbook, Waiting, Projects, Someday, Next/Focus). Como aquele change ainda está pendente (não implementado nem arquivado), a implementação desta feature deve ocorrer depois — ou em paralelo ao final — da implementação do MVP base.
- **Dados:** nenhuma alteração de schema Dexie; nenhuma nova tabela; nenhuma migração.
- **Testes:** dispensáveis neste projeto, conforme decisão já registrada para o MVP — verificação seguirá manual/exploratória.
