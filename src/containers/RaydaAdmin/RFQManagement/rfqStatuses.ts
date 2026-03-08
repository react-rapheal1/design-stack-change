import { RFQStatus } from "../shared";

const rfqStatuses: RFQStatus[] = [
  "pending_vendors",
  "vendors_responded",
  "response_sent",
  "fully_accepted",
  "partially_accepted",
  "customer_rejected",
  "expired",
];

export { rfqStatuses };
