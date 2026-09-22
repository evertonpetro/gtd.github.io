import { X } from 'lucide-react'
import { shouldShowBackupReminder } from '@/features/sync/backupReminder'
import { useUIStore } from '@/store/uiStore'

const BackupReminderBanner = () => {
  const lastBackupDate = useUIStore((state) => state.lastBackupDate)
  const isDismissed = useUIStore((state) => state.isBackupReminderDismissed)
  const dismiss = useUIStore((state) => state.dismissBackupReminder)

  if (isDismissed || !shouldShowBackupReminder(lastBackupDate)) return null

  return (
    <div className="flex items-center justify-between gap-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-800">
      <span>Já faz mais de 7 dias desde o último backup. Considere exportar seus dados.</span>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dispensar aviso de backup"
        className="shrink-0 text-amber-500 hover:text-amber-700"
      >
        <X size={16} />
      </button>
    </div>
  )
}

export default BackupReminderBanner
