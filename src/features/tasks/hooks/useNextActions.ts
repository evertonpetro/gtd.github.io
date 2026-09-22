import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import { applySequentialProjectRule } from '@/features/gtd-engine/rules'
import { applyActiveFilters, buildTagIndex } from '@/features/tasks/filtering'
import { useFilterStore } from '@/store/filterStore'
import type { Task } from '@/types/database'

export function useNextActions(): Task[] | undefined {
  const areaId = useFilterStore((state) => state.areaId)
  const tagIds = useFilterStore((state) => state.tagIds)
  const energyLevel = useFilterStore((state) => state.energyLevel)
  const timeEstimate = useFilterStore((state) => state.timeEstimate)

  return useLiveQuery(async () => {
    const [nextTasks, projects, taskTags] = await Promise.all([
      db.tasks.where('state').equals('next').toArray(),
      db.projects.toArray(),
      db.taskTags.toArray(),
    ])
    const projectById = new Map(projects.map((project) => [project.id, project]))
    const visible = applySequentialProjectRule(nextTasks, projects)
    const filtered = applyActiveFilters(
      visible,
      { areaId, tagIds, energyLevel, timeEstimate },
      { projectById, tagIdsByTaskId: buildTagIndex(taskTags) },
    )

    return filtered.sort((a, b) => a.createdAt - b.createdAt)
  }, [areaId, tagIds, energyLevel, timeEstimate])
}
