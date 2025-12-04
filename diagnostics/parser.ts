export const patterns = {
  profitFactor: /<tr>\s*<td>\s*Profit Factor\s*<\/td>\s*<td>\s*([\d.,]+)\s*<\/td>\s*<\/tr>/i,
  maxDrawdownPct: /<tr>\s*<td>\s*Max Drawdown\s*<\/td>\s*<td>\s*([\d.,]+)\s*%\s*<\/td>\s*<\/tr>/i,
  netProfit: /<tr>\s*<td>\s*Net Profit\s*<\/td>\s*<td>\s*([-\d.,]+)\s*[A-Z$€£]\s*<\/td>\s*<\/tr>/i,
  winRate: /<tr>\s*<td>\s*Profit Trades\s*<\/td>\s*<td>\s*([\d.,]+)\s*%\s*<\/td>\s*<\/tr>/i
};

export function toNumber(s: string) { return parseFloat(s.replace(/,/g, "")); }
