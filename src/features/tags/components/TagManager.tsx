import { useLiveQuery } from 'dexie-react-hooks'
import { Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { db } from '@/db/db'
import { tagRepo } from '@/db/repositories/tagRepo'
import type { Tag } from '@/types/database'

interface TagListItemProps {
  tag: Tag
}

const TagListItem = ({ tag }: TagListItemProps) => {
  const [title, setTitle] = useState(tag.title)

  return (
    <li className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-2">
      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={() => {
          const trimmed = title.trim()
          if (trimmed && trimmed !== tag.title) void tagRepo.rename(tag.id, trimmed)
        }}
        className="flex-1 text-sm text-gray-900 outline-none"
      />
      <button
        type="button"
        onClick={() => void tagRepo.remove(tag.id)}
        aria-label="Remover tag"
        className="text-gray-400 hover:text-red-600"
      >
        <Trash2 size={16} />
      </button>
    </li>
  )
}

const TagManager = () => {
  const tags = useLiveQuery(() => db.tags.toArray(), [])
  const [title, setTitle] = useState('')

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed) return
    await tagRepo.create(trimmed)
    setTitle('')
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Nova tag (ex: @telefone)"
          className="flex-1 rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
        <button
          type="submit"
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Criar
        </button>
      </form>

      {tags && tags.length === 0 && <p className="text-sm text-gray-500">Nenhuma tag ainda.</p>}

      <ul className="flex flex-col gap-1">
        {tags?.map((tag) => (
          <TagListItem key={tag.id} tag={tag} />
        ))}
      </ul>
    </div>
  )
}

export default TagManager
