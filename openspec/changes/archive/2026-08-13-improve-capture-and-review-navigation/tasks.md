## 1. Quick Capture Entry Point Enhancements

- [x] 1.1 Add a Quick Capture button (`+ Nova Tarefa` / `[C]`) to the desktop `Sidebar` connected to `useUIStore.openQuickCapture`
- [x] 1.2 Verify that the mobile Floating Action Button (`QuickCaptureButton`) and keyboard shortcut (`c`) continue to operate smoothly

## 2. Mobile Weekly Review Entry Point

- [x] 2.1 Add an "Iniciar Revisão Semanal" action button at the top of the "Mais" drawer in `MobileBottomNav`
- [x] 2.2 Ensure clicking the mobile review button triggers `startReview()` and closes the mobile drawer

## 3. Verification and Responsive Testing

- [x] 3.1 Verify desktop layout displays both the Quick Capture and Weekly Review buttons with correct keyboard hints
- [x] 3.2 Verify mobile layout displays the FAB and contains the Weekly Review action in the "Mais" drawer
- [x] 3.3 Run linting, TypeScript typecheck, and build tests to validate change integrity
