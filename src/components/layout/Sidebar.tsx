import { Plus, RefreshCw } from 'lucide-react'
import { NavLink } from 'react-router'
import { cn } from '@/utils/cn'
import { useUIStore } from '@/store/uiStore'
import { useWeeklyReviewStore } from '@/store/weeklyReviewStore'
import { NAV_ITEMS } from './navigation'

const Sidebar = () => {
  const openQuickCapture = useUIStore((state) => state.openQuickCapture)
  const startReview = useWeeklyReviewStore((state) => state.startReview)

  return (
    <aside
      className="hidden w-56 shrink-0 flex-col border-r border-gray-200 p-3 md:flex"
      style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}
    >
      <div className="mb-4 flex items-center gap-2.5 px-2 py-1">
        <img src="/gtd.svg" alt="GTD Logo" className="h-7 w-7" />
        <span className="text-base font-bold tracking-tight text-gray-900">GTD</span>
      </div>
      <button
        type="button"
        onClick={openQuickCapture}
        className="mb-2 flex items-center justify-between rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        <span className="flex items-center gap-2">
          <Plus size={18} />
          Nova Tarefa
        </span>
        <kbd className="rounded border border-gray-700 bg-gray-800 px-1.5 py-0.5 text-xs text-gray-300">C</kbd>
      </button>
      <button
        type="button"
        onClick={startReview}
        className="mb-3 flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        <RefreshCw size={18} />
        Iniciar Revisão Semanal
      </button>
      <nav className="flex flex-col gap-1">
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100',
                isActive && 'bg-gray-100 text-gray-900',
              )
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
