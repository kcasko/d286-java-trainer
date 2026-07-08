import { useMemo, useState } from 'react'

type StoredInfoAnswer = 'yes' | 'no' | null
type CallableAnswer = 'yes' | 'no' | null
type GivesValueAnswer = 'yes' | 'no' | null

const valueTypes = ['String', 'int', 'double', 'boolean', 'ArrayList<String>']

function KeywordDecisionTrainer() {
  const [storesInfo, setStoresInfo] = useState<StoredInfoAnswer>(null)
  const [otherClassCalls, setOtherClassCalls] = useState<CallableAnswer>(null)
  const [givesValueBack, setGivesValueBack] =
    useState<GivesValueAnswer>(null)
  const [valueType, setValueType] = useState(valueTypes[0])

  const decision = useMemo(() => {
    if (storesInfo === 'yes') {
      return {
        keyword: 'private',
        example: 'private String name;',
        reason:
          'You are storing data inside the object. In beginner Java, fields usually stay private so the object protects its data.',
      }
    }

    if (otherClassCalls === 'yes' && givesValueBack === 'yes') {
      return {
        keyword: valueType,
        example: `public ${valueType} getValue() {\n    return value;\n}`,
        reason:
          'Other classes need to call this method, so it starts with public. The method gives a value back, so it needs a return type.',
      }
    }

    if (otherClassCalls === 'yes' && givesValueBack === 'no') {
      return {
        keyword: 'void',
        example: 'public void setValue(String value) {\n    this.value = value;\n}',
        reason:
          'Other classes need to call this method, so it starts with public. The method does a job but gives no value back, so use void.',
      }
    }

    if (otherClassCalls === 'no') {
      return {
        keyword: 'private',
        example: 'private void helperMethod() {\n    // class-only helper\n}',
        reason:
          'If other classes should not call it, private keeps the method inside this class.',
      }
    }

    return null
  }, [givesValueBack, otherClassCalls, storesInfo, valueType])

  function resetTrainer() {
    setStoresInfo(null)
    setOtherClassCalls(null)
    setGivesValueBack(null)
    setValueType(valueTypes[0])
  }

  return (
    <section className="keyword-trainer panel wide">
      <div>
        <p className="card-label">Why this keyword?</p>
        <h2>Keyword Decision Trainer</h2>
        <p>
          Answer tiny questions. The trainer tells you whether to think
          private, public, void, or a return type.
        </p>
      </div>

      <div className="decision-steps">
        <DecisionStep
          label="1. Are you storing information inside the object?"
          noLabel="No"
          onChange={setStoresInfo}
          value={storesInfo}
          yesLabel="Yes, this is a field"
        />

        {storesInfo === 'no' && (
          <DecisionStep
            label="2. Does another class need to call this?"
            noLabel="No, keep it inside"
            onChange={setOtherClassCalls}
            value={otherClassCalls}
            yesLabel="Yes, other classes use it"
          />
        )}

        {storesInfo === 'no' && otherClassCalls === 'yes' && (
          <DecisionStep
            label="3. Does this method give a value back?"
            noLabel="No, it just does a job"
            onChange={setGivesValueBack}
            value={givesValueBack}
            yesLabel="Yes, it returns an answer"
          />
        )}

        {storesInfo === 'no' &&
          otherClassCalls === 'yes' &&
          givesValueBack === 'yes' && (
            <label className="value-type-picker">
              <span>4. What type of value does it give back?</span>
              <select
                onChange={(event) => setValueType(event.target.value)}
                value={valueType}
              >
                {valueTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
          )}
      </div>

      {decision ? (
        <section className="decision-result">
          <strong>Think: {decision.keyword}</strong>
          <p>{decision.reason}</p>
          <pre>
            <code>{decision.example}</code>
          </pre>
        </section>
      ) : (
        <section className="decision-result muted-result">
          <strong>Start with question 1.</strong>
          <p>
            First decide if you are storing data or writing a method. That one
            choice removes a lot of confusion.
          </p>
        </section>
      )}

      <button className="button" onClick={resetTrainer} type="button">
        Reset trainer
      </button>
    </section>
  )
}

function DecisionStep({
  label,
  noLabel,
  onChange,
  value,
  yesLabel,
}: {
  label: string
  noLabel: string
  onChange: (value: 'yes' | 'no') => void
  value: 'yes' | 'no' | null
  yesLabel: string
}) {
  return (
    <fieldset className="decision-step">
      <legend>{label}</legend>
      <label>
        <input
          checked={value === 'yes'}
          onChange={() => onChange('yes')}
          type="radio"
        />
        <span>{yesLabel}</span>
      </label>
      <label>
        <input
          checked={value === 'no'}
          onChange={() => onChange('no')}
          type="radio"
        />
        <span>{noLabel}</span>
      </label>
    </fieldset>
  )
}

export default KeywordDecisionTrainer
