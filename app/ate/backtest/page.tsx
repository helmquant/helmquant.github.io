import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ATE Backtest Report — 50 cells, 10 instruments × 5 timeframes",
  description:
    "Full backtest report for the Helm Quant ATE indicator: 10 instruments × 5 timeframes = 50 cells, with methodology, drawdowns, and a per-instrument live-drag estimator. Drawdowns shown openly. No cherry-picking.",
  openGraph: {
    title: "ATE Backtest Report · Helm Quant",
    description:
      "10 instruments, 5 timeframes, 50 cells. Drawdowns shown openly. Methodology transparent. Read the data before you decide.",
    url: "https://helmquant.in/ate/backtest",
    type: "article",
  },
};

const TRIAL_MAILTO =
  "mailto:hello@helmquant.in?subject=ATE%20trial&body=Hi%2C%20please%20send%20me%20a%207-day%20trial%20invite%20for%20ATE.%0A%0AMy%20TradingView%20username%3A%20%5Byour%20username%5D";

// Full matrix data — 10 × 5 = 50 cells. Each row is one instrument.
type Cell = { pnl: string; dd: string; trades: string; pf: string; rf: string; data: string; note?: string };
type Row = { instrument: string; folder: string; cells: Record<string, Cell | null> };

const MATRIX: Row[] = [
  {
    instrument: "Nifty",
    folder: "nifty",
    cells: {
      "5m": { pnl: "+1.1%", dd: "0.2%", trades: "29/71", pf: "1.9", rf: "7.0", data: "1.1y" },
      "15m": { pnl: "+1.9%", dd: "0.3%", trades: "34/90", pf: "2.1", rf: "7.1", data: "3.3y" },
      "1h": { pnl: "+3.0%", dd: "0.6%", trades: "18/36", pf: "2.8", rf: "5.3", data: "12.3y" },
      "4h": { pnl: "+0.4%", dd: "0.0%", trades: "3/3", pf: "99.0", rf: "999", data: "17.2y", note: "Non-result (3 trades)" },
      "1D": { pnl: "+109.6%", dd: "3.3%", trades: "85/161", pf: "2.9", rf: "33.1", data: "35.6y" },
    },
  },
  {
    instrument: "BankNifty",
    folder: "bnf",
    cells: {
      "5m": { pnl: "+2.0%", dd: "0.4%", trades: "43/168", pf: "1.7", rf: "4.7", data: "1.1y" },
      "15m": { pnl: "+3.2%", dd: "0.3%", trades: "25/59", pf: "2.4", rf: "9.4", data: "3.3y" },
      "1h": { pnl: "+1.9%", dd: "0.5%", trades: "18/34", pf: "2.0", rf: "4.3", data: "12.3y" },
      "4h": { pnl: "+3.9%", dd: "1.3%", trades: "14/29", pf: "2.0", rf: "3.0", data: "17.2y" },
      "1D": { pnl: "+77.9%", dd: "3.4%", trades: "49/137", pf: "3.0", rf: "23.0", data: "26.2y" },
    },
  },
  {
    instrument: "Gold (XAUUSD)",
    folder: "gold",
    cells: {
      "5m": { pnl: "+1.6%", dd: "0.3%", trades: "15/34", pf: "2.7", rf: "6.2", data: "0.3y" },
      "15m": { pnl: "+6.6%", dd: "0.6%", trades: "46/122", pf: "2.5", rf: "10.9", data: "0.9y" },
      "1h": { pnl: "+8.3%", dd: "1.1%", trades: "49/91", pf: "2.5", rf: "7.6", data: "4.3y" },
      "4h": { pnl: "+9.4%", dd: "0.6%", trades: "24/51", pf: "3.9", rf: "14.6", data: "13.3y" },
      "1D": { pnl: "+107.0%", dd: "4.8%", trades: "122/276", pf: "2.3", rf: "22.2", data: "123.3y" },
    },
  },
  {
    instrument: "Silver (XAGUSD)",
    folder: "silver",
    cells: {
      "5m": { pnl: "+3.9%", dd: "0.6%", trades: "31/91", pf: "2.0", rf: "6.0", data: "0.3y" },
      "15m": { pnl: "+13.5%", dd: "1.3%", trades: "66/147", pf: "2.0", rf: "10.2", data: "0.9y" },
      "1h": { pnl: "+17.1%", dd: "1.5%", trades: "62/138", pf: "2.0", rf: "11.2", data: "4.3y" },
      "4h": { pnl: "+12.5%", dd: "3.6%", trades: "24/58", pf: "1.8", rf: "3.5", data: "13.3y" },
      "1D": { pnl: "+135.1%", dd: "11.2%", trades: "134/335", pf: "1.6", rf: "12.1", data: "155.3y" },
    },
  },
  {
    instrument: "SPX",
    folder: "spx",
    cells: {
      "5m": { pnl: "+1.8%", dd: "0.3%", trades: "49/107", pf: "2.2", rf: "7.1", data: "1y" },
      "15m": { pnl: "+0.9%", dd: "0.2%", trades: "18/44", pf: "2.1", rf: "4.5", data: "3y" },
      "1h": { pnl: "+10.0%", dd: "1.3%", trades: "132/298", pf: "1.5", rf: "7.8", data: "12.3y" },
      "4h": { pnl: "+4.7%", dd: "0.6%", trades: "15/23", pf: "4.2", rf: "8.4", data: "26.3y" },
      "1D": { pnl: "+170.9%", dd: "7.2%", trades: "257/577", pf: "1.9", rf: "23.7", data: "149.5y" },
    },
  },
  {
    instrument: "NDX",
    folder: "ndx",
    cells: {
      "5m": { pnl: "+3.2%", dd: "0.2%", trades: "33/58", pf: "4.7", rf: "14.5", data: "1y" },
      "15m": { pnl: "+2.7%", dd: "0.4%", trades: "27/53", pf: "2.8", rf: "7.4", data: "3y" },
      "1h": { pnl: "+6.0%", dd: "0.4%", trades: "19/33", pf: "4.5", rf: "16.4", data: "12.3y" },
      "4h": { pnl: "+8.9%", dd: "0.0%", trades: "7/7", pf: "99.0", rf: "999", data: "26.3y", note: "Non-result (7 trades)" },
      "1D": { pnl: "+61.5%", dd: "3.4%", trades: "72/177", pf: "2.2", rf: "17.8", data: "41.1y" },
    },
  },
  {
    instrument: "DJI",
    folder: "dji",
    cells: {
      "5m": null,
      "15m": null,
      "1h": null,
      "4h": null,
      "1D": { pnl: "+176.7%", dd: "7.2%", trades: "278/617", pf: "1.7", rf: "24.7", data: "129.8y" },
    },
  },
  {
    instrument: "BTCUSD",
    folder: "btcusd",
    cells: {
      "5m": { pnl: "+1.4%", dd: "0.6%", trades: "36/107", pf: "1.5", rf: "2.2", data: "0.2y" },
      "15m": { pnl: "+4.0%", dd: "1.6%", trades: "103/282", pf: "1.2", rf: "2.5", data: "0.6y" },
      "1h": { pnl: "+8.3%", dd: "1.7%", trades: "37/86", pf: "1.8", rf: "5.0", data: "2.4y" },
      "4h": { pnl: "+160.1%", dd: "4.3%", trades: "75/175", pf: "2.7", rf: "37.6", data: "9.4y", note: "Standout cell" },
      "1D": { pnl: "+104.4%", dd: "4.3%", trades: "15/27", pf: "4.5", rf: "24.4", data: "11.2y" },
    },
  },
  {
    instrument: "UKOIL (Brent)",
    folder: "ukoil",
    cells: {
      "5m": { pnl: "+3.2%", dd: "0.8%", trades: "22/61", pf: "2.3", rf: "3.8", data: "0.3y" },
      "15m": { pnl: "+3.6%", dd: "1.6%", trades: "31/107", pf: "1.5", rf: "2.2", data: "0.9y" },
      "1h": { pnl: "+7.0%", dd: "1.3%", trades: "16/40", pf: "2.5", rf: "5.3", data: "4.4y" },
      "4h": { pnl: "+13.5%", dd: "1.6%", trades: "52/167", pf: "1.7", rf: "8.6", data: "13.3y" },
      "1D": { pnl: "+259.3%", dd: "11.2%", trades: "61/130", pf: "2.2", rf: "23.2", data: "94.4y", note: "Highest return" },
    },
  },
  {
    instrument: "USDINR",
    folder: "usdinr",
    cells: {
      "5m": { pnl: "+0.5%", dd: "0.1%", trades: "41/110", pf: "2.1", rf: "9.9", data: "0.4y" },
      "15m": { pnl: "+0.8%", dd: "0.1%", trades: "52/122", pf: "2.0", rf: "9.7", data: "1.1y" },
      "1h": { pnl: "+0.8%", dd: "0.2%", trades: "27/66", pf: "1.7", rf: "4.3", data: "4.4y" },
      "4h": { pnl: "+3.5%", dd: "1.2%", trades: "86/199", pf: "1.4", rf: "3.1", data: "14.3y" },
      "1D": { pnl: "+18.2%", dd: "3.9%", trades: "74/185", pf: "2.3", rf: "4.7", data: "53.2y" },
    },
  },
];

export default function AteBacktestPage() {
  return (
    <main className="flex-1">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm text-muted-dim mb-3">
            <Link href="/ate" className="hover:text-foreground transition-colors">← Back to ATE</Link>
          </p>
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight mb-5">
            ATE Backtest Report
          </h1>
          <p className="text-lg md:text-xl text-muted leading-relaxed mb-8">
            10 instruments × 5 timeframes = 50 cells. Methodology transparent. Drawdowns shown openly. Non-result cells reported, not hidden.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <Stat label="Cells tested" value="50" />
            <Stat label="Longest history" value="155 years" sub="Silver, daily" />
            <Stat label="Highest return" value="+259%" sub="UKOIL, daily" />
          </div>
        </div>
      </section>

      {/* ─── METHODOLOGY ──────────────────────────────────────────────────── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim mb-8">
            Methodology
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-medium mb-4 text-foreground">What the simulator models</h3>
              <ul className="space-y-3 text-[15px] text-muted leading-relaxed">
                <ListItem>
                  <strong className="text-foreground">15% risk per trade.</strong> Fixed risk-percent of equity, compounded with the equity curve.
                </ListItem>
                <ListItem>
                  <strong className="text-foreground">Gap-realistic SL fills.</strong> If a bar opens past the stop, the fill is at open price (worse), not the SL level.
                </ListItem>
                <ListItem>
                  <strong className="text-foreground">Sample-size gates.</strong> Configurations with fewer than 20 trades are excluded from optimizer selection. Keeps cells like Nifty 4h (3 trades) from gaming the smart-score.
                </ListItem>
                <ListItem>
                  <strong className="text-foreground">No leverage.</strong> Returns compound on equity; no margin amplification.
                </ListItem>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-foreground">What it does NOT model</h3>
              <p className="text-[15px] text-muted leading-relaxed mb-4">
                Headline P&amp;L is <strong className="text-foreground">gross of execution costs.</strong> The simulator does not deduct brokerage or per-tick slippage. Use the drag estimator below to convert to a realistic net expectation for your broker.
              </p>
              <ul className="space-y-3 text-[15px] text-muted leading-relaxed">
                <ListItem>Brokerage / commission per trade</ListItem>
                <ListItem>Slippage beyond the gap-realistic SL fill</ListItem>
                <ListItem>STT, GST, capital-gains tax — vary by jurisdiction</ListItem>
                <ListItem>Market impact at size</ListItem>
                <ListItem>Variance in live execution (the simulator assumes the closing price of every signal bar)</ListItem>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LIVE DRAG ESTIMATOR ──────────────────────────────────────────── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim mb-3">
            Live drag estimator
          </h2>
          <p className="text-sm text-muted-dim mb-8">
            Approximate execution-cost drag on flagship 1D cells. Subtract from gross P&amp;L for a realistic net expectation.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-muted-dim">
                  <th className="text-left py-2 pr-4">Instrument</th>
                  <th className="text-right py-2 px-4">Trades</th>
                  <th className="text-right py-2 px-4">Lifetime drag (est.)</th>
                  <th className="text-right py-2 px-4">Gross P&amp;L</th>
                  <th className="text-right py-2 pl-4">Net (est.)</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <DragRow inst="UKOIL 1D" trades="130 over 94y" drag="~1.5–3%" gross="+259.3%" net="~+255–258%" />
                <DragRow inst="DJI 1D" trades="617 over 130y" drag="~3–5%" gross="+176.7%" net="~+171–174%" />
                <DragRow inst="SPX 1D" trades="577 over 149y" drag="~3–5%" gross="+170.9%" net="~+165–168%" />
                <DragRow inst="Silver 1D" trades="335 over 155y" drag="~3–5%" gross="+135.1%" net="~+130–132%" />
                <DragRow inst="Nifty 1D" trades="161 over 36y" drag="~1.5–3%" gross="+109.6%" net="~+106–108%" />
                <DragRow inst="Gold 1D" trades="276 over 123y" drag="~2–4%" gross="+107.0%" net="~+103–105%" />
                <DragRow inst="BTCUSD 1D" trades="27 over 11y" drag="~0.5–1%" gross="+104.4%" net="~+103–104%" />
                <DragRow inst="BankNifty 1D" trades="137 over 26y" drag="~1.5–3%" gross="+77.9%" net="~+75–76%" />
                <DragRow inst="NDX 1D" trades="177 over 41y" drag="~1–2%" gross="+61.5%" net="~+59–61%" />
                <DragRow inst="USDINR 1D" trades="185 over 53y" drag="~2–4%" gross="+18.2%" net="~+15–16%" />
              </tbody>
            </table>
          </div>
          <p className="text-sm text-muted-dim mt-6 leading-relaxed">
            Intraday cells (5m, 15m) have proportionally much larger drag because trade counts are higher relative to data span. BankNifty 5m&rsquo;s 168 trades in just over a year are likely close to breakeven once realistic costs are deducted, even though the gross is +2.0%.
          </p>
        </div>
      </section>

      {/* ─── FULL MATRIX ──────────────────────────────────────────────────── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim mb-3">
            The full 50-cell matrix
          </h2>
          <p className="text-sm text-muted-dim mb-8">
            Gross P&amp;L for every cell. Cells with dashes had no qualifying trades on TradingView&rsquo;s data feed — reported in full for transparency.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-muted-dim">
                  <th className="text-left py-2 pr-4">Instrument</th>
                  <th className="text-right py-2 px-3">5m</th>
                  <th className="text-right py-2 px-3">15m</th>
                  <th className="text-right py-2 px-3">1h</th>
                  <th className="text-right py-2 px-3">4h</th>
                  <th className="text-right py-2 pl-3 text-gold">1D</th>
                </tr>
              </thead>
              <tbody>
                {MATRIX.map((row) => (
                  <tr key={row.folder} className="border-b border-white/5">
                    <td className="py-2 pr-4 font-medium">{row.instrument}</td>
                    {["5m", "15m", "1h", "4h", "1D"].map((tf) => {
                      const c = row.cells[tf];
                      return (
                        <td
                          key={tf}
                          className={`text-right py-2 ${tf === "1D" ? "pl-3 text-gold" : "px-3"} ${c?.note ? "text-muted-dim" : "text-muted"}`}
                        >
                          {c ? c.pnl : "—"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── PER-INSTRUMENT DEEP DIVES ────────────────────────────────────── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim mb-3">
            Per-instrument deep dives
          </h2>
          <p className="text-sm text-muted-dim mb-10">
            Each instrument&rsquo;s daily-chart screenshot shows ATE running live with the Backtest Performance table visible.
          </p>
          {MATRIX.map((row, i) => (
            <InstrumentSection key={row.folder} row={row} index={i} />
          ))}
        </div>
      </section>

      {/* ─── CROSS-CUTTING OBSERVATIONS ───────────────────────────────────── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim mb-8">
            Cross-cutting observations
          </h2>
          <div className="space-y-8 text-[15px] text-muted leading-relaxed">
            <Obs n="1" title="Daily timeframe wins on 9 out of 10 instruments">
              The 1D cell is the highest-P&amp;L row for every instrument except BTCUSD, where 4h edges out 1D by a hair. Trend signals are cleanest on daily bars where intraday noise washes out.
            </Obs>
            <Obs n="2" title="Win rates under 50% are the norm">
              8 of 10 flagship 1D cells win fewer than half their trades. The PF of 1.6–4.5 across these cells means winners are 1.6–4.5× the size of losers on average — that&rsquo;s where the edge lives. If you can&rsquo;t psychologically tolerate losing 55–60% of trades while still ending the year up, ATE isn&rsquo;t for you.
            </Obs>
            <Obs n="3" title="Two genuine intraday exceptions">
              <strong className="text-foreground">BTCUSD 4h</strong> — +160% with RF 37.6 over 9.4 years; the highest 4h Return Factor in the matrix. Crypto trends are durable enough on a 4h chart that ATE catches them cleanly. <strong className="text-foreground">NDX 1h</strong> — PF 4.5 over 12.3 years; the cleanest 1h profit factor anywhere. Otherwise, sub-1h cells produce toy returns once execution costs are deducted.
            </Obs>
            <Obs n="4" title="Cells that should not be traded">
              Nifty 4h (3 trades over 17 years). NDX 4h (7 trades, 100% win-rate — curve-fit on a small sample). DJI intraday (no qualifying trades on TradingView&rsquo;s feed at any sub-daily timeframe). Reported in full because hiding them would be dishonest. Don&rsquo;t trade them.
            </Obs>
            <Obs n="5" title="Return scale follows volatility">
              The largest returns (UKOIL +259%, DJI +177%, SPX +171%, Silver +135%) come from instruments with the longest history and moderate-to-high volatility. The smallest (USDINR +18%) comes from the calmest instrument. The trend-follower&rsquo;s deal stated plainly: bigger trends → bigger returns, with proportional drawdowns to match.
            </Obs>
          </div>
        </div>
      </section>

      {/* ─── PER-INSTRUMENT RECOMMENDATIONS ───────────────────────────────── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim mb-8">
            Recommended cell per instrument
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-muted-dim">
                  <th className="text-left py-2 pr-4">Instrument</th>
                  <th className="text-left py-2 px-4">Primary TF</th>
                  <th className="text-left py-2 pl-4">Reasoning</th>
                </tr>
              </thead>
              <tbody className="text-muted">
                <RecRow inst="Nifty" tf="1D" reason="RF 33.1 — best risk-adjusted cell in matrix. 4h is non-result, avoid." />
                <RecRow inst="BankNifty" tf="1D" reason="Mirrors Nifty pattern; 4h reasonable for lower-frequency signals." />
                <RecRow inst="Gold" tf="1D" reason="Best returns + lowest DD on 1D commodities. 4h has best PF (3.9)." />
                <RecRow inst="Silver" tf="1h or 1D" reason="1h for risk-adjusted (DD 1.5%); 1D for max upside but plan for 11.2% drawdown." />
                <RecRow inst="SPX" tf="1D" reason="150y of data, RF 23.7, 577 trades. Strongest single sample in matrix." />
                <RecRow inst="NDX" tf="1D" reason="Cleanest US-index DD (3.4%). 1h has best PF in 1h row (4.5)." />
                <RecRow inst="DJI" tf="1D only" reason="Intraday is empty on TradingView's DJI feed. 1D is +176.7% over 130y." />
                <RecRow inst="BTCUSD" tf="4h or 1D" reason="4h is the standout 4h cell in matrix (+160%, RF 37.6). 1D has highest 1D PF (4.5)." />
                <RecRow inst="UKOIL" tf="1D" reason="Highest absolute return in matrix (+259%). Accept the 11.2% DD or skip." />
                <RecRow inst="USDINR" tf="1D" reason="FX-scale returns (+18%) and FX-scale drawdowns (3.9%). Ballast or skip." />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── WHAT THIS DOES NOT TELL YOU ──────────────────────────────────── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-sm uppercase tracking-widest text-muted-dim mb-8">
            What this report does not tell you
          </h2>
          <ol className="space-y-4 text-[15px] text-muted leading-relaxed list-decimal pl-5">
            <li><strong className="text-foreground">Live trading variance.</strong> The simulator assumes you got the closing price of every signal bar. Real execution will differ — sometimes better with limit orders, more often slightly worse with slippage.</li>
            <li><strong className="text-foreground">Execution costs at scale.</strong> The simulator does not deduct brokerage or per-tick slippage. The drag estimator above gives you a way to subtract realistic costs yourself.</li>
            <li><strong className="text-foreground">Taxes and exchange charges.</strong> None of the local-jurisdiction taxes (STT/GST in India, 1099 reporting in the US, equivalents elsewhere) are modelled. Account for them yourself.</li>
            <li><strong className="text-foreground">Sample concentration.</strong> Some cells span regime changes — gold-standard transitions, demonetisation, COVID, central-bank intervention cycles. Past trend-following performance under those regimes is not a guarantee.</li>
            <li><strong className="text-foreground">You.</strong> The biggest variable in live trading is the trader. ATE producing +109% Nifty 1D in the simulator does not produce +109% in your account if you override signals, skip trades during drawdowns, or size emotionally.</li>
          </ol>
        </div>
      </section>

      {/* ─── DISCLAIMER + CTA ─────────────────────────────────────────────── */}
      <section className="px-6 py-12 border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-muted-dim leading-relaxed mb-10">
            ATE is a software tool. It does not provide investment advice. Every trading decision is yours. Backtest performance is not future performance. Past results shown here were generated by a deterministic simulator using TradingView&rsquo;s historical price data — they do not represent actual trading P&amp;L on any real account. Helm Quant is not a registered investment advisor in any jurisdiction.
          </p>
          <div className="bg-navy-light/40 rounded-lg p-8 text-center">
            <h3 className="text-xl font-medium mb-3">
              Try ATE free for 7 days
            </h3>
            <p className="text-muted leading-relaxed mb-6">
              Email us your TradingView username and we&rsquo;ll send a 7-day invite. Run ATE on your own charts and verify these numbers yourself.
            </p>
            <a
              href={TRIAL_MAILTO}
              className="inline-block px-7 py-3 rounded-md bg-gold text-background font-medium hover:bg-gold-dim transition-colors"
            >
              Request trial access
            </a>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="px-6 py-10 border-t border-white/5 mt-auto">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-dim">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hover:text-foreground transition-colors flex items-center gap-2"
            >
              <Image src="/helmquant_mark_primary.svg" alt="Helm Quant" width={20} height={20} />
              Helm Quant
            </Link>
            <p>&copy; 2026</p>
          </div>
          <div className="flex gap-6">
            <Link href="/ate" className="hover:text-foreground transition-colors">ATE</Link>
            <a href="https://x.com/helmquant" className="hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">X</a>
            <a href="mailto:hello@helmquant.in" className="hover:text-foreground transition-colors">Email</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="bg-navy-light/40 rounded-lg p-4 border border-white/5">
      <p className="text-xs text-muted-dim uppercase tracking-wider">{label}</p>
      <p className="text-2xl font-medium text-gold mt-1">{value}</p>
      {sub && <p className="text-xs text-muted-dim mt-1">{sub}</p>}
    </div>
  );
}

function ListItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="text-gold shrink-0">→</span>
      <span>{children}</span>
    </li>
  );
}

function DragRow({
  inst,
  trades,
  drag,
  gross,
  net,
}: {
  inst: string;
  trades: string;
  drag: string;
  gross: string;
  net: string;
}) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-2 pr-4 font-medium text-foreground">{inst}</td>
      <td className="text-right py-2 px-4">{trades}</td>
      <td className="text-right py-2 px-4">{drag}</td>
      <td className="text-right py-2 px-4">{gross}</td>
      <td className="text-right py-2 pl-4 text-gold">{net}</td>
    </tr>
  );
}

function RecRow({ inst, tf, reason }: { inst: string; tf: string; reason: string }) {
  return (
    <tr className="border-b border-white/5">
      <td className="py-3 pr-4 font-medium text-foreground">{inst}</td>
      <td className="py-3 px-4 text-gold">{tf}</td>
      <td className="py-3 pl-4 text-[14px]">{reason}</td>
    </tr>
  );
}

function Obs({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-medium text-foreground mb-2">
        <span className="text-gold font-mono mr-2">{n}.</span>
        {title}
      </h3>
      <p className="text-[15px] text-muted leading-relaxed">{children}</p>
    </div>
  );
}

function InstrumentSection({ row, index }: { row: Row; index: number }) {
  const cells = row.cells;
  const intradayTimeframes: { tf: string; label: string }[] = [
    { tf: "5m", label: "5m" },
    { tf: "15m", label: "15m" },
    { tf: "1h", label: "1h" },
    { tf: "4h", label: "4h" },
  ];

  return (
    <div className={index > 0 ? "mt-14 pt-14 border-t border-white/5" : ""}>
      <h3 className="text-xl font-medium mb-5">{row.instrument}</h3>

      {/* Stats table on top */}
      <div className="overflow-x-auto mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-muted-dim text-left">
              <th className="py-2 pr-3">TF</th>
              <th className="py-2 px-3 text-right">P&amp;L</th>
              <th className="py-2 px-3 text-right">DD</th>
              <th className="py-2 px-3 text-right">W/T</th>
              <th className="py-2 px-3 text-right">PF</th>
              <th className="py-2 px-3 text-right">RF</th>
              <th className="py-2 pl-3 text-right">Data</th>
            </tr>
          </thead>
          <tbody className="text-muted">
            {["5m", "15m", "1h", "4h", "1D"].map((tf) => {
              const c = cells[tf];
              return (
                <tr key={tf} className="border-b border-white/5">
                  <td className={`py-2 pr-3 font-mono ${tf === "1D" ? "text-gold" : ""}`}>{tf}</td>
                  {c ? (
                    <>
                      <td className={`text-right py-2 px-3 ${tf === "1D" ? "text-gold font-medium" : ""}`}>{c.pnl}</td>
                      <td className="text-right py-2 px-3">{c.dd}</td>
                      <td className="text-right py-2 px-3">{c.trades}</td>
                      <td className="text-right py-2 px-3">{c.pf}</td>
                      <td className="text-right py-2 px-3">{c.rf}</td>
                      <td className="text-right py-2 pl-3 text-muted-dim">{c.data}</td>
                    </>
                  ) : (
                    <td colSpan={6} className="text-right py-2 text-muted-dim italic">no qualifying trades</td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {cells["1D"]?.note && (
        <p className="text-sm text-gold mb-2">→ {cells["1D"].note}</p>
      )}
      {cells["4h"]?.note && (
        <p className="text-xs text-muted-dim mb-2">⚠ 4h: {cells["4h"].note}</p>
      )}

      {/* Chart full width below table */}
      <a
        href={`/backtests/${row.folder}/daily.webp`}
        target="_blank"
        rel="noopener noreferrer"
        className="block group"
      >
        <Image
          src={`/backtests/${row.folder}/daily.webp`}
          alt={`${row.instrument} daily chart with ATE running, showing Backtest Performance table in the top-right corner`}
          width={1600}
          height={1006}
          className="rounded-lg border border-white/5 w-full group-hover:border-gold/30 transition-colors"
        />
        <p className="text-xs text-muted-dim mt-2 text-center group-hover:text-gold transition-colors">
          {row.instrument} 1D — click to open at full resolution
        </p>
      </a>

      {/* Other timeframes as plain text links — opens the WebP in a new tab */}
      <div className="text-xs text-muted-dim mt-4 text-center">
        <span className="mr-3">Other timeframes:</span>
        {intradayTimeframes.map((t, i) => {
          const c = cells[t.tf];
          if (!c) {
            return (
              <span key={t.tf} className="mr-3 line-through opacity-50">
                {t.label}
              </span>
            );
          }
          return (
            <a
              key={t.tf}
              href={`/backtests/${row.folder}/${t.tf}.webp`}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-3 hover:text-gold transition-colors underline decoration-dotted underline-offset-4"
            >
              {t.label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
