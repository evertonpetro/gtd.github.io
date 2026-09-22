import { useState, type FormEvent } from 'react'
import { projectRepo } from '@/db/repositories/projectRepo'
import type { ProjectType } from '@/types/database'
import { cn } from '@/utils/cn'

const TYPE_OPTIONS: { type: ProjectType; label: string }[] = [
  { type: 'parallel', label: 'Paralelo' },
  { type: 'sequential', label: 'Sequencial' },
]

const NewProjectForm = () => {
  const [title, setTitle] = useState('')
  const [type, setType] = useState<ProjectType>('parallel')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    await projectRepo.create({ title: trimmed, type })
    setTitle('')
    setType('parallel')
  }

  return (
    <form onSubmit={handleSubmit} className="mb-4 flex flex-col gap-2 rounded-md border border-gray-200 p-3">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Novo projeto"
        className="w-full border-b border-gray-200 pb-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
      />
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {TYPE_OPTIONS.map(({ type: option, label }) => (
            <button
              key={option}
              type="button"
              onClick={() => setType(option)}
              className={cn(
                'rounded-full border px-3 py-1 text-sm',
                type === option
                  ? 'border-gray-900 bg-gray-900 text-white'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50',
              )}
            >
              {label}
            </button>
          ))}
        </div>
        <button
          type="submit"
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Criar
        </button>
      </div>
    </form>
  )
}

export default NewProjectForm
