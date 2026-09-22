# GTD App — Gerenciador de Tarefas Offline-First (PWA)

Um aplicativo moderno de produtividade e gerenciamento de tarefas baseado na metodologia **GTD (Getting Things Done)** de David Allen e inspirado no NirvanaHQ. O aplicativo é uma **Single Page Application (SPA)** com arquitetura **Offline-First**, executada 100% no lado do cliente (*client-side*), sem necessidade de backend ou conexões de rede externas.

---

## 🚀 Recursos e Funcionalidades

### 1. Metodologia GTD Completa
- **Caixa de Entrada (Inbox):** Ponto central para captura rápida de pensamentos, ideias e pendências.
- **Próximas Ações (Next Actions):** Tarefas ativas e acionáveis organizadas para execução imediata.
- **Aguardando (Waiting):** Acompanhamento de tarefas delegadas ou dependentes de terceiros.
- **Agendadas (Scheduled):** Tarefas com data de início definida para o futuro.
- **Algum dia / Talvez (Someday):** Ideias e projetos para incubação sem compromisso imediato.
- **Foco (Focus List):** Lista com as tarefas prioritárias marcadas com estrela ou agendadas para o dia atual.
- **Material de Referência (Reference):** Informações de suporte e anotações que não são ações executáveis.
- **Histórico / Concluídas (Logbook):** Registro de todas as tarefas e projetos concluídos com data de finalização.
- **Lixeira (Trash):** Gerenciamento e restauração de itens excluídos (*soft delete*).

### 2. Gestão de Projetos
- **Projetos Paralelos:** Todas as tarefas ativas do projeto aparecem simultaneamente nas listas de próximas ações.
- **Projetos Sequenciais:** Segue a regra clássica do GTD, disponibilizando apenas a **primeira tarefa pendente** na lista de próximas ações; as tarefas subsequentes são liberadas conforme as anteriores são concluídas.
- **Painel de Detalhes:** Edição de título, notas, tipo de execução (paralelo/sequencial) e associação com Áreas de Foco.

### 3. Organização por Contexto
- **Áreas de Foco:** Separação entre esferas da vida (ex.: *Trabalho*, *Pessoal*, *Estudos*) com herança automática de área para tarefas dentro de projetos.
- **Contextos e Tags:** Classificação por etiquetas (ex.: `@computador`, `@telefone`, `urgente`) com filtros combinados.
- **Filtros Globais:** Filtragem dinâmica em tempo real por Área de Foco e Tags.

### 4. Produtividade e Experiência do Usuário
- **Captura Rápida (Quick Capture):** Modal de criação acessível por botão flutuante e atalho de teclado global.
- **Checklists em Tarefas:** Divisão de tarefas complexas em itens menores de verificação com barra de progresso.
- **Tarefas Recorrentes (Client-Side Cloning):** Suporte a repetições (diária, semanal, mensal, anual); ao concluir a tarefa, a próxima instância é gerada automaticamente.
- **Boot Engine (Falso Cronjob):** Mecanismo de verificação automático acionado ao iniciar o app ou alternar o foco da janela para promover tarefas agendadas vencidas para acionáveis.
- **Assistente de Revisão Semanal (Weekly Review Wizard):** Fluxo guiado passo a passo para manutenção e clareza do sistema.
- **Backup & Restauração:** Exportação e importação completa da base de dados em formato JSON, acompanhada de alertas de lembrete de backup periódico.
- **PWA (Progressive Web App):** Instalável no desktop e dispositivos móveis, com suporte completo a cache e operação offline via Service Worker.

---

## 🛠️ Tecnologias e Recursos Utilizados

### **Frontend & Interface**
- **[React 19](https://react.dev/):** Biblioteca para construção da interface declarativa em componentes funcionais.
- **[TypeScript](https://www.typescriptlang.org/):** Tipagem estática rigorosa (*Strict Mode* ativado).
- **[Tailwind CSS v4](https://tailwindcss.com/):** Estilização utilitária com design minimalista, responsivo e limpo.
- **[Lucide React](https://lucide.dev/):** Conjunto consistente de ícones vetoriais.
- **[React Router v8](https://reactrouter.com/):** Roteamento declarativo no cliente.
- **[clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastilho/tailwind-merge):** Utilitários para interpolação e mesclagem de classes CSS condicionais.

### **Persistência de Dados & Estado**
- **[Dexie.js](https://dexie.org/):** Abstração simplificada e performática sobre a API do **IndexedDB** do navegador.
- **[dexie-react-hooks](https://dexie.org/docs/dexie-react-hooks/useLiveQuery()):** Hook `useLiveQuery` para reatividade em tempo real na interface sem necessidade de requisições ou polling.
- **[Zustand](https://zustand-demo.pmnd.rs/):** Gerenciamento de estado global efêmero (modais abertos, painéis laterais e filtros ativos).

### **Tooling, Build & Qualidade**
- **[Vite 8](https://vitejs.dev/):** Ferramenta de build e servidor de desenvolvimento ultrarrápido.
- **[vite-plugin-pwa](https://vite-pwa-org.netlify.app/):** Geração automática de Service Workers e manifesto para funcionamento como PWA.
- **[ESLint 10](https://eslint.org/) & [typescript-eslint](https://typescript-eslint.io/):** Padronização de código e prevenção de erros.

---

## 📂 Estrutura do Projeto

O projeto adota uma arquitetura orientada a domínios e funcionalidades (**Feature-Sliced Design**):

```text
src/
├── components/          # Componentes globais de layout (Sidebar, Header, Nav)
│   └── layout/
├── db/                  # Camada de persistência (IndexedDB com Dexie)
│   ├── db.ts            # Schema e inicialização do banco
│   ├── repositories/    # Repositórios de dados isolados (taskRepo, projectRepo, etc.)
│   └── seed.ts          # Dados iniciais para novos usuários
├── features/            # Módulos encapsulados por domínio
│   ├── areas/           # Gestão de Áreas de Foco
│   ├── gtd-engine/      # Boot Engine e regras de negócio puras (GTD)
│   ├── projects/        # Componentes e hooks de Projetos
│   ├── sync/            # Serviços de exportação/importação e lembretes de backup
│   ├── tags/            # Gestão de Tags e Contextos
│   ├── tasks/           # Formulários, listas, checklists e hooks de Tarefas
│   └── weekly-review/   # Passos e lógica do assistente de revisão semanal
├── hooks/               # Hooks utilitários globais (atalhos de teclado, etc.)
├── pages/               # Views e rotas principais da aplicação
├── store/               # Estados de UI efêmeros gerenciados via Zustand
└── types/               # Definições de tipos TypeScript do banco e entidades
```

---

## 💻 Comandos e Como Executar

### Pré-requisitos
- **Node.js** (versão 18.x ou superior recomendada)
- **npm** (ou gerenciador de pacotes equivalente como pnpm/yarn)

### 1. Clonar o repositório e instalar dependências
```bash
# Clone o repositório
git clone <url-do-repositorio>

# Acesse o diretório do projeto
cd GTD

# Instale as dependências
npm install
```

### 2. Iniciar em ambiente de desenvolvimento
Inicia o servidor de desenvolvimento do Vite com Hot Module Replacement (HMR):
```bash
npm run dev
```
> O terminal exibirá a URL local (geralmente `http://localhost:5173`). Abra no navegador para utilizar a aplicação.

### 3. Gerar a compilação de produção (Build)
Executa a validação de tipos TypeScript e gera os arquivos estáticos otimizados na pasta `dist/`:
```bash
npm run build
```

### 4. Pré-visualizar o build de produção localmente
Sobe um servidor local para testar os arquivos gerados em `dist/`:
```bash
npm run preview
```

### 5. Verificação de Tipagem e Linter
Comandos úteis para manter a qualidade e consistência do código:
```bash
# Checagem estática de tipos TypeScript (sem gerar build)
npm run typecheck

# Análise estática de código com ESLint
npm run lint
```

---

## 🔒 Princípios de Arquitetura & Privacidade
- **Zero Chamadas de Rede:** Nenhum dado pessoal, tarefa ou projeto é enviado para servidores externos.
- **Total Controle do Usuário:** Todos os dados ficam salvos exclusivamente no IndexedDB do navegador do usuário e podem ser exportados/importados a qualquer momento pela tela de Configurações.
- **Design Zen & Foco:** Interface limpa concebida para reduzir distrações e maximizar a clareza mental no fluxo diário.
