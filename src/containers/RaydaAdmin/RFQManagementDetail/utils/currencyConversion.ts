import type { CurrencyCode } from "../../adminRfqTypes";

type ExchangeRates = Record<string, number>;

interface CacheEntry {
  rates: ExchangeRates;
  fetchedAt: number;
}

const CACHE_TTL = 3600000;
const rateCache = new Map<string, CacheEntry>();

async function fetchRates(base: CurrencyCode): Promise<ExchangeRates> {
  const cached = rateCache.get(base);
  if (cached && Date.now() - cached.fetchedAt < CACHE_TTL) return cached.rates;

  try {
    const response = await fetch(`/api/exchange-rates?base=${base}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = (await response.json()) as { rates: ExchangeRates };
    const entry: CacheEntry = { rates: { ...data.rates, [base]: 1 }, fetchedAt: Date.now() };
    rateCache.set(base, entry);

    try {
      localStorage.setItem(`fx-${base}`, JSON.stringify(entry));
    } catch {}

    return entry.rates;
  } catch {
    if (cached) return cached.rates;

    try {
      const stored = localStorage.getItem(`fx-${base}`);
      if (stored) {
        const parsed = JSON.parse(stored) as CacheEntry;
        rateCache.set(base, parsed);
        return parsed.rates;
      }
    } catch {}

    return { [base]: 1 };
  }
}

function convert(amount: number, from: CurrencyCode, to: CurrencyCode, rates: ExchangeRates): number {
  if (from === to) return amount;
  const rate = rates[to];
  if (!rate) return amount;
  return Math.round(amount * rate);
}

export type { ExchangeRates };
export { convert, fetchRates };
