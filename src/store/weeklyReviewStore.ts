import { create } from 'zustand'
import { REVIEW_STEPS } from '@/features/weekly-review/steps'

const LAST_STEP = REVIEW_STEPS.length - 1

function clampStep(step: number): number {
  return Math.min(Math.max(step, 0), LAST_STEP)
}

interface WeeklyReviewState {
  isActive: boolean
  currentStep: number
  startReview: () => void
  nextStep: () => void
  previousStep: () => void
  finishReview: () => void
  cancelReview: () => void
}

export const useWeeklyReviewStore = create<WeeklyReviewState>((set) => ({
  isActive: false,
  currentStep: 0,

  startReview: () => set({ isActive: true, currentStep: 0 }),
  nextStep: () => set((state) => ({ currentStep: clampStep(state.currentStep + 1) })),
  previousStep: () => set((state) => ({ currentStep: clampStep(state.currentStep - 1) })),
  finishReview: () => set({ isActive: false }),
  cancelReview: () => set({ isActive: false, currentStep: 0 }),
}))
