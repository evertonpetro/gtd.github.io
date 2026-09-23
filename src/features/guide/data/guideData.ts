import type { GuideCategory, GuideTopic } from '../types'

export const GUIDE_CATEGORIES: GuideCategory[] = [
  {
    id: 'fundamentos',
    title: 'Fundamentos',
    topicIds: ['overview'],
  },
  {
    id: 'fluxos',
    title: 'Fluxos de Trabalho',
    topicIds: [
      'fluxo-1-captura-rapida',
      'fluxo-2-esclarecimento',
      'fluxo-3-gestao-projetos',
      'fluxo-4-organizacao-contexto',
      'fluxo-5-foco-diario',
      'fluxo-6-conclusao-recorrencia',
      'fluxo-7-boot-engine',
      'fluxo-8-referencia-lixeira',
      'fluxo-9-revisao-semanal',
      'fluxo-10-backup-offline',
    ],
  },
  {
    id: 'referencia',
    title: 'Referência & Atalhos',
    topicIds: ['atalhos-rapidos'],
  },
]

export const GUIDE_TOPICS: GuideTopic[] = [
  {
    id: 'overview',
    title: 'Visão Geral e Metodologia GTD',
    category: 'Fundamentos',
    badge: 'Metodologia',
    summary: 'Os 5 passos do fluxo de trabalho GTD e a arquitetura offline-first com IndexedDB.',
    objective:
      'Apresentar os fundamentos do Getting Things Done (David Allen) e demonstrar como o sistema opera de forma 100% offline no navegador.',
    diagram: `┌─────────────┐     ┌──────────────┐     ┌───────────────┐     ┌──────────────┐     ┌─────────────┐
│ 1. CAPTURAR │ ──> │ 2. ESCLARECER│ ──> │ 3. ORGANIZAR  │ ──> │ 4. REFLETIR  │ ──> │ 5. ENGAJAR  │
│(Quick Entry)│     │ (Decisão GTD)│     │(Listas/Áreas) │     │ (Rev. Semanal│     │(Focus / Do) │
└─────────────┘     └──────────────┘     └───────────────┘     └──────────────┘     └─────────────┘`,
    sections: [
      {
        title: 'Os 5 Horizontes do GTD',
        description: 'O aplicativo foi construído para respeitar os cinco pilares metodológicos:',
        steps: [
          {
            number: 1,
            title: 'Capturar',
            description: 'Esvaziar a mente imediatamente através da entrada rápida sem classificar previamente.',
          },
          {
            number: 2,
            title: 'Esclarecer',
            description: 'Processar a caixa de entrada definindo se há ação e qual o próximo passo executável.',
          },
          {
            number: 3,
            title: 'Organizar',
            description: 'Distribuir compromissos em listas contextuais (Próximas, Aguardando, Agendadas, Projetos).',
          },
          {
            number: 4,
            title: 'Refletir',
            description: 'Manter a integridade do sistema através da Revisão Semanal guiada.',
          },
          {
            number: 5,
            title: 'Engajar',
            description: 'Executar com clareza utilizando a Lista de Foco diária e os filtros combinados.',
          },
        ],
      },
      {
        title: 'Privacidade e Arquitetura Offline-First',
        description:
          'Todas as informações são armazenadas localmente no navegador via IndexedDB (Dexie.js). Não há servidores, contas de usuário ou envio de dados pela internet. O aplicativo funciona com ou sem conexão de rede.',
        callouts: [
          {
            type: 'info',
            title: 'Soberania Total dos Seus Dados',
            content:
              'Seus dados pertencem exclusivamente a você e residem apenas no seu navegador. Utilize a opção de Backup em Configurações regularmente.',
          },
        ],
      },
    ],
    nextTopicId: 'fluxo-1-captura-rapida',
  },
  {
    id: 'fluxo-1-captura-rapida',
    title: 'Fluxo 1: Captura Rápida (Inbox & Quick Capture)',
    category: 'Fluxos de Trabalho',
    badge: 'Captura',
    summary: 'Esvaziar a mente instantaneamente com atalho global e persistência no IndexedDB.',
    objective:
      'Permitir ao usuário esvaziar a mente instantaneamente a qualquer momento, sem atrito e sem necessidade de categorização prévia.',
    diagram: `   Ideia / Pensamento
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
└──────────────────────────────┘`,
    sections: [
      {
        title: 'Como Funciona a Captura',
        steps: [
          {
            number: 1,
            title: 'Ativação Global',
            description:
              'No Desktop, pressione a tecla C a qualquer momento (fora de campos de texto) ou clique em "+ Nova Tarefa [C]" na barra lateral. No Mobile, toque no botão flutuante (+) no canto inferior direito.',
          },
          {
            number: 2,
            title: 'Entrada Mínima',
            description:
              'Digite o título do pensamento, ideia ou tarefa e pressione Enter ou clique em Capturar. O botão permanece desabilitado enquanto o campo estiver vazio.',
          },
          {
            number: 3,
            title: 'Persistência Imediata',
            description:
              'O item é salvo instantaneamente no IndexedDB com o estado inbox e tipo action.',
          },
          {
            number: 4,
            title: 'Visualização FIFO',
            description:
              'Os itens da Inbox são listados em ordem cronológica de criação (do mais antigo para o mais novo), incentivando o esvaziamento sequencial.',
          },
        ],
      },
    ],
    callouts: [
      {
        type: 'tip',
        title: 'Princípio da Mente Limpa',
        content:
          'Não gaste energia categorizando durante a captura. Apenas digite o título e capture. O detalhamento ocorre na etapa de Esclarecimento.',
      },
    ],
    prevTopicId: 'overview',
    nextTopicId: 'fluxo-2-esclarecimento',
  },
  {
    id: 'fluxo-2-esclarecimento',
    title: 'Fluxo 2: Esclarecimento e Processamento (Clarify)',
    category: 'Fluxos de Trabalho',
    badge: 'Processamento',
    summary: 'Árvore de decisão GTD para transformar itens da Inbox em ações ou referências.',
    objective:
      'Transformar itens brutos da Inbox em ações claras e bem definidas ou arquivá-los como material não acionável.',
    diagram: `                    ┌─────────────────────────┐
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
                                     └─────────┘ └─────────┘ └───────────┘`,
    sections: [
      {
        title: 'Árvore de Decisão GTD Passo a Passo',
        description:
          'Ao selecionar uma tarefa na Inbox, o painel lateral de detalhes se abre permitindo classificar o item:',
        steps: [
          {
            number: 1,
            title: 'Se Não Acionável',
            description: 'Encaminhe para um dos três destinos não acionáveis:',
            substeps: [
              'Lixo: Exclua a tarefa para enviá-la para Trash.',
              'Incubação: Mude o estado para Someday (Algum dia / Talvez).',
              'Informação / Nota: Altere o tipo para Reference (Material de consulta sem ação).',
            ],
          },
          {
            number: 2,
            title: 'Se Acionável',
            description: 'Defina o próximo passo físico e o contexto de execução:',
            substeps: [
              'Próxima Ação: Mude para Next para execução na primeira oportunidade.',
              'Delegado a Terceiro: Mude para Waiting e informe o nome do responsável.',
              'Data de Início Futura: Mude para Scheduled e informe a data de início (startDate).',
            ],
          },
        ],
      },
      {
        title: 'Detalhamento Opcional',
        items: [
          'Notas em Markdown: Anotações com formatação rica, links e descrições.',
          'Checklist: Sub-itens operacionais com progresso e marcação individual.',
          'Estimativas: Nível de Energia (Low, Medium, High) e Tempo Estimado (5, 15, 30, 60, 120 min).',
          'Associações: Vínculo a um Projeto e/ou Área de Foco.',
        ],
      },
    ],
    prevTopicId: 'fluxo-1-captura-rapida',
    nextTopicId: 'fluxo-3-gestao-projetos',
  },
  {
    id: 'fluxo-3-gestao-projetos',
    title: 'Fluxo 3: Gestão de Projetos (Paralelos vs. Sequenciais)',
    category: 'Fluxos de Trabalho',
    badge: 'Projetos',
    summary: 'Diferença entre projetos paralelos e sequenciais com a Regra de Visibilidade Sequencial.',
    objective:
      'Permitir a gestão de objetivos com múltiplos passos, aplicando a regra clássica de visibilidade sequencial do GTD.',
    diagram: `Projeto: "Lançar Novo Site" (Sequencial)
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
└─────────────────────────────────────────────────────────────┘`,
    sections: [
      {
        title: 'Tipos de Projetos',
        steps: [
          {
            number: 1,
            title: 'Projeto Paralelo (parallel)',
            description:
              'Todas as tarefas com estado next vinculadas a este projeto ficam simultaneamente visíveis na lista global de Próximas Ações. Recomendado para tarefas independentes.',
          },
          {
            number: 2,
            title: 'Projeto Sequencial (sequential)',
            description:
              'O sistema aplica a Regra de Visibilidade Sequencial: apenas a primeira tarefa pendente (menor data de criação) é exibida na lista de Próximas Ações.',
          },
        ],
      },
    ],
    callouts: [
      {
        type: 'rule',
        title: 'Regra de Visibilidade Sequencial',
        content:
          'Em projetos sequenciais, as tarefas seguintes ficam ocultas das listas globais de ação até que a tarefa precedente seja concluída. Isso elimina sobrecarga mental e mantém o foco no único próximo passo executável.',
      },
    ],
    prevTopicId: 'fluxo-2-esclarecimento',
    nextTopicId: 'fluxo-4-organizacao-contexto',
  },
  {
    id: 'fluxo-4-organizacao-contexto',
    title: 'Fluxo 4: Organização por Contexto (Áreas de Foco & Tags)',
    category: 'Fluxos de Trabalho',
    badge: 'Contexto',
    summary: 'Segmentação por esferas da vida, tags contextuais e herança automática de áreas.',
    objective:
      'Segmentar os compromissos por esferas da vida e contextos físicos ou ferramentas necessárias para a execução.',
    diagram: `┌─────────────────────────────────────────────────────────────────────────┐
│ Filtro Ativo: Área: [Trabalho] | Tag: [@telefone] | Tempo: [<= 15 min]  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                                     ▼
                ┌─────────────────────────────────────────┐
                │ Retorna apenas as tarefas que atendem a │
                │ TODOS os critérios simultaneamente      │
                └─────────────────────────────────────────┘`,
    sections: [
      {
        title: 'Estrutura de Classificação',
        items: [
          'Áreas de Foco: Domínios macro de responsabilidade (ex.: Trabalho, Pessoal, Saúde, Finanças). Cada tarefa ou projeto pode pertencer a no máximo uma área.',
          'Herança Automática: Se uma tarefa pertence a um projeto associado à área Trabalho, a tarefa herda automaticamente a área Trabalho para filtragem, mesmo sem atribuição direta.',
          'Tags e Contextos: Marcadores livres (ex.: @computador, @telefone, @rua, @urgente). Uma tarefa pode conter múltiplas tags simultâneas.',
        ],
      },
      {
        title: 'Filtragem Combinada',
        description:
          'Na barra superior de filtros, é possível combinar Área Ativa, Tags Selecionadas, Nível de Energia e Tempo Disponível para encontrar a ação perfeita para o momento.',
      },
    ],
    callouts: [
      {
        type: 'info',
        title: 'Herança Transparente de Áreas',
        content:
          'A herança de áreas simplifica a organização: basta definir a área no projeto pai e todas as suas tarefas serão agrupadas corretamente nos filtros.',
      },
    ],
    prevTopicId: 'fluxo-3-gestao-projetos',
    nextTopicId: 'fluxo-5-foco-diario',
  },
  {
    id: 'fluxo-5-foco-diario',
    title: 'Fluxo 5: Execução Diária e Foco (Focus List)',
    category: 'Fluxos de Trabalho',
    badge: 'Foco',
    summary: 'Visão consolidada para o dia atual combinando estrela manual, prazos e datas de início.',
    objective:
      'Fornecer uma visão única e consolidada do que deve ser realizado no dia atual, unindo intenção manual com prazos de vencimento.',
    diagram: `  Tarefa com Estrela          Tarefa com Vencimento        Tarefa com Início
    (focus: true)               (dueDate <= Hoje)          (startDate <= Hoje)
          │                             │                           │
          └─────────────────────────────┼───────────────────────────┘
                                        │
                                        ▼
                        ┌──────────────────────────────┐
                        │      Lista de FOCO (Hoje)    │
                        │ (Exclui concluídas e lixo)   │
                        └──────────────────────────────┘`,
    sections: [
      {
        title: 'Critérios de Entrada na Lista de Foco',
        description:
          'Uma tarefa é exibida na tela Focus se satisfizer qualquer uma das três condições:',
        steps: [
          {
            number: 1,
            title: 'Estrela Manual (focus: true)',
            description: 'Tarefas marcadas explicitamente clicando no ícone de estrela.',
          },
          {
            number: 2,
            title: 'Data de Vencimento (dueDate)',
            description: 'Tarefas com data de vencimento igual a hoje ou em atraso.',
          },
          {
            number: 3,
            title: 'Data de Início (startDate)',
            description: 'Tarefas agendadas para início hoje ou data anterior promovida pelo Boot Engine.',
          },
        ],
      },
    ],
    callouts: [
      {
        type: 'rule',
        title: 'Regra de Exclusão Absoluta',
        content:
          'Tarefas no estado logbook (concluídas) ou trash (lixeira) nunca aparecem na lista de Foco, mesmo se tiverem estrela ou vencimento para hoje.',
      },
    ],
    prevTopicId: 'fluxo-4-organizacao-contexto',
    nextTopicId: 'fluxo-6-conclusao-recorrencia',
  },
  {
    id: 'fluxo-6-conclusao-recorrencia',
    title: 'Fluxo 6: Conclusão e Tarefas Recorrentes (Client-Side Cloning)',
    category: 'Fluxos de Trabalho',
    badge: 'Recorrência',
    summary: 'Registro no Logbook e clonagem inteligente no client-side sem efeito avalanche.',
    objective:
      'Registrar o histórico de tarefas concluídas no Logbook e renovar automaticamente tarefas recorrentes sem criar acúmulo em cascata (avalanche effect).',
    diagram: `[Usuário marca Checkbox da Tarefa Recorrente]
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
                        └───────────────────────┘`,
    sections: [
      {
        title: 'Regra de Recorrência Baseada na Conclusão',
        steps: [
          {
            number: 1,
            title: 'Conclusão da Instância Atual',
            description:
              'A tarefa recebe state: "logbook" e timestamp completedAt com o momento exato da marcação.',
          },
          {
            number: 2,
            title: 'Clonagem a partir da Conclusão Real',
            description:
              'A nova instância é calculada com base na data em que a tarefa foi realmente finalizada, não na data originalmente agendada.',
          },
          {
            number: 3,
            title: 'Prevenção de Efeito Avalanche',
            description:
              'Se uma tarefa semanal atrasou por semanas e foi concluída hoje, a próxima data será calculada para 1 semana a partir de hoje, evitando pilhas de tarefas atrasadas no sistema.',
          },
          {
            number: 4,
            title: 'Roteamento Inteligente de Estado',
            description:
              'Se a próxima data for no futuro, a tarefa vai para scheduled. Se for hoje ou no passado, entra imediatamente em next.',
          },
        ],
      },
    ],
    callouts: [
      {
        type: 'rule',
        title: 'Proteção Contra Avalanche',
        content:
          'O cálculo a partir da data de conclusão real impede que tarefas acumuladas criem um backlog artificial de dezenas de instâncias no histórico.',
      },
    ],
    prevTopicId: 'fluxo-5-foco-diario',
    nextTopicId: 'fluxo-7-boot-engine',
  },
  {
    id: 'fluxo-7-boot-engine',
    title: 'Fluxo 7: O Motor de Inicialização (Boot Engine)',
    category: 'Fluxos de Trabalho',
    badge: 'Motor GTD',
    summary: 'O falso cronjob do cliente que promove tarefas agendadas na montagem e foco da aba.',
    objective:
      'Atuar como um "falso cronjob" no lado do cliente, promovendo tarefas agendadas para acionáveis sem necessidade de um servidor em nuvem.',
    diagram: `       Abertura do App OU Janela Ganha Foco
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
    mudança e atualiza a interface em tempo real!`,
    sections: [
      {
        title: 'Quando o Motor é Acionado?',
        items: [
          'Na montagem inicial da aplicação (carregamento inicial ou recarga da página).',
          'Sempre que a janela ou aba do navegador ganha foco novamente (evento window focus).',
        ],
      },
      {
        title: 'Comportamento Idempotente',
        description:
          'O hook useBootEngine busca tarefas em scheduled com startDate menor ou igual à data de hoje e as migra em lote para next de forma atômica e segura.',
      },
    ],
    callouts: [
      {
        type: 'info',
        title: 'Zero Requisições de Rede',
        content:
          'Toda a promoção temporal ocorre dentro do IndexedDB no próprio navegador, garantindo que o app acorde atualizado mesmo após dias sem uso.',
      },
    ],
    prevTopicId: 'fluxo-6-conclusao-recorrencia',
    nextTopicId: 'fluxo-8-referencia-lixeira',
  },
  {
    id: 'fluxo-8-referencia-lixeira',
    title: 'Fluxo 8: Material de Referência e Lixeira (Reference & Trash)',
    category: 'Fluxos de Trabalho',
    badge: 'Referência',
    summary: 'Armazenamento de notas não acionáveis e mecanismo de soft-delete com restauração.',
    objective:
      'Gerenciar material de consulta não acionável e fornecer descarte seguro com histórico preservado.',
    diagram: `Item Ativo ──(Excluir)──► [ Lixeira: state='trash' ] ──(Restaurar)──► Item Ativo
                                    │
                              (Esvaziar Lixeira)
                                    │
                                    ▼
                          Remoção Permanente do
                              IndexedDB`,
    sections: [
      {
        title: 'Material de Referência (Reference)',
        items: [
          'Armazena notas, manuais, ideias e arquivos textuais informativos que não possuem ação física imediata.',
          'Isolamento total: itens de referência nunca aparecem nas listas de ação (Inbox, Next, Focus, etc.).',
          'Organização por Projeto e Área, além de busca textual instantânea por título e conteúdo das notas.',
        ],
      },
      {
        title: 'Lixeira e Exclusão Segura (Trash)',
        steps: [
          {
            number: 1,
            title: 'Soft Delete Seguro',
            description:
              'A exclusão altera o estado para trash, mantendo o histórico, notas e checklists intactos.',
          },
          {
            number: 2,
            title: 'Restauração com 1 Clique',
            description:
              'Itens na lixeira podem ser restaurados a qualquer momento (tarefas voltam para inbox e projetos para active).',
          },
          {
            number: 3,
            title: 'Esvaziar Lixeira Definitivamente',
            description:
              'A limpeza permanente só ocorre mediante ação explícita no botão "Esvaziar Lixeira".',
          },
        ],
      },
    ],
    prevTopicId: 'fluxo-7-boot-engine',
    nextTopicId: 'fluxo-9-revisao-semanal',
  },
  {
    id: 'fluxo-9-revisao-semanal',
    title: 'Fluxo 9: Ritual da Revisão Semanal (Weekly Review Wizard)',
    category: 'Fluxos de Trabalho',
    badge: 'Revisão',
    summary: 'Assistente guiado em 7 passos para manter o sistema confiável e alinhado.',
    objective:
      'Guiar o usuário passo a passo através do ritual sagrado do GTD para manter o sistema confiável, limpo e atualizado.',
    diagram: `┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 🧭 Passo 1 de 7: Esvazie a Mente (Get Clear)                    [Anterior] [Próximo] [X]│
│ Capture tudo o que acumulou na sua cabeça esta semana antes de processar as listas.   │
└────────────────────────────────────────────────────────────────────────────────────────┘`,
    sections: [
      {
        title: 'Pontos de Entrada',
        description:
          'Inicie a qualquer momento clicando em "Iniciar Revisão Semanal" na barra lateral (desktop) ou no menu "Mais" (mobile).',
      },
      {
        title: 'Os 7 Passos do Assistente Guiado',
        steps: [
          {
            number: 1,
            title: 'Passo 1: Esvazie a Mente (/inbox)',
            description: 'Momento de despejo mental (mind sweep) capturando tudo o que acumulou na cabeça.',
          },
          {
            number: 2,
            title: 'Passo 2: Esvazie a Caixa de Entrada (/inbox)',
            description: 'Processar cada item da Inbox até alcançar o Inbox Zero.',
          },
          {
            number: 3,
            title: 'Passo 3: Revise o Histórico (/logbook)',
            description: 'Verificar tarefas concluídas para identificar desdobramentos ou pendências.',
          },
          {
            number: 4,
            title: 'Passo 4: Revise o Aguardando (/waiting)',
            description: 'Cobrar retornos de tarefas delegadas e dependências com terceiros.',
          },
          {
            number: 5,
            title: 'Passo 5: Revise Projetos Ativos (/projects)',
            description: 'Garantir que cada projeto ativo possua ao menos uma próxima ação definida.',
          },
          {
            number: 6,
            title: 'Passo 6: Revise Algum Dia / Talvez (/someday)',
            description: 'Resgatar ideias prontas para ativação ou descartar itens desatualizados.',
          },
          {
            number: 7,
            title: 'Passo 7: Escolha o Foco da Semana (/next)',
            description: 'Estrelar as ações mais importantes para priorizar nos próximos dias.',
          },
        ],
      },
      {
        title: 'Cancelamento Ágil em 1 Clique',
        description:
          'O assistente pode ser fechado a qualquer momento clicando no botão X. O progresso reside apenas na memória da UI (Zustand) e não polui o banco de dados.',
      },
    ],
    prevTopicId: 'fluxo-8-referencia-lixeira',
    nextTopicId: 'fluxo-10-backup-offline',
  },
  {
    id: 'fluxo-10-backup-offline',
    title: 'Fluxo 10: Backup, Restauração e PWA Offline',
    category: 'Fluxos de Trabalho',
    badge: 'Dados & Offline',
    summary: 'Exportação e importação JSON no navegador, lembrete de 7 dias e suporte PWA.',
    objective:
      'Garantir soberania e segurança total dos dados do usuário através de exportação/importação JSON e funcionamento 100% offline.',
    diagram: `┌────────────────────────────────────────────────────────────────────────┐
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
                └─────────────────────┘                                 └─────────────────────┘`,
    sections: [
      {
        title: 'Rotinas de Backup e Restauração',
        steps: [
          {
            number: 1,
            title: 'Exportar Backup',
            description:
              'Gera um arquivo .json completo contendo todas as tabelas (tarefas, projetos, tags, áreas e vínculos).',
          },
          {
            number: 2,
            title: 'Importar Backup (Hard-Replace)',
            description:
              'Substitui integralmente a base local pelos dados do arquivo selecionado, com confirmação prévia de segurança.',
          },
          {
            number: 3,
            title: 'Lembrete Periódico',
            description:
              'Um alerta discreto notifica o usuário caso tenham se passado mais de 7 dias desde a última exportação.',
          },
        ],
      },
      {
        title: 'Instalação como PWA',
        description:
          'O aplicativo pode ser instalado no celular ou computador como Progressive Web App, permitindo abertura instantânea e uso offline permanente.',
      },
    ],
    prevTopicId: 'fluxo-9-revisao-semanal',
    nextTopicId: 'atalhos-rapidos',
  },
  {
    id: 'atalhos-rapidos',
    title: 'Tabela de Atalhos Rápidos e Gestos',
    category: 'Referência & Atalhos',
    badge: 'Atalhos',
    summary: 'Guia de comandos rápidos de teclado no desktop e gestos de toque no mobile.',
    objective:
      'Prover uma referência rápida de comandos e gestos para maximizar a agilidade e a produtividade no uso diário do sistema.',
    sections: [
      {
        title: 'Comandos do Sistema',
        description: 'Tabela comparativa de comandos desktop e mobile:',
        table: {
          headers: ['Ação', 'Desktop', 'Mobile / Touch'],
          rows: [
            ['Captura Rápida', 'Atalho C / Botão + Nova Tarefa [C]', 'Botão Flutuante (+)'],
            ['Navegação Principal', 'Sidebar lateral', 'Barra de navegação inferior'],
            ['Iniciar Revisão Semanal', 'Botão na Sidebar', 'Botão no menu "Mais" (Drawer inferior)'],
            ['Sair/Cancelar Revisão', 'Botão X no banner', 'Botão X no banner'],
            ['Fechar Painel de Detalhes', 'Esc ou clique fora', 'Botão de fechar ou deslizar'],
            ['Alternar Foco (Estrela)', 'Clique no ícone de estrela', 'Toque no ícone de estrela'],
            ['Concluir Tarefa', 'Clique no Checkbox', 'Toque no Checkbox'],
          ],
        },
      },
    ],
    prevTopicId: 'fluxo-10-backup-offline',
  },
]

export const getGuideTopicById = (id: string): GuideTopic | undefined => {
  return GUIDE_TOPICS.find((topic) => topic.id === id)
}

export const searchGuideTopics = (query: string): GuideTopic[] => {
  const normalized = query.trim().toLowerCase()
  if (!normalized) {
    return GUIDE_TOPICS
  }

  return GUIDE_TOPICS.filter((topic) => {
    return (
      topic.title.toLowerCase().includes(normalized) ||
      topic.summary.toLowerCase().includes(normalized) ||
      topic.badge.toLowerCase().includes(normalized) ||
      (topic.objective && topic.objective.toLowerCase().includes(normalized)) ||
      topic.sections.some(
        (sec) =>
          (sec.title && sec.title.toLowerCase().includes(normalized)) ||
          (sec.description && sec.description.toLowerCase().includes(normalized)) ||
          sec.steps?.some(
            (step) =>
              step.title.toLowerCase().includes(normalized) ||
              step.description.toLowerCase().includes(normalized),
          ) ||
          sec.items?.some((item) => item.toLowerCase().includes(normalized)),
      )
    )
  })
}
