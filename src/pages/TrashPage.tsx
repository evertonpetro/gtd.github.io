import { useLiveQuery } from 'dexie-react-hooks'
import { RotateCcw, Trash2 } from 'lucide-react'
import { db } from '@/db/db'
import { projectRepo } from '@/db/repositories/projectRepo'
import { taskRepo } from '@/db/repositories/taskRepo'
import { trashRepo } from '@/db/repositories/trashRepo'

const TrashPage = () => {
  const trashedTasks = useLiveQuery(() => db.tasks.where('state').equals('trash').sortBy('updatedAt'), [])
  const trashedProjects = useLiveQuery(() => db.projects.where('state').equals('trash').sortBy('updatedAt'), [])

  const isEmpty = trashedTasks?.length === 0 && trashedProjects?.length === 0

  const handleEmptyTrash = () => {
    if (!window.confirm('Esvaziar a lixeira? Essa ação não pode ser desfeita.')) return
    void trashRepo.emptyTrash()
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Lixeira</h2>
        {!isEmpty && (
          <button
            type="button"
            onClick={handleEmptyTrash}
            className="rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Esvaziar Lixeira
          </button>
        )}
      </div>

      {isEmpty && <p className="mt-4 text-sm text-gray-500">A lixeira está vazia.</p>}

      {trashedTasks && trashedTasks.length > 0 && (
        <section className="mt-4">
          <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">Tarefas</h3>
          <ul className="flex flex-col gap-1">
            {trashedTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center justify-between gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900"
              >
                <span className="flex-1 truncate">{task.title}</span>
                <button
                  type="button"
                  onClick={() => void taskRepo.restore(task.id)}
                  aria-label="Restaurar tarefa"
                  className="shrink-0 rounded p-1 text-gray-400 hover:text-gray-700"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Excluir permanentemente esta tarefa?')) void taskRepo.remove(task.id)
                  }}
                  aria-label="Excluir permanentemente"
                  className="shrink-0 rounded p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {trashedProjects && trashedProjects.length > 0 && (
        <section className="mt-4">
          <h3 className="mb-2 text-xs font-medium uppercase text-gray-500">Projetos</h3>
          <ul className="flex flex-col gap-1">
            {trashedProjects.map((project) => (
              <li
                key={project.id}
                className="flex items-center justify-between gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900"
              >
                <span className="flex-1 truncate">{project.title}</span>
                <button
                  type="button"
                  onClick={() => void projectRepo.restore(project.id)}
                  aria-label="Restaurar projeto"
                  className="shrink-0 rounded p-1 text-gray-400 hover:text-gray-700"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Excluir permanentemente este projeto?')) void projectRepo.remove(project.id)
                  }}
                  aria-label="Excluir permanentemente"
                  className="shrink-0 rounded p-1 text-gray-400 hover:text-red-600"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}

export default TrashPage
