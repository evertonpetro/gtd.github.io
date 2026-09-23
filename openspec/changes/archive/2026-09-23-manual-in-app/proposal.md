# Proposal

## Why

Atualmente, a documentação detalhada e o guia passo a passo da metodologia GTD e da arquitetura do aplicativo existem
apenas no arquivo `WALKTHROUGH.md` no repositório, inacessível para usuários finais no navegador ou dispositivo móvel
(PWA). Disponibilizar um Manual GTD integrado diretamente na interface do app no modelo offline-first elimina atrito de
aprendizagem, permite consulta rápida contextual e empodera os usuários na aplicação rigorosa do método GTD.

## What Changes

- Criação de uma área de documentação/manual acessível via rota `/manual` (ou `/guide`), com rótulo "Manual GTD" na
  barra de navegação secundária (Desktop Sidebar e Mobile Drawer).
- Estruturação completa do conteúdo do `WALKTHROUGH.md` em um arquivo de dados estáticos tipado (`guideData.ts`),
  abrangendo Visão Geral, os 10 Fluxos do GTD e a Tabela de Atalhos.
- Implementação de interface estilo Documentação/GitBook com barra lateral de tópicos agrupados por categoria, barra de
  busca rápida com filtragem em tempo real, visualizador central com diagramas conceituais destacados, badges, regras e
  paginação de rodapé ("Anterior" e "Próximo").
- Layout 100% responsivo para mobile com drawer/menu de tópicos acessível e respeito a safe area insets.

## Capabilities

### New Capabilities

- `gtd-manual`: Manual interativo no app com navegação estilo GitBook, tópicos dos 10 fluxos GTD, busca textual,
  diagramas e atalhos rápidos.

### Modified Capabilities

<!-- Nenhuma especificação existente teve seus requisitos de comportamento alterados. -->

## Impact

- **Código Afetado:**
    - `src/components/layout/navigation.ts`: Inclusão do item "Manual GTD" com ícone `BookOpenCheck` em
      `SECONDARY_NAV_ITEMS`.
    - `src/App.tsx`: Registro da nova rota `/manual` (e redirecionamento para o primeiro tópico).
    - `src/features/guide/`: Novo módulo contendo dados (`guideData.ts`), tipos (`types.ts`), componentes de
      índice/tópicos/diagramas.
    - `src/pages/GuidePage.tsx`: Página principal do manual com layout GitBook.
- **Dependências:** Nenhuma dependência externa adicional necessária. Totalmente offline e integrado ao bundle do Vite.
