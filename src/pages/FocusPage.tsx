import TaskItem from '@/features/tasks/components/TaskItem'
import { useFocusList } from '@/features/tasks/hooks/useFocusList'

const FocusPage = () => {
  const focusTasks = useFocusList()

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900">Foco</h2>

      {focusTasks && focusTasks.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Nenhuma tarefa em foco hoje.</p>
      )}

      <ul className="mt-4 flex flex-col gap-1">
        {focusTasks?.map((task) => <TaskItem key={task.id} task={task} />)}
      </ul>
    </div>
  )
}

export default FocusPage
