/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from "react";
import { MOCK_NOW_MS } from "../MOCK_NOW_MS";

function useCurrentTime(): number {
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const msUntilNextMinute = 60_000 - (Date.now() % 60_000);
    const start = Date.now();
    const timeout = setTimeout(() => {
      setOffset(Date.now() - start);
    }, msUntilNextMinute);
    const interval = setInterval(() => {
      setOffset(Date.now() - start);
    }, 60_000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);
  return MOCK_NOW_MS + offset;
}
export { useCurrentTime };
