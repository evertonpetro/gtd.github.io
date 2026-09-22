import { Plus, X } from 'lucide-react'
import { useState, type KeyboardEvent } from 'react'
import type { ChecklistItem } from '@/types/database'
import { cn } from '@/utils/cn'
import { generateId } from '@/utils/uuid'

interface ChecklistEditorProps {
  items: ChecklistItem[]
  onChange: (items: ChecklistItem[]) => void
}

const ChecklistEditor = ({ items, onChange }: ChecklistEditorProps) => {
  const [draft, setDraft] = useState('')

  const addItem = () => {
    const text = draft.trim()
    if (!text) return
    onChange([...items, { id: generateId(), text, isCompleted: false }])
    setDraft('')
  }

  const toggleItem = (id: string) => {
    onChange(items.map((item) => (item.id === id ? { ...item, isCompleted: !item.isCompleted } : item)))
  }

  const removeItem = (id: string) => {
    onChange(items.filter((item) => item.id !== id))
  }

  const handleDraftKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    addItem()
  }

  return (
    <div className="flex flex-col gap-1">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-2">
          <input type="checkbox" checked={item.isCompleted} onChange={() => toggleItem(item.id)} />
          <span className={cn('flex-1 text-sm text-gray-900', item.isCompleted && 'text-gray-400 line-through')}>
            {item.text}
          </span>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            aria-label="Remover item"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={14} />
          </button>
        </div>
      ))}

      <div className="flex items-center gap-2">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={handleDraftKeyDown}
          placeholder="Novo item"
          className="flex-1 rounded-md border border-gray-200 px-2 py-1 text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />
        <button type="button" onClick={addItem} aria-label="Adicionar item" className="text-gray-600 hover:text-gray-900">
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

export default ChecklistEditor
