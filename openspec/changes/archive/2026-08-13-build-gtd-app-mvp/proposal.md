## Why

Hoje o repositório não tem nenhuma aplicação implementada — apenas o PRD V2, o schema de dados V2 e o documento de arquitetura. O objetivo é construir a primeira versão funcional (MVP) do gerenciador de tarefas GTD 100% client-side (PWA, sem backend), cobrindo o ciclo completo do método: Capturar → Esclarecer → Organizar → Refletir → Engajar, com Logbook e backup manual via JSON.

## What Changes

- Estrutura inicial do projeto (React + TypeScript + Vite + Tailwind + Dexie.js + Zustand), seguindo o Feature-Sliced Design descrito em `architecture_and_structure.md`.
- Schema Dexie V2 (`tasks`, `projects`, `tags`, `areas`, `taskTags`), **estendido** em relação ao documento original: o enum `Task.state` ganha o valor `'reference'` para representar material de referência de forma consistente com a máquina de estados (decisão registrada em `.mvp/ambiguity_resolutions.md`). **BREAKING** em relação ao schema V2 tal como documentado (adiciona um valor de enum antes de qualquer dado existir — sem impacto real, pois não há dados em produção).
- Captura universal (Inbox + botão flutuante/atalho global).
- Esclarecimento e organização: tipos de item (ação/referência), estados GTD (`next`, `waiting`, `scheduled`, `someday`, `reference`), campos ricos de tarefa (notas Markdown, checklist nativo, tempo, energia, datas, contato).
- Projetos paralelos e sequenciais, com a regra de ouro de exibir apenas a próxima ação de projetos sequenciais.
- Áreas de Foco e Tags/Contextos, com herança de área de Projeto para Task e filtragem cruzada (Tag + Área + Energia + Tempo).
- Boot Engine ("falso cronjob" client-side) que reavalia datas ao montar o app e ao focar a janela, promovendo tarefas `scheduled` para `next`.
- Focus List agregando tarefas estreladas manualmente e tarefas com `dueDate`/`startDate` vencidos.
- Conclusão de tarefas com Logbook imutável e geração de tarefas recorrentes **ancorada na data de conclusão** (`completedAt`), com roteamento automático de estado (`scheduled` se a nova data for futura, `next` caso contrário, com `focus: true` se a `dueDate` for hoje) — decisão registrada em `.mvp/ambiguity_resolutions.md`.
- Biblioteca de Referência para itens não acionáveis (`state: 'reference'`), organizados por projeto/área.
- Lixeira com exclusão reversível e esvaziamento **estritamente manual** no MVP (sem purga automática) — decisão registrada em `.mvp/ambiguity_resolutions.md`.
- Backup e sincronização manual via exportação/importação de JSON com substituição total ("Hard Replace") e lembrete periódico de backup (a cada 7 dias).
- Requisitos de plataforma PWA: instalabilidade (iOS/Android/Desktop), funcionamento 100% offline e respeito ao `safe-area-inset` no iOS.

## Capabilities

### New Capabilities
- `inbox-capture`: entrada rápida universal e Inbox como ponto único de captura.
- `task-clarification`: transformar itens capturados em tarefas acionáveis (com seus atributos ricos) ou material de referência.
- `project-management`: projetos paralelos vs. sequenciais e a regra de próxima ação única.
- `areas-and-tags`: Áreas de Foco e Tags/Contextos, herança de área e filtragem cruzada.
- `gtd-boot-engine`: motor client-side que reavalia datas ao abrir/focar o app e promove tarefas agendadas.
- `focus-list`: lista agregada de foco do dia (estreladas + vencidas).
- `task-completion-and-recurrence`: conclusão de tarefas, Logbook e geração de instâncias recorrentes.
- `reference-library`: organização e consulta de material de referência não acionável.
- `trash-management`: exclusão reversível e esvaziamento manual da lixeira.
- `data-backup-sync`: exportação/importação JSON (hard replace) e lembrete de backup.
- `pwa-platform`: instalabilidade, funcionamento offline e conformidade de safe-area.

### Modified Capabilities
_Nenhuma — não há specs existentes neste repositório; este é o primeiro incremento do produto._

## Impact

- **Código:** cria toda a árvore `src/` (ainda vazia) conforme `architecture_and_structure.md`: `db/` (Dexie + repositórios), `features/*` (gtd-engine, tasks, projects, sync), `store/` (Zustand), `pages/`, `components/`, `types/`, `utils/`.
- **Dados:** define a versão inicial (`version(2)`) do schema Dexie já com o enum de `state` estendido; não há migração de dados reais pois o banco ainda não existe em produção.
- **Dependências novas:** React, TypeScript, Vite (+ plugin PWA), Tailwind CSS, Dexie.js, `dexie-react-hooks`, Zustand, `lucide-react`, `clsx`/`tailwind-merge`. Nenhuma chamada de rede, nenhum backend, nenhuma lib de server-state (React Query/SWR) — proibidas por `AGENTS.md`.
- **Testes:** testes unitários automatizados são dispensáveis neste projeto (decisão explícita do usuário); a verificação de comportamento será manual/exploratória.
