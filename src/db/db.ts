import Dexie, { type Table } from 'dexie'
import type { Area, Project, Tag, Task, TaskTag } from '@/types/database'

export class GTDDatabase extends Dexie {
  tasks!: Table<Task, string>
  projects!: Table<Project, string>
  tags!: Table<Tag, string>
  areas!: Table<Area, string>
  taskTags!: Table<TaskTag, string>

  constructor() {
    super('GTD_Nirvana_Clone')
    this.version(2).stores({
      tasks: 'id, state, type, projectId, areaId, dueDate, startDate, completedAt, createdAt, focus',
      projects: 'id, state, areaId',
      tags: 'id, title',
      areas: 'id, title',
      taskTags: 'id, taskId, tagId',
    })
  }
}

export const db = new GTDDatabase()
