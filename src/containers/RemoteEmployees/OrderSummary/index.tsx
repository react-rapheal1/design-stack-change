"use client";

import { useState } from "react";
import { Edit05 } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { FloatingAlert } from "@/components/application/alerts/floating-alert";
import { Button } from "@/components/base/buttons/button";
import { ORDER_CONFIRMED_NOTIFICATIONS, saveNotifications } from "@/utils/notification-store";
import { saveProfileUpdate } from "@/utils/profile-store";
import { DeliveryAddressCard } from "./DeliveryAddressCard";
import { ConfirmDetailsModal, RemoveSignatureModal } from "./Dialogs";
import { EditDeliverySlideout } from "./EditDeliverySlideout";
import { EquipmentCard } from "./EquipmentCard";
import { HeaderNavigation } from "./HeaderNavigation";
import { OrderActions } from "./OrderActions";
import { PageHeader } from "./PageHeader";
import { countries, countryPhoneCodes, countryStates } from "./data";
import type { DeliveryInfo } from "./data";

function OrderSummaryPage() {
  const router = useRouter();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
    phone: "78 2824 3334",
    phoneCountry: "gb",
    country: "gb",
    state: "england",
    address: "8/101 Nicholson St, Camp Hill EC1A 1AE",
    landmark: "",
  });
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const [showSignatureOnAlert, setShowSignatureOnAlert] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [signatureRequired, setSignatureRequired] = useState(true);
  const [isRemoveSignatureOpen, setIsRemoveSignatureOpen] = useState(false);
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const handleSaveDelivery = (data: DeliveryInfo, updateProfile: boolean) => {
    setDeliveryInfo(data);
    if (updateProfile) {
      const stateLabel = countryStates[data.country]?.find((s) => s.id === data.state)?.label ?? "";
      const countryLabel = countries.find((c) => c.id === data.country)?.label ?? "";
      saveProfileUpdate({
        address: data.address,
        stateLabel,
        countryId: data.country,
        countryLabel,
        phone: `${countryPhoneCodes[data.phoneCountry] ?? ""} ${data.phone}`.trim(),
      });
    }
    setShowSaveAlert(true);
    setTimeout(() => setShowSaveAlert(false), 4000);
  };
  const handleSignatureToggleOn = () => {
    setSignatureRequired(true);
    setShowSignatureOnAlert(true);
    setTimeout(() => setShowSignatureOnAlert(false), 4000);
  };
  return (
    <div className="flex min-h-screen flex-col bg-[#fdfdfd]">
      <FloatingAlert
        show={showSaveAlert}
        color="success"
        title="Changes saved"
        description="Your delivery information has been updated."
        onDismiss={() => setShowSaveAlert(false)}
      />
      <FloatingAlert
        show={showSignatureOnAlert}
        color="success"
        title="Signature requirement enabled"
        description="Your delivery will require a signature upon receipt."
        onDismiss={() => setShowSignatureOnAlert(false)}
        topOffset={showSaveAlert ? "top-[88px]" : "top-4"}
      />
      <HeaderNavigation />

      <main className="flex flex-1 flex-col gap-8 pt-8 pb-12 sm:pt-12 sm:pb-24">
        <PageHeader termsAccepted={termsAccepted} onConfirm={() => setIsConfirmOpen(true)} />

        <div className="w-full">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:gap-8 lg:px-8">
            {}
            <div className="flex min-w-0 flex-col gap-8 lg:flex-1">
              <Button color="secondary" size="md" iconLeading={Edit05} className="w-full" onClick={() => setIsEditOpen(true)}>
                Edit delivery information
              </Button>

              <div className="flex flex-col gap-8">
                <DeliveryAddressCard deliveryInfo={deliveryInfo} />
                <EquipmentCard />
              </div>
            </div>

            {}
            <div className="min-w-0 lg:flex-1">
              <OrderActions
                termsAccepted={termsAccepted}
                onTermsChange={setTermsAccepted}
                signatureRequired={signatureRequired}
                onSignatureToggleOff={() => setIsRemoveSignatureOpen(true)}
                onSignatureToggleOn={handleSignatureToggleOn}
                specialInstructions={specialInstructions}
                onSpecialInstructionsChange={setSpecialInstructions}
                onConfirm={() => setIsConfirmOpen(true)}
              />
            </div>
          </div>
        </div>
      </main>

      <EditDeliverySlideout isOpen={isEditOpen} onOpenChange={setIsEditOpen} initialData={deliveryInfo} onSave={handleSaveDelivery} />
      <RemoveSignatureModal isOpen={isRemoveSignatureOpen} onOpenChange={setIsRemoveSignatureOpen} onRemove={() => setSignatureRequired(false)} />
      <ConfirmDetailsModal
        isOpen={isConfirmOpen}
        onOpenChange={setIsConfirmOpen}
        deliveryInfo={deliveryInfo}
        signatureRequired={signatureRequired}
        specialInstructions={specialInstructions}
        onConfirm={() => {
          saveNotifications(ORDER_CONFIRMED_NOTIFICATIONS);
          router.push("/remote-employees/overview");
        }}
      />
    </div>
  );
}
export default OrderSummaryPage;
