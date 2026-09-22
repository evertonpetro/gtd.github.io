import { getEffectiveAreaId } from '@/features/gtd-engine/rules'
import type { EnergyLevel, Project, Task, TimeEstimate } from '@/types/database'

export interface ActiveFilters {
  areaId: string | null
  tagIds: string[]
  energyLevel: EnergyLevel | null
  timeEstimate: TimeEstimate | null
}

export interface FilterContext {
  projectById: Map<string, Project>
  tagIdsByTaskId: Map<string, Set<string>>
}

export function buildTagIndex(taskTags: { taskId: string; tagId: string }[]): Map<string, Set<string>> {
  const index = new Map<string, Set<string>>()
  for (const taskTag of taskTags) {
    const set = index.get(taskTag.taskId) ?? new Set<string>()
    set.add(taskTag.tagId)
    index.set(taskTag.taskId, set)
  }
  return index
}

export function applyActiveFilters(tasks: Task[], filters: ActiveFilters, context: FilterContext): Task[] {
  return tasks.filter((task) => {
    if (filters.areaId) {
      const project = task.projectId ? context.projectById.get(task.projectId) : undefined
      if (getEffectiveAreaId(task, project) !== filters.areaId) return false
    }
    if (filters.energyLevel && task.energyLevel !== filters.energyLevel) return false
    if (filters.timeEstimate && task.timeEstimate !== filters.timeEstimate) return false
    if (filters.tagIds.length > 0) {
      const taskTagIds = context.tagIdsByTaskId.get(task.id)
      if (!filters.tagIds.every((tagId) => taskTagIds?.has(tagId))) return false
    }
    return true
  })
}
