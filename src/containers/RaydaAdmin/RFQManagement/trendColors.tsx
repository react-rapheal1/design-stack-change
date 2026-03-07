/* eslint-disable */
// @ts-nocheck
import { TrendDirection } from "./TrendDirection";

const trendColors: Record<TrendDirection, { stroke: string; gradFrom: string; gradTo: string }> = {
  up: { stroke: "var(--color-success-500)", gradFrom: "var(--color-success-200)", gradTo: "var(--color-success-50)" },
  down: { stroke: "var(--color-error-500)", gradFrom: "var(--color-error-200)", gradTo: "var(--color-error-50)" },
  neutral: { stroke: "var(--color-gray-400)", gradFrom: "var(--color-gray-200)", gradTo: "var(--color-gray-50)" },
};
export { trendColors };
