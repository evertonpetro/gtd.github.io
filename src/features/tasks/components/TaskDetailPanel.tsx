import { X } from 'lucide-react'
import TaskForm from '@/features/tasks/components/TaskForm'
import { useTask } from '@/features/tasks/hooks/useTask'
import { useUIStore } from '@/store/uiStore'

const TaskDetailPanel = () => {
  const activeTaskId = useUIStore((state) => state.activeTaskId)
  const closeTaskDetail = useUIStore((state) => state.closeTaskDetail)
  const task = useTask(activeTaskId)

  if (!activeTaskId) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={closeTaskDetail}>
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-4 shadow-lg"
        style={{
          paddingTop: 'calc(1rem + env(safe-area-inset-top))',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Detalhes da Tarefa</h3>
          <button
            type="button"
            onClick={closeTaskDetail}
            aria-label="Fechar"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {task ? (
          <TaskForm key={task.id} task={task} />
        ) : (
          <p className="text-sm text-gray-500">Tarefa não encontrada.</p>
        )}
      </div>
    </div>
  )
}

export default TaskDetailPanel
