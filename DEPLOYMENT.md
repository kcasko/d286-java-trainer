# Deployment Guide

This app is a static React + Vite site. It does not need server code, authentication, or a database.

## Cloudflare Pages Steps

1. Push the repository to GitHub.
2. Open Cloudflare Dashboard.
3. Go to Workers & Pages.
4. Choose Create application.
5. Choose Pages.
6. Connect the GitHub repository.
7. Use the build settings below.
8. Deploy.

## Build Settings

- Framework preset: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 20 or newer

## Production Check

Before deploying, run:

```bash
npm run lint
npm run build
npm run preview
```

## Navigation Note

The app uses hash-based navigation. URLs such as `#/daily-drill`, `#/mock-oa`, and `#/cram-plan` are handled in the browser, so Cloudflare Pages does not need special route rewrite rules.

## Troubleshooting Blank Page Issues

- Confirm the Cloudflare output directory is `dist`.
- Confirm the build command is `npm run build`.
- Confirm dependencies install with `npm ci` or `npm install`.
- Check the browser console for JavaScript errors.
- If a deep link does not load, use the hash route format such as `https://example.pages.dev/#/daily-drill`.
- Re-run `npm run build` locally to catch TypeScript or bundling errors before redeploying.

## Redeploy After Pushing to GitHub

After Cloudflare Pages is connected to the GitHub repo, push changes to the configured branch. Cloudflare Pages will automatically start a new deployment.

If automatic deployment does not start:

1. Open the Cloudflare Pages project.
2. Go to Deployments.
3. Select Retry deployment or Create deployment.
4. Check the build logs for install, lint, or build errors.
