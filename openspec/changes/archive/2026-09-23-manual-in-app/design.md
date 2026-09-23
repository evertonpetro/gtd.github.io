# Design

## Context

O GTD App é um SPA construído com React 19, TypeScript e Tailwind CSS, operando 100% offline no client-side. A
documentação completa dos fluxos e regras metodológicas reside atualmente no arquivo `WALKTHROUGH.md`. Veja a motivação
detalhada em `proposal.md`.

## Goals / Non-Goals

**Goals:**

- Prover visualização estilo GitBook/Documentação com navegação lateral por tópicos e paginação sequencial (Anterior /
  Próximo).
- Estruturar os dados estáticos em TypeScript (`src/features/guide/data/guideData.ts`) cobrindo a metodologia, os 10
  fluxos e atalhos.
- Implementar busca instantânea por palavras-chave nos títulos e resumos dos tópicos do manual.
- Integrar a rota `/manual` e os pontos de acesso na Sidebar desktop e no Drawer mobile ("Manual GTD").
- Garantir renderização responsiva com diagramas em formato legível e adaptados para dispositivos móveis.

**Non-Goals:**

- Edição ou personalização dos textos do manual pelo usuário em tempo de execução.
- Dependência de servidores, APIs externas ou requisições de rede.
- Inclusão de bibliotecas externas pesadas de parsing markdown.

## Decisions

### Decisão 1: Dados Estruturados em TypeScript (`guideData.ts`) vs. Parser Markdown em Runtime

- **Escolha:** Módulo estático fortemente tipado (`guideData.ts`).
- **Alternativas consideradas:**
    - Importar `WALKTHROUGH.md?raw` e interpretar com parser Markdown: descartado para evitar peso desnecessário no
      bundle e permitir customização fina de estilo em componentes React para cada elemento (diagramas, tabelas, caixas
      de regras).
- **Vantagens:** Auto-complete, validação estática de links entre tópicos (`prevTopicId`/`nextTopicId`), zero
  dependência extra e carregamento instantâneo.

### Decisão 2: Layout e Experiência GitBook

- **Escolha:** Interface dividida com:
    - Painel lateral esquerdo (ou drawer no mobile) com lista de tópicos organizados por seções (Visão Geral, Fluxos do
      Sistema, Atalhos & Referência) e campo de busca rápida.
    - Painel central amplo de leitura com badge da categoria, título claro, objetivo em destaque, passos operacionais,
      diagramas conceituais formatados com rolagem horizontal e callouts para regras críticas (ex.: *Prevenção de
      Avalanche*, *Visibilidade Sequencial*).
    - Rodapé de navegação com botões "← Tópico Anterior" e "Próximo Tópico →".

### Decisão 3: Rota e Gerenciamento de Estado do Tópico Ativo

- **Escolha:** Rota `/manual` combinada com URL search param (ex.: `/manual?topic=projetos`) ou path param
  (`/manual/:topicId`), com redirecionamento padrão para o primeiro tópico.
- **Vantagens:** Permite criar links diretos para tópicos específicos, preserva a navegação no histórico do navegador
  (`Back`/`Forward`) e integra perfeitamente com a infraestrutura existente do React Router.

## Risks / Trade-offs

- **[Risco] Diagramas conceituais largos quebrando em telas mobile estreitas**
  → *Mitigação:* Envolver blocos pré-formatados em contêineres com `overflow-x-auto`, fonte mono de tamanho ajustado
  (`text-xs md:text-sm`) e padding adequado, garantindo visualização sem quebra de layout.
- **[Risco] Atualização manual futura de textos entre `WALKTHROUGH.md` e `guideData.ts`**
  → *Mitigação:* Manter a nomenclatura de tópicos e seções idêntica à do `WALKTHROUGH.md`, com estrutura modular de
  fácil leitura e edição.
