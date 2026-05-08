# helmquant-site

Marketing landing page for Helm Quant — `helmquant.in`.

Single-page Next.js app: hero with brand mark, email capture wired to Beehiiv, three product blocks, footer.

## Stack

- Next.js 16 (App Router, TypeScript)
- React 19
- Tailwind CSS v4
- Inter (via `next/font/google`)
- Beehiiv API for newsletter signup

## Local development

```bash
npm install
cp .env.example .env.local
# fill in BEEHIIV_API_KEY and BEEHIIV_PUBLICATION_ID
npm run dev
```

Open <http://localhost:3000>.

## Environment variables

| Var | Where to get it | Required |
|---|---|---|
| `BEEHIIV_API_KEY` | Beehiiv → Settings → API → Create new key | Yes |
| `BEEHIIV_PUBLICATION_ID` | URL of the publication dashboard, or API → Publications endpoint | Yes |

If both are missing, the email form will show a friendly "not configured yet" error rather than crashing.

## File structure

```
helmquant-site/
├── app/
│   ├── api/subscribe/route.ts   ← POST /api/subscribe → Beehiiv
│   ├── icon.svg                 ← favicon (compass rose)
│   ├── globals.css              ← Tailwind + brand color tokens
│   ├── layout.tsx               ← root layout, metadata, Inter font
│   └── page.tsx                 ← landing
├── components/
│   └── EmailCapture.tsx         ← email form, calls /api/subscribe
├── public/
│   ├── helmquant_mark_primary.svg
│   ├── helmquant_mark_simplified.svg
│   ├── helmquant_logo_horizontal.svg
│   └── helmquant_wordmark.svg
└── .env.example
```

## Brand color tokens

Defined as CSS custom properties in `app/globals.css` and exposed as Tailwind utility classes via `@theme inline`:

| Token | Value | Tailwind class |
|---|---|---|
| `--background` | `#0d1b2a` (deep navy) | `bg-background` |
| `--foreground` | `#f2f4f7` (off-white) | `text-foreground` |
| `--gold` | `#c49a4a` (antique gold) | `text-gold`, `bg-gold` |
| `--gold-dim` | `#a88340` | `text-gold-dim`, `bg-gold-dim` |
| `--muted` | `#94a3b8` | `text-muted` |
| `--muted-dim` | `#64748b` | `text-muted-dim` |
| `--navy-light` | `#14253b` | `bg-navy-light` |

## Deploy to Vercel

1. `git init`, commit, push to GitHub (`helmquant/helmquant-site`).
2. <https://vercel.com/new> → Import the repo.
3. **Environment variables**: add `BEEHIIV_API_KEY` and `BEEHIIV_PUBLICATION_ID` in the Vercel project settings before first deploy.
4. **Domain**: in Vercel project → Settings → Domains, add `helmquant.in` and `www.helmquant.in`. Vercel will give you DNS records to add at your domain registrar (A record for the apex, CNAME for www).
5. Deploy.

The first build takes ~60s. Subsequent deploys are ~30s on push to `main`.

## Beehiiv setup

1. In Beehiiv → Settings → API, generate a new API key. Copy it.
2. The publication ID is in the URL when you're on the publication dashboard, or you can hit `GET https://api.beehiiv.com/v2/publications` with your API key to list them.
3. The signup form sends `utm_source=helmquant.in&utm_medium=landing` so you can attribute subscribers in Beehiiv.

## Analytics (optional)

Two zero-config options:

- **Vercel Analytics** — `npm i @vercel/analytics`, add `<Analytics />` to `app/layout.tsx`. Free on Vercel hobby plan.
- **Plausible** — Self-hosted or paid. Add the script tag in `app/layout.tsx` once you have the domain set up.

Skipped by default. Add when you have real traffic to look at.

## Contact form / hello@ email

The footer links to `mailto:hello@helmquant.in`. Set up the catch-all or alias on your domain registrar / Google Workspace before the link goes live.

## What this site is *not*

- Not a blog. Long-form content goes in the newsletter (Beehiiv) and eventually a separate `helmquant-blog` repo.
- Not a product page. ATE indicator sells through Gumroad. WorldMonitor will live at `app.helmquant.in` (separate Next.js app in a separate repo).

## License

Private (this repo). Don't open-source without considering whether the code reveals anything sensitive about ATE or WorldMonitor pipelines.
