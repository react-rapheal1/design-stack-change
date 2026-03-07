import type { ComponentType } from "react";
import { FlagAu, FlagCa, FlagDe, FlagFr, FlagGb, FlagNg, FlagUs } from "@untitledui/country-flags";

export const countryFlags: Record<string, ComponentType<{ className?: string }>> = {
  gb: FlagGb,
  us: FlagUs,
  ng: FlagNg,
  ca: FlagCa,
  de: FlagDe,
  fr: FlagFr,
  au: FlagAu,
};
