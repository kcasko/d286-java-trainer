import type { Question } from '../types/Question'

const finalLabDrillSize = 14

export function createFinalLabDrill(allQuestions: Question[]) {
  return shuffleQuestions(
    allQuestions.filter((question) =>
      question.skillTags.includes('final-lab-pattern'),
    ),
  ).slice(0, finalLabDrillSize)
}

function shuffleQuestions(questions: Question[]) {
  return [...questions].sort(() => Math.random() - 0.5)
}
