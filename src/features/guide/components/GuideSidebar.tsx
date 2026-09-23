import { Search, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { GUIDE_CATEGORIES, GUIDE_TOPICS, searchGuideTopics } from '../data/guideData'
import type { GuideTopic } from '../types'
import { cn } from '@/utils/cn'

interface GuideSidebarProps {
  selectedTopicId: string
  onSelectTopic: (topicId: string) => void
  className?: string
  onCloseMobileDrawer?: () => void
}

const GuideSidebar = ({
  selectedTopicId,
  onSelectTopic,
  className,
  onCloseMobileDrawer,
}: GuideSidebarProps) => {
  const [searchTerm, setSearchTerm] = useState('')

  const searchResults = useMemo(() => {
    if (!searchTerm.trim()) return null
    return searchGuideTopics(searchTerm)
  }, [searchTerm])

  const handleSelect = (topicId: string) => {
    onSelectTopic(topicId)
    if (onCloseMobileDrawer) {
      onCloseMobileDrawer()
    }
  }

  const topicById = useMemo(() => {
    const map = new Map<string, GuideTopic>()
    for (const topic of GUIDE_TOPICS) {
      map.set(topic.id, topic)
    }
    return map
  }, [])

  return (
    <aside className={cn('flex flex-col bg-white', className)}>
      {/* Campo de Busca */}
      <div className="border-b border-gray-200 p-3">
        <div className="relative flex items-center">
          <Search size={16} className="absolute left-2.5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar no manual..."
            className="w-full rounded-md border border-gray-200 py-1.5 pr-8 pl-8 text-xs text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-400"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-2 text-gray-400 hover:text-gray-600"
              aria-label="Limpar busca"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Lista de Tópicos */}
      <div className="flex-1 overflow-y-auto p-3">
        {searchResults !== null ? (
          <div>
            <div className="mb-2 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Resultados da busca ({searchResults.length})
            </div>
            {searchResults.length === 0 ? (
              <p className="px-2 py-4 text-center text-xs text-gray-500">
                Nenhum tópico encontrado para &quot;{searchTerm}&quot;.
              </p>
            ) : (
              <ul className="flex flex-col gap-0.5">
                {searchResults.map((topic) => {
                  const isSelected = topic.id === selectedTopicId
                  return (
                    <li key={topic.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(topic.id)}
                        className={cn(
                          'flex w-full flex-col items-start rounded-md px-2.5 py-2 text-left transition',
                          isSelected
                            ? 'bg-gray-900 text-white shadow-xs'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                        )}
                      >
                        <span className="text-xs font-medium leading-snug">{topic.title}</span>
                        <span
                          className={cn(
                            'mt-0.5 line-clamp-1 text-[11px]',
                            isSelected ? 'text-gray-300' : 'text-gray-500',
                          )}
                        >
                          {topic.summary}
                        </span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {GUIDE_CATEGORIES.map((category) => (
              <div key={category.id}>
                <h3 className="mb-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                  {category.title}
                </h3>
                <ul className="flex flex-col gap-0.5">
                  {category.topicIds.map((topicId) => {
                    const topic = topicById.get(topicId)
                    if (!topic) return null
                    const isSelected = topic.id === selectedTopicId
                    return (
                      <li key={topic.id}>
                        <button
                          type="button"
                          onClick={() => handleSelect(topic.id)}
                          className={cn(
                            'group flex w-full items-center justify-between rounded-md px-2.5 py-2 text-left text-xs transition',
                            isSelected
                              ? 'bg-gray-900 font-medium text-white shadow-xs'
                              : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
                          )}
                        >
                          <span className="line-clamp-1 pr-2">{topic.title}</span>
                          <span
                            className={cn(
                              'shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium tracking-tight',
                              isSelected
                                ? 'bg-gray-800 text-gray-200'
                                : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200',
                            )}
                          >
                            {topic.badge}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}

export default GuideSidebar
