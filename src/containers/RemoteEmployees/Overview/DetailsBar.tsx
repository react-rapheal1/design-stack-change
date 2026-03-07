"use client";

import { type ReactNode, useState } from "react";
import { FlagAu } from "@untitledui/country-flags";
import { type ProfileUpdate, loadProfileUpdate } from "@/utils/profile-store";
import { countryFlags } from "./countryFlags";

export function DetailsBar() {
  const [profile] = useState<ProfileUpdate | null>(() => loadProfileUpdate());

  const Flag = profile ? (countryFlags[profile.countryId] ?? FlagAu) : FlagAu;
  const location = profile ? [profile.stateLabel, profile.countryLabel].filter(Boolean).join(", ") : "Melbourne, Australia";
  const phone = profile?.phone ?? "(406) 555-0120";
  const address = profile?.address ?? "Suite 231 763 Sipes Stream, New Elenaburgh, AL 54273";

  return (
    <div className="flex w-full gap-14 rounded-xl bg-[#f9fafb] px-6 py-5">
      <DetailItem label="Location">
        <div className="flex items-center gap-2">
          <Flag className="size-5 shrink-0" />
          <p className="text-base font-medium text-[#344054]">{location}</p>
        </div>
      </DetailItem>
      <DetailItem label="Department">
        <p className="text-base font-medium text-[#344054]">Growth</p>
      </DetailItem>
      <DetailItem label="Level">
        <p className="text-base font-medium text-[#344054]">Growth manager</p>
      </DetailItem>
      <DetailItem label="Phone number">
        <p className="text-base font-medium text-[#344054]">{phone}</p>
      </DetailItem>
      <DetailItem className="flex-1" label="Address">
        <p className="text-base font-medium text-[#344054]">{address}</p>
      </DetailItem>
    </div>
  );
}

function DetailItem({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <div className={className ?? "flex flex-col gap-2"}>
      <p className="text-sm font-medium text-[#667085]">{label}</p>
      {children}
    </div>
  );
}
