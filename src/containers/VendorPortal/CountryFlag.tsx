/* eslint-disable */
// @ts-nocheck
import { FlagUs } from "@untitledui/country-flags";
import { countryFlagMap } from "./countryFlagMap";

function CountryFlag({ country }: { country: string }) {
  const FlagIcon = countryFlagMap[country] || FlagUs;
  return <FlagIcon className="size-5 shrink-0 rounded-full" aria-hidden="true" />;
}
export { CountryFlag };
