import { useEffect } from 'react'
import { db } from '@/db/db'

let isEvaluating = false

function getStartOfLocalDay(): number {
  return new Date().setHours(0, 0, 0, 0)
}

async function evaluateDates(): Promise<void> {
  if (isEvaluating) return
  isEvaluating = true
  try {
    const todayStart = getStartOfLocalDay()
    const due = await db.tasks
      .where('state')
      .equals('scheduled')
      .filter((task) => typeof task.startDate === 'number' && task.startDate <= todayStart)
      .toArray()

    if (due.length === 0) return

    const updatedAt = Date.now()
    await db.transaction('rw', db.tasks, async () => {
      await Promise.all(
        due.map((task) => db.tasks.update(task.id, { state: 'next', updatedAt })),
      )
    })
  } finally {
    isEvaluating = false
  }
}

export function useBootEngine(): void {
  useEffect(() => {
    void evaluateDates()

    const handleFocus = () => {
      void evaluateDates()
    }

    window.addEventListener('focus', handleFocus)
    return () => window.removeEventListener('focus', handleFocus)
  }, [])
}
