import { useEffect, useState } from 'react'
import CodeAnswerBox from '../components/CodeAnswerBox'
import MistakeLesson from '../components/MistakeLesson'
import PracticeEngine from '../components/PracticeEngine'
import { questions } from '../data/questions'
import type { Question } from '../types/Question'
import { createMockOAQuestions, gradeMockOA, type MockOASummary } from '../utils/mockOA'
import { saveAttempt } from '../utils/progressStorage'

const defaultQuestionCount = 25
const defaultSeconds = 45 * 60

type MockOAProps = {
  onAttemptSaved: () => void
}

function MockOA({ onAttemptSaved }: MockOAProps) {
  const [testQuestions, setTestQuestions] = useState(() =>
    createMockOAQuestions(questions, defaultQuestionCount),
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [secondsLeft, setSecondsLeft] = useState(defaultSeconds)
  const [summary, setSummary] = useState<MockOASummary | null>(null)

  useEffect(() => {
    if (summary) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [summary])

  useEffect(() => {
    if (secondsLeft === 0 && !summary) {
      submitTest()
    }
  })

  const currentQuestion = testQuestions[currentIndex]
  const answeredCount = testQuestions.filter(
    (question) => (answers[question.id] ?? '').trim().length > 0,
  ).length

  function updateAnswer(questionId: string, answer: string) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: answer,
    }))
  }

  function submitTest() {
    const nextSummary = gradeMockOA(testQuestions, answers)
    const timestamp = new Date().toISOString()

    nextSummary.results.forEach((result) => {
      saveAttempt({
        questionId: result.question.id,
        mode: result.question.mode,
        topic: result.question.topic,
        skillTags: result.question.skillTags,
        wasCorrect: result.wasCorrect,
        userAnswer: result.userAnswer,
        timestamp,
      })
    })

    onAttemptSaved()
    setSummary(nextSummary)
  }

  function restartTest() {
    setTestQuestions(createMockOAQuestions(questions, defaultQuestionCount))
    setCurrentIndex(0)
    setAnswers({})
    setSecondsLeft(defaultSeconds)
    setSummary(null)
  }

  if (summary) {
    return (
      <MockOASummaryView
        onAttemptSaved={onAttemptSaved}
        onRestart={restartTest}
        summary={summary}
      />
    )
  }

  if (!currentQuestion) {
    return (
      <section className="panel empty-state">
        <h2>No Mock OA questions loaded</h2>
        <p>
          Mock OA needs PA or OA questions. Use Daily Drill or Java Concepts
          while questions are being added.
        </p>
        <div className="quick-actions">
          <a className="button primary" href="#/daily-drill">
            Daily Drill
          </a>
          <a className="button" href="#/concepts">
            Java Concepts
          </a>
        </div>
      </section>
    )
  }

  return (
    <section className="mock-oa-page">
      <section className="panel mock-oa-intro">
        <h2>Timed practice mode</h2>
        <p>
          Answer what you know, skip what you do not, and submit when ready.
          Explanations are hidden until the test is submitted.
        </p>
        <span>{testQuestions.length} questions loaded</span>
      </section>

      <div className="mock-oa-topbar">
        <div>
          <span>Question {currentIndex + 1} of {testQuestions.length}</span>
          <strong>{answeredCount} answered</strong>
        </div>
        <time>{formatTime(secondsLeft)}</time>
      </div>

      <MockOAQuestion
        answer={answers[currentQuestion.id] ?? ''}
        onAnswerChange={(answer) => updateAnswer(currentQuestion.id, answer)}
        question={currentQuestion}
      />

      <div className="mock-oa-actions">
        <button
          className="button"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
          type="button"
        >
          Previous
        </button>
        <button
          className="button"
          disabled={currentIndex === testQuestions.length - 1}
          onClick={() =>
            setCurrentIndex((index) =>
              Math.min(testQuestions.length - 1, index + 1),
            )
          }
          type="button"
        >
          Skip / Next
        </button>
        <button className="button primary" onClick={submitTest} type="button">
          Submit Mock OA
        </button>
      </div>

      <div className="question-jump-grid" aria-label="Question list">
        {testQuestions.map((question, index) => (
          <button
            className={[
              index === currentIndex ? 'active' : '',
              answers[question.id] ? 'answered' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            key={question.id}
            onClick={() => setCurrentIndex(index)}
            type="button"
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  )
}

function MockOAQuestion({
  answer,
  onAnswerChange,
  question,
}: {
  answer: string
  onAnswerChange: (answer: string) => void
  question: Question
}) {
  return (
    <article className="question-panel">
      <div className="question-header">
        <div>
          <p className="card-label">{question.topic}</p>
          <h2>{question.title}</h2>
        </div>
        <span className="difficulty-pill">{question.difficulty}</span>
      </div>
      <p className="question-prompt">{question.prompt}</p>

      {question.starterCode && (
        <pre className="starter-code">
          <code>{question.starterCode}</code>
        </pre>
      )}

      {question.choices ? (
        <fieldset className="choice-list">
          <legend>Choose one answer</legend>
          {question.choices.map((choice) => (
            <label className="choice-option" key={choice.id}>
              <input
                checked={answer === choice.id}
                name={question.id}
                onChange={() => onAnswerChange(choice.id)}
                type="radio"
                value={choice.id}
              />
              <span>{choice.text}</span>
            </label>
          ))}
        </fieldset>
      ) : (
        <CodeAnswerBox
          disabled={false}
          onChange={onAnswerChange}
          value={answer}
        />
      )}
    </article>
  )
}

function MockOASummaryView({
  onAttemptSaved,
  onRestart,
  summary,
}: {
  onAttemptSaved: () => void
  onRestart: () => void
  summary: MockOASummary
}) {
  const [lessonQuestionId, setLessonQuestionId] = useState<string | null>(null)
  const [similarSkillTag, setSimilarSkillTag] = useState<string | null>(null)

  if (similarSkillTag) {
    return (
      <section className="mock-oa-summary">
        <section className="panel">
          <h2>Similar practice: {similarSkillTag}</h2>
          <p>These questions share the skill tag from the missed Mock OA item.</p>
          <button
            className="button"
            onClick={() => setSimilarSkillTag(null)}
            type="button"
          >
            Back to Mock OA Results
          </button>
        </section>
        <PracticeEngine
          onAttemptSaved={onAttemptSaved}
          questions={questions.filter((question) =>
            question.skillTags.includes(similarSkillTag),
          )}
        />
      </section>
    )
  }

  return (
    <section className="mock-oa-summary">
      <div className="panel">
        <p className="card-label">Mock OA complete</p>
        <h2>Results</h2>
        <p>Review only the missed areas first. That is where the next score jump is.</p>
      </div>

      <div className="stat-grid">
        <section className="stat-card">
          <span>Score</span>
          <strong>{summary.correctCount}/{summary.totalQuestions}</strong>
        </section>
        <section className="stat-card">
          <span>Accuracy</span>
          <strong>{summary.accuracyPercentage}%</strong>
        </section>
        <section className="stat-card">
          <span>Missed</span>
          <strong>{summary.missedQuestions.length}</strong>
        </section>
      </div>

      <section className="panel">
        <h2>Missed skill tags</h2>
        {summary.missedSkillTags.length > 0 ? (
          <div className="tag-list">
            {summary.missedSkillTags.map((skill) => (
              <span className="tag" key={skill.skillTag}>
                {skill.skillTag}: {skill.misses}
              </span>
            ))}
          </div>
        ) : (
          <p>No missed skill tags.</p>
        )}
      </section>

      <section className="panel">
        <h2>Missed questions and explanations</h2>
        {summary.missedQuestions.length > 0 ? (
          <div className="weak-spot-list">
            {summary.missedQuestions.map((result) => (
              <article className="missed-question-card" key={result.question.id}>
                <h3>{result.question.title}</h3>
                <p>{result.question.prompt}</p>
                <strong>Explanation</strong>
                <p>{result.question.explanation}</p>
                <button
                  className="button"
                  onClick={() => setLessonQuestionId(result.question.id)}
                  type="button"
                >
                  Teach Me This Mistake
                </button>
                {lessonQuestionId === result.question.id && (
                  <MistakeLesson
                    onTrySimilar={setSimilarSkillTag}
                    question={result.question}
                    userAnswer={result.userAnswer}
                  />
                )}
              </article>
            ))}
          </div>
        ) : (
          <p>No missed questions. Keep practicing mixed drills.</p>
        )}
      </section>

      <section className="panel">
        <h2>Recommended weak spot drills</h2>
        {summary.recommendedDrills.length > 0 ? (
          <ul className="recommendation-list">
            {summary.recommendedDrills.map((drill) => (
              <li key={drill}>{drill}</li>
            ))}
          </ul>
        ) : (
          <p>Run an End Lab session next to keep code-writing sharp.</p>
        )}
        <div className="quick-actions">
          <button className="button primary" onClick={onRestart} type="button">
            Start New Mock OA
          </button>
          <a className="button" href="#/weak-spots">
            Go to Weak Spots
          </a>
        </div>
      </section>
    </section>
  )
}

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default MockOA
