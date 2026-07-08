# Architecture

## App Structure

The app is a static React + Vite + TypeScript project. The main shell lives in `src/App.tsx`, with page-level flows in `src/pages`, reusable UI in `src/components`, data in `src/data`, shared types in `src/types`, and pure helper logic in `src/utils`.

There is no backend. The app runs entirely in the browser.

## Question Bank Model

Questions use the `Question` type in `src/types/Question.ts`. A question can support:

- PA, OA, or End Lab modes
- multiple-choice answers
- typed/code answers
- expected exact answers
- expected regex patterns
- solution text
- skill tags
- difficulty
- optional visualizer data

The main question bank is exported from `src/data/questions.ts`, with the Java Lab Mastery pack split into `src/data/finalLabPatterns.ts` and merged into the main export.

## Answer Checker

Answer checking lives in `src/utils/answerChecker.ts`.

Multiple-choice questions compare the selected choice ID to `correctChoiceId`. Typed answers are normalized with `src/utils/normalizeCode.ts`, then checked against exact expected answers or required regex patterns.

The checker is intentionally simple and beginner-friendly. It is designed for practice feedback, not full Java compilation.

## localStorage Progress Tracking

Progress is stored in browser localStorage through `src/utils/progressStorage.ts`.

Each saved attempt includes:

- question ID
- mode
- topic
- skill tags
- correctness
- user answer
- timestamp

No progress data leaves the browser.

## Weak Spot System

When an answer is incorrect, each skill tag on that question receives a mistake count. Weak Spots, Cram Plan, Daily Drill prioritization, and recommended review flows use those counts.

The system favors practical study guidance over complex scoring: repeat misses become visible review targets.

## Daily Drill Generation

Daily Drill generation lives in `src/utils/dailyDrill.ts`.

The generator creates a mixed session by prioritizing:

1. Questions from top missed skill tags
2. End Lab questions
3. Mixed PA and OA questions

It avoids duplicate question IDs within the same drill.

## Mock OA Mode

Mock OA logic lives in `src/pages/MockOA.tsx` and `src/utils/mockOA.ts`.

Mock OA pulls PA and OA questions, runs a countdown timer, allows skipping and returning, hides hints and explanations during the test, and saves attempts only after submission or auto-submit.

## Theme System

Theme persistence lives in `src/utils/themeStorage.ts`.

Dark mode is the default. Settings allow switching between dark and light mode. The selected theme is saved in localStorage and applied as a root app class: `theme-dark` or `theme-light`.

## Deployment Approach

The app builds to static files with Vite:

```bash
npm run build
```

The output directory is `dist`. The project is ready for Cloudflare Pages with the Vite preset, `npm run build` as the build command, and `dist` as the output directory.

Hash-based navigation keeps routes working on static hosting without server rewrites.
