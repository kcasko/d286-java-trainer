import type { QuestionVisualizerData } from '../types/Question'

type ArrayListVisualizerProps = {
  data: QuestionVisualizerData
}

function ArrayListVisualizer({ data }: ArrayListVisualizerProps) {
  if (!('values' in data)) {
    return null
  }

  return (
    <section className="visualizer-panel">
      <h3>ArrayList visual</h3>
      <div className="arraylist-flow">
        <div className="array-visualizer growable">
          {data.values.map((value, index) => (
            <div className="array-cell" key={`${value}-${index}`}>
              <span>slot {index}</span>
              <strong>{value}</strong>
            </div>
          ))}
          <div className="array-cell add-cell">
            <span>end</span>
            <strong>next add</strong>
          </div>
        </div>
        {data.operation && <p className="add-operation">{data.operation}</p>}
      </div>
    </section>
  )
}

export default ArrayListVisualizer
