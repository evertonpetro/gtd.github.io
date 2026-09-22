import { useLiveQuery } from 'dexie-react-hooks'
import { useState } from 'react'
import { db } from '@/db/db'
import { projectRepo } from '@/db/repositories/projectRepo'
import type { Project, ProjectType } from '@/types/database'
import { cn } from '@/utils/cn'

interface ProjectFormProps {
  project: Project
}

const TYPE_OPTIONS: { type: ProjectType; label: string }[] = [
  { type: 'parallel', label: 'Paralelo' },
  { type: 'sequential', label: 'Sequencial' },
]

const ProjectForm = ({ project }: ProjectFormProps) => {
  const [title, setTitle] = useState(project.title)
  const [notes, setNotes] = useState(project.notes)

  const areas = useLiveQuery(() => db.areas.toArray(), [])

  return (
    <div className="flex flex-col gap-5">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={() => {
          if (title.trim() && title !== project.title) void projectRepo.updateDetails(project.id, { title })
        }}
        className="w-full border-b border-gray-200 pb-2 text-lg font-medium text-gray-900 outline-none"
      />

      <div>
        <p className="mb-2 text-xs font-medium uppercase text-gray-500">Tipo</p>
        <div className="flex gap-2">
          {TYPE_OPTIONS.map(({ type, label }) => (
            <button
              key={type}
              type="button"
              onClick={() => void projectRepo.updateType(project.id, type)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm',
                project.type === type
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50',
              )}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-1 text-xs font-medium uppercase text-gray-500">Notas</p>
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          onBlur={() => {
            if (notes !== project.notes) void projectRepo.updateDetails(project.id, { notes })
          }}
          rows={4}
          className="w-full rounded-md border border-gray-200 p-2 text-sm text-gray-900 outline-none"
        />
      </div>

      <label>
        <span className="mb-1 block text-xs font-medium uppercase text-gray-500">Área</span>
        <select
          value={project.areaId ?? ''}
          onChange={(event) => void projectRepo.assignArea(project.id, event.target.value || undefined)}
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

      <div className="flex gap-2 border-t border-gray-100 pt-4">
        {project.state !== 'completed' && project.state !== 'trash' && (
          <button
            type="button"
            onClick={() => void projectRepo.complete(project.id)}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Concluir Projeto
          </button>
        )}
        {project.state === 'trash' ? (
          <button
            type="button"
            onClick={() => void projectRepo.restore(project.id)}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Restaurar
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void projectRepo.softDelete(project.id)}
            className="rounded-md border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
          >
            Excluir
          </button>
        )}
      </div>
    </div>
  )
}

export default ProjectForm
