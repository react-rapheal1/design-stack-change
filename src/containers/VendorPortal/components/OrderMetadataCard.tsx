import { OrderRequest } from "../OrderRequest";
import { CountryFlag } from "./CountryFlag";

function OrderMetadataCard({ order }: { order: OrderRequest }) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-[#e9eaeb] bg-white p-4">
      {!["Offboarding", "Storage"].includes(order.service) && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-[#252b37]">Due Date</span>
          <span className="text-sm text-[#535862]">{order.dueDate}</span>
        </div>
      )}
      {!["Offboarding", "Storage"].includes(order.service) && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-[#252b37]">SLA</span>
          <span className="text-sm text-[#535862]">{order.sla}</span>
        </div>
      )}
      {order.service === "Offboarding" && order.pickupDate && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-[#252b37]">Pickup Date</span>
          <span className="text-sm text-[#535862]">{order.pickupDate}</span>
        </div>
      )}
      {order.service === "Storage" && order.storageDuration && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-[#252b37]">Storage Duration</span>
          <span className="text-sm text-[#535862]">{order.storageDuration}</span>
        </div>
      )}
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-[#252b37]">Country</span>
        <div className="flex items-center gap-1.5">
          <CountryFlag country={order.country} />
          <span className="text-sm text-[#535862]">{order.country}</span>
        </div>
      </div>
      {!["Offboarding", "Storage"].includes(order.service) && (
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-[#252b37]">No. of Recipients</span>
          <span className="text-sm text-[#535862]">{order.recipients}</span>
        </div>
      )}
    </div>
  );
}

export { OrderMetadataCard };
