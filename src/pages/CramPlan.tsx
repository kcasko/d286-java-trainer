import { createCramPlan } from '../utils/cramPlan'

type CramPlanProps = {
  refreshKey: number
}

function CramPlan({ refreshKey }: CramPlanProps) {
  const plan = createCramPlan()

  return (
    <section className="cram-plan-page" data-refresh-key={refreshKey}>
      <section className="panel">
        <p className="card-label">
          {plan.hasProgress ? 'Based on your misses' : 'Starter plan'}
        </p>
        <h2>Today&apos;s focus</h2>
        <p>{plan.todaysFocus}</p>
        {!plan.hasProgress && (
          <div className="empty-state compact">
            <h3>Fresh start plan</h3>
            <p>
              No practice history yet, so this plan starts with the Java
              fundamentals that most beginners need first.
            </p>
          </div>
        )}
      </section>

      <section className="panel">
        <h2>Top 3 weak skills</h2>
        <div className="tag-list">
          {plan.topWeakSkills.map((skill) => (
            <span className="tag" key={skill}>
              {skill}
            </span>
          ))}
        </div>
      </section>

      <section className="panel">
        <h2>Recommended drill</h2>
        <p>{plan.recommendedDrill}</p>
        <div className="quick-actions">
          <a className="button primary" href={getDrillHref(plan.recommendedDrill)}>
            Start drill
          </a>
          <a className="button" href="#/weak-spots">
            Practice weak spots
          </a>
        </div>
      </section>

      <section className="panel">
        <h2>Java Concepts to review</h2>
        <div className="tag-list">
          {plan.recommendedConcepts.map((concept) => (
            <span className="tag" key={concept}>
              {concept}
            </span>
          ))}
        </div>
      </section>

      <section className="panel wide">
        <h2>Suggested 20-minute study path</h2>
        <ol className="study-path">
          {plan.studyPath.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </section>
    </section>
  )
}

function getDrillHref(drill: string) {
  if (drill === 'Java Lab Mastery Drill') {
    return '#/final-lab-drill'
  }

  if (drill === 'Mock OA Timed Mode') {
    return '#/mock-oa'
  }

  return '#/daily-drill'
}

export default CramPlan
