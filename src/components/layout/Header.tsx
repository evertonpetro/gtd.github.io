import { useLocation } from 'react-router'
import FilterBar from '@/features/tasks/components/FilterBar'
import { useWeeklyReviewStore } from '@/store/weeklyReviewStore'
import { NAV_ITEMS } from './navigation'

const FILTERABLE_PATHS = ['/next', '/waiting', '/scheduled', '/someday', '/focus']

const Header = () => {
  const location = useLocation()
  const isReviewActive = useWeeklyReviewStore((state) => state.isActive)
  const current = NAV_ITEMS.find(
    (item) => item.to === location.pathname || (item.to !== '/' && location.pathname.startsWith(`${item.to}/`)),
  )
  const showFilters = FILTERABLE_PATHS.includes(location.pathname)

  return (
    <header
      className="flex shrink-0 flex-col border-b border-gray-200 bg-white"
      style={{
        paddingTop: isReviewActive ? undefined : 'env(safe-area-inset-top)',
      }}
    >
      <div className="flex h-14 items-center gap-2.5 px-4">
        <img src={`${import.meta.env.BASE_URL}gtd.svg`} alt="GTD Logo" className="h-6 w-6 md:hidden" />
        <h1 className="text-lg font-medium text-gray-900">{current?.label ?? 'GTD'}</h1>
      </div>
      {showFilters && <FilterBar />}
    </header>
  )
}

export default Header
