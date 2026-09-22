import AreaManager from '@/features/areas/components/AreaManager'
import BackupSyncPanel from '@/features/sync/components/BackupSyncPanel'
import TagManager from '@/features/tags/components/TagManager'

const SettingsPage = () => {
  return (
    <div className="flex flex-col gap-8 p-4">
      <h2 className="text-xl font-semibold text-gray-900">Configurações</h2>

      <section>
        <h3 className="mb-3 text-xs font-medium uppercase text-gray-500">Áreas de Foco</h3>
        <AreaManager />
      </section>

      <section>
        <h3 className="mb-3 text-xs font-medium uppercase text-gray-500">Tags</h3>
        <TagManager />
      </section>

      <section>
        <h3 className="mb-3 text-xs font-medium uppercase text-gray-500">Backup e Sincronização</h3>
        <BackupSyncPanel />
      </section>
    </div>
  )
}

export default SettingsPage
