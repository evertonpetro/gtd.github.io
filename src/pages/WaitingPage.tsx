import TaskItem from '@/features/tasks/components/TaskItem'
import { useActionableTasks } from '@/features/tasks/hooks/useActionableTasks'

const WaitingPage = () => {
  const waitingTasks = useActionableTasks('waiting')

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900">Aguardando</h2>

      {waitingTasks && waitingTasks.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Nenhuma tarefa aguardando.</p>
      )}

      <ul className="mt-4 flex flex-col gap-1">
        {waitingTasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </ul>
    </div>
  )
}

export default WaitingPage
