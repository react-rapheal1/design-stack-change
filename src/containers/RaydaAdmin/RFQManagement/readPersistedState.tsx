/* eslint-disable */
// @ts-nocheck
import { PersistedState } from "./PersistedState";
import { RFQ_STATE_KEY } from "./RFQ_STATE_KEY";

function readPersistedState(): PersistedState | null {
  try {
    const raw = sessionStorage.getItem(RFQ_STATE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as PersistedState;
  } catch {
    return null;
  }
}
export { readPersistedState };
