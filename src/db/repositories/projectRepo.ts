import { db } from '@/db/db'
import type { Project, ProjectType } from '@/types/database'
import { generateId } from '@/utils/uuid'

export interface CreateProjectInput {
  title: string
  type: ProjectType
  notes?: string
  areaId?: string
}

export interface ProjectDetailsPatch {
  title?: string
  notes?: string
}

async function create(input: CreateProjectInput): Promise<string> {
  const id = generateId()
  const timestamp = Date.now()
  const project: Project = {
    id,
    title: input.title,
    notes: input.notes ?? '',
    state: 'active',
    type: input.type,
    areaId: input.areaId,
    createdAt: timestamp,
    updatedAt: timestamp,
  }
  await db.projects.add(project)
  return id
}

async function updateType(id: string, type: ProjectType): Promise<void> {
  await db.projects.update(id, { type, updatedAt: Date.now() })
}

async function updateDetails(id: string, patch: ProjectDetailsPatch): Promise<void> {
  await db.projects.update(id, { ...patch, updatedAt: Date.now() })
}

async function assignArea(id: string, areaId: string | undefined): Promise<void> {
  await db.projects.update(id, { areaId, updatedAt: Date.now() })
}

async function complete(id: string): Promise<void> {
  const completedAt = Date.now()
  await db.projects.update(id, { state: 'completed', completedAt, updatedAt: completedAt })
}

async function softDelete(id: string): Promise<void> {
  await db.projects.update(id, { state: 'trash', updatedAt: Date.now() })
}

async function restore(id: string): Promise<void> {
  await db.projects.update(id, { state: 'active', updatedAt: Date.now() })
}

async function remove(id: string): Promise<void> {
  await db.projects.delete(id)
}

export const projectRepo = {
  create,
  updateType,
  updateDetails,
  assignArea,
  complete,
  softDelete,
  restore,
  remove,
}
