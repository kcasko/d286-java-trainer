import { type ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import ConceptCard from './components/ConceptCard'
import KeywordDecisionTrainer from './components/KeywordDecisionTrainer'
import PracticeEngine from './components/PracticeEngine'
import ProgressSummary from './components/ProgressSummary'
import { concepts } from './data/concepts'
import { questionCounts, questions } from './data/questions'
import CramPlan from './pages/CramPlan'
import DailyDrill from './pages/DailyDrill'
import FinalLabDrill from './pages/FinalLabDrill'
import MockOA from './pages/MockOA'
import type { SkillMissSummary } from './types/Progress'
import {
  getWeakSpotSummaries,
  resetStoredProgress,
} from './utils/progressStorage'
import {
  downloadProgressBackup,
  restoreProgressBackup,
  validateProgressBackup,
  type ProgressBackup,
} from './utils/progressBackup'
import { readTheme, saveTheme, type AppTheme } from './utils/themeStorage'
import './App.css'

type PageId =
  | 'home'
  | 'about'
  | 'cram-plan'
  | 'daily-drill'
  | 'final-lab-drill'
  | 'mock-oa'
  | 'pa-practice'
  | 'oa-practice'
  | 'end-lab'
  | 'weak-spots'
  | 'concepts'
  | 'progress'
  | 'settings'

const pages: Array<{
  id: PageId
  label: string
  shortLabel: string
  title: string
  eyebrow: string
}> = [
  {
    id: 'home',
    label: 'Home',
    shortLabel: 'Home',
    title: 'D286 Java Boss Fight Trainer',
    eyebrow: 'Start here',
  },
  {
    id: 'about',
    label: 'About',
    shortLabel: 'About',
    title: 'About This App',
    eyebrow: 'Portfolio project',
  },
  {
    id: 'cram-plan',
    label: 'Cram Plan',
    shortLabel: 'Cram',
    title: 'D286 Cram Plan',
    eyebrow: 'What to study next',
  },
  {
    id: 'daily-drill',
    label: 'Daily Drill',
    shortLabel: 'Daily',
    title: 'Daily 20-Minute Drill',
    eyebrow: '20-question session',
  },
  {
    id: 'final-lab-drill',
    label: 'Java Lab Mastery Drill',
    shortLabel: 'Mastery',
    title: 'Java Lab Mastery Daily Drill',
    eyebrow: '14 Java lab mastery patterns',
  },
  {
    id: 'mock-oa',
    label: 'Mock OA',
    shortLabel: 'Mock',
    title: 'Mock OA Timed Mode',
    eyebrow: '45-minute test mode',
  },
  {
    id: 'pa-practice',
    label: 'PA Practice',
    shortLabel: 'PA',
    title: 'PA Practice',
    eyebrow: 'Performance Assessment style',
  },
  {
    id: 'oa-practice',
    label: 'OA Practice',
    shortLabel: 'OA',
    title: 'OA Practice',
    eyebrow: 'Objective Assessment style',
  },
  {
    id: 'end-lab',
    label: 'End Lab Trainer',
    shortLabel: 'Labs',
    title: 'End Lab Trainer',
    eyebrow: 'ZyBooks-style coding',
  },
  {
    id: 'weak-spots',
    label: 'Weak Spots',
    shortLabel: 'Weak',
    title: 'Weak Spots',
    eyebrow: 'What to drill next',
  },
  {
    id: 'concepts',
    label: 'Java Concepts',
    shortLabel: 'Concepts',
    title: 'Java Concepts',
    eyebrow: 'Tiny-step explanations',
  },
  {
    id: 'progress',
    label: 'Progress Dashboard',
    shortLabel: 'Progress',
    title: 'Progress Dashboard',
    eyebrow: 'Local progress only',
  },
  {
    id: 'settings',
    label: 'Settings',
    shortLabel: 'Settings',
    title: 'Settings',
    eyebrow: 'Trainer preferences',
  },
]

function getPageFromHash(): PageId {
  const page = window.location.hash.replace('#/', '') as PageId
  return pages.some((item) => item.id === page) ? page : 'home'
}

function App() {
  const [activePage, setActivePage] = useState<PageId>(getPageFromHash)
  const [progressVersion, setProgressVersion] = useState(0)
  const [theme, setTheme] = useState<AppTheme>(readTheme)

  const pageMeta = useMemo(
    () => pages.find((page) => page.id === activePage) ?? pages[0],
    [activePage],
  )

  useEffect(() => {
    const handleHashChange = () => setActivePage(getPageFromHash())

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  function refreshProgress() {
    setProgressVersion((version) => version + 1)
  }

  function resetProgress() {
    resetStoredProgress()
    refreshProgress()
  }

  function importProgressBackup(backup: ProgressBackup) {
    restoreProgressBackup(backup)
    setTheme(backup.themePreference)
    refreshProgress()
  }

  function updateTheme(nextTheme: AppTheme) {
    setTheme(nextTheme)
    saveTheme(nextTheme)
  }

  return (
    <div className={`app-shell theme-${theme}`}>
      <header className="site-header">
        <a className="brand" href="#/home" aria-label="D286 Java Trainer home">
          <span className="brand-mark">J</span>
          <span>
            <strong>D286 Java</strong>
            <small>Boss Fight Trainer</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Main navigation">
          {pages.map((page) => (
            <a
              aria-current={page.id === activePage ? 'page' : undefined}
              className={page.id === activePage ? 'active' : undefined}
              href={`#/${page.id}`}
              key={page.id}
              title={page.label}
            >
              <span className="nav-full">{page.label}</span>
              <span className="nav-short">{page.shortLabel}</span>
            </a>
          ))}
        </nav>
      </header>

      <main>
        <section className="page-hero">
          <p>{pageMeta.eyebrow}</p>
          <h1>{pageMeta.title}</h1>
        </section>

        {activePage === 'home' && <HomePage />}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'cram-plan' && (
          <CramPlan refreshKey={progressVersion} />
        )}
        {activePage === 'daily-drill' && (
          <DailyDrill onAttemptSaved={refreshProgress} />
        )}
        {activePage === 'final-lab-drill' && (
          <FinalLabDrill onAttemptSaved={refreshProgress} />
        )}
        {activePage === 'mock-oa' && (
          <MockOA onAttemptSaved={refreshProgress} />
        )}
        {activePage === 'pa-practice' && (
          <PaPracticePage onAttemptSaved={refreshProgress} />
        )}
        {activePage === 'oa-practice' && (
          <OaPracticePage onAttemptSaved={refreshProgress} />
        )}
        {activePage === 'end-lab' && (
          <EndLabPage onAttemptSaved={refreshProgress} />
        )}
        {activePage === 'weak-spots' && (
          <WeakSpotsPage
            onAttemptSaved={refreshProgress}
            refreshKey={progressVersion}
          />
        )}
        {activePage === 'concepts' && <ConceptsPage />}
        {activePage === 'progress' && (
          <ProgressPage refreshKey={progressVersion} />
        )}
        {activePage === 'settings' && (
          <SettingsPage
            onImportProgressBackup={importProgressBackup}
            onResetProgress={resetProgress}
            onThemeChange={updateTheme}
            theme={theme}
          />
        )}
      </main>
    </div>
  )
}

function HomePage() {
  return (
    <div className="home-page">
      <section className="home-hero">
        <p className="card-label">Student-built Java practice tool</p>
        <h2>D286 Java Boss Fight Trainer</h2>
        <p>
          A focused drill app that helps Java beginners practice fundamentals,
          track weak spots, and build confidence with classes, arrays,
          ArrayLists, methods, and lab-style code patterns.
        </p>
        <div className="hero-actions">
          <a className="button primary" href="#/daily-drill">
            Daily Drill
          </a>
          <a className="button" href="#/cram-plan">
            Cram Plan
          </a>
          <a className="button primary" href="#/final-lab-drill">
            Java Lab Mastery
          </a>
          <a className="button" href="#/mock-oa">
            Mock OA
          </a>
        </div>
      </section>

      <div className="content-grid">
        <InfoCard
          title="Simple rule"
          text="Private means the object protects its data. Public means other code is allowed to use it."
        />
        <InfoCard
          title="Tiny steps"
          text="Read the question. Spot the noun. Decide if it should be a class, object, array, or method."
        />
      </div>

      <section className="panel">
        <h2>Question bank</h2>
        <p>Starter questions are loaded and ready for the drill screens.</p>
        <div className="mini-stat-grid">
          <StatCard label="PA questions" value={questionCounts.pa} />
          <StatCard label="OA questions" value={questionCounts.oa} />
          <StatCard label="End lab questions" value={questionCounts.end_lab} />
        </div>
      </section>
    </div>
  )
}

function AboutPage() {
  return (
    <div className="about-page">
      <section className="panel">
        <h2>What this app does</h2>
        <p>
          D286 Java Boss Fight Trainer helps Java beginners practice the
          fundamentals with short drills, guided retries, concept cards, and
          lab-style coding prompts.
        </p>
      </section>

      <section className="panel">
        <h2>Adaptive weak-spot tracking</h2>
        <p>
          The app saves practice attempts in localStorage and uses missed skill
          tags to recommend weak-spot drills, cram plans, and focused review.
        </p>
      </section>

      <section className="panel">
        <h2>Original practice content</h2>
        <p>
          The questions are original Java practice content. No official WGU,
          ZyBooks, PA, or OA content is included.
        </p>
      </section>

      <section className="panel wide">
        <h2>Tech Stack</h2>
        <div className="tag-list">
          {['React', 'Vite', 'TypeScript', 'localStorage', 'GitHub Actions'].map(
            (tech) => (
              <span className="tag" key={tech}>
                {tech}
              </span>
            ),
          )}
        </div>
      </section>
    </div>
  )
}

function PaPracticePage({ onAttemptSaved }: { onAttemptSaved: () => void }) {
  return (
    <PracticeEngine
      onAttemptSaved={onAttemptSaved}
      questions={questions.filter((item) => item.mode === 'pa')}
    />
  )
}

function OaPracticePage({ onAttemptSaved }: { onAttemptSaved: () => void }) {
  return (
    <PracticeEngine
      onAttemptSaved={onAttemptSaved}
      questions={questions.filter((item) => item.mode === 'oa')}
    />
  )
}

function EndLabPage({ onAttemptSaved }: { onAttemptSaved: () => void }) {
  const [showFinalPatternsOnly, setShowFinalPatternsOnly] = useState(false)
  const endLabQuestions = questions.filter((item) => item.mode === 'end_lab')
  const filteredQuestions = showFinalPatternsOnly
    ? endLabQuestions.filter((item) =>
        item.skillTags.includes('final-lab-pattern'),
      )
    : endLabQuestions

  return (
    <div className="end-lab-page">
      <section className="panel">
        <h2>End Lab filter</h2>
        <p>
          Java Lab Mastery questions focus on the small class, array, and ArrayList
          shapes that show up again and again.
        </p>
        <div className="segmented-control" aria-label="End Lab filter">
          <button
            className={!showFinalPatternsOnly ? 'active' : undefined}
            onClick={() => setShowFinalPatternsOnly(false)}
            type="button"
          >
            All End Labs
          </button>
          <button
            className={showFinalPatternsOnly ? 'active' : undefined}
            onClick={() => setShowFinalPatternsOnly(true)}
            type="button"
          >
            Java Lab Mastery Only
          </button>
        </div>
        <div className="quick-actions">
          <a className="button primary" href="#/final-lab-drill">
            Java Lab Mastery Daily Drill
          </a>
        </div>
      </section>
      <PracticeEngine
        onAttemptSaved={onAttemptSaved}
        questions={filteredQuestions}
        sessionTitle={
          showFinalPatternsOnly ? 'Java Lab Mastery Pack' : undefined
        }
      />
    </div>
  )
}

function WeakSpotsPage({
  onAttemptSaved,
  refreshKey,
}: {
  onAttemptSaved: () => void
  refreshKey: number
}) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null)
  const weakSpots = getWeakSpotSummaries()
  const focusedQuestions = selectedSkill
    ? questions.filter((question) => question.skillTags.includes(selectedSkill))
    : []

  return (
    <div className="weak-spots-page" data-refresh-key={refreshKey}>
      {selectedSkill ? (
        <>
          <section className="panel">
            <h2>Focused practice: {selectedSkill}</h2>
            <p>
              These questions all include that skill tag. Use this to drill one
              weak spot at a time.
            </p>
            <button
              className="button"
              onClick={() => setSelectedSkill(null)}
              type="button"
            >
              Back to weak spots
            </button>
          </section>
          <PracticeEngine
            onAttemptSaved={onAttemptSaved}
            questions={focusedQuestions}
          />
        </>
      ) : (
        <WeakSpotList
          onPracticeSkill={setSelectedSkill}
          weakSpots={weakSpots}
        />
      )}
    </div>
  )
}

function WeakSpotList({
  onPracticeSkill,
  weakSpots,
}: {
  onPracticeSkill: (skillTag: string) => void
  weakSpots: SkillMissSummary[]
}) {
  return (
    <section className="panel">
      <h2>Top missed skill tags</h2>
      <p>
        Misses are counted by skill tag. If one answer misses three tags, each
        tag gets one miss.
      </p>
      {weakSpots.length > 0 ? (
        <div className="weak-spot-list">
          {weakSpots.map((skill) => (
            <article className="weak-spot-card" key={skill.skillTag}>
              <div>
                <h3>{skill.skillTag}</h3>
                <p>
                  {skill.misses} misses · Topics:{' '}
                  {skill.relatedTopics.join(', ') || 'No topic saved yet'}
                </p>
              </div>
              <button
                className="button primary"
                onClick={() => onPracticeSkill(skill.skillTag)}
                type="button"
              >
                Practice this skill
              </button>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No weak spots yet</h3>
          <p>
            Miss a question in Daily Drill, Mock OA, or End Lab practice and the
            app will turn that miss into a focused review list.
          </p>
          <div className="quick-actions">
            <a className="button primary" href="#/daily-drill">
              Start Daily Drill
            </a>
            <a className="button" href="#/final-lab-drill">
              Java Lab Mastery
            </a>
          </div>
        </div>
      )}
    </section>
  )
}

function ConceptsPage() {
  return (
    <div className="concepts-page">
      <KeywordDecisionTrainer />
      <section className="panel wide">
        <h2>Concept Drill Cards</h2>
        <p>
          Read one card at a time. Say the answer out loud before revealing the
          mini quiz answer.
        </p>
      </section>
      {concepts.map((concept) => (
        <ConceptCard concept={concept} key={concept.id} />
      ))}
    </div>
  )
}

function ProgressPage({ refreshKey }: { refreshKey: number }) {
  return <ProgressSummary refreshKey={refreshKey} />
}

function SettingsPage({
  onImportProgressBackup,
  onResetProgress,
  onThemeChange,
  theme,
}: {
  onImportProgressBackup: (backup: ProgressBackup) => void
  onResetProgress: () => void
  onThemeChange: (theme: AppTheme) => void
  theme: AppTheme
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [backupMessage, setBackupMessage] = useState('')
  const [backupError, setBackupError] = useState('')

  function handleExportProgress() {
    downloadProgressBackup()
    setBackupError('')
    setBackupMessage('Progress backup downloaded as a JSON file.')
  }

  async function handleImportProgress(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    setBackupError('')
    setBackupMessage('')

    if (!file) {
      return
    }

    try {
      const parsed = JSON.parse(await file.text()) as unknown
      const validation = validateProgressBackup(parsed)

      if (!validation.isValid) {
        setBackupError(validation.error)
        return
      }

      const attemptCount = validation.backup.progress.attempts.length
      const shouldReplace = window.confirm(
        `Replace current progress with this backup?\n\nExported: ${new Date(
          validation.backup.exportedAt,
        ).toLocaleString()}\nAttempts in backup: ${attemptCount}\n\nThis will overwrite the progress currently saved in this browser.`,
      )

      if (!shouldReplace) {
        setBackupMessage('Import canceled. Current progress was not changed.')
        return
      }

      onImportProgressBackup(validation.backup)
      setBackupMessage(
        `Progress restored. Imported ${attemptCount} saved attempt${
          attemptCount === 1 ? '' : 's'
        }.`,
      )
    } catch {
      setBackupError('Could not read that file. Choose a valid JSON backup.')
    } finally {
      event.target.value = ''
    }
  }

  function handleResetProgress() {
    const shouldReset = window.confirm(
      'Clear all saved progress from this browser?\n\nThis deletes attempts and weak-spot mistake counts. Export a backup first if you want to keep them.',
    )

    if (!shouldReset) {
      setBackupMessage('Reset canceled. Progress was not changed.')
      return
    }

    onResetProgress()
    setBackupError('')
    setBackupMessage('Local progress cleared from this browser.')
  }

  return (
    <section className="panel">
      <h2>Settings</h2>
      <p>
        Settings will control drill length, explanation detail, and review mode.
        Progress is saved in this browser with localStorage.
      </p>
      <div className="settings-group">
        <h3>Theme</h3>
        <p>Dark mode is the default. Your choice is saved on this device.</p>
        <div className="segmented-control" aria-label="Theme">
          <button
            className={theme === 'dark' ? 'active' : undefined}
            onClick={() => onThemeChange('dark')}
            type="button"
          >
            Dark
          </button>
          <button
            className={theme === 'light' ? 'active' : undefined}
            onClick={() => onThemeChange('light')}
            type="button"
          >
            Light
          </button>
        </div>
      </div>
      <div className="settings-group">
        <h3>Progress backup</h3>
        <p>
          Export your attempts and weak spots before switching browsers,
          clearing storage, or testing reset behavior.
        </p>
        <div className="settings-actions">
          <button className="button" type="button" onClick={handleExportProgress}>
            Export Progress
          </button>
          <button
            className="button"
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Import Progress
          </button>
          <input
            accept="application/json,.json"
            className="visually-hidden"
            onChange={handleImportProgress}
            ref={fileInputRef}
            type="file"
          />
        </div>
        {backupMessage && <p className="status-message">{backupMessage}</p>}
        {backupError && <p className="status-message error">{backupError}</p>}
      </div>
      <div className="settings-group danger-zone">
        <h3>Clear progress</h3>
        <p>
          This removes attempts and weak-spot tracking from this browser only.
          Export a backup first if you may want the data later.
        </p>
        <button
          className="button danger"
          type="button"
          onClick={handleResetProgress}
        >
          Clear Progress
        </button>
      </div>
    </section>
  )
}

function InfoCard({ title, text }: { title: string; text: string }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <p>{text}</p>
    </section>
  )
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <section className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </section>
  )
}

export default App
