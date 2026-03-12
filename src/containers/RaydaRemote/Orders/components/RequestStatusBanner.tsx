import { AlertCircle, CheckCircle, Clock, XCircle } from "@untitledui/icons";
import { CustomDeviceRequest } from "../CustomDeviceRequest";

function RequestStatusBanner({ hasUnavailableItems, request }: { hasUnavailableItems: boolean; request: CustomDeviceRequest }) {
  const banners = {
    confirmed: {
      color: "text-[#067647]",
      description: "Your order has been confirmed and is being processed.",
      icon: CheckCircle,
      styles: "border-[#abefc6] bg-[#ecfdf3]",
      title: "Order Confirmed",
    },
    expired: {
      color: "text-[#535862]",
      description: "This quote was not confirmed or declined within 5 days and has expired. Please submit a new request if you still need these items.",
      icon: Clock,
      styles: "border-[#e9eaeb] bg-[#fafafa]",
      title: "Quote Expired",
    },
    pending: {
      color: "text-[#b54708]",
      description: "Your request has been sent to vendors. You will be notified when a quote is available.",
      icon: Clock,
      styles: "border-[#fedf89] bg-[#fffaeb]",
      title: "Pending Vendor Response",
    },
    rejected: {
      color: "text-[#535862]",
      description: "You have rejected this quote. You can submit a new request if needed.",
      icon: XCircle,
      styles: "border-[#e9eaeb] bg-[#fafafa]",
      title: "Quote Rejected",
    },
    waiting_for_action: hasUnavailableItems
      ? {
          color: "text-[#b42318]",
          description: "The vendor cannot fulfill all requested items. Review the quote below for details.",
          icon: AlertCircle,
          styles: "border-[#fecdca] bg-[#fef3f2]",
          title: "Some Items Unavailable",
        }
      : null,
  } as const;

  const banner = banners[request.status];
  if (!banner) return null;
  const Icon = banner.icon;

  return (
    <div className={`flex items-start gap-3 rounded-lg border p-4 ${banner.styles}`}>
      <Icon className={`size-5 shrink-0 ${banner.color}`} />
      <div className={`flex flex-col gap-1 ${banner.color}`}>
        <span className="text-sm font-semibold">{banner.title}</span>
        <span className="text-sm">{banner.description}</span>
      </div>
    </div>
  );
}

export { RequestStatusBanner };
