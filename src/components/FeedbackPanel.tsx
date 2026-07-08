type FeedbackPanelProps = {
  isCorrect: boolean
  message: string
  explanation: string
}

function FeedbackPanel({
  isCorrect,
  message,
  explanation,
}: FeedbackPanelProps) {
  return (
    <section
      className={`feedback-panel ${isCorrect ? 'correct' : 'incorrect'}`}
      aria-live="polite"
    >
      <h2>{isCorrect ? 'Correct' : 'Try again mindset'}</h2>
      <p>{message}</p>
      <div>
        <strong>Why:</strong>
        <p>{explanation}</p>
      </div>
    </section>
  )
}

export default FeedbackPanel
