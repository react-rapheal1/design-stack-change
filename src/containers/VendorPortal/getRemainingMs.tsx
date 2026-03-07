/* eslint-disable */
// @ts-nocheck
import { RESPONSE_WINDOW_MS } from "./RESPONSE_WINDOW_MS";

function getRemainingMs(createdAt: string, nowMs: number): number {
  const remaining = new Date(createdAt).getTime() + RESPONSE_WINDOW_MS - nowMs;
  return Math.min(remaining, RESPONSE_WINDOW_MS);
}
export { getRemainingMs };
