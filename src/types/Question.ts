export type QuestionMode = 'pa' | 'oa' | 'end_lab'

export type QuestionDifficulty = 'beginner' | 'easy' | 'medium'

export type QuestionChoice = {
  id: string
  text: string
}

export type QuestionVisualizerType = 'array' | 'arraylist' | 'class'

export type QuestionVisualizerData =
  | {
      values: Array<string | number>
      operation?: string
    }
  | {
      className: string
      fields: string[]
      constructors: string[]
      methods: string[]
    }

export type Question = {
  id: string
  mode: QuestionMode
  title: string
  topic: string
  skillTags: string[]
  prompt: string
  starterCode?: string
  choices?: QuestionChoice[]
  correctChoiceId?: string
  expectedAnswers?: string[]
  expectedPatterns?: string[]
  solution?: string
  visualizerType?: QuestionVisualizerType
  visualizerData?: QuestionVisualizerData
  hint: string
  explanation: string
  difficulty: QuestionDifficulty
}
