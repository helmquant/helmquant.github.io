# helmquant-site

Marketing landing page for Helm Quant — `helmquant.in`. Static-exported Next.js, deployed to GitHub Pages.

## Stack

- Next.js 16 (App Router, TypeScript) — static export (`output: 'export'`)
- React 19
- Tailwind CSS v4
- Inter (via `next/font/google`)
- Beehiiv iframe embed for newsletter signups (no backend needed)
- GitHub Pages + GitHub Actions for hosting

## Local development

```bash
yarn install
cp .env.example .env.local
# (optional) paste your Beehiiv embed iframe src URL into .env.local
yarn dev
```

Open <http://localhost:3000>.

## Environment variables

| Var | Where to get it | Required |
|---|---|---|
| `NEXT_PUBLIC_BEEHIIV_EMBED_URL` | Beehiiv → Publication → Settings → Subscribe Forms → Embed → copy the iframe `src` URL | No (falls back to "Follow on X" CTA if missing) |

The variable is `NEXT_PUBLIC_*` because static export bakes its value into the HTML at build time. Don't put secrets here — only the embed URL, which is meant to be public.

## File structure

```
helmquant-site/
├── .github/workflows/deploy.yml  ← GH Actions: build + push to gh-pages
├── app/
│   ├── icon.svg                  ← favicon (compass rose)
│   ├── globals.css               ← Tailwind + brand color tokens
│   ├── layout.tsx                ← root layout, metadata, Inter font, OG tags
│   └── page.tsx                  ← landing
├── components/
│   └── EmailCapture.tsx          ← Beehiiv iframe (or fallback "Follow on X")
├── public/
│   ├── CNAME                     ← helmquant.in (custom domain)
│   ├── .nojekyll                 ← tells GH Pages to serve _next/ correctly
│   ├── og-image.png              ← 1200×630 social preview
│   └── helmquant_*.svg           ← brand assets
└── .env.example
```

## Brand color tokens

Defined as CSS custom properties in `app/globals.css` and exposed via Tailwind v4 `@theme inline`:

| Token | Value | Tailwind class |
|---|---|---|
| `--background` | `#0d1b2a` | `bg-background` |
| `--foreground` | `#f2f4f7` | `text-foreground` |
| `--gold` | `#c49a4a` | `text-gold`, `bg-gold` |
| `--gold-dim` | `#a88340` | `text-gold-dim` |
| `--muted` | `#94a3b8` | `text-muted` |
| `--muted-dim` | `#64748b` | `text-muted-dim` |

## Deploy to GitHub Pages

### 1. Push to GitHub

```bash
cd "/Users/yeshu/Work/HelmQuant/helmquant-site"
git init -b main
git add .
git commit -m "Initial Helm Quant landing"
gh repo create helmquant/helmquant-site --public --source=. --push
```

(Or create the repo manually at <https://github.com/new> and `git push`.)

### 2. Enable GitHub Pages

- GitHub repo → **Settings** → **Pages**
- **Source**: GitHub Actions (not "Deploy from a branch")
- Save

### 3. (Optional) Add the Beehiiv embed URL

- GitHub repo → **Settings** → **Secrets and variables** → **Actions** → **Variables** tab → **New repository variable**
- Name: `NEXT_PUBLIC_BEEHIIV_EMBED_URL`
- Value: the iframe `src` URL from Beehiiv (e.g. `https://embeds.beehiiv.com/abc-123-def`)
- Save, then re-run the workflow (Actions → Deploy → Run workflow)

If you skip this step, the site will deploy fine — the email signup just shows a "Newsletter launches soon — Follow on X" CTA until you add the variable later.

### 4. Custom domain (helmquant.in)

The `public/CNAME` file already contains `helmquant.in`, so GitHub Pages will know to serve there.

You also need DNS records at your domain registrar:

**For the apex domain (helmquant.in):** add four A records pointing to GitHub Pages IPs.

```
Type   Host   Value
A      @      185.199.108.153
A      @      185.199.109.153
A      @      185.199.110.153
A      @      185.199.111.153
```

**For www (recommended):** add a CNAME record.

```
Type    Host   Value
CNAME   www    helmquant.github.io.
```

Then in GitHub repo → **Settings** → **Pages**:

- Custom domain: `helmquant.in` (already set via CNAME file, but click Save to trigger DNS check)
- Wait 1–10 min for the DNS check to pass
- Tick **Enforce HTTPS** once the certificate provisions (usually ~1 hr after DNS check)

### 5. Push to deploy

After the initial setup, every push to `main` triggers a redeploy. Workflow runs are visible in the **Actions** tab.

```bash
git add .
git commit -m "Update landing page copy"
git push
```

Note: the GitHub Actions workflow uses `yarn install --frozen-lockfile` and `yarn build`. The committed `yarn.lock` is the source of truth — keep it in version control.

## Beehiiv iframe — getting the embed URL

1. In Beehiiv, finish the publication setup and verify your account (KYC if needed for monetization features).
2. **Settings** → **Subscribe Forms** (or "Embed Forms" depending on Beehiiv version)
3. Style the form (background transparent, dark navy text, etc. — Beehiiv has a visual customizer)
4. Copy the iframe code. Inside the iframe HTML, there's `src="https://embeds.beehiiv.com/..."` — that URL is the value you set as `NEXT_PUBLIC_BEEHIIV_EMBED_URL`
5. Re-deploy

The iframe will load styled by Beehiiv. It won't perfectly match the site's design, but it works without a backend. Once the brand has a few hundred subs and signup volume justifies it, you can swap to a custom form posting to a Cloudflare Worker (or similar serverless endpoint) for tighter UX control.

## What this site is *not*

- Not a blog. Long-form content goes in the newsletter (Beehiiv) and eventually a separate `helmquant-blog` repo.
- Not a product page. ATE indicator sells through Gumroad. MarketCompass will live at `app.helmquant.in` (separate Next.js app, separate repo).

## License

Private project. Don't open-source without considering whether the code reveals anything sensitive about ATE or MarketCompass pipelines. (The repo CAN be public for free GitHub Pages — that's fine. Just be deliberate about what content you include.)
