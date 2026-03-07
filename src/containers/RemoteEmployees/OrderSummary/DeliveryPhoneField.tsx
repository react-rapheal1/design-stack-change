import type { ComponentType } from "react";
import { ChevronDown } from "@untitledui/icons";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";
import { countries, countryPhoneCodes } from "./data";

function DeliveryPhoneField({
  onPhoneChange,
  onPhoneCountryChange,
  phone,
  phoneCountry,
}: {
  onPhoneChange: (value: string) => void;
  onPhoneCountryChange: (value: string) => void;
  phone: string;
  phoneCountry: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>Phone number</Label>
      <div className="flex items-center overflow-hidden rounded-lg border border-primary bg-primary shadow-xs transition-shadow duration-100 ease-linear focus-within:ring-2 focus-within:ring-brand">
        <DialogTrigger>
          <AriaButton
            className={({ isFocused }) =>
              cx(
                "flex shrink-0 cursor-pointer items-center gap-1.5 border-r border-[#e9eaeb] px-3 py-2.5 outline-hidden transition hover:bg-gray-50",
                isFocused && "bg-gray-50",
              )
            }
          >
            <span className="text-sm font-medium text-[#344054]">{phoneCountry.toUpperCase()}</span>
            <ChevronDown className="size-4 text-fg-quaternary" />
          </AriaButton>
          <Popover
            placement="bottom start"
            offset={4}
            className={({ isEntering, isExiting }) =>
              cx(
                "z-50 w-64 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-[#eaecf0] will-change-transform",
                isEntering && "duration-200 ease-out animate-in fade-in slide-in-from-top-1",
                isExiting && "duration-150 ease-in animate-out fade-out slide-out-to-top-1",
              )
            }
          >
            <div className="max-h-60 overflow-y-auto py-1">
              {countries.map((country) => {
                const Flag = country.icon as ComponentType<{ className?: string }>;
                return (
                  <button
                    key={country.id}
                    type="button"
                    className={cx(
                      "flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left transition hover:bg-gray-50",
                      phoneCountry === country.id && "bg-gray-50",
                    )}
                    onClick={() => onPhoneCountryChange(country.id)}
                  >
                    {Flag && <Flag className="size-5 shrink-0 overflow-hidden rounded-full" />}
                    <span className="text-sm font-medium text-[#344054]">{country.label}</span>
                    <span className="ml-auto text-sm text-[#667085]">{countryPhoneCodes[country.id]}</span>
                  </button>
                );
              })}
            </div>
          </Popover>
        </DialogTrigger>
        <span className="pl-3 text-md text-placeholder select-none">{countryPhoneCodes[phoneCountry]}</span>
        <input
          type="tel"
          className="w-full bg-transparent py-2.5 pr-3.5 pl-1.5 text-md text-primary outline-hidden placeholder:text-placeholder"
          placeholder="e.g. 78 2824 3334"
          value={phone}
          onChange={(event) => onPhoneChange(event.target.value)}
        />
      </div>
    </div>
  );
}

export { DeliveryPhoneField };
