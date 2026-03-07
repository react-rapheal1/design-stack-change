/* eslint-disable */
// @ts-nocheck
import { countries } from "./countries";

interface OrderFilters {
  serviceTypes: string[];
  countries: string[];
  amountRange: [number, number];
  dueDateFrom: string;
  dueDateTo: string;
}
export { OrderFilters };
