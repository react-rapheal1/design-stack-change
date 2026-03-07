import type { ComponentType } from "react";
import { countries, countryPhoneCodes, countryStates } from "./data";
import type { DeliveryInfo } from "./data";

function DeliveryAddressCard({ deliveryInfo }: { deliveryInfo: DeliveryInfo }) {
  const countryData = countries.find((c) => c.id === deliveryInfo.country);
  const CountryFlag = countryData?.icon as ComponentType<{ className?: string }> | undefined;
  const stateData = deliveryInfo.state ? countryStates[deliveryInfo.country]?.find((s) => s.id === deliveryInfo.state) : null;
  return (
    <div className="rounded-2xl border border-[#e9eaeb] bg-white p-5 sm:p-8">
      {}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl leading-8 font-medium text-[#181d27] sm:text-2xl">Delivery address</h2>
          <p className="text-sm leading-5 text-[#535862]">Shared with our logistics partners.</p>
        </div>
        <div className="h-px w-full bg-border-secondary" />
      </div>

      {}
      <div className="mt-8 flex flex-col gap-4">
        {}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <span className="text-sm text-[#717680]">Country</span>
            <div className="mt-1 flex items-center gap-2">
              {CountryFlag && <CountryFlag className="size-6 shrink-0 overflow-hidden rounded-full" />}
              <span className="text-base font-medium text-[#414651]">
                {stateData ? `${stateData.label}, ` : ""}
                {countryData?.label || "Unknown"}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#717680]">Estimated fulfillment start date</span>
            <span className="mt-1 text-base font-medium text-[#414651]">23 October 2024</span>
          </div>
        </div>

        {}
        <div className="flex flex-col">
          <span className="text-sm text-[#717680]">Address</span>
          <span className="mt-1 text-base font-medium text-[#414651]">{deliveryInfo.address}</span>
        </div>

        {}
        <div className="h-px w-full bg-border-secondary" />

        {}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <span className="text-sm text-[#717680]">Full Name</span>
            <span className="mt-1 text-base font-medium text-[#414651]">Phoenix Baker</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#717680]">Email address</span>
            <span className="mt-1 text-base font-medium text-[#414651]">phoenix@rayda.co</span>
          </div>
        </div>

        {}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col">
            <span className="text-sm text-[#717680]">Employee Type</span>
            <span className="mt-1 text-base font-medium text-[#414651]">Product Designer (Full Time)</span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-[#717680]">Phone Number</span>
            <span className="mt-1 text-base font-medium text-[#414651]">
              {countryPhoneCodes[deliveryInfo.phoneCountry]} {deliveryInfo.phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export { DeliveryAddressCard };
