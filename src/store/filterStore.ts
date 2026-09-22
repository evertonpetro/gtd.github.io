import { create } from 'zustand'
import type { EnergyLevel, TimeEstimate } from '@/types/database'

interface FilterState {
  areaId: string | null
  tagIds: string[]
  energyLevel: EnergyLevel | null
  timeEstimate: TimeEstimate | null

  setAreaId: (areaId: string | null) => void
  toggleTagId: (tagId: string) => void
  setEnergyLevel: (energyLevel: EnergyLevel | null) => void
  setTimeEstimate: (timeEstimate: TimeEstimate | null) => void
  clearFilters: () => void
}

export const useFilterStore = create<FilterState>((set, get) => ({
  areaId: null,
  tagIds: [],
  energyLevel: null,
  timeEstimate: null,

  setAreaId: (areaId) => set({ areaId }),
  toggleTagId: (tagId) => {
    const { tagIds } = get()
    set({
      tagIds: tagIds.includes(tagId)
        ? tagIds.filter((id) => id !== tagId)
        : [...tagIds, tagId],
    })
  },
  setEnergyLevel: (energyLevel) => set({ energyLevel }),
  setTimeEstimate: (timeEstimate) => set({ timeEstimate }),
  clearFilters: () => set({ areaId: null, tagIds: [], energyLevel: null, timeEstimate: null }),
}))
