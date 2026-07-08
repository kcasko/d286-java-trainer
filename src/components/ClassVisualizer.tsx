import type { QuestionVisualizerData } from '../types/Question'

type ClassVisualizerProps = {
  data: QuestionVisualizerData
}

function ClassVisualizer({ data }: ClassVisualizerProps) {
  if (!('className' in data)) {
    return null
  }

  return (
    <section className="visualizer-panel">
      <h3>Class visual</h3>
      <div className="class-visualizer">
        <header>{data.className}</header>
        <ClassSection label="Fields" values={data.fields} />
        <ClassSection label="Constructors" values={data.constructors} />
        <ClassSection label="Methods" values={data.methods} />
      </div>
    </section>
  )
}

function ClassSection({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="class-section">
      <strong>{label}</strong>
      {values.length > 0 ? (
        <ul>
          {values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      ) : (
        <p>None yet</p>
      )}
    </div>
  )
}

export default ClassVisualizer
