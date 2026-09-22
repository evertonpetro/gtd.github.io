import { db } from '@/db/db'

async function emptyTrash(): Promise<void> {
  await db.transaction('rw', db.tasks, db.projects, async () => {
    await db.tasks.where('state').equals('trash').delete()
    await db.projects.where('state').equals('trash').delete()
  })
}

export const trashRepo = {
  emptyTrash,
}
