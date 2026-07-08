# Contributing

Thanks for helping improve D286 Java Boss Fight Trainer. This project is a static React + Vite + TypeScript app with original Java practice content.

## Run Locally

```bash
npm install
npm run dev
```

Open the local Vite URL shown in the terminal.

## Add Questions

Most practice questions live in `src/data/questions.ts`. Java Lab Mastery pattern questions also live in `src/data/finalLabPatterns.ts`.

Use the `Question` shape from `src/types/Question.ts`:

- `id`
- `mode`
- `title`
- `topic`
- `skillTags`
- `prompt`
- `choices` and `correctChoiceId` for multiple choice
- `starterCode`, `expectedAnswers`, `expectedPatterns`, and `solution` for typed coding questions
- `hint`
- `explanation`
- `difficulty`
- optional `visualizerType` and `visualizerData`

For typed answers, prefer flexible `expectedPatterns` that accept normal spacing differences. Add `solution` for End Lab and other typed-answer questions so the Show Solution flow works.

## Question Content Rules

- Keep explanations beginner-friendly and direct.
- Focus on one main skill per question when possible.
- Use small Java examples.
- Avoid advanced Java unless the question specifically needs it.
- Use skill tags consistently so Weak Spots and drills can group mistakes.
- For multiple choice questions, make distractors realistic but not tricky for the sake of being tricky.
- For coding questions, provide enough shell code so the learner knows exactly what to fill in.

## Original-Content Requirement

All questions, prompts, examples, explanations, and solutions must be original.

Do not include, copy, paraphrase, reconstruct, or closely imitate official WGU, ZyBooks, PA, OA, exam, assessment, or lab content. The app can practice the same general Java fundamentals, but the wording and scenarios must be new.

## Before Submitting

Run both checks:

```bash
npm run lint
npm run build
```

If you add screenshots or docs, make sure links still point to files that exist in the repo.
