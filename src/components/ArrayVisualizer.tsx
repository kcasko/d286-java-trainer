import type { QuestionVisualizerData } from '../types/Question'

type ArrayVisualizerProps = {
  data: QuestionVisualizerData
}

function ArrayVisualizer({ data }: ArrayVisualizerProps) {
  if (!('values' in data)) {
    return null
  }

  return (
    <section className="visualizer-panel">
      <h3>Array visual</h3>
      <div className="array-visualizer">
        {data.values.map((value, index) => (
          <div className="array-cell" key={`${value}-${index}`}>
            <span>index {index}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      {data.operation && <p>{data.operation}</p>}
    </section>
  )
}

export default ArrayVisualizer
