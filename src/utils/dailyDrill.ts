import type { Question } from '../types/Question'
import { getWeakSpotSummaries } from './progressStorage'

const dailyDrillSize = 20
const weakSkillTarget = 12
const endLabTarget = 8

export function createDailyDrill(allQuestions: Question[]) {
  const weakSkillTags = getWeakSpotSummaries(5).map((skill) => skill.skillTag)
  const selected: Question[] = []

  if (weakSkillTags.length > 0) {
    addQuestions(
      selected,
      prioritizeWeakQuestions(allQuestions, weakSkillTags),
      weakSkillTarget,
    )
  }

  addQuestions(
    selected,
    shuffleQuestions(allQuestions.filter((question) => question.mode === 'end_lab')),
    Math.max(0, endLabTarget - countMode(selected, 'end_lab')),
  )

  addQuestions(
    selected,
    shuffleQuestions(
      allQuestions.filter(
        (question) => question.mode === 'pa' || question.mode === 'oa',
      ),
    ),
    dailyDrillSize - selected.length,
  )

  addQuestions(
    selected,
    shuffleQuestions(allQuestions),
    dailyDrillSize - selected.length,
  )

  return selected.slice(0, dailyDrillSize)
}

function addQuestions(
  selected: Question[],
  candidates: Question[],
  maxToAdd: number,
) {
  const selectedIds = new Set(selected.map((question) => question.id))

  for (const question of candidates) {
    if (selected.length >= dailyDrillSize || maxToAdd <= 0) {
      return
    }

    if (!selectedIds.has(question.id)) {
      selected.push(question)
      selectedIds.add(question.id)
      maxToAdd -= 1
    }
  }
}

function prioritizeWeakQuestions(
  allQuestions: Question[],
  weakSkillTags: string[],
) {
  return shuffleQuestions(
    allQuestions.filter((question) =>
      question.skillTags.some((tag) => weakSkillTags.includes(tag)),
    ),
  ).sort((left, right) => {
    const leftRank = getBestSkillRank(left, weakSkillTags)
    const rightRank = getBestSkillRank(right, weakSkillTags)

    if (left.mode === 'end_lab' && right.mode !== 'end_lab') {
      return -1
    }

    if (right.mode === 'end_lab' && left.mode !== 'end_lab') {
      return 1
    }

    return leftRank - rightRank
  })
}

function getBestSkillRank(question: Question, weakSkillTags: string[]) {
  const ranks = question.skillTags
    .map((tag) => weakSkillTags.indexOf(tag))
    .filter((rank) => rank >= 0)

  return ranks.length > 0 ? Math.min(...ranks) : weakSkillTags.length
}

function countMode(questions: Question[], mode: Question['mode']) {
  return questions.filter((question) => question.mode === mode).length
}

function shuffleQuestions(questions: Question[]) {
  return [...questions].sort(() => Math.random() - 0.5)
}
