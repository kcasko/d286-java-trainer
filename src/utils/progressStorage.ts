import type {
  ProgressStats,
  QuestionAttempt,
  SkillMissSummary,
  StoredProgress,
} from '../types/Progress'

const progressStorageKey = 'd286-java-trainer-attempt-progress'

const emptyProgress: StoredProgress = {
  attempts: [],
  mistakeCounts: {},
}

export function readStoredProgress(): StoredProgress {
  const saved = localStorage.getItem(progressStorageKey)

  if (!saved) {
    return emptyProgress
  }

  try {
    const parsed = JSON.parse(saved) as Partial<StoredProgress>

    return {
      attempts: Array.isArray(parsed.attempts) ? parsed.attempts : [],
      mistakeCounts:
        parsed.mistakeCounts && typeof parsed.mistakeCounts === 'object'
          ? parsed.mistakeCounts
          : {},
    }
  } catch {
    return emptyProgress
  }
}

export function saveAttempt(attempt: QuestionAttempt) {
  const progress = readStoredProgress()
  const nextProgress: StoredProgress = {
    attempts: [...progress.attempts, attempt],
    mistakeCounts: { ...progress.mistakeCounts },
  }

  if (!attempt.wasCorrect) {
    attempt.skillTags.forEach((skillTag) => {
      nextProgress.mistakeCounts[skillTag] =
        (nextProgress.mistakeCounts[skillTag] ?? 0) + 1
    })
  }

  localStorage.setItem(progressStorageKey, JSON.stringify(nextProgress))
}

export function resetStoredProgress() {
  localStorage.removeItem(progressStorageKey)
}

export function getWeakSpotSummaries(limit?: number): SkillMissSummary[] {
  const progress = readStoredProgress()
  const relatedTopicsBySkill = new Map<string, Set<string>>()

  progress.attempts
    .filter((attempt) => !attempt.wasCorrect)
    .forEach((attempt) => {
      attempt.skillTags.forEach((skillTag) => {
        const topics = relatedTopicsBySkill.get(skillTag) ?? new Set<string>()
        topics.add(attempt.topic)
        relatedTopicsBySkill.set(skillTag, topics)
      })
    })

  const summaries = Object.entries(progress.mistakeCounts)
    .map(([skillTag, misses]) => ({
      skillTag,
      misses,
      relatedTopics: Array.from(relatedTopicsBySkill.get(skillTag) ?? []),
    }))
    .sort((left, right) => right.misses - left.misses)

  return typeof limit === 'number' ? summaries.slice(0, limit) : summaries
}

export function getProgressStats(): ProgressStats {
  const progress = readStoredProgress()
  const totalAttempts = progress.attempts.length
  const correctAttempts = progress.attempts.filter(
    (attempt) => attempt.wasCorrect,
  ).length
  const incorrectAttempts = totalAttempts - correctAttempts

  return {
    totalAttempts,
    correctAttempts,
    incorrectAttempts,
    accuracyPercentage:
      totalAttempts === 0
        ? 0
        : Math.round((correctAttempts / totalAttempts) * 100),
    mostMissedSkills: getWeakSpotSummaries(5),
  }
}
