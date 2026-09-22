import type { Project, Task } from '@/types/database'

export function applySequentialProjectRule(nextTasks: Task[], projects: Project[]): Task[] {
  const projectById = new Map(projects.map((project) => [project.id, project]))
  const sequentialGroups = new Map<string, Task[]>()
  const visible: Task[] = []

  for (const task of nextTasks) {
    const project = task.projectId ? projectById.get(task.projectId) : undefined
    if (!project || project.type !== 'sequential') {
      visible.push(task)
      continue
    }
    const group = sequentialGroups.get(project.id)
    if (group) {
      group.push(task)
    } else {
      sequentialGroups.set(project.id, [task])
    }
  }

  for (const group of sequentialGroups.values()) {
    visible.push(group.reduce((earliest, task) => (task.createdAt < earliest.createdAt ? task : earliest)))
  }

  return visible
}

export function getEffectiveAreaId(task: Task, project?: Project): string | undefined {
  return task.areaId ?? project?.areaId
}
