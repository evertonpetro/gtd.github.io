# Diretrizes para Agentes de IA (AGENTS.md)

Este documento serve como a "Bíblia" de contexto para qualquer Agente de IA (Claude, Cursor, Windsurf, Copilot) que atue neste projeto. Ele define as restrições arquiteturais, a stack tecnológica e as regras de negócio intrínsecas da metodologia GTD.

**Leia este documento antes de sugerir refatorações, criar novos componentes ou alterar o esquema do banco de dados.**

---

## 1. Identidade do Projeto e Stack Tecnológica
Você está desenvolvendo um **Gerenciador de Tarefas GTD Offline-First (PWA)** inspirado no NirvanaHQ. O aplicativo roda 100% no client-side. **Não há backend.**

*   **Frontend:** React 18+ (Single Page Application)
*   **Linguagem:** TypeScript (Strict Mode obrigatório)
*   **Bundler/Tooling:** Vite + Vite PWA Plugin
*   **Estilização:** Tailwind CSS (Design Zen, limpo, minimalista)
*   **Banco de Dados:** IndexedDB via `Dexie.js`
*   **Gerenciamento de Estado UI:** `Zustand`
*   **Reatividade de Dados:** `dexie-react-hooks` (`useLiveQuery`)
*   **Ícones:** `lucide-react` (Sugestão padrão)

---

## 2. Restrições Arquiteturais Absolutas (O que NÃO fazer)

1.  **NENHUMA CHAMADA DE REDE (NO FETCH/AXIOS):** O app não se comunica com APIs REST ou GraphQL. Toda persistência é feita via `Dexie.js` no `IndexedDB`.
2.  **NÃO USE REACT QUERY / SWR:** Como não há rede, não precisamos de bibliotecas de server-state caching. O estado persistente é reativo via `useLiveQuery` do Dexie.
3.  **NÃO VAZAR LÓGICA DE DB PARA UI:** Componentes React (arquivos `.tsx`) **NUNCA** devem chamar métodos do banco (ex: `db.tasks.add()`). Todas as operações de escrita devem ser feitas através da camada de repositórios (`src/db/repositories/`).
4.  **NÃO MISTURE ESTADOS:** 
    *   *Estado Persistente* (Tarefas, Projetos, Áreas) pertence ao IndexedDB.
    *   *Estado Efêmero* (Menu aberto, Tema Dark, Filtro selecionado) pertence ao Zustand.

---

## 3. Padrões de Código e Convenções (TypeScript + React)

*   **Componentes Funcionais:** Use sempre Arrow Functions para componentes React.
*   **Tipagem Forte:** Nunca use `any`. Utilize as interfaces definidas em `src/types/database.d.ts`.
*   **Feature-Sliced Design:** Mantenha os componentes, hooks e utils próximos ao seu domínio. Se está criando o botão de concluir tarefa, coloque-o em `src/features/tasks/components/`, não na raiz de `src/components/`.
*   **Tailwind:** Evite arquivos CSS customizados. Use classes utilitárias. Para lógicas complexas de classes condicionais, use `clsx` ou `tailwind-merge` (ex: `cn()` utility).
*   **Performance:** Memorize callbacks complexos (`useCallback`) passados para componentes filhos, e use `React.memo` em listas longas de tarefas para evitar re-renders desnecessários.

---

## 4. Regras de Negócio do Domínio GTD (Memorize isto)

Sempre que for programar lógica de negócio, lembre-se das seguintes regras invioláveis do sistema:

1.  **Estados GTD (Workflow):** Uma tarefa só pode estar em um estado por vez: `inbox`, `next`, `waiting`, `scheduled`, `someday`, `logbook` ou `trash`.
2.  **O Falso Cronjob (Boot Engine):** Não temos cronjobs em nuvem. Mudanças de data (`Scheduled` virando `Next` ou ganhando foco) devem ocorrer no client-side em um `useEffect` centralizado (`BootEngine`), que é acionado quando o app é montado ou a aba do navegador ganha foco.
3.  **Projetos Sequenciais vs. Paralelos:** 
    *   Se um projeto é **Paralelo**, todas as suas tarefas ativas podem ser mostradas na lista "Next".
    *   Se um projeto é **Sequencial**, as queries do Dexie devem garantir que **apenas a primeira tarefa incompleta** apareça nas listas acionáveis.
4.  **Tarefas Recorrentes (Client-side Cloning):** A recorrência é gerada no momento da conclusão. Quando uma tarefa com `recurrenceRule` vai para o `logbook` (concluída), a camada de repositório deve clonar essa tarefa, atualizar a data futura com base na regra, e inseri-la novamente no fluxo.
5.  **Herança de Áreas de Foco:** Ao filtrar listas por uma Área (ex: "Trabalho"), a query deve retornar tarefas diretamente marcadas como "Trabalho" **E** tarefas filhas de Projetos marcados como "Trabalho".

---

## 5. Fluxo de Trabalho do Agente (Como você deve agir)

1.  **Pense Antes de Codar:** Antes de gerar o código, escreva uma breve reflexão sobre as implicações no IndexedDB e na UI.
2.  **Arquivos Completos:** Ao criar um novo arquivo, forneça o código completo e funcional. Não use placeholders como `// ... resto do código ...` a menos que seja instruído a fazer apenas um snippet.
3.  **Tratamento de Erros Silencioso:** Como é um app offline, garanta que blocos `try/catch` protejam operações de banco (DB), mas evite popups bloqueantes de erro, prefira *Toasts* discretos.
4.  **Manutenção do Schema:** Se você alterar a estrutura de `Task` ou `Project`, você **deve** atualizar a versão do banco em `db.ts` e tratar a migração se necessário.
5.  **Pergunte se Ambíguo:** Se o usuário pedir um recurso que quebre a filosofia "offline-first" ou GTD, alerte-o e proponha uma alternativa alinhada às regras deste documento.