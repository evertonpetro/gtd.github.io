import { syncRepo } from '@/db/repositories/syncRepo'

export type ImportResult = { success: true } | { success: false; error: string }

async function importFromFile(file: File): Promise<ImportResult> {
  let parsed: unknown

  try {
    const text = await file.text()
    parsed = JSON.parse(text)
  } catch {
    return { success: false, error: 'O arquivo selecionado não é um JSON válido.' }
  }

  try {
    await syncRepo.importReplace(parsed)
    return { success: true }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Falha ao importar o backup.'
    return { success: false, error: message }
  }
}

export const importService = {
  importFromFile,
}
