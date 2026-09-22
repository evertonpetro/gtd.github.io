import TaskItem from '@/features/tasks/components/TaskItem'
import { useActionableTasks } from '@/features/tasks/hooks/useActionableTasks'

const SomedayPage = () => {
  const somedayTasks = useActionableTasks('someday')

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900">Algum Dia</h2>

      {somedayTasks && somedayTasks.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Nenhuma tarefa em algum dia.</p>
      )}

      <ul className="mt-4 flex flex-col gap-1">
        {somedayTasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </ul>
    </div>
  )
}

export default SomedayPage
