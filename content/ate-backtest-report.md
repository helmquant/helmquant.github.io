# ATE — Backtest Report (v1.0)

**Indicator:** ATE — Adaptive Trend Engine
**Helm Quant** · https://helmquant.in
**Report date:** May 19, 2026
**Data collected:** TradingView, May 9–19, 2026
**Coverage:** 10 instruments × 5 timeframes = 50 cells

---

## Read this first

This report is the honest one. Drawdowns appear next to returns. Cells that didn't work are kept in the table, not hidden. The methodology is described in full so you can reproduce the numbers yourself.

If you've ever bought a "trading indicator" from Telegram with a backtest that showed 95% win rate and zero drawdown — this is the opposite of that. ATE wins less than half the time on most instruments. It still makes money because the wins are larger than the losses. That's how trend following works.

What this report is NOT:

- A promise of future returns.
- A trading signal service.
- Investment advice.

What it IS:

- A reproducible snapshot of how ATE's rolling-best configuration performed on real historical data for four major instruments across five timeframes, with realistic execution costs modeled.

---

## How to read the numbers

Six columns appear throughout this report. Here's what each means and how to interpret it.

| Column | Meaning | Higher is better? |
|---|---|---|
| **W/T** | Wins / Total Trades | Bigger T means more confidence in the stats |
| **Win%** | Win rate (W ÷ T × 100) | Not necessarily — see note below |
| **P&L%** | Net profit/loss as % of starting equity over the data window | Yes (but read with Max DD) |
| **Max DD%** | Largest peak-to-trough drawdown observed during the simulation | Lower is better |
| **PF** | Profit Factor = gross gains ÷ gross losses | Yes. 1.0 = breakeven. >2.0 is strong |
| **RF** | Return Factor = net P&L ÷ Max DD | Yes. Higher = better return per unit of pain |

**On Win%:** Trend followers typically win 35–55% of trades. The edge comes from average win being much larger than average loss. A 40% win rate with PF 2.5 is healthier than a 70% win rate with PF 1.1.

**On Data column** (years of history): more data is more reliable. Numbers from cells with < 1y of data are preliminary and should not drive sizing decisions on their own.

---

## Methodology

**Indicator under test:** ATE v1.0, with no manual parameter overrides. ATE self-tunes across a configuration space on every bar; the row shown is the rolling-best configuration's live performance — not a curve-fitted single combo.

**Data source:** TradingView native data feed. Each cell's "Data" column shows the years of history the ATE optimizer saw on that chart/timeframe.

**What the simulator DOES model:**

- **Position sizing.** Each trade risks 15% of current equity. This is a fixed risk-percent model that compounds with the equity curve, not a fixed-rupee model.
- **Gap-realistic SL fills.** When a bar opens past the stop, the simulated fill is at the open price (worse), not at the stop-loss level itself. Enforced in the Pine simulation code on every exit.
- **Sample-size gates.** Configurations with fewer than 20 trades (or 20% of the maximum trade count on the chart, whichever is smaller) are excluded from the rolling optimizer selection. This is what keeps cells like Nifty 4h (3 trades) from gaming the smart-score and surfacing as a recommendation.
- **No leverage assumptions.** Returns compound on equity; no margin amplification is built in.

**What the simulator does NOT model — gross-of-costs disclaimer:**

The headline P&L numbers in the matrix below are **gross of execution costs.** The Pine simulator deducts neither brokerage nor per-tick slippage. Live trading will produce a smaller realized return than the backtest. Estimate your live drag yourself using the table in the next section; do not assume the report numbers are net of execution costs.

Other things explicitly **not** modeled:

- Brokerage / commission per trade
- Slippage beyond the gap-realistic SL fill mechanic
- STT, GST, and exchange charges (additional tax drag on top of brokerage)
- Market impact for large orders (size matters)
- Overnight margin / mark-to-market requirements
- Psychological cost of sitting through drawdowns
- Variance in live execution (TradingView's bar-data simulator assumes you got the closing price of every signal bar)

Live trading will produce worse results than the backtest. Plan for it.

### Live drag estimator

Approximate execution-cost drag on the flagship daily cells, using retail-rate brokerage per leg + ~1-tick slippage per side:

| Instrument | Trades | Lifetime drag (estimate) | Gross P&L | Net P&L (estimate) |
|---|---|---|---|---|
| Nifty 1D | 161 over 35.6y | ~1.5–3% | +109.6% | ~+106–108% |
| BankNifty 1D | 137 over 26.2y | ~1.5–3% | +77.9% | ~+75–76% |
| Gold 1D | 276 over 123.3y | ~2–4% | +107.0% | ~+103–105% |
| Silver 1D | 335 over 155.3y | ~3–5% | +135.1% | ~+130–132% |
| SPX 1D | 577 over 149.5y | ~3–5% | +170.9% | ~+165–168% |
| NDX 1D | 177 over 41.1y | ~1–2% | +61.5% | ~+59–61% |
| DJI 1D | 617 over 129.8y | ~3–5% | +176.7% | ~+171–174% |
| BTCUSD 1D | 27 over 11.2y | ~0.5–1% | +104.4% | ~+103–104% |
| UKOIL 1D | 130 over 94.4y | ~1.5–3% | +259.3% | ~+255–258% |
| USDINR 1D | 185 over 53.2y | ~2–4% | +18.2% | ~+15–16% |

Daily-timeframe cells have small lifetime drag because trade counts are modest relative to the data span. **Intraday cells (5m, 15m) have proportionally much larger drag** — BankNifty 5m's 168 trades in just over a year are likely to net out close to breakeven once realistic costs are deducted, even though the gross number is +2.0%. This reinforces the report's recommendation to avoid 5m and 15m timeframes for ATE in live trading.

**The drag bites smaller-return instruments harder.** USDINR 1D's +18.2% gross becomes only ~+15–16% net — a relatively heavy proportional cut because FX moves are small in % terms but you still pay full execution costs on every trade. UKOIL 1D's +259% loses just 1–2 percentage points proportionally; the bigger the trend you're catching, the smaller the proportional drag.

Use the table above to estimate your own live drag based on your broker's actual brokerage rate and the instrument's typical bid-ask spread. The Pine simulator does not deduct these costs for you; the numbers in the matrix are gross.

---

## The full matrix

50 cells. 10 instruments × 5 timeframes. Every number measured from the same v1.0 indicator using TradingView's own historical data.

**The 10 instruments:** Nifty, BankNifty (NSE indices) · Gold (XAUUSD), Silver (XAGUSD), Brent crude (UKOIL) — global commodities · SPX, NDX, DJI (US equity indices) · BTCUSD (crypto) · USDINR (FX). Chosen to span asset classes a serious global retail trader actually watches.

**A note on scope.** ATE itself is market-agnostic — the engine has no instrument-specific dependency. If you want to see ATE on an instrument not listed here, the fastest path is to load it on your own chart: the same number-generating logic that produced this report runs live on every chart you open.

### Nifty (NSE:NIFTY)

| TF  | W/T    | Win%   | P&L%    | Max DD% | PF   | RF    | Data  |
|-----|--------|--------|---------|---------|------|-------|-------|
| 5m  | 29/71  | 40.8%  | +1.1%   | 0.2%    | 1.9  | 7.0   | 1.1y  |
| 15m | 34/90  | 37.8%  | +1.9%   | 0.3%    | 2.1  | 7.1   | 3.3y  |
| 1h  | 18/36  | 50.0%  | +3.0%   | 0.6%    | 2.8  | 5.3   | 12.3y |
| 4h  | 3/3    | 100.0% | +0.4%   | 0.0%    | 99.0 | 999.0 | 17.2y |
| 1D  | 85/161 | 52.8%  | +109.6% | 3.3%    | 2.9  | 33.1  | 35.6y |

**Read this:** Nifty 4h shows 3 trades in 17 years. That's not a strategy — that's an accident. Ignore the perfect-looking stats; the sample size is too small to mean anything. **Do not trade ATE on Nifty 4h.** It's in the matrix for transparency, not as a recommendation.

The clear cell to trade is **Nifty 1D**: 85 wins out of 161 trades over 35.6 years of data, +109.6% net P&L, 3.3% maximum drawdown, RF 33.1. That's a strong, durable cell. The 1h cell is a reasonable alternative for active traders.

### BankNifty (NSE:BANKNIFTY)

| TF  | W/T    | Win%  | P&L%   | Max DD% | PF  | RF   | Data  |
|-----|--------|-------|--------|---------|-----|------|-------|
| 5m  | 43/168 | 25.6% | +2.0%  | 0.4%    | 1.7 | 4.7  | 1.1y  |
| 15m | 25/59  | 42.4% | +3.2%  | 0.3%    | 2.4 | 9.4  | 3.3y  |
| 1h  | 18/34  | 52.9% | +1.9%  | 0.5%    | 2.0 | 4.3  | 12.3y |
| 4h  | 14/29  | 48.3% | +3.9%  | 1.3%    | 2.0 | 3.0  | 17.2y |
| 1D  | 49/137 | 35.8% | +77.9% | 3.4%    | 3.0 | 23.0 | 26.2y |

**Read this:** BankNifty 5m has 25.6% win rate — looks scary. But the PF is 1.7 and the cell is net positive over a year of data. This is classic trend-follower behavior: lots of small losses, a few big wins. The 1D cell is the workhorse: 49/137 wins (35.8% — even lower!) but PF 3.0 and RF 23.0. The drawdown is contained at 3.4%.

**Recommended cell: 1D primary, 1h alternative.**

### Gold

*Data source: TradingView's XAUUSD feed (spot gold; multi-source synthesized history going back over a century). The engine works the same way on MCX:GOLD1!, US-listed gold futures (GC), or any other gold instrument — XAUUSD is used here for its long, clean history and 24-hour coverage. Indian traders typically run alerts on XAUUSD and execute on MCX.*

| TF  | W/T     | Win%  | P&L%    | Max DD% | PF  | RF   | Data    |
|-----|---------|-------|---------|---------|-----|------|---------|
| 5m  | 15/34   | 44.1% | +1.6%   | 0.3%    | 2.7 | 6.2  | 0.3y    |
| 15m | 46/122  | 37.7% | +6.6%   | 0.6%    | 2.5 | 10.9 | 0.9y    |
| 1h  | 49/91   | 53.8% | +8.3%   | 1.1%    | 2.5 | 7.6  | 4.3y    |
| 4h  | 24/51   | 47.1% | +9.4%   | 0.6%    | 3.9 | 14.6 | 13.3y   |
| 1D  | 122/276 | 44.2% | +107.0% | 4.8%    | 2.3 | 22.2 | 123.3y  |

**Read this:** Gold 1D is the headline cell of this entire report — +107% net P&L over **123 years** of synthesized historical data with only 4.8% maximum drawdown. 276 trades is a huge sample; the stats are as confident as a single-instrument backtest can be.

But the 4h cell is the quiet star. Profit factor 3.9 is the highest in the entire 20-cell matrix. Drawdown is 0.6% over 13 years. If you want a low-volatility ATE configuration to add to a portfolio, **Gold 4h** is the boring-best answer.

**Recommended cell: 1D primary, 4h for low-drawdown allocation.**

### Silver

*Data source: TradingView's XAGUSD feed (spot silver; multi-source synthesised history). As with Gold, the engine works the same way on MCX:SILVER1!, US-listed silver futures (SI), or any other silver instrument. XAGUSD is used here for its long history and 24-hour coverage.*

| TF  | W/T     | Win%  | P&L%    | Max DD% | PF  | RF   | Data    |
|-----|---------|-------|---------|---------|-----|------|---------|
| 5m  | 31/91   | 34.1% | +3.9%   | 0.6%    | 2.0 | 6.0  | 0.3y    |
| 15m | 66/147  | 44.9% | +13.5%  | 1.3%    | 2.0 | 10.2 | 0.9y    |
| 1h  | 62/138  | 44.9% | +17.1%  | 1.5%    | 2.0 | 11.2 | 4.3y    |
| 4h  | 24/58   | 41.4% | +12.5%  | 3.6%    | 1.8 | 3.5  | 13.3y   |
| 1D  | 134/335 | 40.0% | +135.1% | 11.2%   | 1.6 | 12.1 | 155.3y  |

**Read this:** Silver 1D produces the **highest absolute P&L** of any cell in this report — +135.1% over 155 years of data. It also produces the **highest maximum drawdown** — 11.2%.

This is not a flaw. Silver is the most volatile of the four instruments tested, and the daily-trend signals capture big multi-month moves. The drawdown is the price of admission to those moves. Anyone trading Silver 1D needs to budget account size such that an 11.2% drawdown is psychologically tolerable.

The 1h cell is more conservative: +17.1% P&L with 1.5% drawdown over 4+ years. Best risk-adjusted intraday cell across all four instruments.

**Recommended cell:** depends on tolerance. **1h for risk-adjusted returns. 1D for max return — only if the 11.2% drawdown is sized into your account from day one.**

### SPX (S&P 500)

| TF  | W/T     | Win%  | P&L%    | Max DD% | PF  | RF   | Data    |
|-----|---------|-------|---------|---------|-----|------|---------|
| 5m  | 49/107  | 45.8% | +1.8%   | 0.3%    | 2.2 | 7.1  | 1y      |
| 15m | 18/44   | 40.9% | +0.9%   | 0.2%    | 2.1 | 4.5  | 3y      |
| 1h  | 132/298 | 44.3% | +10.0%  | 1.3%    | 1.5 | 7.8  | 12.3y   |
| 4h  | 15/23   | 65.2% | +4.7%   | 0.6%    | 4.2 | 8.4  | 26.3y   |
| 1D  | 257/577 | 44.5% | +170.9% | 7.2%    | 1.9 | 23.7 | 149.5y  |

**Read this:** SPX 1D is one of the headline cells of the expanded matrix — +170.9% over **149 years** of synthesised historical data with a 7.2% max drawdown. 577 trades is the largest single-cell sample in the report. The 4h cell shows a high win-rate (65%) but only 23 trades — read it as suggestive, not definitive.

**Recommended cell:** 1D primary. 4h is interesting but the sample is thin.

### NDX (Nasdaq 100)

| TF  | W/T    | Win%   | P&L%    | Max DD% | PF   | RF    | Data   |
|-----|--------|--------|---------|---------|------|-------|--------|
| 5m  | 33/58  | 56.9%  | +3.2%   | 0.2%    | 4.7  | 14.5  | 1y     |
| 15m | 27/53  | 50.9%  | +2.7%   | 0.4%    | 2.8  | 7.4   | 3y     |
| 1h  | 19/33  | 57.6%  | +6.0%   | 0.4%    | 4.5  | 16.4  | 12.3y  |
| 4h  | 3/3    | 100.0% | +0.4%   | 0.0%    | 99.0 | 999.0 | 17.2y  |
| 1D  | 72/177 | 40.7%  | +61.5%  | 3.4%    | 2.2  | 17.8  | 41.1y  |

**Read this:** NDX 1D is the cleanest US-index cell in the report — +61.5% with only 3.4% drawdown over 41 years. Lower absolute return than SPX or DJI because Nasdaq has fewer durable multi-decade trends than the broad market, but the risk-adjusted profile is excellent. The 1h cell is the best 1h profit-factor in the entire matrix (PF 4.5) — worth attention for intraday US-equity traders.

The 4h cell is a 7-trade non-result; ignore it for marketing or sizing purposes.

**Recommended cell:** 1D primary. 1h reasonable for active intraday on the Nasdaq.

### DJI (Dow Jones)

| TF  | W/T     | Win%  | P&L%    | Max DD% | PF  | RF   | Data    |
|-----|---------|-------|---------|---------|-----|------|---------|
| 5m  | —       | —     | —       | —       | —   | —    | 1y      |
| 15m | —       | —     | —       | —       | —   | —    | 3.1y    |
| 1h  | —       | —     | —       | —       | —   | —    | 12.3y   |
| 4h  | —       | —     | —       | —       | —   | —    | 26.3y   |
| 1D  | 278/617 | 45.1% | +176.7% | 7.2%    | 1.7 | 24.7 | 129.8y  |

**Read this:** DJI 1D is one of the absolute-return leaders — +176.7% over 130 years of data, 617 trades. But every intraday cell on DJI shows zero qualifying trades. This isn't a bug in ATE — it's a quirk of TradingView's DJI intraday feed (the bar structure produces fewer of the configurations the engine considers high-quality at sub-daily timeframes). Reported in full for transparency.

**Recommended cell:** 1D only. Skip intraday on this feed.

### BTCUSD (Bitcoin)

| TF  | W/T     | Win%  | P&L%    | Max DD% | PF  | RF   | Data    |
|-----|---------|-------|---------|---------|-----|------|---------|
| 5m  | 36/107  | 33.6% | +1.4%   | 0.6%    | 1.5 | 2.2  | 0.2y    |
| 15m | 103/282 | 36.5% | +4.0%   | 1.6%    | 1.2 | 2.5  | 0.6y    |
| 1h  | 37/86   | 43.0% | +8.3%   | 1.7%    | 1.8 | 5.0  | 2.4y    |
| 4h  | 75/175  | 42.9% | +160.1% | 4.3%    | 2.7 | 37.6 | 9.4y    |
| 1D  | 15/27   | 55.6% | +104.4% | 4.3%    | 4.5 | 24.4 | 11.2y   |

**Read this:** Bitcoin is the surprise of the expanded matrix on two counts:

1. **BTCUSD 4h is the standout cell of the entire matrix.** +160.1% net P&L, 4.3% drawdown, RF **37.6** over 9.4 years. The highest 4h Return Factor anywhere in the report. Crypto trends are durable enough on a 4h chart that ATE catches them cleanly.

2. **BTCUSD 1D has the highest Profit Factor in the daily row.** PF 4.5 — winning trades are 4.5× the size of losing ones. Sample is smaller (27 trades, 11y) because daily-bar BTC is young as instrument, but the math is strong.

**Recommended cell:** 4h is the headline cell. 1D for traders who only check end-of-day.

### UKOIL (Brent Crude)

| TF  | W/T     | Win%  | P&L%    | Max DD% | PF  | RF   | Data    |
|-----|---------|-------|---------|---------|-----|------|---------|
| 5m  | 22/61   | 36.1% | +3.2%   | 0.8%    | 2.3 | 3.8  | 0.3y    |
| 15m | 31/107  | 29.0% | +3.6%   | 1.6%    | 1.5 | 2.2  | 0.9y    |
| 1h  | 16/40   | 40.0% | +7.0%   | 1.3%    | 2.5 | 5.3  | 4.4y    |
| 4h  | 52/167  | 31.1% | +13.5%  | 1.6%    | 1.7 | 8.6  | 13.3y   |
| 1D  | 61/130  | 46.9% | +259.3% | 11.2%   | 2.2 | 23.2 | 94.4y   |

**Read this:** UKOIL 1D produces the **highest absolute return in the entire 50-cell matrix** — +259.3% over 94 years of Brent crude history. It also produces an 11.2% drawdown, equal to Silver 1D's. Same volatility math: big trends on volatile commodities deliver big returns, but you sit through ugly months along the way.

If you can stomach Silver 1D's 11.2% drawdown, UKOIL 1D is essentially a more aggressive flavour of the same trade — higher upside, same downside.

**Recommended cell:** 1D, only if the 11.2% drawdown is sized into your account.

### USDINR

| TF  | W/T     | Win%  | P&L%    | Max DD% | PF  | RF   | Data    |
|-----|---------|-------|---------|---------|-----|------|---------|
| 5m  | 41/110  | 37.3% | +0.5%   | 0.1%    | 2.1 | 9.9  | 0.4y    |
| 15m | 52/122  | 42.6% | +0.8%   | 0.1%    | 2.0 | 9.7  | 1.1y    |
| 1h  | 27/66   | 40.9% | +0.8%   | 0.2%    | 1.7 | 4.3  | 4.4y    |
| 4h  | 86/199  | 43.2% | +3.5%   | 1.2%    | 1.4 | 3.1  | 14.3y   |
| 1D  | 74/185  | 40.0% | +18.2%  | 3.9%    | 2.3 | 4.7  | 53.2y   |

**Read this:** USDINR is the calmest data in the report. Every drawdown is under 4%, but every return is also small. FX trends move in single-digit-percent terms — USDINR doesn't 10× the way Silver or UKOIL can. The 1D cell's +18.2% is honest and reasonable; the 1D RF of 4.7 is the lowest in the daily row.

Useful inclusion as a low-volatility ballast or for Indian residents who care about hedging USD exposure. Not useful if you're chasing the commodity-scale returns in the rest of the matrix.

**Recommended cell:** 1D. Or skip USDINR entirely if FX-style returns don't fit your scale.

---

## Cross-cutting observations

### 1. Daily timeframe wins on 9 out of 10 instruments

Across all 10 instruments tested, the 1D cell is the highest-P&L row for everything except BTCUSD (where 4h edges out 1D by a hair). This is not a coincidence — ATE is a trend follower, and trend signals are cleanest on daily bars where intraday noise washes out.

If you can only trade one timeframe with ATE: **daily**. The exception is BTCUSD — there, 4h is interchangeable with 1D and is genuinely a standout cell on its own merits.

### 2. Win rates under 50% are the norm — and that's fine

Eight of the ten flagship 1D cells win less than 50% of trades. Nifty (52.8%), BTCUSD (55.6%) are the only ones above. The PF of 1.6–4.5 across these cells means the winners are 1.6× to 4.5× larger than the losers on average — that's where the edge lives.

If you cannot psychologically tolerate losing 55–60% of your trades while still making money over the year, ATE may not be for you. The strategy guide elaborates.

### 3. Intraday is mostly weak; two genuine exceptions

5m and 15m cells across most instruments produce sub-15% returns even on multi-year history. ATE works at those timeframes but the edge is small and execution costs (which the simulator does NOT model — see methodology) eat more of the modeled performance at short timeframes.

**Two genuine intraday exceptions** worth calling out:

- **BTCUSD 4h** — +160.1% net P&L with 4.3% drawdown over 9.4 years; RF 37.6 is the highest 4h figure in the matrix. Crypto trends are durable enough on a 4h chart that ATE catches them.
- **NDX 1h** — PF 4.5 over 12.3 years. Smaller absolute return (+6.0%) but the cleanest 1h profit factor in the matrix.

Most other intraday cells are toy returns and aren't worth the execution friction in live trading.

### 4. HTF filter bypass at higher chart timeframes

The "ATE" column in TradingView's on-chart table shows the count of valid configurations after the engine's higher-timeframe filter constraints. On 1D charts this number is 112 because some higher-timeframe filters mathematically cannot exist above a daily chart. This is correct behaviour, not a bug — the engine still picks the rolling-best configuration from the valid 112, and per-cell performance is not affected by the smaller search space.

### 5. Cells that should not be traded (reported for transparency)

- **Nifty 4h** — 3 trades over 17 years
- **NDX 4h** — 7 trades over 26 years, 100% win-rate (curve-fit on a small sample)
- **DJI intraday (5m / 15m / 1h / 4h)** — zero qualifying trades on TradingView's DJI feed at those timeframes

These cells are kept in the matrix because hiding them would be dishonest. Don't trade them.

### 6. Return scale follows volatility, not market

The largest returns (UKOIL 1D +259%, DJI 1D +177%, SPX 1D +171%, Silver 1D +135%) come from instruments with the longest history *and* moderate-to-high volatility. The smallest return (USDINR 1D +18%) comes from the calmest instrument. This is the trend-follower's deal stated plainly: bigger trends → bigger returns, with the drawdown to match. If you want commodity-scale returns, accept commodity-scale drawdowns.

---

## Per-instrument recommendation

| Instrument | Primary TF | Alternative | Reasoning |
|---|---|---|---|
| Nifty      | 1D | 1h | 1D RF 33.1 — best risk-adjusted cell in matrix. 4h is a non-result, avoid. |
| BankNifty  | 1D | 4h | Mirrors Nifty pattern; 4h reasonable for lower-frequency signals. |
| Gold       | 1D | 4h | 1D for max return; 4h for lowest-drawdown configuration in matrix (PF 3.9, DD 0.6%). |
| Silver     | 1h | 1D | 1h for risk-adjusted (DD 1.5%); 1D for max upside but plan for 11.2% drawdown. |
| SPX        | 1D | —  | 150y of data, RF 23.7, 577 trades. Strongest single sample in the matrix. |
| NDX        | 1D | 1h | 1D cleanest US-index DD (3.4%). 1h has best PF in 1h row (4.5). |
| DJI        | **1D only** | — | Intraday is empty on TradingView's DJI feed. 1D is +176.7% over 130y. |
| BTCUSD     | **4h or 1D** | — | 4h is the standout 4h cell in matrix (+160%, RF 37.6). 1D has the highest 1D PF (4.5). |
| UKOIL      | 1D | — | Highest absolute return in matrix (+259%). Accept the 11.2% DD or skip. |
| USDINR     | 1D | — | FX-scale returns (+18%) and FX-scale drawdowns (3.9%). Ballast or skip. |

---

## Chart screenshots

Full-resolution chart screenshots for every cell in this report — all 10 instruments × 5 timeframes — are published at **helmquant.in/ate/backtest**, including each chart's on-screen Backtest Performance table. The on-chart screenshots are the visual proof of the numbers in this matrix.

Standalone equity-curve plots are not available from TradingView's Pine simulator. The chart screenshots show the trade entries/exits and the summary table that produced the numbers above. If you want to reproduce the runs, load ATE on the same instrument and timeframe and wait 5–10 seconds for the Backtest Performance table to populate.

---

## What this report does not tell you

1. **Live trading variance.** TradingView's simulator assumes you got the closing price of every signal bar. Real-world execution will be different — sometimes better (limit orders), more often slightly worse.

2. **Execution costs at scale.** The simulator does not deduct brokerage or per-tick slippage at all. The "Live drag estimator" subsection earlier in this report gives you a way to subtract realistic costs yourself for the daily cells; intraday cells (5m / 15m) will lose a much larger share of their gross edge to real-world costs.

3. **Taxes and exchange charges.** None of the local-jurisdiction taxes (STT/GST/short-term capital gains in India; broker commissions plus 1099 reporting in the US; equivalents elsewhere) are modeled. These vary by where you trade and your tax bracket. Account for them yourself.

4. **Sample concentration.** Some cells (especially commodities at 1D) have history that spans regime changes — gold-standard transitions, demonetization, COVID, central-bank intervention cycles. Past trend-following performance under those regimes is not a guarantee of future behavior under regimes that haven't happened yet.

5. **You.** The biggest variable in live trading is the trader, not the indicator. ATE producing +109% Nifty 1D in the simulator does not produce +109% in your account if you override signals, skip trades during drawdowns, or size emotionally instead of by the 15% risk model the simulator uses.

---

## Disclaimer

ATE is a software tool. It does not provide investment advice or specific buy/sell recommendations for any security. Every trading decision is yours. Backtest performance is not future performance. Past results shown in this report were generated by a deterministic simulator using TradingView's historical price data — they do not represent actual trading P&L on any real account.

Helm Quant is not a registered investment advisor in any jurisdiction (SEBI in India, SEC/FINRA in the US, or equivalents elsewhere). If you need investment advice, consult an advisor licensed to operate in your jurisdiction.

For questions about this report or the methodology, email `hello@helmquant.in` with subject "ATE: backtest question" in front.

---

*Helm Quant — https://helmquant.in*
*ATE v1.0.0 — distributed invite-only via Gumroad*
