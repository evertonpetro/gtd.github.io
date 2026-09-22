import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import type { Task } from '@/types/database'

export function useTask(taskId: string | null): Task | undefined {
  return useLiveQuery(() => (taskId ? db.tasks.get(taskId) : undefined), [taskId])
}
