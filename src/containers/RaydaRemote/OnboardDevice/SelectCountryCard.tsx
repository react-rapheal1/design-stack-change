"use client";

import { useState } from "react";
import { FlagGb, FlagNg, FlagUs } from "@untitledui/country-flags";
import { Globe05 } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";
import { cx } from "@/utils/cx";
import { FlagAvatar } from "./FlagAvatar";
import { countries } from "./data";

function SelectCountryCard() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  return (
    <div className="w-full page-px">
      <div className="flex justify-center">
        <div className="w-full max-w-[640px] rounded-2xl bg-white px-4 py-8 shadow-lg sm:px-8 sm:py-10">
          {}
          <div className="flex justify-center">
            <div className="relative h-14 w-[120px]">
              {}
              <FlagAvatar Flag={FlagGb} size={48} className="absolute top-2 left-0" />
              {}
              <FlagAvatar Flag={FlagUs} size={48} className="absolute top-2 right-0" />
              {}
              <FlagAvatar Flag={FlagNg} size={56} className="absolute top-0 left-8 z-10" />
            </div>
          </div>

          {}
          <div className="mt-6 flex flex-col items-center gap-2 text-center sm:px-6">
            <h2 className="text-xl leading-[30px] font-semibold text-[#101828]">Select country</h2>
            <p className="text-base leading-7 text-[#475467] sm:text-lg">Select the country your onboarding the device from</p>
          </div>

          {}
          <div className="mt-6 sm:px-6">
            <Select
              items={countries}
              label="Country"
              placeholder="Select country"
              placeholderIcon={Globe05}
              size="md"
              hint={selectedCountry ? "Estimated time of delivery is between 2-3 working days." : undefined}
              onSelectionChange={(key) => setSelectedCountry(key as string)}
            >
              {(item) => (
                <Select.Item key={item.id} {...item}>
                  {item.label}
                </Select.Item>
              )}
            </Select>
          </div>

          {}
          <div className="mt-10 flex gap-3 pb-6 sm:px-6">
            <Button color="secondary" size="lg" className="flex-1">
              Cancel
            </Button>
            <Button
              size="lg"
              className={cx("flex-1", !selectedCountry && "bg-[#b0cdff] ring-[#b0cdff] hover:bg-[#8fb8ff] hover:ring-[#8fb8ff]")}
              onClick={() => {
                if (selectedCountry) {
                  const country = countries.find((c) => c.id === selectedCountry);
                  const params = new URLSearchParams({ country: country?.label ?? selectedCountry });
                  router.push(`/rayda-remote/onboard-device/marketplace?${params.toString()}`);
                }
              }}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export { SelectCountryCard };
