import { RFQ } from "../RFQ";
import { CountryFlag } from "./CountryFlag";
import { RFQDeadlineBadge } from "./RFQDeadlineBadge";
import { RFQDeviceCount } from "./RFQDeviceCount";

function RFQTableRow({ onViewRFQ, rfq, nowMs }: { onViewRFQ: (rfq: RFQ) => void; rfq: RFQ; nowMs: number }) {
  return (
    <tr className="border-b border-[#e9eaeb] transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2 last:border-b-0">
      <td className="px-6 py-4 text-sm text-[#181d27]">{rfq.id}</td>
      <td className="px-6 py-4">
        <RFQDeviceCount devices={rfq.devices} />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <CountryFlag country={rfq.country} />
          <span className="text-sm text-[#535862]">{rfq.country}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <RFQDeadlineBadge createdAt={rfq.createdAt} nowMs={nowMs} />
      </td>
      <td className="px-6 py-4">
        <button
          type="button"
          onClick={() => onViewRFQ(rfq)}
          className="text-sm font-semibold text-[#0948b5] transition-colors hover:text-[#073d8a] hover:underline"
        >
          View
        </button>
      </td>
    </tr>
  );
}

export { RFQTableRow };
