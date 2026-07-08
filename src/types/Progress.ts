import type { QuestionMode } from './Question'

export type QuestionAttempt = {
  questionId: string
  mode: QuestionMode
  topic: string
  skillTags: string[]
  wasCorrect: boolean
  userAnswer: string
  timestamp: string
}

export type SkillMissSummary = {
  skillTag: string
  misses: number
  relatedTopics: string[]
}

export type ProgressStats = {
  totalAttempts: number
  correctAttempts: number
  incorrectAttempts: number
  accuracyPercentage: number
  mostMissedSkills: SkillMissSummary[]
}

export type StoredProgress = {
  attempts: QuestionAttempt[]
  mistakeCounts: Record<string, number>
}
