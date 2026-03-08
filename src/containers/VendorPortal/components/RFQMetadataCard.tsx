import { RFQ } from "../RFQ";
import { useCurrentTime } from "../hooks/useCurrentTime";
import { isRFQExpired } from "../isRFQExpired";
import { CountryFlag } from "./CountryFlag";
import { RFQDeadlineBadge } from "./RFQDeadlineBadge";

function RFQMetadataCard({ rfq }: { rfq: RFQ }) {
  const nowMs = useCurrentTime();

  return (
    <div className="flex flex-col gap-6 rounded-xl border border-[#e9eaeb] bg-white p-4">
      <div className="flex flex-col gap-1">
        <span className="text-sm font-semibold text-[#252b37]">Country</span>
        <div className="flex items-center gap-1.5">
          <CountryFlag country={rfq.country} />
          <span className="text-sm text-[#535862]">{rfq.country}</span>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-semibold text-[#252b37]">Response Deadline</span>
        <div className="flex items-center gap-2">
          <RFQDeadlineBadge createdAt={rfq.createdAt} nowMs={nowMs} />
          <span className="text-xs text-[#535862]">{isRFQExpired(rfq.createdAt, nowMs) ? "This RFQ has expired." : "Respond within this timeline."}</span>
        </div>
      </div>
    </div>
  );
}

export { RFQMetadataCard };
