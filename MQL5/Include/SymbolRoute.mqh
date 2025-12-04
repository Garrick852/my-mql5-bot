struct SymbolRoute {
  string sourceSymbol, targetSymbol;
  double contractMultiplier;
  int    digits;
  double tickSize, volMin, volStep;
  bool   enabled;
};
