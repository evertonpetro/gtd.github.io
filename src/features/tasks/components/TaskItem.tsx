import { Check, Star } from 'lucide-react'
import type { MouseEvent } from 'react'
import { taskRepo } from '@/db/repositories/taskRepo'
import { useUIStore } from '@/store/uiStore'
import type { Task } from '@/types/database'

interface TaskItemProps {
  task: Task
}

const TaskItem = ({ task }: TaskItemProps) => {
  const openTaskDetail = useUIStore((state) => state.openTaskDetail)

  const handleToggleFocus = (event: MouseEvent) => {
    event.stopPropagation()
    void taskRepo.toggleFocus(task.id)
  }

  const handleComplete = (event: MouseEvent) => {
    event.stopPropagation()
    void taskRepo.complete(task.id)
  }

  return (
    <li className="flex items-center gap-1 rounded-md border border-gray-200 hover:bg-gray-50">
      <button
        type="button"
        onClick={() => openTaskDetail(task.id)}
        className="flex-1 px-3 py-2 text-left text-sm text-gray-900"
      >
        {task.title}
      </button>
      <button
        type="button"
        onClick={handleComplete}
        aria-label="Concluir tarefa"
        className="shrink-0 rounded p-1 text-gray-400 hover:text-green-600"
      >
        <Check size={16} />
      </button>
      <button
        type="button"
        onClick={handleToggleFocus}
        aria-label={task.focus ? 'Remover foco' : 'Marcar como foco'}
        aria-pressed={task.focus}
        className="mr-2 shrink-0 rounded p-1 text-gray-400 hover:text-amber-500"
      >
        <Star size={16} className={task.focus ? 'fill-amber-400 text-amber-500' : ''} />
      </button>
    </li>
  )
}

export default TaskItem
