import { useUIStore } from '@/store/uiStore'
import type { Project } from '@/types/database'

interface ProjectItemProps {
  project: Project
}

const TYPE_LABEL: Record<Project['type'], string> = {
  parallel: 'Paralelo',
  sequential: 'Sequencial',
}

const ProjectItem = ({ project }: ProjectItemProps) => {
  const openProjectDetail = useUIStore((state) => state.openProjectDetail)

  return (
    <li>
      <button
        type="button"
        onClick={() => openProjectDetail(project.id)}
        className="flex w-full items-center justify-between rounded-md border border-gray-200 px-3 py-2 text-left text-sm text-gray-900 hover:bg-gray-50"
      >
        <span>{project.title}</span>
        <span className="text-xs text-gray-500">{TYPE_LABEL[project.type]}</span>
      </button>
    </li>
  )
}

export default ProjectItem
