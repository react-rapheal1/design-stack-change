import type { ComponentType } from "react";
import { FlagAu, FlagCa, FlagDe, FlagFr, FlagGb, FlagGh, FlagKe, FlagNg, FlagUs, FlagZa } from "@untitledui/country-flags";

export interface PhoneCountry {
  dialCode: string;
  icon: ComponentType<{ className?: string }>;
  id: string;
  label: string;
}

export const phoneCountries: PhoneCountry[] = [
  { id: "us", label: "United States", dialCode: "+1", icon: FlagUs },
  { id: "gb", label: "United Kingdom", dialCode: "+44", icon: FlagGb },
  { id: "ng", label: "Nigeria", dialCode: "+234", icon: FlagNg },
  { id: "ca", label: "Canada", dialCode: "+1", icon: FlagCa },
  { id: "de", label: "Germany", dialCode: "+49", icon: FlagDe },
  { id: "fr", label: "France", dialCode: "+33", icon: FlagFr },
  { id: "au", label: "Australia", dialCode: "+61", icon: FlagAu },
  { id: "za", label: "South Africa", dialCode: "+27", icon: FlagZa },
  { id: "ke", label: "Kenya", dialCode: "+254", icon: FlagKe },
  { id: "gh", label: "Ghana", dialCode: "+233", icon: FlagGh },
];

export const phoneDialCodes = Object.fromEntries(phoneCountries.map(({ dialCode, id }) => [id, dialCode]));
