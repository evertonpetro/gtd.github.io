import TaskItem from '@/features/tasks/components/TaskItem'
import { useNextActions } from '@/features/tasks/hooks/useNextActions'

const NextActionsPage = () => {
  const nextTasks = useNextActions()

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900">Próximas Ações</h2>

      {nextTasks && nextTasks.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Nenhuma próxima ação.</p>
      )}

      <ul className="mt-4 flex flex-col gap-1">
        {nextTasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </ul>
    </div>
  )
}

export default NextActionsPage
