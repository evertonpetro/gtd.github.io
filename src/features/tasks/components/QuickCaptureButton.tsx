import { Plus } from 'lucide-react'
import { useUIStore } from '@/store/uiStore'

const QuickCaptureButton = () => {
  const openQuickCapture = useUIStore((state) => state.openQuickCapture)

  return (
    <button
      type="button"
      onClick={openQuickCapture}
      aria-label="Capturar nova tarefa"
      className="fixed right-4 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg md:hidden"
      style={{ bottom: 'calc(5rem + env(safe-area-inset-bottom))' }}
    >
      <Plus size={24} />
    </button>
  )
}

export default QuickCaptureButton
