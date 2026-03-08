/* eslint-disable */
// @ts-nocheck
import { countryCodeMap } from "../../shared";

function CountryFlag({ country }: { country: string }) {
  const code = countryCodeMap[country] || "US";
  return <img src={`https://www.untitledui.com/images/flags/${code}.svg`} alt={`${country} flag`} className="size-5 shrink-0 rounded-full" />;
}
export { CountryFlag };
