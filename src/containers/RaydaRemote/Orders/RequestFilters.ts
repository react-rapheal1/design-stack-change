/* eslint-disable */
// @ts-nocheck
import { assetTypes } from "./assetTypes";
import { countries } from "./countries";

interface RequestFilters {
  countries: string[];
  assetTypes: string[];
  budgetRange: [number, number];
}
export { RequestFilters };
