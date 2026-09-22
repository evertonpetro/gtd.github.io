import { useRef, useState, type ChangeEvent } from 'react'
import BackupReminderBanner from '@/features/sync/components/BackupReminderBanner'
import { exportService } from '@/features/sync/ExportService'
import { importService } from '@/features/sync/ImportService'

const BackupSyncPanel = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [statusMessage, setStatusMessage] = useState<string | null>(null)
  const [isImporting, setIsImporting] = useState(false)

  const handleExport = async () => {
    setStatusMessage(null)
    try {
      await exportService.exportBackup()
      setStatusMessage('Backup exportado com sucesso.')
    } catch {
      setStatusMessage('Falha ao exportar o backup. Tente novamente.')
    }
  }

  const handleImportClick = () => {
    setStatusMessage(null)
    fileInputRef.current?.click()
  }

  const handleFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    const confirmed = window.confirm(
      'Importar este arquivo substituirá permanentemente todos os dados atuais (tarefas, projetos, tags e áreas). Essa ação não pode ser desfeita. Deseja continuar?',
    )
    if (!confirmed) return

    setIsImporting(true)
    const result = await importService.importFromFile(file)
    setIsImporting(false)

    setStatusMessage(result.success ? 'Dados importados com sucesso.' : result.error)
  }

  return (
    <div className="flex flex-col gap-3">
      <BackupReminderBanner />

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => void handleExport()}
          className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          Exportar Backup
        </button>
        <button
          type="button"
          onClick={handleImportClick}
          disabled={isImporting}
          className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          {isImporting ? 'Importando…' : 'Importar Backup'}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(event) => void handleFileSelected(event)}
        />
      </div>

      {statusMessage && <p className="text-sm text-gray-500">{statusMessage}</p>}
    </div>
  )
}

export default BackupSyncPanel
