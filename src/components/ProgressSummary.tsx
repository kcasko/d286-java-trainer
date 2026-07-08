import { getProgressStats } from '../utils/progressStorage'

type ProgressSummaryProps = {
  refreshKey: number
}

function ProgressSummary({ refreshKey }: ProgressSummaryProps) {
  const stats = getProgressStats()

  return (
    <div className="progress-summary" data-refresh-key={refreshKey}>
      <div className="stat-grid">
        <section className="stat-card">
          <span>Total attempts</span>
          <strong>{stats.totalAttempts}</strong>
        </section>
        <section className="stat-card">
          <span>Correct</span>
          <strong>{stats.correctAttempts}</strong>
        </section>
        <section className="stat-card">
          <span>Incorrect</span>
          <strong>{stats.incorrectAttempts}</strong>
        </section>
        <section className="stat-card">
          <span>Accuracy</span>
          <strong>{stats.accuracyPercentage}%</strong>
        </section>
      </div>

      <section className="panel">
        <h2>Most missed skills</h2>
        {stats.mostMissedSkills.length > 0 ? (
          <div className="weak-spot-list">
            {stats.mostMissedSkills.map((skill) => (
              <article className="weak-spot-card" key={skill.skillTag}>
                <div>
                  <h3>{skill.skillTag}</h3>
                  <p>{skill.relatedTopics.join(', ') || 'No topic saved yet'}</p>
                </div>
                <strong>{skill.misses} misses</strong>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>No missed skills yet</h3>
            <p>
              Complete a Daily Drill or Mock OA and missed skills will appear
              here automatically.
            </p>
            <div className="quick-actions">
              <a className="button primary" href="#/daily-drill">
                Start Daily Drill
              </a>
              <a className="button" href="#/mock-oa">
                Try Mock OA
              </a>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}

export default ProgressSummary
