const LAST_BACKUP_STORAGE_KEY = 'lastBackupDate'
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000

export function readLastBackupDate(): number | null {
  const raw = localStorage.getItem(LAST_BACKUP_STORAGE_KEY)
  if (!raw) return null
  const parsed = Number(raw)
  return Number.isNaN(parsed) ? null : parsed
}

export function writeLastBackupDate(timestamp: number): void {
  localStorage.setItem(LAST_BACKUP_STORAGE_KEY, String(timestamp))
}

export function shouldShowBackupReminder(lastBackupDate: number | null, now: number = Date.now()): boolean {
  if (lastBackupDate === null) return true
  return now - lastBackupDate >= SEVEN_DAYS_MS
}
