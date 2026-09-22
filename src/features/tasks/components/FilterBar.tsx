import { useLiveQuery } from 'dexie-react-hooks'
import { db } from '@/db/db'
import { useFilterStore } from '@/store/filterStore'
import type { EnergyLevel, TimeEstimate } from '@/types/database'
import { cn } from '@/utils/cn'

const ENERGY_OPTIONS: { level: EnergyLevel; label: string }[] = [
  { level: 1, label: 'Baixa' },
  { level: 2, label: 'Média' },
  { level: 3, label: 'Alta' },
]

const TIME_OPTIONS: TimeEstimate[] = [5, 15, 30, 60, 120]

const FilterBar = () => {
  const areas = useLiveQuery(() => db.areas.toArray(), [])
  const tags = useLiveQuery(() => db.tags.toArray(), [])

  const areaId = useFilterStore((state) => state.areaId)
  const tagIds = useFilterStore((state) => state.tagIds)
  const energyLevel = useFilterStore((state) => state.energyLevel)
  const timeEstimate = useFilterStore((state) => state.timeEstimate)
  const setAreaId = useFilterStore((state) => state.setAreaId)
  const toggleTagId = useFilterStore((state) => state.toggleTagId)
  const setEnergyLevel = useFilterStore((state) => state.setEnergyLevel)
  const setTimeEstimate = useFilterStore((state) => state.setTimeEstimate)
  const clearFilters = useFilterStore((state) => state.clearFilters)

  const hasActiveFilters = Boolean(areaId) || tagIds.length > 0 || Boolean(energyLevel) || Boolean(timeEstimate)

  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2">
      <select
        value={areaId ?? ''}
        onChange={(event) => setAreaId(event.target.value || null)}
        className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900 outline-none"
      >
        <option value="">Todas as áreas</option>
        {areas?.map((area) => (
          <option key={area.id} value={area.id}>
            {area.title}
          </option>
        ))}
      </select>

      <select
        value={energyLevel ?? ''}
        onChange={(event) =>
          setEnergyLevel(event.target.value ? (Number(event.target.value) as EnergyLevel) : null)
        }
        className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900 outline-none"
      >
        <option value="">Qualquer energia</option>
        {ENERGY_OPTIONS.map(({ level, label }) => (
          <option key={level} value={level}>
            {label}
          </option>
        ))}
      </select>

      <select
        value={timeEstimate ?? ''}
        onChange={(event) =>
          setTimeEstimate(event.target.value ? (Number(event.target.value) as TimeEstimate) : null)
        }
        className="rounded-md border border-gray-200 bg-white px-2 py-1 text-sm text-gray-900 outline-none"
      >
        <option value="">Qualquer tempo</option>
        {TIME_OPTIONS.map((minutes) => (
          <option key={minutes} value={minutes}>
            até {minutes}min
          </option>
        ))}
      </select>

      {tags?.map((tag) => (
        <button
          key={tag.id}
          type="button"
          onClick={() => toggleTagId(tag.id)}
          className={cn(
            'rounded-full border px-3 py-1 text-sm',
            tagIds.includes(tag.id)
              ? 'border-gray-900 bg-gray-900 text-white'
              : 'border-gray-200 bg-white text-gray-700 hover:bg-gray-50',
          )}
        >
          {tag.title}
        </button>
      ))}

      {hasActiveFilters && (
        <button
          type="button"
          onClick={clearFilters}
          className="ml-auto text-sm text-gray-500 underline hover:text-gray-700"
        >
          Limpar filtros
        </button>
      )}
    </div>
  )
}

export default FilterBar
