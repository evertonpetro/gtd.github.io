import { db } from '@/db/db'
import type { Area, Project, Tag, Task, TaskTag } from '@/types/database'

export interface BackupData {
  version: number
  exportedAt: number
  tasks: Task[]
  projects: Project[]
  tags: Tag[]
  areas: Area[]
  taskTags: TaskTag[]
}

async function exportAll(): Promise<BackupData> {
  const [tasks, projects, tags, areas, taskTags] = await Promise.all([
    db.tasks.toArray(),
    db.projects.toArray(),
    db.tags.toArray(),
    db.areas.toArray(),
    db.taskTags.toArray(),
  ])

  return {
    version: 2,
    exportedAt: Date.now(),
    tasks,
    projects,
    tags,
    areas,
    taskTags,
  }
}

function isValidBackupData(data: unknown): data is BackupData {
  if (typeof data !== 'object' || data === null) return false
  const candidate = data as Record<string, unknown>
  return (
    Array.isArray(candidate.tasks) &&
    Array.isArray(candidate.projects) &&
    Array.isArray(candidate.tags) &&
    Array.isArray(candidate.areas) &&
    Array.isArray(candidate.taskTags)
  )
}

async function importReplace(data: unknown): Promise<void> {
  if (!isValidBackupData(data)) {
    throw new Error('Arquivo de backup inválido: estrutura de dados inesperada.')
  }

  await db.transaction('rw', db.tasks, db.projects, db.tags, db.areas, db.taskTags, async () => {
    await Promise.all([
      db.tasks.clear(),
      db.projects.clear(),
      db.tags.clear(),
      db.areas.clear(),
      db.taskTags.clear(),
    ])
    await Promise.all([
      db.tasks.bulkAdd(data.tasks),
      db.projects.bulkAdd(data.projects),
      db.tags.bulkAdd(data.tags),
      db.areas.bulkAdd(data.areas),
      db.taskTags.bulkAdd(data.taskTags),
    ])
  })
}

export const syncRepo = {
  exportAll,
  importReplace,
  isValidBackupData,
}
