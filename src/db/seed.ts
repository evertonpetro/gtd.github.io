import { db } from '@/db/db'
import { generateId } from '@/utils/uuid'

const STARTER_AREAS = ['Pessoal', 'Trabalho']
const STARTER_TAGS = ['@casa', '@computador', '@telefone', '@recados']

export async function seedIfEmpty(): Promise<void> {
  await db.transaction('rw', db.areas, db.tags, async () => {
    const [areaCount, tagCount] = await Promise.all([db.areas.count(), db.tags.count()])

    if (areaCount === 0) {
      await db.areas.bulkAdd(STARTER_AREAS.map((title) => ({ id: generateId(), title })))
    }

    if (tagCount === 0) {
      await db.tags.bulkAdd(STARTER_TAGS.map((title) => ({ id: generateId(), title })))
    }
  })
}
