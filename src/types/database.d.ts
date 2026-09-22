export type TaskType = 'action' | 'reference'

export type TaskState =
  | 'inbox'
  | 'next'
  | 'waiting'
  | 'scheduled'
  | 'someday'
  | 'logbook'
  | 'reference'
  | 'trash'

export type TimeEstimate = 5 | 15 | 30 | 60 | 120

export type EnergyLevel = 1 | 2 | 3

export type RecurrenceRule = 'daily' | 'weekly' | 'monthly' | 'yearly'

export interface ChecklistItem {
  id: string
  text: string
  isCompleted: boolean
}

export interface Task {
  id: string
  title: string
  notes: string
  type: TaskType
  state: TaskState
  focus: boolean

  projectId?: string
  areaId?: string

  timeEstimate?: TimeEstimate
  energyLevel?: EnergyLevel
  contact?: string

  startDate?: number
  dueDate?: number
  completedAt?: number

  checklist: ChecklistItem[]

  recurrenceRule?: RecurrenceRule

  createdAt: number
  updatedAt: number
}

export type ProjectType = 'parallel' | 'sequential'

export type ProjectState = 'active' | 'someday' | 'completed' | 'trash'

export interface Project {
  id: string
  title: string
  notes: string
  state: ProjectState
  type: ProjectType

  areaId?: string

  completedAt?: number
  createdAt: number
  updatedAt: number
}

export interface Tag {
  id: string
  title: string
}

export interface Area {
  id: string
  title: string
}

export interface TaskTag {
  id: string
  taskId: string
  tagId: string
}
