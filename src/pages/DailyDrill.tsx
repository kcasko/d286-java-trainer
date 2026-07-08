import { useState } from 'react'
import PracticeEngine, {
  type PracticeSessionSummary,
} from '../components/PracticeEngine'
import MistakeLesson from '../components/MistakeLesson'
import { questions } from '../data/questions'
import { createDailyDrill } from '../utils/dailyDrill'

type DailyDrillProps = {
  onAttemptSaved: () => void
}

function DailyDrill({ onAttemptSaved }: DailyDrillProps) {
  const [summary, setSummary] = useState<PracticeSessionSummary | null>(null)
  const [drillQuestions, setDrillQuestions] = useState(() =>
    createDailyDrill(questions),
  )

  function restartDrill() {
    setSummary(null)
    setDrillQuestions(createDailyDrill(questions))
  }

  if (summary) {
    return (
      <DailyDrillSummary
        onAttemptSaved={onAttemptSaved}
        onRestart={restartDrill}
        summary={summary}
      />
    )
  }

  return (
    <PracticeEngine
      onAttemptSaved={onAttemptSaved}
      onSessionComplete={setSummary}
      questions={drillQuestions}
      sessionTitle="Daily 20-Minute Drill"
    />
  )
}

function DailyDrillSummary({
  onAttemptSaved,
  onRestart,
  summary,
}: {
  onAttemptSaved: () => void
  onRestart: () => void
  summary: PracticeSessionSummary
}) {
  const [lessonQuestionId, setLessonQuestionId] = useState<string | null>(null)
  const [similarSkillTag, setSimilarSkillTag] = useState<string | null>(null)
  const missedAttempts = summary.attempts.filter((attempt) => !attempt.wasCorrect)
  const missedSkillTags = getMissedSkillTags(summary)
  const accuracy =
    summary.totalQuestions === 0
      ? 0
      : Math.round((summary.correctCount / summary.totalQuestions) * 100)
  const recommendedTopic = getRecommendedTopic(summary)

  if (similarSkillTag) {
    return (
      <section className="daily-summary">
        <section className="panel">
          <h2>Similar practice: {similarSkillTag}</h2>
          <p>These questions share the skill tag from the missed question.</p>
          <button
            className="button"
            onClick={() => setSimilarSkillTag(null)}
            type="button"
          >
            Back to Daily Drill Summary
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
    <section className="daily-summary">
      <div className="panel">
        <p className="card-label">Drill complete</p>
        <h2>Daily Drill Summary</h2>
        <p>
          Use the missed skills below as your next short review target. Do not
          review everything at once.
        </p>
      </div>

      <div className="stat-grid">
        <section className="stat-card">
          <span>Total score</span>
          <strong>
            {summary.correctCount}/{summary.totalQuestions}
          </strong>
        </section>
        <section className="stat-card">
          <span>Accuracy</span>
          <strong>{accuracy}%</strong>
        </section>
        <section className="stat-card">
          <span>Missed questions</span>
          <strong>{missedAttempts.length}</strong>
        </section>
      </div>

      <section className="panel">
        <h2>Missed questions</h2>
        {missedAttempts.length > 0 ? (
          <div className="weak-spot-list">
            {missedAttempts.map((attempt) => (
              <article className="weak-spot-card" key={attempt.question.id}>
                <div>
                  <h3>{attempt.question.title}</h3>
                  <p>
                    {attempt.question.topic} · {attempt.question.skillTags.join(', ')}
                  </p>
                </div>
                <button
                  className="button"
                  onClick={() => setLessonQuestionId(attempt.question.id)}
                  type="button"
                >
                  Teach Me This Mistake
                </button>
                {lessonQuestionId === attempt.question.id && (
                  <MistakeLesson
                    onTrySimilar={setSimilarSkillTag}
                    question={attempt.question}
                    userAnswer={attempt.userAnswer}
                  />
                )}
              </article>
            ))}
          </div>
        ) : (
          <p>No missed questions in this drill.</p>
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
          <p>No missed skill tags. Keep rotating through mixed practice.</p>
        )}
      </section>

      <section className="panel">
        <h2>Recommended next topic</h2>
        <p>{recommendedTopic}</p>
        <div className="quick-actions">
          <button className="button primary" onClick={onRestart} type="button">
            Start New Daily Drill
          </button>
          <a className="button" href="#/weak-spots">
            Go to Weak Spots
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
      attempt.question.skillTags.forEach((skillTag) => {
        counts.set(skillTag, (counts.get(skillTag) ?? 0) + 1)
      })
    })

  return Array.from(counts.entries())
    .map(([skillTag, misses]) => ({ skillTag, misses }))
    .sort((left, right) => right.misses - left.misses)
}

function getRecommendedTopic(summary: PracticeSessionSummary) {
  const missedSkillTags = getMissedSkillTags(summary)

  if (missedSkillTags.length === 0) {
    return 'No misses today. Next, do one End Lab session to keep coding speed sharp.'
  }

  const topSkill = missedSkillTags[0].skillTag
  const relatedAttempt = summary.attempts.find(
    (attempt) =>
      !attempt.wasCorrect && attempt.question.skillTags.includes(topSkill),
  )

  return `Practice ${relatedAttempt?.question.topic ?? topSkill} next, especially ${topSkill}.`
}

export default DailyDrill
