import { applyOutcomeData, buildBaseRfq, seededRandom } from "./adminRfqMockHelpers";
import type { RFQ } from "./adminRfqTypes";

function generateMockRFQs(): RFQ[] {
  const random = seededRandom(42);
  return Array.from({ length: 72 }, (_, index) => applyOutcomeData(buildBaseRfq(index, random), random));
}

const mockRFQs = generateMockRFQs();

export { generateMockRFQs, mockRFQs };
