# my-mql5-bot
The task to create the Pull Request with your configuration and MQL5 files.
# MQL5 Trading Bot & Risk Manager

This repository contains the MQL5 source code and configuration files for a trading automation system designed with strict risk management and trade copying capabilities.

## Key Features

### 🛡️ Risk Management
- **Daily Loss Limits:** Hard stops to prevent excessive drawdown in a single session.
- **Leverage & Exposure Caps:** dynamic scaling to ensure account safety.
- **Blackout Windows:** Prevents trading during high-volatility news events (e.g., NFP, CPI).

### 📋 Trade Copying
- **Symbol Mapping:** Flexible routing (e.g., `US30` -> `_DJI`).
- **Lot Scaling:** Automatically adjusts volume based on equity ratios and risk caps.
- **Idempotency:** Ensures reliable trade mirroring without duplication.

### 📊 Diagnostics & Acceptance
- **Metric Validation:** Automated checks against defined thresholds (Drawdown, Profit Factor, ROC).
- **Backtest Parsing:** Tools to parse and validate HTML backtest reports.

## Project Structure

- `config/` - JSON configuration files for risk parameters and symbol routes.
- `diagnostics/` - TypeScript tools for parsing reports and validating acceptance criteria.
- `MQL5/Include/` - Core `.mqh` libraries for state management, copying logic, and risk calculations.

## Configuration

Risk settings are defined in `config/acceptance.json`. Key parameters include:
- `maxDrawdownPct`
- `dailyLossLimitUSD`
- `maxExposureUSD`
