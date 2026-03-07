"use client";

import { useState } from "react";
import { ChevronDown } from "@untitledui/icons";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Label } from "@/components/base/input/label";
import { cx } from "@/utils/cx";
import { phoneCountries, phoneDialCodes } from "./phone-data";

interface PhoneCountrySelectProps {
  country: string;
  phone: string;
  onCountryChange: (country: string) => void;
  onPhoneChange: (phone: string) => void;
}

export function PhoneCountrySelect({ country, phone, onCountryChange, onPhoneChange }: PhoneCountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1.5">
      <Label>Phone number</Label>
      <div className="flex items-center overflow-hidden rounded-lg border border-primary bg-primary shadow-xs transition-shadow duration-100 ease-linear focus-within:ring-2 focus-within:ring-brand">
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
          <AriaButton
            className={({ isFocused }) =>
              cx(
                "flex h-full shrink-0 items-center gap-1.5 border-r border-primary px-3 py-2.5 transition duration-100 ease-linear",
                isFocused && "ring-2 ring-brand outline-none ring-inset",
              )
            }
          >
            <span className="text-sm font-medium text-secondary">{country.toUpperCase()}</span>
            <ChevronDown className="size-4 text-fg-quaternary" />
          </AriaButton>
          <Popover placement="bottom start" className="w-64 overflow-hidden rounded-lg border border-secondary bg-primary shadow-lg outline-none">
            <div className="max-h-60 overflow-y-auto py-1">
              {phoneCountries.map(({ dialCode, icon: Flag, id, label }) => (
                <button
                  key={id}
                  type="button"
                  className={cx(
                    "flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left transition hover:bg-secondary",
                    country === id && "bg-secondary",
                  )}
                  onClick={() => {
                    onCountryChange(id);
                    setIsOpen(false);
                  }}
                >
                  <Flag className="size-5 shrink-0 overflow-hidden rounded-full" />
                  <span className="text-sm font-medium text-primary">{label}</span>
                  <span className="ml-auto text-sm text-tertiary">{dialCode}</span>
                </button>
              ))}
            </div>
          </Popover>
        </DialogTrigger>
        <span className="pl-3 text-md text-placeholder select-none">{phoneDialCodes[country]}</span>
        <input
          type="tel"
          className="w-full bg-transparent py-2.5 pr-3.5 pl-1.5 text-md text-primary outline-none placeholder:text-placeholder"
          value={phone}
          onChange={(event) => onPhoneChange(event.target.value)}
          placeholder="(555) 000-0000"
        />
      </div>
    </div>
  );
}
