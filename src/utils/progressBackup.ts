import type { QuestionAttempt, StoredProgress } from '../types/Progress'
import { readStoredProgress, writeStoredProgress } from './progressStorage'
import { readTheme, saveTheme, type AppTheme } from './themeStorage'

export type ProgressBackup = {
  app: 'd286-java-trainer'
  version: 1
  exportedAt: string
  progress: StoredProgress
  themePreference: AppTheme
}

export type BackupValidationResult =
  | { isValid: true; backup: ProgressBackup }
  | { isValid: false; error: string }

export function createProgressBackup(): ProgressBackup {
  return {
    app: 'd286-java-trainer',
    version: 1,
    exportedAt: new Date().toISOString(),
    progress: readStoredProgress(),
    themePreference: readTheme(),
  }
}

export function downloadProgressBackup() {
  const backup = createProgressBackup()
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')

  link.href = url
  link.download = `d286-java-trainer-progress-${backup.exportedAt.slice(0, 10)}.json`
  document.body.append(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export function validateProgressBackup(value: unknown): BackupValidationResult {
  if (!isRecord(value)) {
    return { isValid: false, error: 'Backup must be a JSON object.' }
  }

  if (value.app !== 'd286-java-trainer') {
    return {
      isValid: false,
      error: 'This file is not a D286 Java Trainer backup.',
    }
  }

  if (value.version !== 1) {
    return { isValid: false, error: 'Unsupported backup version.' }
  }

  if (typeof value.exportedAt !== 'string' || Number.isNaN(Date.parse(value.exportedAt))) {
    return { isValid: false, error: 'Backup is missing a valid export timestamp.' }
  }

  if (value.themePreference !== 'dark' && value.themePreference !== 'light') {
    return { isValid: false, error: 'Backup has an invalid theme preference.' }
  }

  const progress = validateStoredProgress(value.progress)
  if (!progress.isValid) {
    return progress
  }

  return {
    isValid: true,
    backup: {
      app: 'd286-java-trainer',
      version: 1,
      exportedAt: value.exportedAt,
      progress: progress.progress,
      themePreference: value.themePreference,
    },
  }
}

export function restoreProgressBackup(backup: ProgressBackup) {
  writeStoredProgress(backup.progress)
  saveTheme(backup.themePreference)
}

function validateStoredProgress(value: unknown):
  | { isValid: true; progress: StoredProgress }
  | { isValid: false; error: string } {
  if (!isRecord(value)) {
    return { isValid: false, error: 'Backup progress must be an object.' }
  }

  if (!Array.isArray(value.attempts)) {
    return { isValid: false, error: 'Backup progress is missing attempts.' }
  }

  if (!isRecord(value.mistakeCounts)) {
    return { isValid: false, error: 'Backup progress is missing mistake counts.' }
  }

  const attempts: QuestionAttempt[] = []
  for (const attempt of value.attempts) {
    if (!isQuestionAttempt(attempt)) {
      return { isValid: false, error: 'Backup has an invalid attempt entry.' }
    }
    attempts.push(attempt)
  }

  const mistakeCounts: Record<string, number> = {}
  for (const [skillTag, count] of Object.entries(value.mistakeCounts)) {
    if (typeof count !== 'number' || !Number.isFinite(count) || count < 0) {
      return { isValid: false, error: 'Backup has an invalid mistake count.' }
    }
    mistakeCounts[skillTag] = count
  }

  return { isValid: true, progress: { attempts, mistakeCounts } }
}

function isQuestionAttempt(value: unknown): value is QuestionAttempt {
  if (!isRecord(value)) {
    return false
  }

  const mode = value.mode

  return (
    typeof value.questionId === 'string' &&
    (mode === 'pa' || mode === 'oa' || mode === 'end_lab') &&
    typeof value.topic === 'string' &&
    Array.isArray(value.skillTags) &&
    value.skillTags.every((skillTag) => typeof skillTag === 'string') &&
    typeof value.wasCorrect === 'boolean' &&
    typeof value.userAnswer === 'string' &&
    typeof value.timestamp === 'string' &&
    !Number.isNaN(Date.parse(value.timestamp))
  )
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}
