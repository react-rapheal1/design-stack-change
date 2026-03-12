import type { CurrencyCode } from "./adminRfqTypes";

/** Approximate exchange rates to USD for generating realistic mock vendor prices. */
const mockExchangeRates: Record<CurrencyCode, number> = {
  USD: 1,
  GBP: 0.79,
  EUR: 0.92,
  NGN: 1550,
  INR: 83,
  ZAR: 18.5,
  KES: 153,
  CAD: 1.36,
};

/** Get a mock rate from one currency to another. */
function getMockRate(from: CurrencyCode, to: CurrencyCode): number {
  return mockExchangeRates[from] / mockExchangeRates[to];
}

export { getMockRate, mockExchangeRates };
