import type { Question } from '../types/Question'
import type { SkillMissSummary } from '../types/Progress'
import { checkAnswer } from './answerChecker'

export type MockOAAnswerMap = Record<string, string>

export type MockOAResult = {
  question: Question
  userAnswer: string
  wasCorrect: boolean
}

export type MockOASummary = {
  totalQuestions: number
  correctCount: number
  accuracyPercentage: number
  results: MockOAResult[]
  missedQuestions: MockOAResult[]
  missedSkillTags: SkillMissSummary[]
  recommendedDrills: string[]
}

export function createMockOAQuestions(
  allQuestions: Question[],
  questionCount = 25,
) {
  return shuffleQuestions(
    allQuestions.filter(
      (question) => question.mode === 'oa' || question.mode === 'pa',
    ),
  ).slice(0, questionCount)
}

export function gradeMockOA(
  testQuestions: Question[],
  answers: MockOAAnswerMap,
): MockOASummary {
  const results = testQuestions.map((question) => {
    const userAnswer = answers[question.id] ?? ''
    const wasCorrect = checkAnswer({
      question,
      selectedChoiceId: question.choices ? userAnswer || null : null,
      submittedAnswer: userAnswer,
    }).isCorrect

    return {
      question,
      userAnswer,
      wasCorrect,
    }
  })

  const correctCount = results.filter((result) => result.wasCorrect).length
  const missedQuestions = results.filter((result) => !result.wasCorrect)
  const missedSkillTags = summarizeMissedSkillTags(missedQuestions)

  return {
    totalQuestions: testQuestions.length,
    correctCount,
    accuracyPercentage:
      testQuestions.length === 0
        ? 0
        : Math.round((correctCount / testQuestions.length) * 100),
    results,
    missedQuestions,
    missedSkillTags,
    recommendedDrills: missedSkillTags.slice(0, 3).map(
      (skill) =>
        `${skill.skillTag}: review ${skill.relatedTopics.join(', ') || 'related questions'}`,
    ),
  }
}

function summarizeMissedSkillTags(results: MockOAResult[]) {
  const counts = new Map<string, number>()
  const topics = new Map<string, Set<string>>()

  results.forEach((result) => {
    result.question.skillTags.forEach((skillTag) => {
      counts.set(skillTag, (counts.get(skillTag) ?? 0) + 1)
      const relatedTopics = topics.get(skillTag) ?? new Set<string>()
      relatedTopics.add(result.question.topic)
      topics.set(skillTag, relatedTopics)
    })
  })

  return Array.from(counts.entries())
    .map(([skillTag, misses]) => ({
      skillTag,
      misses,
      relatedTopics: Array.from(topics.get(skillTag) ?? []),
    }))
    .sort((left, right) => right.misses - left.misses)
}

function shuffleQuestions(questions: Question[]) {
  return [...questions].sort(() => Math.random() - 0.5)
}
