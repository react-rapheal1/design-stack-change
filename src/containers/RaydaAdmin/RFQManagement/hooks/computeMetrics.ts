import type { RFQ } from "../../shared";

function computeMetrics(period: string, rfqs: RFQ[]) {
  const now = new Date(2026, 1, 20, 21, 0);
  const periodMs: Record<string, number> = {
    "24 hours": 24 * 3600000,
    "7 days": 7 * 24 * 3600000,
    "30 days": 30 * 24 * 3600000,
    "12 months": 365 * 24 * 3600000,
  };
  const cutoff = new Date(now.getTime() - (periodMs[period] || periodMs["12 months"]));
  const previousCutoff = new Date(cutoff.getTime() - (periodMs[period] || periodMs["12 months"]));
  const inPeriod = rfqs.filter((rfq) => new Date(rfq.createdAt) >= cutoff);
  const inPreviousPeriod = rfqs.filter((rfq) => {
    const createdAt = new Date(rfq.createdAt);
    return createdAt >= previousCutoff && createdAt < cutoff;
  });

  const calculate = (test: (rfq: RFQ) => boolean) => {
    const current = inPeriod.filter(test).length;
    const previous = inPreviousPeriod.filter(test).length;
    const percent = previous === 0 ? (current > 0 ? 100 : 0) : Math.round(((current - previous) / previous) * 1000) / 10;
    return { value: current, change: `${Math.abs(percent)}%`, up: percent >= 0 };
  };

  return {
    sent: calculate((rfq) => rfq.status === "response_sent"),
    accepted: calculate((rfq) => rfq.status === "fully_accepted" || rfq.status === "partially_accepted"),
    rejected: calculate((rfq) => rfq.status === "customer_rejected"),
  };
}

export { computeMetrics };
