import { getProgressStats } from './progressStorage'

export type CramPlan = {
  todaysFocus: string
  topWeakSkills: string[]
  recommendedDrill: string
  recommendedConcepts: string[]
  studyPath: string[]
  hasProgress: boolean
}

const beginnerSkills = [
  'classes',
  'arrays',
  'ArrayLists',
  'public/private',
  'void vs return',
]

export function createCramPlan(): CramPlan {
  const stats = getProgressStats()
  const topWeakSkills = stats.mostMissedSkills
    .slice(0, 3)
    .map((skill) => skill.skillTag)

  if (stats.totalAttempts === 0 || topWeakSkills.length === 0) {
    return {
      todaysFocus: 'Beginner Java foundations',
      topWeakSkills: beginnerSkills.slice(0, 3),
      recommendedDrill: 'Java Lab Mastery Drill',
      recommendedConcepts: [
        'class',
        'array',
        'ArrayList',
        'private',
        'void',
        'return type',
      ],
      studyPath: [
        'Review: classes, arrays, and ArrayLists',
        'Do: Java Lab Mastery Drill',
        'Practice: 10 weak spot questions',
        'Finish: Mock OA mini test',
      ],
      hasProgress: false,
    }
  }

  const primarySkill = topWeakSkills[0]

  return {
    todaysFocus: primarySkill,
    topWeakSkills,
    recommendedDrill: chooseDrill(primarySkill),
    recommendedConcepts: chooseConcepts(topWeakSkills),
    studyPath: [
      `Review: ${primarySkill}`,
      `Do: ${chooseDrill(primarySkill)}`,
      'Practice: 10 weak spot questions',
      'Finish: Mock OA mini test',
    ],
    hasProgress: true,
  }
}

function chooseDrill(skill: string) {
  const normalizedSkill = skill.toLowerCase()

  if (
    normalizedSkill.includes('array') ||
    normalizedSkill.includes('class') ||
    normalizedSkill.includes('constructor') ||
    normalizedSkill.includes('getter') ||
    normalizedSkill.includes('setter')
  ) {
    return 'Java Lab Mastery Drill'
  }

  if (
    normalizedSkill.includes('compile') ||
    normalizedSkill.includes('data type') ||
    normalizedSkill.includes('if') ||
    normalizedSkill.includes('loop')
  ) {
    return 'Mock OA Timed Mode'
  }

  return 'Daily Drill'
}

function chooseConcepts(skills: string[]) {
  const concepts = new Set<string>()

  skills.forEach((skill) => {
    const normalizedSkill = skill.toLowerCase()

    if (normalizedSkill.includes('class')) {
      concepts.add('class')
      concepts.add('object')
    }

    if (normalizedSkill.includes('arraylist')) {
      concepts.add('ArrayList')
    } else if (normalizedSkill.includes('array')) {
      concepts.add('array')
      concepts.add('index')
    }

    if (normalizedSkill.includes('private') || normalizedSkill.includes('public')) {
      concepts.add('private')
      concepts.add('public')
    }

    if (normalizedSkill.includes('void') || normalizedSkill.includes('return')) {
      concepts.add('void')
      concepts.add('return type')
    }

    if (normalizedSkill.includes('constructor')) {
      concepts.add('constructor')
    }

    if (normalizedSkill.includes('getter')) {
      concepts.add('method')
      concepts.add('return type')
    }

    if (normalizedSkill.includes('setter')) {
      concepts.add('method')
      concepts.add('void')
    }
  })

  return Array.from(concepts).slice(0, 6)
}
