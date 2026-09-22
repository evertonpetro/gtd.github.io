import { X } from 'lucide-react'
import ProjectForm from '@/features/projects/components/ProjectForm'
import { useProject } from '@/features/projects/hooks/useProject'
import { useUIStore } from '@/store/uiStore'

const ProjectDetailPanel = () => {
  const activeProjectId = useUIStore((state) => state.activeProjectId)
  const closeProjectDetail = useUIStore((state) => state.closeProjectDetail)
  const project = useProject(activeProjectId)

  if (!activeProjectId) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40" onClick={closeProjectDetail}>
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex h-full w-full max-w-md flex-col overflow-y-auto bg-white p-4 shadow-lg"
        style={{
          paddingTop: 'calc(1rem + env(safe-area-inset-top))',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))',
        }}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Detalhes do Projeto</h3>
          <button
            type="button"
            onClick={closeProjectDetail}
            aria-label="Fechar"
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </button>
        </div>

        {project ? (
          <ProjectForm key={project.id} project={project} />
        ) : (
          <p className="text-sm text-gray-500">Projeto não encontrado.</p>
        )}
      </div>
    </div>
  )
}

export default ProjectDetailPanel
