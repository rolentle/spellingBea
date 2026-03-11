# Deploying spellingBea to GitHub Pages

This app uses Vite + React + TypeScript. Here's how to set up a build and deploy pipeline to GitHub Pages.

---

## 1. Configure Vite for GitHub Pages

GitHub Pages serves your app from a subpath: `https://rolentle.github.io/spellingBea/`

You need to tell Vite about this base path. In `vite.config.ts`, add the `base` option:

```ts
export default defineConfig({
  base: '/spellingBea/',
  plugins: [react()],
})
```

Without this, asset paths will be wrong and the app will load a blank page.

---

## 2. Enable GitHub Pages in Repo Settings

1. Go to https://github.com/rolentle/spellingBea/settings/pages
2. Under **Source**, select **GitHub Actions**

---

## 3. Create the GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - master

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

---

## 4. Push and Verify

Once the workflow file is committed and pushed to `master`, GitHub Actions will:

1. Install dependencies
2. Run `tsc -b && vite build` (your existing build script)
3. Upload the `dist/` folder as a Pages artifact
4. Deploy it to `https://rolentle.github.io/spellingBea/`

You can monitor the run at: https://github.com/rolentle/spellingBea/actions

---

## Notes

- The `concurrency` block prevents overlapping deploys if you push multiple commits quickly.
- `npm ci` is used instead of `npm install` to ensure a clean, reproducible install from `package-lock.json`.
- If you ever rename the repo, update the `base` in `vite.config.ts` to match.
