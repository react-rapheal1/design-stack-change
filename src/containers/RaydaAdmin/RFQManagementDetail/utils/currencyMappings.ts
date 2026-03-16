import type { CurrencyCode, CustomerCurrencyCode } from "../../adminRfqTypes";

const countryToCurrency: Record<string, CurrencyCode> = {
  "United States": "USD",
  "United Kingdom": "GBP",
  Nigeria: "NGN",
  Germany: "EUR",
  Canada: "CAD",
  "South Africa": "ZAR",
  Kenya: "KES",
  India: "INR",
};

const euCountries = new Set([
  "Germany",
  "France",
  "Italy",
  "Spain",
  "Netherlands",
  "Belgium",
  "Austria",
  "Portugal",
  "Greece",
  "Finland",
  "Ireland",
  "Luxembourg",
  "Slovenia",
  "Slovakia",
  "Estonia",
  "Latvia",
  "Lithuania",
  "Malta",
  "Cyprus",
  "Croatia",
]);

function customerCurrencyForCountry(country: string): CustomerCurrencyCode {
  if (country === "United Kingdom") return "GBP";
  if (euCountries.has(country)) return "EUR";
  return "USD";
}

const currencyLocaleMap: Record<CurrencyCode, string> = {
  USD: "en-US",
  GBP: "en-GB",
  EUR: "de-DE",
  NGN: "en-NG",
  INR: "en-IN",
  ZAR: "en-ZA",
  KES: "en-KE",
  CAD: "en-CA",
};

export { countryToCurrency, currencyLocaleMap, customerCurrencyForCountry };
