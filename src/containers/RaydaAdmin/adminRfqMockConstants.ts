import type { RFQStatus } from "./adminRfqTypes";

const mockStatuses: RFQStatus[] = [
  "pending_vendors",
  "pending_vendors",
  "vendors_responded",
  "vendors_responded",
  "vendors_responded",
  "vendors_responded",
  "response_sent",
  "response_sent",
  "response_sent",
  "fully_accepted",
  "fully_accepted",
  "fully_accepted",
  "partially_accepted",
  "partially_accepted",
  "customer_rejected",
  "customer_rejected",
  "customer_rejected",
  "expired",
];

const vendorNoteOptions = [
  "Lead time 2-3 weeks. Bulk discount available for 10+ units.",
  "Price valid for 30 days. Includes 1-year standard warranty.",
  "Ships from regional warehouse, delivery within 5 business days.",
  "Extended 3-year warranty available at additional cost.",
  "Currently running a promotion — price includes free setup.",
  "Limited stock, recommend confirming within 7 days.",
  "Includes on-site installation and configuration.",
  "Price reflects enterprise licensing. Volume pricing available.",
];

export { mockStatuses, vendorNoteOptions };
