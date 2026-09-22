import { useLiveQuery } from 'dexie-react-hooks'
import { Star, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { db } from '@/db/db'
import { taskRepo } from '@/db/repositories/taskRepo'
import ChecklistEditor from '@/features/tasks/components/ChecklistEditor'
import { useUIStore } from '@/store/uiStore'
import type { EnergyLevel, RecurrenceRule, Task, TimeEstimate } from '@/types/database'
import { fromDateInputValue, startOfToday, toDateInputValue } from '@/utils/dateUtils'
import { renderMarkdown } from '@/utils/markdown'
import { cn } from '@/utils/cn'

interface TaskFormProps {
  task: Task
}

const CLASSIFICATION_OPTIONS = [
  { key: 'reference', label: 'Referência' },
  { key: 'next', label: 'Próxima' },
  { key: 'waiting', label: 'Aguardando' },
  { key: 'scheduled', label: 'Agendada' },
  { key: 'someday', label: 'Algum Dia' },
] as const

const TIME_ESTIMATE_OPTIONS: TimeEstimate[] = [5, 15, 30, 60, 120]

const ENERGY_OPTIONS: { level: EnergyLevel; label: string }[] = [
  { level: 1, label: 'Baixa' },
  { level: 2, label: 'Média' },
  { level: 3, label: 'Alta' },
]

const RECURRENCE_OPTIONS: { rule: RecurrenceRule; label: string }[] = [
  { rule: 'daily', label: 'Diária' },
  { rule: 'weekly', label: 'Semanal' },
  { rule: 'monthly', label: 'Mensal' },
  { rule: 'yearly', label: 'Anual' },
]

function isActiveClassification(task: Task, key: (typeof CLASSIFICATION_OPTIONS)[number]['key']): boolean {
  if (key === 'reference') return task.type === 'reference'
  return task.type === 'action' && task.state === key
}

const TaskForm = ({ task }: TaskFormProps) => {
  const closeTaskDetail = useUIStore((state) => state.closeTaskDetail)
  const [title, setTitle] = useState(task.title)
  const [notes, setNotes] = useState(task.notes)
  const [contact, setContact] = useState(task.contact ?? '')

  const projects = useLiveQuery(() => db.projects.where('state').notEqual('trash').toArray(), [])
  const areas = useLiveQuery(() => db.areas.toArray(), [])
  const tags = useLiveQuery(() => db.tags.toArray(), [])
  const taskTagIds = useLiveQuery(
    async () => new Set((await db.taskTags.where('taskId').equals(task.id).toArray()).map((taskTag) => taskTag.tagId)),
    [task.id],
  )

  const handleClassificationClick = (key: (typeof CLASSIFICATION_OPTIONS)[number]['key']) => {
    if (key === 'reference') {
      void taskRepo.clarify(task.id, { type: 'reference' })
      return
    }
    if (key === 'waiting') {
      void taskRepo.clarify(task.id, { type: 'action', state: 'waiting', contact: task.contact })
      return
    }
    if (key === 'scheduled') {
      void taskRepo.clarify(task.id, {
        type: 'action',
        state: 'scheduled',
        startDate: task.startDate ?? startOfToday(),
      })
      return
    }
    void taskRepo.clarify(task.id, { type: 'action', state: key })
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onBlur={() => {
            if (title.trim() && title !== task.title) void taskRepo.updateDetails(task.id, { title })
          }}
          className="flex-1 text-lg font-medium text-gray-900 outline-none"
        />
        <button
          type="button"
          onClick={() => void taskRepo.toggleFocus(task.id)}
          aria-label={task.focus ? 'Remover foco' : 'Marcar como foco'}
          aria-pressed={task.focus}
          className="shrink-0 rounded p-1 text-gray-400 hover:text-amber-500"
        >
          <Star size={20} className={task.focus ? 'fill-amber-400 text-amber-500' : ''} />
        </button>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase text-gray-500">Classificação</p>
        <div className="flex flex-wrap gap-2">
          {CLASSIFICATION_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => handleClassificationClick(key)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm',
                isActiveClassification(task, key)
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {task.type === 'action' && task.state === 'waiting' && (
          <input
            value={contact}
            onChange={(event) => setContact(event.target.value)}
            onBlur={() => {
              if (contact !== (task.contact ?? '')) void taskRepo.updateDetails(task.id, { contact })
            }}
            placeholder="Contato (opcional)"
            className="mt-2 w-full rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-900 outline-none placeholder:text-gray-400"
          />
        )}
      </div>

      <div>
        <p className="mb-1 text-xs font-medium uppercase text-gray-500">Notas</p>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          onBlur={() => {
            if (notes !== task.notes) void taskRepo.updateDetails(task.id, { notes })
          }}
          rows={4}
          placeholder="Markdown suportado: **negrito**, *itálico*, [link](https://...)"
          className="w-full rounded-md border border-gray-200 p-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
        {notes.trim() && (
          <div
            className="prose prose-sm mt-2 text-sm text-gray-700"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(notes) }}
          />
        )}
      </div>

      {task.type === 'action' && (
        <>
          <div>
            <p className="mb-2 text-xs font-medium uppercase text-gray-500">Checklist</p>
            <ChecklistEditor
              items={task.checklist}
              onChange={(checklist) => void taskRepo.updateDetails(task.id, { checklist })}
            />
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase text-gray-500">Tempo Estimado</p>
            <div className="flex gap-2">
              {TIME_ESTIMATE_OPTIONS.map((minutes) => (
                <button
                  key={minutes}
                  type="button"
                  onClick={() => void taskRepo.updateDetails(task.id, { timeEstimate: minutes })}
                  className={cn(
                    'rounded-full border px-3 py-1 text-sm',
                    task.timeEstimate === minutes
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50',
                  )}
                >
                  {minutes}min
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase text-gray-500">Energia</p>
            <div className="flex gap-2">
              {ENERGY_OPTIONS.map(({ level, label }) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => void taskRepo.updateDetails(task.id, { energyLevel: level })}
                  className={cn(
                    'rounded-full border px-3 py-1 text-sm',
                    task.energyLevel === level
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <label className="flex-1">
              <span className="mb-1 block text-xs font-medium uppercase text-gray-500">Data de Início</span>
              <input
                type="date"
                value={toDateInputValue(task.startDate)}
                onChange={(event) =>
                  void taskRepo.updateDetails(task.id, { startDate: fromDateInputValue(event.target.value) })
                }
                className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-900 outline-none"
              />
            </label>
            <label className="flex-1">
              <span className="mb-1 block text-xs font-medium uppercase text-gray-500">Data de Vencimento</span>
              <input
                type="date"
                value={toDateInputValue(task.dueDate)}
                onChange={(event) =>
                  void taskRepo.updateDetails(task.id, { dueDate: fromDateInputValue(event.target.value) })
                }
                className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-900 outline-none"
              />
            </label>
          </div>

          <div>
            <p className="mb-2 text-xs font-medium uppercase text-gray-500">Recorrência</p>
            <div className="flex flex-wrap gap-2">
              {RECURRENCE_OPTIONS.map(({ rule, label }) => (
                <button
                  key={rule}
                  type="button"
                  onClick={() =>
                    void taskRepo.updateDetails(task.id, {
                      recurrenceRule: task.recurrenceRule === rule ? undefined : rule,
                    })
                  }
                  className={cn(
                    'rounded-full border px-3 py-1 text-sm',
                    task.recurrenceRule === rule
                      ? 'border-gray-900 bg-gray-900 text-white'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50',
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="flex gap-4">
        <label className="flex-1">
          <span className="mb-1 block text-xs font-medium uppercase text-gray-500">Projeto</span>
          <select
            value={task.projectId ?? ''}
            onChange={(event) => void taskRepo.assignProject(task.id, event.target.value || undefined)}
            className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-900 outline-none"
          >
            <option value="">Nenhum</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.id}>
                {project.title}
              </option>
            ))}
          </select>
        </label>
        <label className="flex-1">
          <span className="mb-1 block text-xs font-medium uppercase text-gray-500">Área</span>
          <select
            value={task.areaId ?? ''}
            onChange={(event) => void taskRepo.assignArea(task.id, event.target.value || undefined)}
            className="w-full rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-900 outline-none"
          >
            <option value="">Nenhuma</option>
            {areas?.map((area) => (
              <option key={area.id} value={area.id}>
                {area.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div>
        <p className="mb-2 text-xs font-medium uppercase text-gray-500">Tags</p>
        <div className="flex flex-wrap gap-2">
          {tags && tags.length === 0 && <p className="text-sm text-gray-500">Nenhuma tag cadastrada.</p>}
          {tags?.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => void taskRepo.toggleTag(task.id, tag.id)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm',
                taskTagIds?.has(tag.id)
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50',
              )}
            >
              {tag.title}
            </button>
          ))}
        </div>
      </div>

      {task.state !== 'logbook' && task.state !== 'trash' && (
        <button
          type="button"
          onClick={() => void taskRepo.complete(task.id)}
          className="w-full rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700"
        >
          Concluir Tarefa
        </button>
      )}

      {task.state === 'trash' ? (
        <button
          type="button"
          onClick={() => void taskRepo.restore(task.id)}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Restaurar
        </button>
      ) : (
        <button
          type="button"
          onClick={() => {
            void taskRepo.softDelete(task.id)
            closeTaskDetail()
          }}
          className="flex w-full items-center justify-center gap-2 rounded-md border border-red-200 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Excluir
        </button>
      )}
    </div>
  )
}

export default TaskForm
