import { CustomDeviceRequest } from "../CustomDeviceRequest";
import { CountryFlag } from "./CountryFlag";

function RequestDetailsCard({ request }: { request: CustomDeviceRequest }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl border border-[#e9eaeb] bg-white p-4">
      <span className="text-sm font-semibold text-[#252b37]">Request Details</span>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-[#717680]">Country</span>
          <div className="flex items-center gap-1.5">
            <CountryFlag country={request.country} />
            <span className="text-sm text-[#535862]">{request.country}</span>
          </div>
        </div>
        {request.createdAt && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#717680]">Submitted</span>
            <span className="text-sm text-[#535862]">{request.createdAt}</span>
          </div>
        )}
        {request.expiresAt && (
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-[#717680]">{request.status === "expired" ? "Expired On" : "Quote Expires"}</span>
            <span className={`text-sm ${request.status === "waiting_for_action" ? "font-medium text-[#d92d20]" : "text-[#535862]"}`}>{request.expiresAt}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export { RequestDetailsCard };
