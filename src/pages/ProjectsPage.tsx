import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import NewProjectForm from '@/features/projects/components/NewProjectForm'
import ProjectItem from '@/features/projects/components/ProjectItem'

const ProjectsPage = () => {
  const projects = useLiveQuery(() => db.projects.where('state').equals('active').sortBy('createdAt'), [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold text-gray-900">Projetos</h2>

      <div className="mt-4">
        <NewProjectForm />
      </div>

      {projects && projects.length === 0 && (
        <p className="text-sm text-gray-500">Nenhum projeto ainda.</p>
      )}

      <ul className="flex flex-col gap-1">
        {projects?.map((project) => <ProjectItem key={project.id} project={project} />)}
      </ul>
    </div>
  )
}

export default ProjectsPage
