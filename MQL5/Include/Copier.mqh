int COPIER_MAGIC = 900100;

string IntentKey(const long ticket, const string symbol, const datetime t) {
  return IntegerToString(ticket) + "|" + symbol + "|" + IntegerToString((int)t);
}

struct Intent {
  long    sourceTicket;
  string  sourceSymbol, targetSymbol;
  int     orderType; // ORDER_TYPE
  double  srcLots, tgtLots;
  double  entry, sl, tp;
  datetime openTime;
  int     magic;
  string  key;
};

bool MirrorOpen(const Intent &i, const SymbolRoute &R)
{
  MqlTradeRequest req; MqlTradeResult res;
  ZeroMemory(req); ZeroMemory(res);
  req.action   = TRADE_ACTION_DEAL;
  req.symbol   = R.targetSymbol;
  req.magic    = COPIER_MAGIC;
  req.comment  = "COPIER:" + i.key;
  req.type     = (ENUM_ORDER_TYPE)i.orderType;
  req.volume   = i.tgtLots;
  req.price    = i.entry;
  req.sl       = i.sl;
  req.tp       = i.tp;
  req.deviation= 20;
  return OrderSend(req, res);
}
