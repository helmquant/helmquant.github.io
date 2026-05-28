# helmquant-site

Marketing site for **helmquant.in** — static-exported Next.js, deployed to GitHub Pages.

## Stack

- Next.js 16.2 (App Router, TypeScript, `output: 'export'`)
- React 19.2 · Tailwind v4 · Inter via `next/font/google`
- `react-markdown` + `remark-gfm` + `remark-breaks` for the public backtest report
- Beehiiv iframe for newsletter signup (env `NEXT_PUBLIC_BEEHIIV_EMBED_URL`)
- yarn — committed `yarn.lock` is the source of truth

## Run

```
yarn install
yarn dev          # http://localhost:3000
yarn build        # static export → ./out
yarn lint
```

## Layout

- `app/page.tsx` — landing
- `app/ate/page.tsx` — ATE product page. Toggle the `LAUNCH_LIVE` constant to flip trial CTA → Gumroad CTA on launch day.
- `app/ate/backtest/` — public 50-cell backtest report (renders `content/ate-backtest-report.md` via react-markdown)
- `app/layout.tsx` — metadata, Inter font, OG tags
- `components/EmailCapture.tsx` — Beehiiv iframe (or fallback "Follow on X" when env var is unset)
- `public/CNAME` = `helmquant.in`; `public/og-image.png` = social preview
- `.github/workflows/deploy.yml` — push to `main` builds and pushes to `gh-pages`

## Brand tokens (`app/globals.css`)

`--background #0d1b2a` · `--foreground #f2f4f7` · `--gold #c49a4a` · `--gold-dim #a88340` · `--muted #94a3b8` · `--muted-dim #64748b`. Tailwind v4 `@theme inline` exposes them as utilities (`bg-background`, `text-gold`, etc.).

## Conventions / hard rules

- **End any session that modified files with a suggested commit message.** Use Conventional Commits (`type(scope): subject`) matching the existing log style. Don't run `git commit` unless explicitly asked. Skip for read-only sessions.
- **No backend in this repo.** Newsletter = Beehiiv iframe; checkout = Gumroad. Don't propose serverless functions or DB integration.
- **`NEXT_PUBLIC_*` is baked into HTML at build time** — never put secrets there. Public values only.
- **Not a blog.** Long-form lives in the newsletter; this is landing + product pages + the public backtest. Don't add a `/blog` route.
- **Brand is locked** — compass-rose + gold-SE accent, no redesigns. Logo per decision log 2026-05-08.
- **Defer features until a TODO unblocks them.** `TODO.todo` is the source of truth; don't expand scope past it.

For umbrella context (current state, cross-project status, hard rules across the org), see `../CLAUDE.md`.
