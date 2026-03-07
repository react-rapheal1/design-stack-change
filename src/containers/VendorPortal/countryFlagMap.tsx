/* eslint-disable */
// @ts-nocheck
import React from "react";
import { FlagAu, FlagCa, FlagDe, FlagFr, FlagGb, FlagIn, FlagJp, FlagKe, FlagNg, FlagSg, FlagUs, FlagZa } from "@untitledui/country-flags";

const countryFlagMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "United States": FlagUs,
  Canada: FlagCa,
  "United Kingdom": FlagGb,
  Germany: FlagDe,
  France: FlagFr,
  Australia: FlagAu,
  Japan: FlagJp,
  Singapore: FlagSg,
  Nigeria: FlagNg,
  "South Africa": FlagZa,
  Kenya: FlagKe,
  India: FlagIn,
};
export { countryFlagMap };
