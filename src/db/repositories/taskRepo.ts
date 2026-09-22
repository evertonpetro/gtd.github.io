import { db } from '@/db/db'
import type {
  ChecklistItem,
  EnergyLevel,
  RecurrenceRule,
  Task,
  TaskState,
  TimeEstimate,
} from '@/types/database'
import { addInterval, endOfToday, isSameLocalDay } from '@/utils/dateUtils'
import { generateId } from '@/utils/uuid'

export type ClarifyDecision =
  | { type: 'reference' }
  | { type: 'action'; state: 'next' }
  | { type: 'action'; state: 'someday' }
  | { type: 'action'; state: 'waiting'; contact?: string }
  | { type: 'action'; state: 'scheduled'; startDate: number }

export interface TaskDetailsPatch {
  title?: string
  notes?: string
  checklist?: ChecklistItem[]
  timeEstimate?: TimeEstimate
  energyLevel?: EnergyLevel
  startDate?: number
  dueDate?: number
  contact?: string
  recurrenceRule?: RecurrenceRule
}

async function capture(title: string): Promise<string> {
  const id = generateId()
  const timestamp = Date.now()
  const task: Task = {
    id,
    title,
    notes: '',
    type: 'action',
    state: 'inbox',
    focus: false,
    checklist: [],
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  await db.tasks.add(task)
  return id
}

async function clarify(id: string, decision: ClarifyDecision): Promise<void> {
  const updatedAt = Date.now()
  if (decision.type === 'reference') {
    await db.tasks.update(id, { type: 'reference', state: 'reference', updatedAt })
    return
  }

  const patch: Partial<Task> = { type: 'action', state: decision.state, updatedAt }
  if (decision.state === 'waiting') {
    patch.contact = decision.contact
  }
  if (decision.state === 'scheduled') {
    patch.startDate = decision.startDate
  }
  await db.tasks.update(id, patch)
}

async function updateDetails(id: string, patch: TaskDetailsPatch): Promise<void> {
  await db.tasks.update(id, { ...patch, updatedAt: Date.now() })
}

async function assignProject(id: string, projectId: string | undefined): Promise<void> {
  await db.tasks.update(id, { projectId, updatedAt: Date.now() })
}

async function assignArea(id: string, areaId: string | undefined): Promise<void> {
  await db.tasks.update(id, { areaId, updatedAt: Date.now() })
}

async function toggleTag(taskId: string, tagId: string): Promise<void> {
  const existing = await db.taskTags
    .where('taskId')
    .equals(taskId)
    .and((taskTag) => taskTag.tagId === tagId)
    .first()

  if (existing) {
    await db.taskTags.delete(existing.id)
    return
  }
  await db.taskTags.add({ id: generateId(), taskId, tagId })
}

async function toggleFocus(id: string): Promise<void> {
  const task = await db.tasks.get(id)
  if (!task) return
  await db.tasks.update(id, { focus: !task.focus, updatedAt: Date.now() })
}

async function complete(id: string): Promise<void> {
  await db.transaction('rw', db.tasks, async () => {
    const task = await db.tasks.get(id)
    if (!task || task.state === 'trash') return

    const completedAt = Date.now()
    await db.tasks.update(id, { state: 'logbook', completedAt, updatedAt: completedAt })

    if (!task.recurrenceRule) return

    const nextStartDate = addInterval(completedAt, task.recurrenceRule)
    const nextDueDate =
      typeof task.dueDate === 'number'
        ? nextStartDate + (task.dueDate - (task.startDate ?? completedAt))
        : undefined

    const nextState: TaskState = nextStartDate > endOfToday() ? 'scheduled' : 'next'
    const nextFocus =
      nextState === 'next' && typeof nextDueDate === 'number' && isSameLocalDay(nextDueDate, completedAt)

    const clone: Task = {
      id: generateId(),
      title: task.title,
      notes: task.notes,
      type: task.type,
      state: nextState,
      focus: nextFocus,
      projectId: task.projectId,
      areaId: task.areaId,
      timeEstimate: task.timeEstimate,
      energyLevel: task.energyLevel,
      contact: task.contact,
      startDate: nextStartDate,
      dueDate: nextDueDate,
      checklist: task.checklist,
      recurrenceRule: task.recurrenceRule,
      createdAt: completedAt,
      updatedAt: completedAt,
    }
    await db.tasks.add(clone)
  })
}

async function softDelete(id: string): Promise<void> {
  await db.tasks.update(id, { state: 'trash', updatedAt: Date.now() })
}

async function restore(id: string): Promise<void> {
  await db.tasks.update(id, { state: 'inbox', updatedAt: Date.now() })
}

async function remove(id: string): Promise<void> {
  await db.tasks.delete(id)
}

export const taskRepo = {
  capture,
  clarify,
  updateDetails,
  assignProject,
  assignArea,
  toggleTag,
  toggleFocus,
  complete,
  softDelete,
  restore,
  remove,
}
