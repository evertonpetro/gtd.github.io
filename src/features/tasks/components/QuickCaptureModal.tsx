import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react'
import { taskRepo } from '@/db/repositories/taskRepo'
import { useUIStore } from '@/store/uiStore'

const QuickCaptureModal = () => {
  const isOpen = useUIStore((state) => state.isQuickCaptureOpen)
  const closeQuickCapture = useUIStore((state) => state.closeQuickCapture)
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
    }
  }, [isOpen])

  if (!isOpen) return null

  const isTitleEmpty = !title.trim()

  const handleClose = () => {
    if (isSubmitting) return
    setTitle('')
    closeQuickCapture()
  }

  const handleSubmit = async (event?: FormEvent) => {
    if (event) event.preventDefault()
    const trimmed = title.trim()
    if (!trimmed || isSubmitting) return

    try {
      setIsSubmitting(true)
      await taskRepo.capture(trimmed)
      handleClose()
    } catch (error) {
      console.error('Falha ao capturar tarefa:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') handleClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 sm:items-start sm:pt-24"
      onClick={handleClose}
    >
      <form
        onClick={(event) => event.stopPropagation()}
        onSubmit={handleSubmit}
        className="w-full max-w-md max-h-[90dvh] overflow-y-auto rounded-lg bg-white p-4 shadow-lg"
      >
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="O que você precisa capturar?"
          aria-label="Título da tarefa para captura rápida"
          enterKeyHint="done"
          autoCapitalize="sentences"
          autoComplete="off"
          className="w-full border-b border-gray-200 pb-2 text-lg text-gray-900 outline-none placeholder:text-gray-400"
        />
        <div className="mt-3 flex justify-end gap-2">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isTitleEmpty || isSubmitting}
            className="rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? 'Capturando...' : 'Capturar'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default QuickCaptureModal
