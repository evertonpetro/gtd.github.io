import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import { applyActiveFilters, buildTagIndex } from '@/features/tasks/filtering'
import { useFilterStore } from '@/store/filterStore'
import type { Task, TaskState } from '@/types/database'

export function useActionableTasks(state: TaskState): Task[] | undefined {
  const areaId = useFilterStore((store) => store.areaId)
  const tagIds = useFilterStore((store) => store.tagIds)
  const energyLevel = useFilterStore((store) => store.energyLevel)
  const timeEstimate = useFilterStore((store) => store.timeEstimate)

  return useLiveQuery(async () => {
    const [tasks, projects, taskTags] = await Promise.all([
      db.tasks.where('state').equals(state).toArray(),
      db.projects.toArray(),
      db.taskTags.toArray(),
    ])
    const projectById = new Map(projects.map((project) => [project.id, project]))
    const filtered = applyActiveFilters(
      tasks,
      { areaId, tagIds, energyLevel, timeEstimate },
      { projectById, tagIdsByTaskId: buildTagIndex(taskTags) },
    )

    return filtered.sort((a, b) => a.createdAt - b.createdAt)
  }, [state, areaId, tagIds, energyLevel, timeEstimate])
}
