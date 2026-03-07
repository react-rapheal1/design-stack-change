/* eslint-disable */
// @ts-nocheck
import { TrendDirection } from "./TrendDirection";

function getTrend(change: string, up: boolean): TrendDirection {
  const val = parseFloat(change);
  if (val === 0) return "neutral";
  return up ? "up" : "down";
}
export { getTrend };
