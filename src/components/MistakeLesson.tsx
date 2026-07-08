import type { Question } from '../types/Question'
import { getExpectedAnswerText, getMistakeLesson } from '../utils/mistakeLessons'

type MistakeLessonProps = {
  question: Question
  userAnswer: string
  onTrySimilar: (skillTag: string) => void
}

function MistakeLesson({
  onTrySimilar,
  question,
  userAnswer,
}: MistakeLessonProps) {
  const lesson = getMistakeLesson(question)

  return (
    <section className="mistake-lesson">
      <p className="card-label">Teach me this mistake</p>
      <h2>{lesson.category}</h2>

      <div className="mistake-grid">
        <div>
          <strong>What you wrote</strong>
          <pre>
            <code>{userAnswer || 'No answer entered'}</code>
          </pre>
        </div>
        <div>
          <strong>What the app expected</strong>
          <pre>
            <code>{getExpectedAnswerText(question)}</code>
          </pre>
        </div>
      </div>

      <div className="mistake-explanation">
        <strong>Likely mistake category</strong>
        <p>{lesson.matchedSkillTag}</p>
      </div>

      <div className="mistake-explanation">
        <strong>Plain-English explanation</strong>
        <p>{lesson.explanation}</p>
      </div>

      <div className="mistake-explanation">
        <strong>Tiny corrected example</strong>
        <pre>
          <code>{lesson.correctedExample}</code>
        </pre>
      </div>

      <button
        className="button primary"
        onClick={() => onTrySimilar(lesson.matchedSkillTag)}
        type="button"
      >
        Try a similar question
      </button>
    </section>
  )
}

export default MistakeLesson
