"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { CurrencyCode } from "../../adminRfqTypes";
import type { ExchangeRates } from "../utils/currencyConversion";
import { convert, fetchRates } from "../utils/currencyConversion";

interface UseExchangeRatesResult {
  convert: (amount: number, from: CurrencyCode, to: CurrencyCode) => number;
  error: string | null;
  loading: boolean;
  rates: ExchangeRates | null;
}

function useExchangeRates(base: CurrencyCode): UseExchangeRatesResult {
  const [rates, setRates] = useState<ExchangeRates | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fetchedBase = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchedBase.current = base;

    fetchRates(base).then(
      (result) => {
        if (cancelled) return;
        setRates(result);
        setError(null);
      },
      (err: unknown) => {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Failed to fetch rates");
      },
    );

    return () => {
      cancelled = true;
    };
  }, [base]);

  const loading = rates === null && error === null;

  const convertFn = useCallback(
    (amount: number, from: CurrencyCode, to: CurrencyCode) => {
      if (!rates) return amount;
      return convert(amount, from, to, rates);
    },
    [rates],
  );

  return { rates, loading, error, convert: convertFn };
}

export { useExchangeRates };
