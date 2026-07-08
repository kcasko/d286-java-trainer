import { useMemo, useState } from 'react'
import type { Question } from '../types/Question'
import { checkAnswer, type AnswerCheckResult } from '../utils/answerChecker'
import { saveAttempt } from '../utils/progressStorage'
import { questions as allQuestions } from '../data/questions'
import ArrayListVisualizer from './ArrayListVisualizer'
import ArrayVisualizer from './ArrayVisualizer'
import CodeAnswerBox from './CodeAnswerBox'
import FeedbackPanel from './FeedbackPanel'
import ClassVisualizer from './ClassVisualizer'
import MistakeLesson from './MistakeLesson'

export type PracticeSessionAttempt = {
  question: Question
  wasCorrect: boolean
  userAnswer: string
}

export type PracticeSessionSummary = {
  totalQuestions: number
  correctCount: number
  attempts: PracticeSessionAttempt[]
}

type PracticeEngineProps = {
  questions: Question[]
  onAttemptSaved?: () => void
  onSessionComplete?: (summary: PracticeSessionSummary) => void
  sessionTitle?: string
}

function PracticeEngine({
  questions,
  onAttemptSaved,
  onSessionComplete,
  sessionTitle,
}: PracticeEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null)
  const [typedAnswer, setTypedAnswer] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [showMistakeLesson, setShowMistakeLesson] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [result, setResult] = useState<AnswerCheckResult | null>(null)
  const [score, setScore] = useState(0)
  const [checkedCount, setCheckedCount] = useState(0)
  const [sessionAttempts, setSessionAttempts] = useState<
    PracticeSessionAttempt[]
  >([])
  const [focusedQuestions, setFocusedQuestions] = useState<Question[] | null>(
    null,
  )

  const activeQuestions = focusedQuestions ?? questions
  const question = activeQuestions[currentIndex]
  const hasQuestions = activeQuestions.length > 0
  const isMultipleChoice = Boolean(question?.choices?.length)
  const isFiniteSession = Boolean(onSessionComplete) && !focusedQuestions
  const isLastQuestion = currentIndex === activeQuestions.length - 1
  const canCheckAnswer = isMultipleChoice
    ? selectedChoiceId !== null
    : typedAnswer.trim().length > 0
  const solutionText =
    question?.expectedAnswers?.[0] ?? question?.solution ?? 'No solution saved yet.'
  const progressLabel = useMemo(
    () =>
      hasQuestions
        ? `Question ${currentIndex + 1} of ${activeQuestions.length}`
        : 'No questions loaded',
    [activeQuestions.length, currentIndex, hasQuestions],
  )

  if (!hasQuestions) {
    return (
      <section className="panel">
        <h2>No questions yet</h2>
        <p>This practice mode does not have questions loaded.</p>
      </section>
    )
  }

  function handleCheckAnswer() {
    const nextResult = checkAnswer({
      question,
      selectedChoiceId,
      submittedAnswer: typedAnswer,
    })

    if (!result) {
      const sessionAttempt = {
        question,
        wasCorrect: nextResult.isCorrect,
        userAnswer: selectedChoiceId ?? typedAnswer,
      }

      saveAttempt({
        questionId: question.id,
        mode: question.mode,
        topic: question.topic,
        skillTags: question.skillTags,
        wasCorrect: nextResult.isCorrect,
        userAnswer: selectedChoiceId ?? typedAnswer,
        timestamp: new Date().toISOString(),
      })
      onAttemptSaved?.()
      setSessionAttempts((attempts) => [...attempts, sessionAttempt])
      setCheckedCount((count) => count + 1)
      if (nextResult.isCorrect) {
        setScore((currentScore) => currentScore + 1)
      }
    }

    setResult(nextResult)
  }

  function handleNextQuestion() {
    if (isFiniteSession && isLastQuestion && result) {
      const finalAttempts = sessionAttempts
      const latestAttempts = getLatestAttemptsByQuestion(finalAttempts)
      onSessionComplete?.({
        totalQuestions: questions.length,
        correctCount: latestAttempts.filter((attempt) => attempt.wasCorrect)
          .length,
        attempts: finalAttempts,
      })
      return
    }

    setCurrentIndex((index) => (index + 1) % questions.length)
    setSelectedChoiceId(null)
    setTypedAnswer('')
    setShowHint(false)
    setShowMistakeLesson(false)
    setShowSolution(false)
    setResult(null)
  }

  function handleTryAgain() {
    setSelectedChoiceId(null)
    setTypedAnswer('')
    setShowMistakeLesson(false)
    setShowSolution(false)
    setResult(null)
  }

  function handleCopySolution() {
    void navigator.clipboard.writeText(solutionText)
  }

  function handleTrySimilar(skillTag: string) {
    const nextQuestions = allQuestions.filter((item) =>
      item.skillTags.includes(skillTag),
    )

    setFocusedQuestions(nextQuestions.length > 0 ? nextQuestions : [question])
    setCurrentIndex(0)
    setSelectedChoiceId(null)
    setTypedAnswer('')
    setShowHint(false)
    setShowMistakeLesson(false)
    setShowSolution(false)
    setResult(null)
    setScore(0)
    setCheckedCount(0)
    setSessionAttempts([])
  }

  return (
    <section className="practice-engine">
      {sessionTitle && (
        <section className="panel practice-title-panel">
          <p className="card-label">Session</p>
          <h2>{focusedQuestions ? 'Similar Skill Practice' : sessionTitle}</h2>
        </section>
      )}

      <div className="practice-topbar">
        <span>{progressLabel}</span>
        <strong>
          Score: {score}/{checkedCount}
        </strong>
      </div>

      <article className="question-panel">
        <div className="question-header">
          <div>
            <p className="card-label">{question.topic}</p>
            <h2>{question.title}</h2>
          </div>
          <span className="difficulty-pill">{question.difficulty}</span>
        </div>

        <p className="question-prompt">{question.prompt}</p>

        {question.visualizerType && question.visualizerData && (
          <QuestionVisualizer question={question} />
        )}

        {question.starterCode && (
          <pre className="starter-code">
            <code>{question.starterCode}</code>
          </pre>
        )}

        {isMultipleChoice ? (
          <fieldset className="choice-list" disabled={Boolean(result)}>
            <legend>Choose one answer</legend>
            {question.choices?.map((choice) => (
              <label className="choice-option" key={choice.id}>
                <input
                  checked={selectedChoiceId === choice.id}
                  name={question.id}
                  onChange={() => setSelectedChoiceId(choice.id)}
                  type="radio"
                  value={choice.id}
                />
                <span>{choice.text}</span>
              </label>
            ))}
          </fieldset>
        ) : (
          <CodeAnswerBox
            disabled={Boolean(result)}
            onChange={setTypedAnswer}
            value={typedAnswer}
          />
        )}

        <div className="practice-actions">
          <button
            className="button"
            onClick={() => setShowHint((isVisible) => !isVisible)}
            type="button"
          >
            {showHint ? 'Hide Hint' : 'Show Hint'}
          </button>
          <button
            className="button primary"
            disabled={Boolean(result) || !canCheckAnswer}
            onClick={handleCheckAnswer}
            type="button"
          >
            Check Answer
          </button>
          {result && !result.isCorrect && (
            <>
              <button className="button" onClick={handleTryAgain} type="button">
                Try Again
              </button>
              <button
                className="button"
                onClick={() => setShowMistakeLesson(true)}
                type="button"
              >
                Teach Me This Mistake
              </button>
              <button
                className="button"
                onClick={() => setShowSolution(true)}
                type="button"
              >
                Show Solution
              </button>
            </>
          )}
          <button
            className="button"
            disabled={isFiniteSession && !result}
            onClick={handleNextQuestion}
            type="button"
          >
            {isFiniteSession && isLastQuestion && result
              ? 'Finish Drill'
              : 'Next Question'}
          </button>
        </div>

        {showHint && (
          <section className="hint-panel">
            <strong>Hint:</strong>
            <p>{question.hint}</p>
          </section>
        )}

        {result && (
          <FeedbackPanel
            explanation={question.explanation}
            isCorrect={result.isCorrect}
            message={result.message}
          />
        )}

        {result && !result.isCorrect && showMistakeLesson && (
          <MistakeLesson
            onTrySimilar={handleTrySimilar}
            question={question}
            userAnswer={selectedChoiceId ?? typedAnswer}
          />
        )}

        {result && !result.isCorrect && showSolution && (
          <section className="solution-panel">
            <div className="solution-header">
              <h2>Solution</h2>
              <button
                className="button"
                onClick={handleCopySolution}
                type="button"
              >
                Copy Solution
              </button>
            </div>
            <pre>
              <code>{solutionText}</code>
            </pre>
            <p>
              Do not just copy this. Type it again from memory or Java will
              laugh at you on test day.
            </p>
          </section>
        )}
      </article>
    </section>
  )
}

function QuestionVisualizer({ question }: { question: Question }) {
  if (!question.visualizerData) {
    return null
  }

  if (question.visualizerType === 'array') {
    return <ArrayVisualizer data={question.visualizerData} />
  }

  if (question.visualizerType === 'arraylist') {
    return <ArrayListVisualizer data={question.visualizerData} />
  }

  if (question.visualizerType === 'class') {
    return <ClassVisualizer data={question.visualizerData} />
  }

  return null
}

function getLatestAttemptsByQuestion(attempts: PracticeSessionAttempt[]) {
  const latestAttempts = new Map<string, PracticeSessionAttempt>()

  attempts.forEach((attempt) => {
    latestAttempts.set(attempt.question.id, attempt)
  })

  return Array.from(latestAttempts.values())
}

export default PracticeEngine
