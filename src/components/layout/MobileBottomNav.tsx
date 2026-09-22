import { Menu, RefreshCw } from 'lucide-react'
import { NavLink } from 'react-router'
import { useUIStore } from '@/store/uiStore'
import { useWeeklyReviewStore } from '@/store/weeklyReviewStore'
import { cn } from '@/utils/cn'
import { PRIMARY_NAV_ITEMS, SECONDARY_NAV_ITEMS } from './navigation'

const MobileBottomNav = () => {
  const isMobileNavOpen = useUIStore((state) => state.isMobileNavOpen)
  const openMobileNav = useUIStore((state) => state.openMobileNav)
  const closeMobileNav = useUIStore((state) => state.closeMobileNav)
  const startReview = useWeeklyReviewStore((state) => state.startReview)

  const handleStartReview = () => {
    closeMobileNav()
    startReview()
  }

  return (
    <>
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col justify-end bg-black/40 md:hidden"
          onClick={closeMobileNav}
        >
          <div
            className="rounded-t-xl bg-white p-3"
            style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleStartReview}
              className="mb-2 flex w-full items-center gap-3 rounded-md bg-gray-900 px-3 py-3 text-sm font-medium text-white hover:bg-gray-800"
            >
              <RefreshCw size={18} />
              Iniciar Revisão Semanal
            </button>
            {SECONDARY_NAV_ITEMS.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={closeMobileNav}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-gray-700',
                    isActive && 'text-gray-900',
                  )
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      )}

      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex border-t border-gray-200 bg-white md:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        {PRIMARY_NAV_ITEMS.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium text-gray-500',
                isActive && 'text-gray-900',
              )
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
        <button
          type="button"
          onClick={openMobileNav}
          className="flex flex-1 flex-col items-center gap-1 py-2 text-xs font-medium text-gray-500"
        >
          <Menu size={20} />
          Mais
        </button>
      </nav>
    </>
  )
}

export default MobileBottomNav
