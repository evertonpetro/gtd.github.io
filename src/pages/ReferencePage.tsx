import { useLiveQuery } from 'dexie-react-hooks'
import { useMemo, useState } from 'react'
import { db } from '@/db/db'
import { useUIStore } from '@/store/uiStore'
import type { Task } from '@/types/database'

const NO_PROJECT_LABEL = 'Sem Projeto'
const NO_AREA_LABEL = 'Sem Área'

interface AreaGroup {
  key: string
  label: string
  tasks: Task[]
}

interface ProjectGroup {
  key: string
  label: string
  areas: AreaGroup[]
}

function sortGroups<T extends { key: string; label: string }>(groups: T[]): T[] {
  return groups.sort((a, b) => {
    if (a.key === '') return 1
    if (b.key === '') return -1
    return a.label.localeCompare(b.label)
  })
}

const ReferencePage = () => {
  const [search, setSearch] = useState('')
  const openTaskDetail = useUIStore((state) => state.openTaskDetail)

  const data = useLiveQuery(async () => {
    const [tasks, projects, areas] = await Promise.all([
      db.tasks.where('state').equals('reference').toArray(),
      db.projects.toArray(),
      db.areas.toArray(),
    ])
    return { tasks, projects, areas }
  }, [])

  const projectById = useMemo(() => new Map(data?.projects.map((project) => [project.id, project])), [data])
  const areaById = useMemo(() => new Map(data?.areas.map((area) => [area.id, area])), [data])

  const filteredTasks = useMemo(() => {
    const term = search.trim().toLowerCase()
    const tasks = data?.tasks ?? []
    if (!term) return tasks
    return tasks.filter(
      (task) => task.title.toLowerCase().includes(term) || task.notes.toLowerCase().includes(term),
    )
  }, [data, search])

  const groups = useMemo<ProjectGroup[]>(() => {
    const byProject = new Map<string, { label: string; byArea: Map<string, AreaGroup> }>()

    for (const task of filteredTasks) {
      const projectKey = task.projectId ?? ''
      const projectLabel = task.projectId
        ? projectById.get(task.projectId)?.title ?? 'Projeto removido'
        : NO_PROJECT_LABEL
      if (!byProject.has(projectKey)) {
        byProject.set(projectKey, { label: projectLabel, byArea: new Map() })
      }
      const projectGroup = byProject.get(projectKey)!

      const areaKey = task.areaId ?? ''
      const areaLabel = task.areaId ? areaById.get(task.areaId)?.title ?? 'Área removida' : NO_AREA_LABEL
      if (!projectGroup.byArea.has(areaKey)) {
        projectGroup.byArea.set(areaKey, { key: areaKey, label: areaLabel, tasks: [] })
      }
      projectGroup.byArea.get(areaKey)!.tasks.push(task)
    }

    const projectGroups = Array.from(byProject.entries()).map(([key, group]) => ({
      key,
      label: group.label,
      areas: sortGroups(Array.from(group.byArea.values())).map((areaGroup) => ({
        ...areaGroup,
        tasks: areaGroup.tasks.sort((a, b) => a.title.localeCompare(b.title)),
      })),
    }))

    return sortGroups(projectGroups)
  }, [filteredTasks, projectById, areaById])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900">Referência</h2>

      <input
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="Buscar por título ou notas..."
        className="mt-4 w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
      />

      {data && filteredTasks.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Nenhum item de referência encontrado.</p>
      )}

      <div className="mt-4 flex flex-col gap-6">
        {groups.map((projectGroup) => (
          <div key={projectGroup.key}>
            <h3 className="text-sm font-semibold uppercase text-gray-500">{projectGroup.label}</h3>
            <div className="mt-2 flex flex-col gap-4">
              {projectGroup.areas.map((areaGroup) => (
                <div key={areaGroup.key}>
                  <p className="text-xs font-medium uppercase text-gray-400">{areaGroup.label}</p>
                  <ul className="mt-1 flex flex-col gap-1">
                    {areaGroup.tasks.map((task) => (
                      <li key={task.id} className="rounded-md border border-gray-200 hover:bg-gray-50">
                        <button
                          type="button"
                          onClick={() => openTaskDetail(task.id)}
                          className="w-full px-3 py-2 text-left text-sm text-gray-900"
                        >
                          {task.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ReferencePage
