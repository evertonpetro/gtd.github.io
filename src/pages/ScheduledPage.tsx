import TaskItem from '@/features/tasks/components/TaskItem'
import { useActionableTasks } from '@/features/tasks/hooks/useActionableTasks'

const ScheduledPage = () => {
  const scheduledTasks = useActionableTasks('scheduled')

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900">Agendadas</h2>

      {scheduledTasks && scheduledTasks.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Nenhuma tarefa agendada.</p>
      )}

      <ul className="mt-4 flex flex-col gap-1">
        {scheduledTasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </ul>
    </div>
  )
}

export default ScheduledPage
