import type { CurrencyCode, CustomerCurrencyCode } from "../../adminRfqTypes";
import { currencyLocaleMap } from "./currencyMappings";

function formatAmount(amount: number, currency: CurrencyCode): string {
  return new Intl.NumberFormat(currencyLocaleMap[currency], {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDualCurrency(
  vendorAmount: number,
  vendorCurrency: CurrencyCode,
  customerAmount: number,
  customerCurrency: CustomerCurrencyCode,
): string {
  if (vendorCurrency === customerCurrency) return formatAmount(vendorAmount, vendorCurrency);
  return `${formatAmount(vendorAmount, vendorCurrency)} (~${formatAmount(customerAmount, customerCurrency)})`;
}

export { formatAmount, formatDualCurrency };
