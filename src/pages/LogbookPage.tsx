import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'

const dateFormatter = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' })

const LogbookPage = () => {
  const completedTasks = useLiveQuery(async () => {
    const tasks = await db.tasks.where('state').equals('logbook').toArray()
    return tasks.sort((a, b) => (b.completedAt ?? 0) - (a.completedAt ?? 0))
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900">Registro</h2>

      {completedTasks && completedTasks.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Nenhuma tarefa concluída ainda.</p>
      )}

      <ul className="mt-4 flex flex-col gap-1">
        {completedTasks?.map((task) => (
          <li
            key={task.id}
            className="flex items-center justify-between gap-2 rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900"
          >
            <span className="truncate">{task.title}</span>
            <span className="shrink-0 text-xs text-gray-500">
              {task.completedAt ? dateFormatter.format(task.completedAt) : ''}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LogbookPage
