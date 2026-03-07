/* eslint-disable */
// @ts-nocheck
import { getRemainingMs } from "./getRemainingMs";

function formatTimeRemaining(createdAt: string, nowMs: number): string {
  const remainingMs = getRemainingMs(createdAt, nowMs);
  if (remainingMs <= 0) return "Expired";
  const totalMinutes = Math.floor(remainingMs / 60_000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
export { formatTimeRemaining };
