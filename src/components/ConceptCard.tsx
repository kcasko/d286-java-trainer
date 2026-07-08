import { useState } from 'react'
import type { JavaConcept } from '../data/concepts'

type ConceptCardProps = {
  concept: JavaConcept
}

function ConceptCard({ concept }: ConceptCardProps) {
  const [showAnswer, setShowAnswer] = useState(false)

  return (
    <article className="concept-card">
      <h2>{concept.term}</h2>
      <p>{concept.explanation}</p>

      <div className="concept-example">
        <strong>Tiny Java example</strong>
        <pre>
          <code>{concept.example}</code>
        </pre>
      </div>

      <div className="concept-warning">
        <strong>Common D286 mistake</strong>
        <p>{concept.commonMistake}</p>
      </div>

      <div className="mini-quiz">
        <strong>Mini quiz</strong>
        <p>{concept.quizQuestion}</p>
        <button
          className="button"
          onClick={() => setShowAnswer((isVisible) => !isVisible)}
          type="button"
        >
          {showAnswer ? 'Hide Answer' : 'Show Answer'}
        </button>
        {showAnswer && <p className="mini-quiz-answer">{concept.quizAnswer}</p>}
      </div>
    </article>
  )
}

export default ConceptCard
