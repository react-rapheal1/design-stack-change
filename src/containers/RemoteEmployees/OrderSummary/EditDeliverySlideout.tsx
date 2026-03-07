"use client";

import { useEffect, useState } from "react";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { DeliveryLocationFields } from "./DeliveryLocationFields";
import { DeliveryPhoneField } from "./DeliveryPhoneField";
import type { DeliveryInfo } from "./data";

/* eslint-disable react-hooks/set-state-in-effect */

function EditDeliverySlideout({
  initialData,
  isOpen,
  onOpenChange,
  onSave,
}: {
  initialData: DeliveryInfo;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: DeliveryInfo, updateProfile: boolean) => void;
}) {
  const [phone, setPhone] = useState(initialData.phone);
  const [phoneCountry, setPhoneCountry] = useState(initialData.phoneCountry);
  const [country, setCountry] = useState<string | null>(initialData.country);
  const [state, setState] = useState<string | null>(initialData.state || null);
  const [address, setAddress] = useState(initialData.address);
  const [landmark, setLandmark] = useState(initialData.landmark);
  const [updateProfile, setUpdateProfile] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setPhone(initialData.phone);
    setPhoneCountry(initialData.phoneCountry);
    setCountry(initialData.country);
    setState(initialData.state || null);
    setAddress(initialData.address);
    setLandmark(initialData.landmark);
    setUpdateProfile(false);
  }, [initialData, isOpen]);

  return (
    <SlideoutMenu isOpen={isOpen} onOpenChange={onOpenChange}>
      {({ close }) => (
        <>
          <SlideoutMenu.Header onClose={close}>
            <div className="flex flex-col gap-1 pr-8">
              <h2 className="text-lg font-semibold text-[#181d27]">Edit delivery information</h2>
              <p className="text-sm text-[#535862]">Update the delivery details for this order.</p>
            </div>
          </SlideoutMenu.Header>
          <SlideoutMenu.Content>
            <div className="flex flex-col gap-5">
              <DeliveryPhoneField phone={phone} phoneCountry={phoneCountry} onPhoneChange={setPhone} onPhoneCountryChange={setPhoneCountry} />
              <DeliveryLocationFields
                address={address}
                country={country}
                landmark={landmark}
                state={state}
                updateProfile={updateProfile}
                onAddressChange={setAddress}
                onCountryChange={(value) => {
                  setCountry(value);
                  setState(null);
                }}
                onLandmarkChange={setLandmark}
                onStateChange={setState}
                onUpdateProfileChange={setUpdateProfile}
              />
            </div>
          </SlideoutMenu.Content>
          <SlideoutMenu.Footer>
            <div className="flex gap-3">
              <Button color="secondary" size="lg" className="flex-1" onClick={close}>
                Cancel
              </Button>
              <Button
                size="lg"
                className="flex-1"
                onClick={() => {
                  onSave({ address, country: country || "gb", landmark, phone, phoneCountry, state: state || "" }, updateProfile);
                  close();
                }}
              >
                Save changes
              </Button>
            </div>
          </SlideoutMenu.Footer>
        </>
      )}
    </SlideoutMenu>
  );
}

export { EditDeliverySlideout };
