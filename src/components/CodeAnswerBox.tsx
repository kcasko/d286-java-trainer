type CodeAnswerBoxProps = {
  value: string
  onChange: (value: string) => void
  disabled: boolean
}

function CodeAnswerBox({ value, onChange, disabled }: CodeAnswerBoxProps) {
  return (
    <label className="code-answer">
      <span>Your answer</span>
      <textarea
        disabled={disabled}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Type the Java code or short answer here..."
        rows={12}
        spellCheck="false"
        value={value}
      />
    </label>
  )
}

export default CodeAnswerBox
