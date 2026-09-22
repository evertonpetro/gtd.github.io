import { db } from '@/db/db'
import { generateId } from '@/utils/uuid'

async function create(title: string): Promise<string> {
  const id = generateId()
  await db.areas.add({ id, title })
  return id
}

async function rename(id: string, title: string): Promise<void> {
  await db.areas.update(id, { title })
}

async function remove(id: string): Promise<void> {
  await db.areas.delete(id)
}

export const areaRepo = {
  create,
  rename,
  remove,
}
