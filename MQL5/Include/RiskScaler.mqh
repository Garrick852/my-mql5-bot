double ScaleLots(const double srcLots, const ScenarioState &S, const SymbolRoute &R)
{
  double L_equity   = (S.sourceEquity > 0.0) ? (S.targetEquity / S.sourceEquity) : 1.0;
  double L_leverage = (S.observedLeverage > 0.0) ? MathMin(S.maxLeverage / S.observedLeverage, 1.0) : 1.0;
  double L_caps     = 1.0; // integrate per-asset cap & projected maxExposureUSD if desired
  double lots       = srcLots * L_equity * L_leverage * L_caps;
  lots = MathMax(lots, R.volMin);
  lots = MathFloor(lots / R.volStep) * R.volStep;
  return lots;
}
