type Metrics = {
  symbol: string;
  maxDrawdownPct: number;
  profitFactor: number;
  rocMonthlyPct?: number;
  observedLeverage: number;
  lotsUsed: number;
  exposureUSD: number;
  dailyLossUSD: number;
};

type Consolidated = { rocMonthlyPct: number };

export function accept(raw: {
  metricsBySymbol: Record<string, Metrics>;
  consolidated: Consolidated;
  cfg: any;
}): { ok: boolean; reasons: string[] } {
  const reasons: string[] = [];
  const A = raw.cfg.acceptance;

  for (const [sym, m] of Object.entries(raw.metricsBySymbol)) {
    const ddCap = A.primary.maxDrawdownPct[sym];
    const pfMin = A.primary.profitFactorMin[sym];
    if (ddCap !== undefined && m.maxDrawdownPct > ddCap)
      reasons.push(`${sym}: maxDrawdown ${m.maxDrawdownPct}% > cap ${ddCap}%`);
    if (pfMin !== undefined && m.profitFactor < pfMin)
      reasons.push(`${sym}: profitFactor ${m.profitFactor} < min ${pfMin}`);
  }

  const rocMin = A.primary.rocMonthlyMinPct.consolidated;
  if (rocMin !== undefined && raw.consolidated.rocMonthlyPct < rocMin)
    reasons.push(`consolidated: ROC ${raw.consolidated.rocMonthlyPct}% < min ${rocMin}%`);

  for (const [sym, m] of Object.entries(raw.metricsBySymbol)) {
    const levMax = A.secondary.observedLeverageMax;
    const capLots = A.secondary.perAssetCapLots[sym];
    const expoMax = A.secondary.maxExposureUSD;
    const lossCap = A.secondary.dailyLossLimitUSD;
    if (levMax !== undefined && m.observedLeverage > levMax)
      reasons.push(`${sym}: leverage ${m.observedLeverage} > max ${levMax}`);
    if (capLots !== undefined && m.lotsUsed > capLots)
      reasons.push(`${sym}: lots ${m.lotsUsed} > cap ${capLots}`);
    if (expoMax !== undefined && m.exposureUSD > expoMax)
      reasons.push(`${sym}: exposure ${m.exposureUSD} > cap ${expoMax}`);
    if (lossCap !== undefined && m.dailyLossUSD > lossCap)
      reasons.push(`${sym}: daily loss ${m.dailyLossUSD} > limit ${lossCap}`);
  }

  return { ok: reasons.length === 0, reasons };
}
