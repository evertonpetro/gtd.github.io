export type GuideCategoryName = 'Fundamentos' | 'Fluxos de Trabalho' | 'Referência & Atalhos'

export type GuideCalloutType = 'info' | 'warning' | 'tip' | 'rule'

export interface GuideCallout {
  type: GuideCalloutType
  title?: string
  content: string
}

export interface GuideTable {
  headers: string[]
  rows: string[][]
}

export interface GuideStep {
  number?: number
  title: string
  description: string
  substeps?: string[]
}

export interface GuideSection {
  title?: string
  description?: string
  steps?: GuideStep[]
  items?: string[]
  diagram?: string
  callouts?: GuideCallout[]
  table?: GuideTable
}

export interface GuideTopic {
  id: string
  title: string
  category: GuideCategoryName
  badge: string
  summary: string
  objective?: string
  diagram?: string
  sections: GuideSection[]
  callouts?: GuideCallout[]
  table?: GuideTable
  prevTopicId?: string
  nextTopicId?: string
}

export interface GuideCategory {
  id: string
  title: GuideCategoryName
  topicIds: string[]
}
