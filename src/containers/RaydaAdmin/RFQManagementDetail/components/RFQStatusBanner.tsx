import { AlertCircle, CheckCircle, Clock, XCircle } from "@untitledui/icons";
import { RFQ, formatDateTime } from "../../shared";

function RFQStatusBanner({ rfq }: { rfq: RFQ }) {
  const bannerMap = {
    customer_rejected: {
      border: "border-[#fecdca]",
      bg: "bg-[#fef3f2]",
      color: "text-[#b42318]",
      description: rfq.rejectionReason || "The customer rejected this quote.",
      icon: XCircle,
      title: "Customer Rejected",
    },
    expired: {
      border: "border-[#e9eaeb]",
      bg: "bg-[#fafafa]",
      color: "text-[#535862]",
      description: rfq.sentAt
        ? `Sent on ${formatDateTime(rfq.sentAt)}. Expired on ${formatDateTime(new Date(new Date(rfq.sentAt).getTime() + 5 * 24 * 3600000).toISOString())} after 5 days with no customer response.`
        : "This RFQ has expired without a response.",
      icon: Clock,
      title: "Expired",
    },
    fully_accepted: {
      border: "border-[#abefc6]",
      bg: "bg-[#ecfdf3]",
      color: "text-[#067647]",
      description: "The customer has accepted all devices in this quote.",
      icon: CheckCircle,
      title: "Fully Accepted",
    },
    partially_accepted: {
      border: "border-[#d6bbfb]",
      bg: "bg-[#f9f5ff]",
      color: "text-[#6941c6]",
      description: `The customer accepted ${rfq.acceptedDevices?.filter(Boolean).length} of ${rfq.devices.length} devices in this quote.`,
      icon: AlertCircle,
      title: "Partially Accepted",
    },
    pending_vendors: {
      border: "border-[#fedf89]",
      bg: "bg-[#fffaeb]",
      color: "text-[#b54708]",
      description: "This RFQ has been sent to vendors. Waiting for quotes.",
      icon: Clock,
      title: "Waiting for Vendor Responses",
    },
    response_sent: {
      border: "border-[#b2ddff]",
      bg: "bg-[#eff8ff]",
      color: "text-[#175cd3]",
      description: `Curated response was sent on ${rfq.sentAt ? formatDateTime(rfq.sentAt) : "—"}. Waiting for customer decision.`,
      icon: CheckCircle,
      title: "Response Sent to Customer",
    },
    vendors_responded: null,
  } as const;

  const banner = bannerMap[rfq.status];
  if (!banner) return null;
  const Icon = banner.icon;

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-4 ${banner.border} ${banner.bg}`}>
      <Icon className={`size-5 shrink-0 ${banner.color}`} />
      <div className={`flex flex-col gap-1 ${banner.color}`}>
        <span className="text-sm font-semibold">{banner.title}</span>
        <span className="text-sm">{banner.description}</span>
      </div>
    </div>
  );
}

export { RFQStatusBanner };
