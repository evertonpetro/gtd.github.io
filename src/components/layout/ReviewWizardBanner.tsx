import { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { X } from 'lucide-react'
import { REVIEW_STEPS } from '@/features/weekly-review/steps'
import { useWeeklyReviewStore } from '@/store/weeklyReviewStore'

const ReviewWizardBanner = () => {
  const isActive = useWeeklyReviewStore((state) => state.isActive)
  const currentStep = useWeeklyReviewStore((state) => state.currentStep)
  const nextStep = useWeeklyReviewStore((state) => state.nextStep)
  const previousStep = useWeeklyReviewStore((state) => state.previousStep)
  const finishReview = useWeeklyReviewStore((state) => state.finishReview)
  const cancelReview = useWeeklyReviewStore((state) => state.cancelReview)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isActive) return
    navigate(REVIEW_STEPS[currentStep].route)
  }, [isActive, currentStep, navigate])

  if (!isActive) return null

  const step = REVIEW_STEPS[currentStep]
  const isFirstStep = currentStep === 0
  const isLastStep = currentStep === REVIEW_STEPS.length - 1

  return (
    <div
      className="flex flex-col gap-2 border-b border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900 md:flex-row md:items-center md:justify-between"
      style={{ paddingTop: 'calc(0.75rem + env(safe-area-inset-top))' }}
    >
      <div>
        <p className="font-medium">
          Passo {currentStep + 1}/{REVIEW_STEPS.length}: {step.title}
        </p>
        <p className="text-blue-800">{step.body}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          onClick={previousStep}
          disabled={isFirstStep}
          className="rounded-md px-3 py-1.5 text-sm font-medium text-blue-900 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Anterior
        </button>
        {isLastStep ? (
          <button
            type="button"
            onClick={finishReview}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Finalizar
          </button>
        ) : (
          <button
            type="button"
            onClick={nextStep}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
          >
            Próximo
          </button>
        )}
        <button
          type="button"
          onClick={cancelReview}
          aria-label="Sair da revisão semanal"
          className="ml-1 rounded-md p-1.5 text-blue-700 hover:bg-blue-100 hover:text-blue-900 focus:outline-none"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  )
}

export default ReviewWizardBanner
