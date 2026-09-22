export const REVIEW_STEPS = [
  {
    route: '/inbox',
    title: 'Esvazie a mente',
    body: 'Capture tudo o que ainda está na sua cabeça: tarefas, ideias, compromissos e pendências. Jogue tudo na Inbox antes de continuar.',
  },
  {
    route: '/inbox',
    title: 'Processe a Inbox (Inbox Zero)',
    body: 'Processe cada item da Inbox até zerá-la: decida se ele é uma referência, algo para aguardar, algo agendado, uma próxima ação, ou se deve ser descartado.',
  },
  {
    route: '/logbook',
    title: 'Revise o Logbook',
    body: 'Revise o que foi concluído na última semana e capture qualquer follow-up que esse trabalho tenha gerado.',
  },
  {
    route: '/waiting',
    title: 'Revise o que está Aguardando',
    body: 'Revise os itens delegados a outras pessoas. Cobre quem estiver atrasado e atualize o que já foi resolvido.',
  },
  {
    route: '/projects',
    title: 'Revise os Projetos Ativos',
    body: 'Revise cada projeto ativo e confirme que ele tem uma próxima ação clara. Projetos sem próxima ação definida devem ganhar uma.',
  },
  {
    route: '/someday',
    title: 'Revise o Someday/Maybe',
    body: 'Revise as ideias incubadas em Algum Dia. Promova para próxima ação o que já faz sentido agora, ou mantenha incubado o que ainda não.',
  },
  {
    route: '/next',
    title: 'Escolha o foco da semana',
    body: 'Marque como foco as próximas ações que são prioridade para esta semana.',
  },
] as const

export type ReviewStep = (typeof REVIEW_STEPS)[number]
