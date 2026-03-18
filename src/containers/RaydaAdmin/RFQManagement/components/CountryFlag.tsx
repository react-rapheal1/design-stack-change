import { countryCodeMap } from "../../shared";

interface CountryFlagProps {
  country: string;
}

function CountryFlag({ country }: CountryFlagProps) {
  const code = countryCodeMap[country] || "US";
  return (
    <img
      src={`https://www.untitledui.com/images/flags/${code}.svg`}
      alt={`${country} flag`}
      className="size-5 shrink-0 rounded-full"
    />
  );
}

export { CountryFlag };
