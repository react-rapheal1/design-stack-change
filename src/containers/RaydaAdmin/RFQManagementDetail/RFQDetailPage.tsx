"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { CurateResponseModal } from "./components/CurateResponseModal";
import { CustomerRequestCard } from "./components/CustomerRequestCard";
import { HeaderNavigation } from "./components/HeaderNavigation";
import { RFQDetailFooter } from "./components/RFQDetailFooter";
import { RFQDetailHeader } from "./components/RFQDetailHeader";
import { RFQStatusBanner } from "./components/RFQStatusBanner";
import { RequestInfoCard } from "./components/RequestInfoCard";
import { SuccessToast } from "./components/SuccessToast";
import { VendorQuotesSection } from "./components/VendorQuotesSection";
import { useRFQDetailState } from "./hooks/useRFQDetailState";

export default function RFQDetailPage() {
  const router = useRouter();
  const state = useRFQDetailState();
  if (!state.rfq)
    return (
      <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
        <HeaderNavigation />
        <main className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <p className="text-lg font-semibold text-primary">RFQ not found</p>
            <p className="mt-1 text-sm text-tertiary">The request &quot;{state.rfqId}&quot; does not exist.</p>
            <Button size="md" color="secondary" className="mt-4" onClick={() => router.push("/rayda-admin/rfq-management")}>
              Back to RFQs
            </Button>
          </div>
        </main>
      </div>
    );

  const isReadOnly = ["fully_accepted", "partially_accepted", "customer_rejected", "expired"].includes(state.rfq.status);
  const isPending = state.rfq.status === "pending_vendors";
  const isSent = state.rfq.status === "response_sent";

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
      <HeaderNavigation />
      <main className="flex flex-1 flex-col">
        <RFQDetailHeader rfq={state.rfq} />
        <div className="flex-1 py-6 page-px">
          <div className="flex flex-col gap-6">
            <RFQStatusBanner rfq={state.rfq} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <CustomerRequestCard rfq={state.rfq} />
              <RequestInfoCard rfq={state.rfq} />
            </div>
            <VendorQuotesSection onSelectVendor={state.setSelectedVendorId} rfq={state.rfq} selectedVendorId={state.selectedVendorId} />
          </div>
        </div>
        {!isPending && (
          <RFQDetailFooter
            canCurate={!!state.selectedVendorId && !isReadOnly && !isSent}
            onBack={() => router.push("/rayda-admin/rfq-management")}
            onCurate={state.handleCurate}
            onRecall={state.handleRecall}
            showRecall={!isReadOnly && isSent}
          />
        )}
        {isReadOnly && (
          <div className="sticky bottom-0 border-t border-secondary bg-primary py-4 page-px">
            <Button size="md" color="secondary" onClick={() => router.push("/rayda-admin/rfq-management")}>
              Back to RFQs
            </Button>
          </div>
        )}
      </main>
      {state.curatingRFQ && (
        <CurateResponseModal
          key={`${state.curatingRFQ.id}-${state.curatingVendorId}`}
          rfq={state.curatingRFQ}
          vendorId={state.curatingVendorId}
          isOpen
          onClose={() => state.setCuratingRFQ(null)}
          onSend={state.handleSendToCustomer}
        />
      )}
      <SuccessToast isVisible={state.showSuccessToast} onDismiss={() => state.setShowSuccessToast(false)} message={state.successMessage} />
    </div>
  );
}
