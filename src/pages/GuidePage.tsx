import { BookOpen, X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import GuideContent from '@/features/guide/components/GuideContent'
import GuideSidebar from '@/features/guide/components/GuideSidebar'
import { GUIDE_TOPICS, getGuideTopicById } from '@/features/guide/data/guideData'

const GuidePage = () => {
  const { topicId } = useParams<{ topicId?: string }>()
  const navigate = useNavigate()
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  // Seleciona o tópico ativo pela URL ou cai no primeiro tópico ('overview')
  const currentTopic = (topicId ? getGuideTopicById(topicId) : undefined) ?? GUIDE_TOPICS[0]

  const handleSelectTopic = (newTopicId: string) => {
    navigate(`/manual/${newTopicId}`)
    setIsMobileDrawerOpen(false)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-white md:flex-row">
      {/* Barra de controle rápido no Mobile */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50/80 px-4 py-2.5 md:hidden">
        <button
          type="button"
          onClick={() => setIsMobileDrawerOpen(true)}
          className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2.5 py-1.5 text-xs font-medium text-gray-700 shadow-2xs hover:bg-gray-50 active:bg-gray-100"
        >
          <BookOpen size={16} className="text-gray-500" />
          <span>Índice do Manual</span>
        </button>
        <span className="truncate pl-2 text-xs font-semibold text-gray-800">
          {currentTopic.title}
        </span>
      </div>

      {/* Drawer móvel para o índice */}
      {isMobileDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex bg-black/40 md:hidden"
          onClick={() => setIsMobileDrawerOpen(false)}
        >
          <div
            className="flex h-full w-4/5 max-w-xs flex-col bg-white shadow-xl"
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <BookOpen size={18} className="text-gray-700" />
                <h2 className="text-sm font-bold text-gray-900">Manual GTD</h2>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileDrawerOpen(false)}
                className="rounded p-1 text-gray-400 hover:text-gray-600"
                aria-label="Fechar índice"
              >
                <X size={18} />
              </button>
            </div>
            <GuideSidebar
              selectedTopicId={currentTopic.id}
              onSelectTopic={handleSelectTopic}
              onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
              className="flex-1 overflow-hidden"
            />
          </div>
        </div>
      )}

      {/* Sidebar no Desktop */}
      <GuideSidebar
        selectedTopicId={currentTopic.id}
        onSelectTopic={handleSelectTopic}
        className="hidden w-72 shrink-0 border-r border-gray-200 md:flex lg:w-80"
      />

      {/* Conteúdo de leitura */}
      <GuideContent
        topic={currentTopic}
        onSelectTopic={handleSelectTopic}
        className="flex-1"
      />
    </div>
  )
}

export default GuidePage
