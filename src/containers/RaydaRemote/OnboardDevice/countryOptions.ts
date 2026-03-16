import * as CountryFlags from "@untitledui/country-flags";
import type { SelectItemType } from "@/components/base/select/select";
import { countryCodes } from "./countryCodes";

const displayNames = new Intl.DisplayNames(["en"], { type: "region" });

const countryLabelOverrides: Record<string, string> = {
  cd: "Congo (DRC)",
  cg: "Congo (Republic)",
  ci: "Cote d'Ivoire",
  cv: "Cabo Verde",
  ps: "Palestine",
  sz: "Eswatini",
  tl: "Timor-Leste",
  tr: "Türkiye",
};

function getFlagIcon(code: string) {
  const key = `Flag${code[0].toUpperCase()}${code[1].toLowerCase()}` as keyof typeof CountryFlags;
  return CountryFlags[key];
}

const countries: SelectItemType[] = countryCodes.map((code) => ({
  id: code,
  icon: getFlagIcon(code),
  label: countryLabelOverrides[code] ?? displayNames.of(code.toUpperCase()) ?? code.toUpperCase(),
}));

export { countries };
