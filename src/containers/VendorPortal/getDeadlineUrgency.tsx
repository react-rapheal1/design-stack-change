/* eslint-disable */
// @ts-nocheck
import { DeadlineUrgency } from "./DeadlineUrgency";
import { getRemainingMs } from "./getRemainingMs";

function getDeadlineUrgency(createdAt: string, nowMs: number): DeadlineUrgency {
  const remainingMs = getRemainingMs(createdAt, nowMs);
  if (remainingMs <= 0) return "error";
  if (remainingMs <= 60 * 60 * 1000) return "error";
  if (remainingMs <= 6 * 60 * 60 * 1000) return "warning";
  return "success";
}
export { getDeadlineUrgency };
