import type { Question } from '../types/Question'
import { normalizeCode } from './normalizeCode'

export type AnswerCheckResult = {
  isCorrect: boolean
  message: string
}

export function checkMultipleChoiceAnswer(
  question: Question,
  selectedChoiceId: string | null,
): AnswerCheckResult {
  if (!selectedChoiceId) {
    return {
      isCorrect: false,
      message: 'Pick one answer first.',
    }
  }

  const isCorrect = selectedChoiceId === question.correctChoiceId

  return {
    isCorrect,
    message: isCorrect
      ? 'Correct. You picked the best answer.'
      : 'Not quite. Review the explanation, then try the next one.',
  }
}

export function checkTypedAnswer(
  question: Question,
  submittedAnswer: string,
): AnswerCheckResult {
  const normalizedAnswer = normalizeCode(submittedAnswer)

  if (!normalizedAnswer) {
    return {
      isCorrect: false,
      message: 'Type an answer before checking.',
    }
  }

  const exactMatch = (question.expectedAnswers ?? []).some(
    (expectedAnswer) => normalizeCode(expectedAnswer) === normalizedAnswer,
  )

  const patternMatch =
    question.expectedPatterns !== undefined &&
    question.expectedPatterns.length > 0 &&
    question.expectedPatterns.every((pattern) =>
      new RegExp(normalizePattern(pattern), 'i').test(normalizedAnswer),
    )

  const isCorrect = exactMatch || patternMatch

  return {
    isCorrect,
    message: isCorrect
      ? 'Correct. Your answer matches the expected Java idea.'
      : 'Not quite. Check the hint and compare your code to the explanation.',
  }
}

export function checkAnswer({
  question,
  selectedChoiceId,
  submittedAnswer,
}: {
  question: Question
  selectedChoiceId: string | null
  submittedAnswer: string
}) {
  if (question.choices && question.correctChoiceId) {
    return checkMultipleChoiceAnswer(question, selectedChoiceId)
  }

  return checkTypedAnswer(question, submittedAnswer)
}

function normalizePattern(pattern: string) {
  return pattern
    .replace(/\\s\+/g, '\\s*')
    .replace(/\\s\*/g, '\\s*')
    .replace(/\\s/g, '\\s*')
    .replace(/\\;/g, ';?')
    .replace(/;/g, ';?')
}
