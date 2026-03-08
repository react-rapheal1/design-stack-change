import { ChevronDown } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { AlternativeSource } from "../AlternativeSource";
import { DeviceResponseState } from "../DeviceResponseState";
import { RFQDevice } from "../RFQDevice";
import { VendorResponseUpdate } from "../VendorResponseUpdate";
import { catalogDevices } from "../catalogDevices";
import { AlternativeResponseFields } from "./AlternativeResponseFields";
import { QuoteResponseFields } from "./QuoteResponseFields";
import { UnavailableResponseFields } from "./UnavailableResponseFields";
import { VendorResponseTypeTabs } from "./VendorResponseTypeTabs";

function VendorResponseDeviceCard({
  device,
  index,
  isExpanded,
  onToggle,
  response,
  updateResponse,
}: {
  device: RFQDevice;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
  response: DeviceResponseState;
  updateResponse: VendorResponseUpdate;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#e9eaeb] bg-white">
      <button type="button" onClick={onToggle} className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-[#fafafa] sm:p-4">
        <div className="min-w-0 flex-1 pr-3">
          <span className="truncate text-sm font-semibold text-[#181d27]">{device.name}</span>
          <span className="block text-xs text-[#535862]">Qty: {device.quantity}</span>
        </div>
        <div className="flex items-center gap-3">
          <span
            className={cx(
              "rounded-full px-2.5 py-1 text-xs font-medium",
              response.responseType === "quote" && "bg-[#dcfae6] text-[#067647]",
              response.responseType === "alternative" && "bg-[#eff8ff] text-[#0948b5]",
              response.responseType === "unavailable" && "bg-[#fef3f2] text-[#b42318]",
            )}
          >
            {response.responseType === "quote" ? "Quote" : response.responseType === "alternative" ? "Alternative" : "Unable to Fulfill"}
          </span>
          <ChevronDown className={cx("size-5 shrink-0 text-[#535862] transition-transform duration-200", isExpanded && "rotate-180")} />
        </div>
      </button>
      {isExpanded && (
        <div className="border-t border-[#e9eaeb] p-3 duration-200 animate-in fade-in slide-in-from-top-2 sm:p-4">
          <div className="flex flex-col gap-4">
            <VendorResponseTypeTabs responseType={response.responseType} onChange={(value) => updateResponse(index, { responseType: value })} />
            {response.responseType === "quote" && (
              <QuoteResponseFields device={device} quotePrice={response.quotePrice} onChange={(value) => updateResponse(index, { quotePrice: value })} />
            )}
            {response.responseType === "alternative" && (
              <AlternativeResponseFields
                device={device}
                response={response}
                onSourceChange={(value) => updateResponse(index, { alternativeSource: value as AlternativeSource })}
                onSelectCatalogDevice={(key) => updateResponse(index, { selectedCatalogDevice: catalogDevices.find((item) => item.id === key) || null })}
                onUpdate={(updates) => updateResponse(index, updates)}
              />
            )}
            {response.responseType === "unavailable" && (
              <UnavailableResponseFields reason={response.unavailableReason} onChange={(value) => updateResponse(index, { unavailableReason: value })} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { VendorResponseDeviceCard };
