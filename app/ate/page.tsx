import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ATE — Adaptive Trend Engine",
  description:
    "Self-tuning trend-following indicator for TradingView. Backtested across Nifty, BankNifty, Gold (XAUUSD), and Silver (XAGUSD) — drawdowns shown honestly. ₹499/mo or ₹4,999/yr. 7-day free trial.",
  openGraph: {
    title: "ATE — Adaptive Trend Engine · Helm Quant",
    description:
      "AI-tuned trend indicator for TradingView. Self-tunes 300+ parameter combinations on every bar. 7-day free trial, then ₹499/mo.",
    url: "https://helmquant.in/ate",
    type: "website",
  },
};

const TRIAL_MAILTO =
  "mailto:hello@helmquant.in?subject=ATE%20trial&body=Hi%2C%20please%20send%20me%20a%207-day%20trial%20invite%20for%20ATE.%0A%0AMy%20TradingView%20username%3A%20%5Byour%20username%5D%0A";

// TODO: replace with the real Gumroad URL once the SKU is public on launch day.
const GUMROAD_URL = "https://helmquant.gumroad.com/l/ate";

// Toggle to true on May 27 when Gumroad goes live.
const LAUNCH_LIVE = false;

export default function AtePage() {
  return (
    <main className="flex-1">
      {/* ─── HERO ────────────────────────────────────────────────────────── */}
      <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-widest text-gold mb-6">
            {LAUNCH_LIVE ? "Now live" : "Launching Wed May 27, 2026"}
          </p>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight mb-5">
            ATE — Adaptive Trend Engine
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed mb-10 max-w-2xl mx-auto">
            A self-tuning trend-following indicator for TradingView. On every
            bar it simulates 300+ parameter combinations and surfaces the
            rolling-best one for your instrument and timeframe — no manual
            tuning, no fragile presets.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={TRIAL_MAILTO}
              className="inline-block px-7 py-3 rounded-md bg-gold text-background font-medium hover:bg-gold-dim transition-colors"
            >
              Start 7-day free trial
            </a>
            <a
              href={LAUNCH_LIVE ? GUMROAD_URL : TRIAL_MAILTO}
              target={LAUNCH_LIVE ? "_blank" : undefined}
              rel={LAUNCH_LIVE ? "noopener noreferrer" : undefined}
              className="inline-block px-7 py-3 rounded-md border border-white/15 text-foreground font-medium hover:bg-white/5 transition-colors"
            >
              {LAUNCH_LIVE ? "Subscribe · ₹499/mo" : "Notify me at launch"}
            </a>
          </div>
          <p className="text-sm text-muted-dim mt-6">
            {LAUNCH_LIVE
              ? "Cancel anytime · Annual subscribers lock the rate"
              : "Trial active now · Subscriptions open May 27"}
          </p>
        </div>
      </section>

      {/* ─── BACKTEST HIGHLIGHTS ─────────────────────────────────────────── */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim text-center mb-12">
            Backtest performance · daily timeframe
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <BacktestCard
              instrument="Nifty"
              pnl="+109.6%"
              drawdown="3.3%"
              trades={161}
              years="35.6y"
              highlight="Best risk-adjusted"
            />
            <BacktestCard
              instrument="BankNifty"
              pnl="+77.9%"
              drawdown="3.4%"
              trades={137}
              years="26.2y"
            />
            <BacktestCard
              instrument="Gold (XAUUSD)"
              pnl="+107.0%"
              drawdown="4.8%"
              trades={276}
              years="123.3y"
              highlight="Longest history"
            />
            <BacktestCard
              instrument="Silver (XAGUSD)"
              pnl="+135.1%"
              drawdown="11.2%"
              trades={335}
              years="155.3y"
              highlight="Highest return"
            />
          </div>
          <p className="text-sm text-muted-dim text-center mt-10 max-w-2xl mx-auto leading-relaxed">
            Numbers are gross of execution costs. The full backtest report
            includes a per-instrument live-drag estimator + 16 more cells
            (5m / 15m / 1h / 4h alongside daily). Delivered as PDF with every
            subscription.
          </p>
        </div>
      </section>

      {/* ─── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim text-center mb-12">
            How it works
          </h2>
          <div className="grid md:grid-cols-3 gap-10 md:gap-14">
            <StepBlock
              n="01"
              title="Install on TradingView"
              body="Subscribe, get your invite-only access within 5 minutes. Add ATE to any chart with one click."
            />
            <StepBlock
              n="02"
              title="ATE self-tunes"
              body="The engine runs its full search space against your chart's history. The on-chart Backtest Performance table shows the rolling-best configuration's live performance — not a curve-fit chosen in advance."
            />
            <StepBlock
              n="03"
              title="Trade the signals"
              body="Explicit Buy / Sell / Stop-Loss / Take-Profit markers on the chart. Eight named alert conditions plus optional webhook JSON for automation."
            />
          </div>
        </div>
      </section>

      {/* ─── WHAT'S IN THE BUNDLE ───────────────────────────────────────── */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim text-center mb-10">
            What you get
          </h2>
          <ul className="space-y-4 text-[15px] text-muted leading-relaxed">
            <BundleItem>
              <strong className="text-foreground">ATE indicator</strong> — TradingView invite-only access, single-user license, free lifetime updates
            </BundleItem>
            <BundleItem>
              <strong className="text-foreground">Strategy guide (PDF)</strong> — 6,500 words: logic, entry/exit rules, risk-management math, common mistakes, FAQ
            </BundleItem>
            <BundleItem>
              <strong className="text-foreground">Full backtest report (PDF)</strong> — 20 cells, per-cell analysis, gross-of-costs framing + live-drag estimator
            </BundleItem>
            <BundleItem>
              <strong className="text-foreground">Setup video</strong> — 6-minute walkthrough: install → settings → first alert → reading signals
            </BundleItem>
            <BundleItem>
              <strong className="text-foreground">Annotated chart screenshots</strong> — across multiple instruments and timeframes, real signals labelled
            </BundleItem>
            <BundleItem>
              <strong className="text-foreground">FAQ + ongoing support</strong> — email <a href="mailto:hello@helmquant.in" className="text-gold hover:text-gold-dim transition-colors">hello@helmquant.in</a>, 24-48h response
            </BundleItem>
          </ul>
        </div>
      </section>

      {/* ─── PRICING ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim text-center mb-10">
            Pricing
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <PriceCard
              plan="Monthly"
              price="₹499"
              period="/ month"
              note="Cancel anytime"
              ctaLabel={LAUNCH_LIVE ? "Subscribe monthly" : "Notify at launch"}
              ctaHref={LAUNCH_LIVE ? GUMROAD_URL : TRIAL_MAILTO}
            />
            <PriceCard
              plan="Annual"
              price="₹4,999"
              period="/ year"
              note="Save ~₹990 vs monthly · rate locked"
              highlighted
              ctaLabel={LAUNCH_LIVE ? "Subscribe annual" : "Notify at launch"}
              ctaHref={LAUNCH_LIVE ? GUMROAD_URL : TRIAL_MAILTO}
            />
          </div>
          <p className="text-sm text-muted-dim text-center mt-8 max-w-2xl mx-auto">
            No refunds after purchase — but every subscription starts with a
            7-day free trial via email request. If ATE doesn&rsquo;t fit your
            trading style, you walk away with no charge.
          </p>
        </div>
      </section>

      {/* ─── TRIAL CTA ──────────────────────────────────────────────────── */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center bg-navy-light/40 rounded-lg p-10">
          <h2 className="text-2xl md:text-3xl font-medium mb-4">
            Try ATE free for 7 days
          </h2>
          <p className="text-muted leading-relaxed mb-8">
            No payment up front. Email us your TradingView username and we send
            a 7-day invite. Try it on your charts before you decide.
          </p>
          <a
            href={TRIAL_MAILTO}
            className="inline-block px-7 py-3 rounded-md bg-gold text-background font-medium hover:bg-gold-dim transition-colors"
          >
            Email for trial access
          </a>
        </div>
      </section>

      {/* ─── FAQ ────────────────────────────────────────────────────────── */}
      <section className="px-6 py-16 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim text-center mb-10">
            Frequently asked
          </h2>
          <div className="space-y-8">
            <FaqItem
              q="What instruments and timeframes does ATE work on?"
              a="The engine is market-agnostic — it works on any liquid instrument with enough TradingView history. The published backtest covers Nifty, BankNifty (NSE), Gold (XAUUSD spot), and Silver (XAGUSD spot) across 5m / 15m / 1h / 4h / 1D. Daily is the strongest cell across every instrument tested."
            />
            <FaqItem
              q="Do I need to tune any settings?"
              a="No. ATE self-tunes on every bar. The only inputs are display preferences (table position, table size) and an optional webhook JSON toggle for automation. The trading parameters self-optimize."
            />
            <FaqItem
              q="What is the win rate?"
              a="35–55% across most cells. Typical for a trend follower — the edge comes from bigger wins covering smaller losses, not from a high hit rate. The full strategy guide explains the math in section 5."
            />
            <FaqItem
              q="What about drawdowns?"
              a="Shown openly in the backtest report. Most flagship cells run 3–5% maximum drawdown over the full data window; Silver 1D runs ~11% as the price of its higher upside. Cells with poor outcomes are kept in the report, not hidden."
            />
            <FaqItem
              q="How does the free trial work?"
              a="Email hello@helmquant.in with your TradingView username. You'll receive 7-day invite-only access plus the full bundle (strategy guide PDF, backtest report, setup video, annotated charts) within a few hours. No payment required. If ATE fits how you trade, come back and subscribe; if not, you walk away."
            />
          </div>
          <p className="text-sm text-muted-dim text-center mt-10">
            More questions? Email{" "}
            <a
              href="mailto:hello@helmquant.in"
              className="text-gold hover:text-gold-dim transition-colors"
            >
              hello@helmquant.in
            </a>
          </p>
        </div>
      </section>

      {/* ─── FOOTER ─────────────────────────────────────────────────────── */}
      <footer className="px-6 py-10 border-t border-white/5 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-dim">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Image
                src="/helmquant_mark_primary.svg"
                alt="Helm Quant"
                width={20}
                height={20}
              />
              Helm Quant
            </Link>
            <p>&copy; 2026</p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://x.com/helmquant"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              X
            </a>
            <a
              href="https://github.com/helmquant"
              className="hover:text-foreground transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@helmquant.in"
              className="hover:text-foreground transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function BacktestCard({
  instrument,
  pnl,
  drawdown,
  trades,
  years,
  highlight,
}: {
  instrument: string;
  pnl: string;
  drawdown: string;
  trades: number;
  years: string;
  highlight?: string;
}) {
  return (
    <div className="bg-navy-light/40 rounded-lg p-6 border border-white/5">
      <div className="flex items-baseline justify-between mb-3">
        <h3 className="font-medium">{instrument}</h3>
        <span className="text-xs text-muted-dim">{years}</span>
      </div>
      <p className="text-3xl font-medium text-gold mb-1">{pnl}</p>
      <p className="text-sm text-muted-dim mb-5">gross P&amp;L</p>
      <dl className="space-y-1 text-sm">
        <div className="flex justify-between text-muted">
          <dt>Max DD</dt>
          <dd>{drawdown}</dd>
        </div>
        <div className="flex justify-between text-muted">
          <dt>Trades</dt>
          <dd>{trades}</dd>
        </div>
      </dl>
      {highlight && (
        <p className="text-xs text-gold mt-4 pt-4 border-t border-white/5">
          {highlight}
        </p>
      )}
    </div>
  );
}

function StepBlock({
  n,
  title,
  body,
}: {
  n: string;
  title: string;
  body: string;
}) {
  return (
    <div>
      <p className="text-sm text-gold mb-3 font-mono">{n}</p>
      <h3 className="text-lg font-medium mb-3">{title}</h3>
      <p className="text-[15px] text-muted leading-relaxed">{body}</p>
    </div>
  );
}

function BundleItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-gold mt-1 shrink-0">→</span>
      <span>{children}</span>
    </li>
  );
}

function PriceCard({
  plan,
  price,
  period,
  note,
  ctaLabel,
  ctaHref,
  highlighted,
}: {
  plan: string;
  price: string;
  period: string;
  note: string;
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`rounded-lg p-8 border ${
        highlighted
          ? "border-gold/40 bg-gold/5"
          : "border-white/10 bg-navy-light/30"
      }`}
    >
      <p className="text-sm uppercase tracking-widest text-muted-dim mb-4">
        {plan}
      </p>
      <div className="flex items-baseline gap-1 mb-2">
        <span className="text-4xl font-medium">{price}</span>
        <span className="text-muted-dim">{period}</span>
      </div>
      <p className="text-sm text-muted mb-6">{note}</p>
      <a
        href={ctaHref}
        className={`block w-full text-center px-6 py-2.5 rounded-md font-medium transition-colors ${
          highlighted
            ? "bg-gold text-background hover:bg-gold-dim"
            : "border border-white/15 hover:bg-white/5"
        }`}
      >
        {ctaLabel}
      </a>
    </div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <h3 className="font-medium mb-2">{q}</h3>
      <p className="text-[15px] text-muted leading-relaxed">{a}</p>
    </div>
  );
}
