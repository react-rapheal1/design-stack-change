/* eslint-disable */
// @ts-nocheck
import { getRemainingMs } from "./getRemainingMs";

function isRFQExpired(createdAt: string, nowMs: number): boolean {
  return getRemainingMs(createdAt, nowMs) <= 0;
}
export { isRFQExpired };
