import { syncRepo } from '@/db/repositories/syncRepo'
import { writeLastBackupDate } from '@/features/sync/backupReminder'
import { useUIStore } from '@/store/uiStore'

function buildFileName(exportedAt: number): string {
  const isoDate = new Date(exportedAt).toISOString().slice(0, 10)
  return `gtd-backup-${isoDate}.json`
}

function downloadJson(content: string, fileName: string): void {
  const blob = new Blob([content], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(url)
}

async function exportBackup(): Promise<void> {
  const backup = await syncRepo.exportAll()
  downloadJson(JSON.stringify(backup, null, 2), buildFileName(backup.exportedAt))

  writeLastBackupDate(backup.exportedAt)
  useUIStore.getState().setLastBackupDate(backup.exportedAt)
}

export const exportService = {
  exportBackup,
}
