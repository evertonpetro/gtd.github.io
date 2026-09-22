import { create } from 'zustand'
import { readLastBackupDate } from '@/features/sync/backupReminder'

interface UIState {
  isQuickCaptureOpen: boolean
  openQuickCapture: () => void
  closeQuickCapture: () => void

  activeTaskId: string | null
  openTaskDetail: (taskId: string) => void
  closeTaskDetail: () => void

  activeProjectId: string | null
  openProjectDetail: (projectId: string) => void
  closeProjectDetail: () => void

  isMobileNavOpen: boolean
  openMobileNav: () => void
  closeMobileNav: () => void

  lastBackupDate: number | null
  setLastBackupDate: (timestamp: number) => void
  isBackupReminderDismissed: boolean
  dismissBackupReminder: () => void
}

export const useUIStore = create<UIState>((set) => ({
  isQuickCaptureOpen: false,
  openQuickCapture: () => set({ isQuickCaptureOpen: true }),
  closeQuickCapture: () => set({ isQuickCaptureOpen: false }),

  activeTaskId: null,
  openTaskDetail: (taskId) => set({ activeTaskId: taskId }),
  closeTaskDetail: () => set({ activeTaskId: null }),

  activeProjectId: null,
  openProjectDetail: (projectId) => set({ activeProjectId: projectId }),
  closeProjectDetail: () => set({ activeProjectId: null }),

  isMobileNavOpen: false,
  openMobileNav: () => set({ isMobileNavOpen: true }),
  closeMobileNav: () => set({ isMobileNavOpen: false }),

  lastBackupDate: readLastBackupDate(),
  setLastBackupDate: (timestamp) => set({ lastBackupDate: timestamp, isBackupReminderDismissed: false }),
  isBackupReminderDismissed: false,
  dismissBackupReminder: () => set({ isBackupReminderDismissed: true }),
}))
