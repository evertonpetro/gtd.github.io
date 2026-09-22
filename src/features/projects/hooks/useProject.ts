import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import type { Project } from '@/types/database'

export function useProject(projectId: string | null): Project | undefined {
  return useLiveQuery(() => (projectId ? db.projects.get(projectId) : undefined), [projectId])
}
