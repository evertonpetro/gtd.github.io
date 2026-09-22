import { HashRouter, Navigate, Route, Routes } from 'react-router'
import Header from '@/components/layout/Header'
import MobileBottomNav from '@/components/layout/MobileBottomNav'
import ReviewWizardBanner from '@/components/layout/ReviewWizardBanner'
import Sidebar from '@/components/layout/Sidebar'
import { useBootEngine } from '@/features/gtd-engine/useBootEngine'
import ProjectDetailPanel from '@/features/projects/components/ProjectDetailPanel'
import QuickCaptureButton from '@/features/tasks/components/QuickCaptureButton'
import QuickCaptureModal from '@/features/tasks/components/QuickCaptureModal'
import TaskDetailPanel from '@/features/tasks/components/TaskDetailPanel'
import { useGlobalCaptureShortcut } from '@/hooks/useKeyboard'
import FocusPage from '@/pages/FocusPage'
import InboxPage from '@/pages/InboxPage'
import LogbookPage from '@/pages/LogbookPage'
import NextActionsPage from '@/pages/NextActionsPage'
import ProjectsPage from '@/pages/ProjectsPage'
import ReferencePage from '@/pages/ReferencePage'
import ScheduledPage from '@/pages/ScheduledPage'
import SettingsPage from '@/pages/SettingsPage'
import SomedayPage from '@/pages/SomedayPage'
import TrashPage from '@/pages/TrashPage'
import WaitingPage from '@/pages/WaitingPage'
import { useUIStore } from '@/store/uiStore'

const App = () => {
  const openQuickCapture = useUIStore((state) => state.openQuickCapture)
  useGlobalCaptureShortcut(openQuickCapture)
  useBootEngine()

  return (
    <HashRouter>
      <div className="flex h-dvh min-h-dvh flex-col md:flex-row">
        <Sidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <ReviewWizardBanner />
          <Header />
          <main className="flex-1 overflow-y-auto pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
            <Routes>
              <Route path="/" element={<Navigate to="/inbox" replace />} />
              <Route path="/inbox" element={<InboxPage />} />
              <Route path="/next" element={<NextActionsPage />} />
              <Route path="/waiting" element={<WaitingPage />} />
              <Route path="/scheduled" element={<ScheduledPage />} />
              <Route path="/someday" element={<SomedayPage />} />
              <Route path="/focus" element={<FocusPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/reference" element={<ReferencePage />} />
              <Route path="/logbook" element={<LogbookPage />} />
              <Route path="/trash" element={<TrashPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
        <MobileBottomNav />
        <QuickCaptureButton />
        <QuickCaptureModal />
        <TaskDetailPanel />
        <ProjectDetailPanel />
      </div>
    </HashRouter>
  )
}

export default App
