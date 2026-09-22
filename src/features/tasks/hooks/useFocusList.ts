import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import { applyActiveFilters, buildTagIndex } from '@/features/tasks/filtering'
import { useFilterStore } from '@/store/filterStore'
import type { Task } from '@/types/database'

function getEndOfLocalDay(): number {
  return new Date().setHours(23, 59, 59, 999)
}

export function useFocusList(): Task[] | undefined {
  const areaId = useFilterStore((state) => state.areaId)
  const tagIds = useFilterStore((state) => state.tagIds)
  const energyLevel = useFilterStore((state) => state.energyLevel)
  const timeEstimate = useFilterStore((state) => state.timeEstimate)

  return useLiveQuery(async () => {
    const [tasks, projects, taskTags] = await Promise.all([
      db.tasks.where('state').noneOf(['logbook', 'trash', 'reference']).toArray(),
      db.projects.toArray(),
      db.taskTags.toArray(),
    ])

    const todayEnd = getEndOfLocalDay()
    const focusTasks = tasks.filter((task) => {
      if (task.focus) return true
      if (typeof task.dueDate === 'number' && task.dueDate <= todayEnd) return true
      return typeof task.startDate === 'number' && task.startDate <= todayEnd;

    })

    const projectById = new Map(projects.map((project) => [project.id, project]))
    const filtered = applyActiveFilters(
      focusTasks,
      { areaId, tagIds, energyLevel, timeEstimate },
      { projectById, tagIdsByTaskId: buildTagIndex(taskTags) },
    )

    return filtered.sort((a, b) => a.createdAt - b.createdAt)
  }, [areaId, tagIds, energyLevel, timeEstimate])
}
