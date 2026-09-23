# Tasks

## 1. Estrutura de Dados e Tipos do Manual

- [x] 1.1 Criar interfaces TypeScript em `src/features/guide/types.ts` definindo a estrutura de tópicos, seções,
  callouts, diagramas e navegação sequencial
- [x] 1.2 Criar o repositório de dados estáticos `src/features/guide/data/guideData.ts` contendo todos os dados do
  `WALKTHROUGH.md` (Visão Geral, Fluxos 1 a 10 e Atalhos) e validar com `npm run typecheck`

## 2. Componentes de Interface do Manual (Estilo GitBook)

- [x] 2.1 Criar componente de índice lateral `GuideSidebar.tsx` com categorização, busca em tempo real e destaque do
  tópico ativo
- [x] 2.2 Criar componente de visualização `GuideContent.tsx` com formatação de objetivos, etapas, diagramas conceituais
  com rolagem horizontal e paginação de rodapé
- [x] 2.3 Criar a página principal `src/pages/GuidePage.tsx` reunindo os componentes com suporte responsivo para mobile
  e sincronização de tópico via URL

## 3. Navegação e Roteamento no App

- [x] 3.1 Adicionar o item "Manual GTD" com ícone `BookOpenCheck` em `SECONDARY_NAV_ITEMS` em
  `src/components/layout/navigation.ts`
- [x] 3.2 Configurar as rotas `/manual` e `/manual/:topicId` em `src/App.tsx`
- [x] 3.3 Validar que o acesso via Sidebar no desktop e Drawer no mobile navegam corretamente para o manual

## 4. Verificação e Validação

- [x] 4.1 Executar `npm run typecheck` e `npm run lint` para garantir conformidade estrita com o TypeScript e as regras
  de código
- [x] 4.2 Executar `npm run build` para garantir que o bundle Vite empacote o manual sem erros
