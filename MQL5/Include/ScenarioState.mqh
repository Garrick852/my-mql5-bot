struct ScenarioState {
  double sourceEquity, targetEquity;
  double sourceBalance, targetBalance;
  double observedLeverage, maxLeverage;
  double dailyLossLimitUSD, perAssetCapLots, maxExposureUSD;
  bool   tradingBlackout;
  datetime lastRecon;
};
