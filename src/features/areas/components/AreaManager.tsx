import { useLiveQuery } from 'dexie-react-hooks'
import { Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { db } from '@/db/db'
import { areaRepo } from '@/db/repositories/areaRepo'
import type { Area } from '@/types/database'

interface AreaListItemProps {
  area: Area
}

const AreaListItem = ({ area }: AreaListItemProps) => {
  const [title, setTitle] = useState(area.title)

  return (
    <li className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={() => {
          const trimmed = title.trim()
          if (trimmed && trimmed !== area.title) void areaRepo.rename(area.id, trimmed)
        }}
        className="flex-1 text-sm text-gray-900 outline-none"
      />
      <button
        type="button"
        onClick={() => void areaRepo.remove(area.id)}
        aria-label="Remover área"
        className="text-gray-400 hover:text-red-600"
      >
        <Trash2 size={16} />
      </button>
    </li>
  )
}

const AreaManager = () => {
  const areas = useLiveQuery(() => db.areas.toArray(), [])
  const [title, setTitle] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    await areaRepo.create(trimmed)
    setTitle('')
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Nova área"
          className="flex-1 rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Criar
        </button>
      </form>

      {areas && areas.length === 0 && <p className="text-sm text-gray-500">Nenhuma área ainda.</p>}

      <ul className="flex flex-col gap-1">
        {areas?.map((area) => (
          <AreaListItem key={area.id} area={area} />
        ))}
      </ul>
    </div>
  )
}

export default AreaManager
