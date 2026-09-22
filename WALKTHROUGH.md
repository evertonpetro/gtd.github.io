# Guia Passo a Passo do Sistema (WALKTHROUGH.md)

Este documento apresenta um guia completo e passo a passo de todas as funcionalidades do **GTD App**, demonstrando como os conceitos da metodologia *Getting Things Done* (David Allen) são implementados na prática através de uma arquitetura *offline-first* moderna.

---

## 📑 Índice
1. [Visão Geral e Metodologia GTD](#1-visão-geral-e-metodologia-gtd)
2. [Fluxo 1: Captura Rápida (Inbox & Quick Capture)](#fluxo-1-captura-rápida-inbox--quick-capture)
3. [Fluxo 2: Esclarecimento e Processamento (Clarify)](#fluxo-2-esclarecimento-e-processamento-clarify)
4. [Fluxo 3: Gestão de Projetos (Paralelos vs. Sequenciais)](#fluxo-3-gestão-de-projetos-paralelos-vs-sequenciais)
5. [Fluxo 4: Organização por Contexto (Áreas de Foco & Tags)](#fluxo-4-organização-por-contexto-áreas-de-foco--tags)
6. [Fluxo 5: Execução Diária e Foco (Focus List)](#fluxo-5-execução-diária-e-foco-focus-list)
7. [Fluxo 6: Conclusão e Tarefas Recorrentes (Client-Side Cloning)](#fluxo-6-conclusão-e-tarefas-recorrentes-client-side-cloning)
8. [Fluxo 7: O Motor de Inicialização (Boot Engine)](#fluxo-7-o-motor-de-inicialização-boot-engine)
9. [Fluxo 8: Material de Referência e Lixeira (Reference & Trash)](#fluxo-8-material-de-referência-e-lixeira-reference--trash)
10. [Fluxo 9: Ritual da Revisão Semanal (Weekly Review Wizard)](#fluxo-9-ritual-da-revisão-semanal-weekly-review-wizard)
11. [Fluxo 10: Backup, Restauração e PWA Offline](#fluxo-10-backup-restauração-e-pwa-offline)

---

## 1. Visão Geral e Metodologia GTD

O sistema foi desenhado para seguir rigorosamente os 5 passos do fluxo de trabalho GTD:

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌──────────────┐     ┌─────────────┐
│ 1. CAPTURAR │ ──> │ 2. ESCLARECER│ ──> │ 3. ORGANIZAR  │ ──> │ 4. REFLETIR  │ ──> │ 5. ENGAJAR  │
│(Quick Entry)│     │ (Decisão GTD)│     │(Listas/Áreas) │     │ (Rev. Semanal│     │(Focus / Do) │
└─────────────┘     └──────────────┘     └───────────────┘     └──────────────┘     └─────────────┘
```

Todas as informações são armazenadas localmente no navegador via **IndexedDB**, garantindo privacidade absoluta e disponibilidade offline contínua.

---

## Fluxo 1: Captura Rápida (Inbox & Quick Capture)

### Objetivo
Permitir ao usuário esvaziar a mente instantaneamente a qualquer momento, sem atrito e sem necessidade de categorização prévia.

### Como Funciona
1. **Ativação Global:**
   - **No Desktop:** Pressione a tecla `C` em qualquer tela (quando não estiver digitando em um campo de texto) ou clique no botão **+ Nova Tarefa [C]** no topo da barra lateral (*Sidebar*).
   - **No Mobile:** Toque no botão de ação flutuante (**+**) localizado no canto inferior direito.
2. **Entrada Mínima:** Digite o título do pensamento, ideia ou tarefa e pressione `Enter` (ou tecla de envio no teclado virtual) ou clique/toque no botão **Capturar**. O botão permanece desabilitado enquanto o campo estiver vazio.
3. **Persistência Imediata:** O item é criado instantaneamente com o estado `inbox` e tipo `action`.
4. **Visualização:** Os itens na Inbox são listados em ordem cronológica de criação (do mais antigo para o mais recente), incentivando o processamento no modelo FIFO (*First In, First Out*).

### Diagrama do Fluxo de Captura
```
   Ideia / Pensamento
           │
           ▼
┌──────────────────────────────┐
│ Atalho [C] / Botão Sidebar   │ (Desktop)
│ Botão Flutuante (+)          │ (Mobile)
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│     Modal Quick Capture      │ (Requer apenas o Título)
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ IndexedDB: state='inbox'     │
│ type='action'                │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Lista da Inbox         │ (Ordenada do mais antigo para o mais novo)
└──────────────────────────────┘
```

---

## Fluxo 2: Esclarecimento e Processamento (Clarify)

### Objetivo
Transformar itens brutos da Inbox em ações claras e bem definidas ou arquivá-los como material não acionável.

### Árvore de Decisão GTD Passo a Passo
Ao clicar em uma tarefa na Inbox, o painel de detalhes lateral é aberto para esclarecimento:

1. **Ação imediata vs. Não acionável:**
   - Se **Não Acionável**:
     - *Lixo:* Exclua a tarefa (enviada para a `Trash`).
     - *Incubação:* Mude para `Someday` (Algum dia / Talvez).
     - *Informação/Nota:* Mude o tipo para `Reference` (Material de consulta).
   - Se **Acionável**:
     - *Executar agora / Próxima Ação:* Mude para `Next`.
     - *Delegado a Terceiro:* Mude para `Waiting` e insira o nome do contato.
     - *Com data de início futura:* Mude para `Scheduled` e defina a data de início (`startDate`).

2. **Detalhamento Opcional:**
   - **Notas em Markdown:** Contexto e anotações ricas com formatação.
   - **Checklist:** Sub-itens com marcação de progresso independente.
   - **Estimativas:** Nível de Energia (*Low*, *Medium*, *High*) e Tempo Estimado (*5*, *15*, *30*, *60*, *120* minutos).
   - **Associação:** Vincular a um **Projeto** e/ou a uma **Área de Foco**.

### Diagrama do Esclarecimento
```
                    ┌─────────────────────────┐
                    │      Item na Inbox      │
                    └────────────┬────────────┘
                                 │
                     ¿ É acionável (Tem ação)?
                                 │
            ┌────────────────────┴────────────────────┐
           NÃO                                       SIM
            │                                         │
    ┌───────┼───────┐                     ┌───────────┼───────────┐
    ▼       ▼       ▼                     ▼           ▼           ▼
┌───────┐┌───────┐┌─────────┐        ┌─────────┐ ┌─────────┐ ┌───────────┐
│Trash  ││Someday││Reference│        │  Next   │ │ Waiting │ │ Scheduled │
│(Lixo) ││(Talvez││(Material│        │(Próxima │ │(Aguardar│ │(Data no   │
└───────┘└───────┘└─────────┘        │  Ação)  │ │ Contato)│ │  Futuro)  │
                                     └─────────┘ └─────────┘ └───────────┘
```

---

## Fluxo 3: Gestão de Projetos (Paralelos vs. Sequenciais)

### Objetivo
Permitir a gestão de objetivos com múltiplos passos, aplicando a regra clássica de visibilidade sequencial do GTD.

### Tipos de Projetos
1. **Projeto Paralelo (`parallel`):**
   - Todas as tarefas com estado `next` vinculadas a este projeto ficam simultaneamente visíveis na lista global de **Próximas Ações**.
   - Ideal para tarefas que não dependem uma da outra (ex.: *Comprar presentes de Natal*).

2. **Projeto Sequencial (`sequential`):**
   - O sistema aplica a **Regra de Visibilidade Sequencial**: apenas a **primeira tarefa pendente** (com a menor data de criação `createdAt`) é exibida na lista de Próximas Ações.
   - As tarefas seguintes permanecem protegidas dentro do projeto e só são liberadas para a lista global quando a anterior for concluída.
   - Impede sobrecarga cognitiva e direciona o foco exclusivamente para o próximo passo realizável.

### Diagrama: Visibilidade em Projeto Sequencial
```
Projeto: "Lançar Novo Site" (Sequencial)
┌─────────────────────────────────────────────────────────────┐
│ 1. [Next] Registrar Domínio          (Criado às 10:00) ───► VISÍVEL na lista Next
│ 2. [Next] Configurar Servidor        (Criado às 10:05) ───► OCULTO na lista Next
│ 3. [Next] Publicar Código            (Criado às 10:10) ───► OCULTO na lista Next
└─────────────────────────────────────────────────────────────┘

Após concluir a tarefa 1 (vai para o Logbook):
┌─────────────────────────────────────────────────────────────┐
│ 1. [✓] Registrar Domínio             (Concluído)       ───► Logbook
│ 2. [Next] Configurar Servidor        (Criado às 10:05) ───► AGORA VISÍVEL na lista Next
│ 3. [Next] Publicar Código            (Criado às 10:10) ───► OCULTO na lista Next
└─────────────────────────────────────────────────────────────┘
```

---

## Fluxo 4: Organização por Contexto (Áreas de Foco & Tags)

### Objetivo
Segmentar os compromissos por esferas da vida e contextos físicos ou ferramentas necessárias para a execução.

### Estrutura de Classificação
- **Áreas de Foco:** Domínios macro de responsabilidade (ex.: *Trabalho*, *Pessoal*, *Saúde*, *Finanças*).
  - Cada tarefa ou projeto pode pertencer a no máximo **uma** Área.
  - **Herança Automática:** Se uma tarefa está em um projeto associado a "Trabalho", a tarefa herda automaticamente a área "Trabalho" para fins de filtragem, mesmo que não tenha uma área configurada diretamente nela.
- **Tags e Contextos:** Marcadores livres (ex.: `@computador`, `@telefone`, `@rua`, `@urgente`). Uma tarefa pode ter múltiplas tags.

### Filtragem Combinada
Na barra superior de filtros, o usuário pode combinar:
- **Área Ativa** + **Tags Selecionadas** + **Nível de Energia** + **Tempo Disponível**.

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Filtro Ativo: Área: [Trabalho] | Tag: [@telefone] | Tempo: [<= 15 min]  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
                ┌─────────────────────────────────────────┐
                │ Retorna apenas as tarefas que atendem a │
                │ TODOS os critérios simultaneamente      │
                └─────────────────────────────────────────┘
```

---

## Fluxo 5: Execução Diária e Foco (Focus List)

### Objetivo
Fornecer uma visão única e consolidada do que deve ser realizado no dia atual, unindo intenção manual com prazos de vencimento.

### Composição da Lista de Foco
Uma tarefa entra automaticamente na tela **Focus** se satisfazer qualquer uma das condições:
1. **Estrela Manual:** Tarefa marcada com `focus: true` através do ícone de estrela.
2. **Data de Vencimento (`dueDate`):** Vencimento igual a hoje ou atrasado.
3. **Data de Início (`startDate`):** Início agendado para hoje ou data anterior promovida pelo Boot Engine.

> **Regra de Exclusão:** Tarefas no `logbook` (concluídas) ou na `trash` (lixeira) **nunca** aparecem na lista de Foco.

### Diagrama da Lista de Foco
```
  Tarefa com Estrela          Tarefa com Vencimento        Tarefa com Início
    (focus: true)               (dueDate <= Hoje)          (startDate <= Hoje)
          │                             │                           │
          └─────────────────────────────┼───────────────────────────┘
                                        │
                                        ▼
                        ┌──────────────────────────────┐
                        │      Lista de FOCO (Hoje)    │
                        │ (Exclui concluídas e lixo)   │
                        └──────────────────────────────┘
```

---

## Fluxo 6: Conclusão e Tarefas Recorrentes (Client-Side Cloning)

### Objetivo
Registrar o histórico de tarefas concluídas no **Logbook** e renovar automaticamente tarefas recorrentes sem criar acúmulo em cascata (*avalanche effect*).

### Regra de Recorrência Baseada na Conclusão
Quando uma tarefa com regra de repetição (`recurrenceRule`: diária, semanal, mensal ou anual) é concluída:
1. A instância atual recebe `state: 'logbook'` e timestamp `completedAt = agora`.
2. O repositório cria uma **nova instância** independente calculada a partir da **data real de conclusão**, e não da data originalmente planejada.
3. **Prevenção de Avalanche:** Se uma tarefa semanal ficou 3 semanas atrasada e foi concluída hoje, a próxima data será gerada para **1 semana a partir de hoje**, evitando a geração de múltiplas tarefas atrasadas pendentes.
4. **Roteamento de Estado da Nova Instância:**
   - Se `novaData > hoje` $\rightarrow$ `state = 'scheduled'`.
   - Se `novaData <= hoje` $\rightarrow$ `state = 'next'` (e se `dueDate == hoje`, ganha `focus = true`).

### Diagrama de Conclusão e Recorrência
```
[Usuário marca Checkbox da Tarefa Recorrente]
                     │
                     ▼
       ┌───────────────────────────┐
       │ Instância Atual:          │
       │ state = 'logbook'         │
       │ completedAt = Timestamp   │
       └─────────────┬─────────────┘
                     │
                     ▼
       ┌───────────────────────────┐
       │ Calcula Próxima Data a    │
       │ partir de 'completedAt'   │
       └─────────────┬─────────────┘
                     │
           ¿ Próxima data é no futuro ?
                     │
         ┌───────────┴───────────┐
        SIM                     NÃO (Hoje ou anterior)
         │                       │
         ▼                       ▼
┌───────────────────┐   ┌───────────────────────┐
│ Nova Tarefa em:   │   │ Nova Tarefa em:       │
│ state='scheduled' │   │ state='next'          │
└───────────────────┘   │ (focus=true se due hj)│
                        └───────────────────────┘
```

---

## Fluxo 7: O Motor de Inicialização (Boot Engine)

### Objetivo
Atuar como um "falso cronjob" no lado do cliente, promovendo tarefas agendadas para acionáveis sem necessidade de um servidor em nuvem.

### Quando é Executado?
- Na **montagem inicial da aplicação** (`App.tsx`).
- No evento de **foco da janela/aba do navegador** (`window focus`).

### Comportamento
1. Faz a varredura no IndexedDB buscando tarefas com `state: 'scheduled'` onde `startDate <= Data Atual`.
2. Transiciona essas tarefas silenciosa e atomicamente para `state: 'next'`.
3. A operação é totalmente **idempotente** e segura contra múltiplos eventos rápidos de foco.

```
       Abertura do App OU Janela Ganha Foco
                        │
                        ▼
            ┌────────────────────────┐
            │ Hook useBootEngine()   │
            └───────────┬────────────┘
                        │
                        ▼
     Busca: state='scheduled' AND startDate <= Hoje
                        │
                        ▼
       Atualiza em lote: state='next'
                        │
                        ▼
    dexie-react-hooks (useLiveQuery) detecta a
    mudança e atualiza a interface em tempo real!
```

---

## Fluxo 8: Material de Referência e Lixeira (Reference & Trash)

### Material de Referência (`Reference`)
- Armazena notas, manuais, ideias e arquivos textuais informativos que **não possuem ação imediata**.
- **Isolamento Total:** Itens de referência nunca aparecem nas listas acionáveis (`Inbox`, `Next`, `Focus`, etc.).
- **Organização e Busca:** Podem ser organizados por Projeto/Área e contam com busca textual instantânea por título e conteúdo das notas.

### Lixeira e Exclusão Segura (`Trash`)
- **Soft Delete:** A exclusão de tarefas ou projetos apenas altera seu estado para `trash`, preservando todo o histórico, notas e checklists.
- **Restauração:** Itens na lixeira podem ser restaurados a qualquer momento com um clique (tarefas voltam para a `inbox` e projetos voltam para `active`).
- **Esvaziar Lixeira:** Ação explícita de limpeza definitiva dos itens em `trash`. Nenhum item é apagado automaticamente por tempo.

```
Item Ativo ──(Excluir)──► [ Lixeira: state='trash' ] ──(Restaurar)──► Item Ativo
                                    │
                              (Esvaziar Lixeira)
                                    │
                                    ▼
                          Remoção Permanente do
                              IndexedDB
```

---

## Fluxo 9: Ritual da Revisão Semanal (Weekly Review Wizard)

### Objetivo
Guiar o usuário passo a passo através do ritual sagrado do GTD para manter o sistema confiável, limpo e atualizado.

### Pontos de Entrada e Início
- **No Desktop:** Clique no botão **"Iniciar Revisão Semanal"** localizado na barra lateral (*Sidebar*).
- **No Mobile:** Toque no menu **"Mais"** na barra de navegação inferior e selecione o botão de destaque **"Iniciar Revisão Semanal"**.

### Os 7 Passos do Assistente Guiado
Ao iniciar a revisão, um banner global persistente é ativado no topo da tela:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🧭 Passo 1 de 7: Esvazie a Mente (Get Clear)                    [Anterior] [Próximo] [X]│
│ Capture tudo o que acumulou na sua cabeça esta semana antes de processar as listas.   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

1. **Passo 1: Esvazie a Mente (`/inbox`):** Momento de despejo mental (*mind sweep*) capturando novos itens para a Inbox.
2. **Passo 2: Esvazie a Caixa de Entrada (`/inbox`):** Processar cada item até atingir **Inbox Zero**.
3. **Passo 3: Revise o Histórico (`/logbook`):** Analisar tarefas concluídas na semana anterior para identificar pendências ou desdobramentos.
4. **Passo 4: Revise o Aguardando (`/waiting`):** Cobrar respostas de tarefas delegadas ou dependências externas.
5. **Passo 5: Revise Projetos Ativos (`/projects`):** Garantir que cada projeto ativo possua ao menos uma próxima ação definida.
6. **Passo 6: Revise Algum Dia / Talvez (`/someday`):** Resgatar ideias incubadas prontas para virar projetos ou descartar as obsoletas.
7. **Passo 7: Escolha o Foco da Semana (`/next`):** Estrelar as tarefas de maior prioridade para a semana.

### Saída Rápida e Cancelamento (1 Clique)
- O usuário pode sair ou cancelar a revisão semanal a qualquer momento com um único clique no botão **X** (fechar) presente no canto de ações do banner.
- O cancelamento desativa o assistente imediatamente (`isActive: false`), reseta o contador de passos e oculta o banner sem redirecionar a tela e sem modais de confirmação bloqueantes, garantindo uma experiência ágil ("Zen").

> **Nota:** O progresso da revisão semanal reside apenas no estado efêmero da UI (`Zustand`), não poluindo o banco de dados.

---

## Fluxo 10: Backup, Restauração e PWA Offline

### Exportação e Importação de Dados (Backup)
Como todos os dados ficam salvos exclusivamente no navegador:
- **Exportar Backup:** Gera um arquivo `.json` completo contendo todas as tabelas (`tasks`, `projects`, `tags`, `areas`, `taskTags`).
- **Importar Backup (Hard-Replace):** Substitui integralmente a base local pelos dados do arquivo importado, com modal de confirmação prévia de segurança.
- **Lembrete Periódico:** Um alerta discreto lembra o usuário de exportar seus dados caso mais de **7 dias** tenham se passado desde o último backup.

### Diagrama do Ciclo de Dados
```
┌────────────────────────────────────────────────────────────────────────┐
│                           Navegador do Usuário                         │
│                                                                        │
│  ┌─────────────────────────┐           ┌────────────────────────────┐  │
│  │   Interface React 19    │ ◄───────► │   IndexedDB (Dexie.js)     │  │
│  └─────────────────────────┘           └─────────────┬──────────────┘  │
│                                                      │                 │
└──────────────────────────────────────────────────────┼─────────────────┘
                                                       │
                           ┌───────────────────────────┴───────────────────────────┐
                           ▼                                                       ▼
                ┌─────────────────────┐                                 ┌─────────────────────┐
                │  Exportar (.json)   │                                 │  Importar (.json)   │
                │  Download Local     │                                 │  Restauração Total  │
                └─────────────────────┘                                 └─────────────────────┘
```

---

## ⌨️ Tabela de Atalhos Rápidos e Gestos

| Ação | Desktop | Mobile / Touch |
|---|---|---|
| **Captura Rápida** | Atalho `C` / Botão `+ Nova Tarefa [C]` | Botão Flutuante (**+**) |
| **Navegação Principal** | Sidebar lateral | Barra de navegação inferior |
| **Iniciar Revisão Semanal** | Botão na Sidebar | Botão no menu "Mais" (Drawer inferior) |
| **Sair/Cancelar Revisão** | Botão `X` no banner | Botão `X` no banner |
| **Fechar Painel de Detalhes** | `Esc` ou clique fora | Botão de fechar ou deslizar |
| **Alternar Foco (Estrela)** | Clique no ícone de estrela | Toque no ícone de estrela |
| **Concluir Tarefa** | Clique no Checkbox | Toque no Checkbox |

---

*Documento gerado com base nas especificações arquiteturais e de domínio GTD em `openspec/specs/`.*
