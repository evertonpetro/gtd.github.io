import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import TaskItem from '@/features/tasks/components/TaskItem'

const InboxPage = () => {
  const inboxTasks = useLiveQuery(
    () => db.tasks.where('state').equals('inbox').sortBy('createdAt'),
    [],
  )

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900">Entrada</h2>

      {inboxTasks && inboxTasks.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Sua entrada está vazia.</p>
      )}

      <ul className="mt-4 flex flex-col gap-1">
        {inboxTasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </ul>
    </div>
  )
}

export default InboxPage
