import { CheckCircle, XCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { RFQ, VendorResponse } from "../../shared";
import { getAdminUnitPrice } from "../utils/curationPricing";
import { VendorDeviceResponseCard } from "./VendorDeviceResponseCard";

function VendorComparisonSection({ rfq, selectedVendorId, vendors }: { rfq: RFQ; selectedVendorId: string; vendors: VendorResponse[] }) {
  const showAcceptance = rfq.customerDecision === "partially_accepted" || rfq.customerDecision === "fully_accepted";
  const curation = rfq.curation;
  const selectedVendor = vendors.find((v) => v.vendorId === selectedVendorId);

  return (
    <div className="flex flex-col gap-6">
      {rfq.devices.map((device, deviceIndex) => (
        <div key={`${device.name}-${deviceIndex}`} className={cx(showAcceptance && rfq.acceptedDevices?.[deviceIndex] === false && "opacity-50")}>
          <div className="mb-3 flex items-center gap-2">
            {showAcceptance &&
              (rfq.acceptedDevices?.[deviceIndex] ? (
                <CheckCircle className="size-4 shrink-0 text-[#067647]" />
              ) : (
                <XCircle className="size-4 shrink-0 text-[#d92d20]" />
              ))}
            <p className="text-sm font-semibold text-primary">
              {device.name} <span className="font-normal text-tertiary">(×{device.quantity})</span>
            </p>
            {showAcceptance && rfq.acceptedDevices?.[deviceIndex] === false && (
              <span className="rounded-full bg-[#fef3f2] px-2 py-0.5 text-xs font-medium text-[#b42318]">Declined</span>
            )}
          </div>
          <div className="flex gap-3">
            {vendors.map((vendor) => {
              if (!vendor.deviceResponses[deviceIndex]) return null;
              const isSelected = vendor.vendorId === selectedVendorId;
              const adminPrice = isSelected && curation && selectedVendor ? getAdminUnitPrice(curation, selectedVendor, deviceIndex) : undefined;
              return (
                <VendorDeviceResponseCard
                  key={vendor.vendorId}
                  adminUnitPrice={adminPrice}
                  response={vendor.deviceResponses[deviceIndex]}
                  selected={isSelected}
                  vendor={vendor}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export { VendorComparisonSection };
