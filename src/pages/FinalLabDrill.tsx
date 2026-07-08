import { useState } from 'react'
import PracticeEngine, {
  type PracticeSessionSummary,
} from '../components/PracticeEngine'
import { questions } from '../data/questions'
import { createFinalLabDrill } from '../utils/finalLabDrill'

type FinalLabDrillProps = {
  onAttemptSaved: () => void
}

function FinalLabDrill({ onAttemptSaved }: FinalLabDrillProps) {
  const [summary, setSummary] = useState<PracticeSessionSummary | null>(null)
  const [drillQuestions, setDrillQuestions] = useState(() =>
    createFinalLabDrill(questions),
  )

  function restartDrill() {
    setSummary(null)
    setDrillQuestions(createFinalLabDrill(questions))
  }

  if (summary) {
    return <FinalLabDrillSummary onRestart={restartDrill} summary={summary} />
  }

  return (
    <PracticeEngine
      onAttemptSaved={onAttemptSaved}
      onSessionComplete={setSummary}
      questions={drillQuestions}
      sessionTitle="Java Lab Mastery Daily Drill"
    />
  )
}

function FinalLabDrillSummary({
  onRestart,
  summary,
}: {
  onRestart: () => void
  summary: PracticeSessionSummary
}) {
  const missedAttempts = summary.attempts.filter((attempt) => !attempt.wasCorrect)
  const missedSkillTags = getMissedSkillTags(summary)
  const accuracy =
    summary.totalQuestions === 0
      ? 0
      : Math.round((summary.correctCount / summary.totalQuestions) * 100)
  const recommendedTopic = getRecommendedTopic(summary)

  return (
    <section className="daily-summary">
      <div className="panel">
        <p className="card-label">Java Lab Mastery Drill complete</p>
        <h2>Java Lab Mastery Daily Drill Results</h2>
        <p>
          These results are only for the Java Lab Mastery questions. Review the
          first missed pattern before starting another full drill.
        </p>
      </div>

      <div className="stat-grid">
        <section className="stat-card">
          <span>Score</span>
          <strong>
            {summary.correctCount}/{summary.totalQuestions}
          </strong>
        </section>
        <section className="stat-card">
          <span>Accuracy</span>
          <strong>{accuracy}%</strong>
        </section>
        <section className="stat-card">
          <span>Missed patterns</span>
          <strong>{missedAttempts.length}</strong>
        </section>
      </div>

      <section className="panel">
        <h2>Missed lab patterns</h2>
        {missedAttempts.length > 0 ? (
          <div className="weak-spot-list">
            {missedAttempts.map((attempt) => (
              <article className="weak-spot-card" key={attempt.question.id}>
                <div>
                  <h3>{attempt.question.title}</h3>
                  <p>{attempt.question.topic}</p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p>No missed Java Lab Mastery patterns.</p>
        )}
      </section>

      <section className="panel">
        <h2>Missed skill tags</h2>
        {missedSkillTags.length > 0 ? (
          <div className="tag-list">
            {missedSkillTags.map((skill) => (
              <span className="tag" key={skill.skillTag}>
                {skill.skillTag}: {skill.misses}
              </span>
            ))}
          </div>
        ) : (
          <p>No missed skill tags. Keep doing short refresh drills.</p>
        )}
      </section>

      <section className="panel">
        <h2>Recommended next lab topic</h2>
        <p>{recommendedTopic}</p>
        <div className="quick-actions">
          <button className="button primary" onClick={onRestart} type="button">
            Start New Java Lab Mastery Drill
          </button>
          <a className="button" href="#/end-lab">
            Go to End Lab Trainer
          </a>
        </div>
      </section>
    </section>
  )
}

function getMissedSkillTags(summary: PracticeSessionSummary) {
  const counts = new Map<string, number>()

  summary.attempts
    .filter((attempt) => !attempt.wasCorrect)
    .forEach((attempt) => {
      attempt.question.skillTags
        .filter((skillTag) => skillTag !== 'final-lab-pattern')
        .forEach((skillTag) => {
          counts.set(skillTag, (counts.get(skillTag) ?? 0) + 1)
        })
    })

  return Array.from(counts.entries())
    .map(([skillTag, misses]) => ({ skillTag, misses }))
    .sort((left, right) => right.misses - left.misses)
}

function getRecommendedTopic(summary: PracticeSessionSummary) {
  const missedAttempt = summary.attempts.find((attempt) => !attempt.wasCorrect)

  if (!missedAttempt) {
    return 'No misses. Next, mix in Mock OA so you keep both coding and reading skills sharp.'
  }

  return `Practice ${missedAttempt.question.topic} next. Start with ${missedAttempt.question.title}.`
}

export default FinalLabDrill
