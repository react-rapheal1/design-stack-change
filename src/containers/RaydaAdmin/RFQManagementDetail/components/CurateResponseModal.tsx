import { AlertCircle, ArrowLeft, ArrowRight, ClipboardCheck } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CurationData, RFQ } from "../../shared";
import { useCurateResponse } from "../hooks/useCurateResponse";
import { ConfirmSendDescription } from "./ConfirmSendDescription";
import { CurateResponseDeviceCard } from "./CurateResponseDeviceCard";
import { CurateResponseNotesCard } from "./CurateResponseNotesCard";
import { CurateResponsePrompt, CurateResponsePromptActions } from "./CurateResponsePrompt";
import { CurateResponseSummary } from "./CurateResponseSummary";

function CurateResponseModal({
  isOpen,
  onClose,
  onSend,
  rfq,
  vendorId,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSend: (rfq: RFQ, curation: CurationData) => void;
  rfq: RFQ | null;
  vendorId: string;
}) {
  const state = useCurateResponse({ rfq, vendorId });
  const vendor = state.vendor;
  if (!isOpen || !rfq || !vendor) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex flex-col bg-primary">
        <div className="flex flex-col gap-3 border-b border-secondary py-4 page-px sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={() => (state.hasChanges ? state.setShowDiscardModal(true) : onClose())}
            className="flex items-center gap-1.5 text-sm font-semibold text-tertiary transition hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to Review
          </button>
          <div className="sm:text-center">
            <h2 className="text-lg font-semibold text-primary">Curate Response for {rfq.id}</h2>
            <p className="text-sm text-tertiary">Vendor: {vendor.vendorName}</p>
          </div>
          <div className="hidden w-32 sm:block" />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl py-6 page-px">
            <div className="flex flex-col gap-4">
              {rfq.devices.map((_, index) =>
                state.devicePricing[index] ? (
                  <CurateResponseDeviceCard
                    key={index}
                    customerCurrency={state.customerCurrency}
                    exchangeRate={state.exchangeRate}
                    getCustomerPrice={state.getCustomerPrice}
                    getEffectiveMarkup={state.getEffectiveMarkup}
                    getVendorPrice={state.getVendorPrice}
                    index={index}
                    pricing={state.devicePricing[index]}
                    rfq={rfq}
                    updatePricing={state.updatePricing}
                    vendor={vendor}
                  />
                ) : null,
              )}
              <CurateResponseNotesCard
                notes={state.notes}
                onChange={(value) => {
                  state.setNotes(value);
                  state.setHasChanges(true);
                }}
              />
              <CurateResponseSummary
                customerBudgetTotal={state.customerBudgetTotal}
                customerCurrency={state.customerCurrency}
                customerPriceTotal={state.customerPriceTotal}
                totalMarkup={state.totalMarkup}
                totalMarkupPercent={state.totalMarkupPercent}
                vendorCostConverted={state.vendorCostConverted}
                vendorCostTotal={state.vendorCostTotal}
                vendorCurrency={state.vendorCurrency}
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-secondary py-4 page-px">
          <Button size="md" color="secondary" onClick={() => (state.hasChanges ? state.setShowDiscardModal(true) : onClose())}>
            Close
          </Button>
          <Button size="md" color="primary" iconTrailing={ArrowRight} onClick={() => state.setShowConfirmModal(true)}>
            Send to Customer
          </Button>
        </div>
      </div>
      <CurateResponsePrompt
        isOpen={state.showDiscardModal}
        color="error"
        icon={AlertCircle}
        title="Discard unsaved changes?"
        description="You have unsaved pricing changes. Closing now will discard all modifications you've made."
        actions={
          <CurateResponsePromptActions
            confirmColor="primary-destructive"
            confirmLabel="Discard & Close"
            onCancel={() => state.setShowDiscardModal(false)}
            onConfirm={() => {
              state.setShowDiscardModal(false);
              onClose();
            }}
          />
        }
      />
      <CurateResponsePrompt
        isOpen={state.showConfirmModal}
        color="brand"
        icon={ClipboardCheck}
        title="Send Response to Customer?"
        description={
          <ConfirmSendDescription
            adminTotal={state.customerPriceTotal}
            customerCurrency={state.customerCurrency}
            quotedDeviceCount={state.quotedDeviceCount}
            rfqId={rfq.id}
            vendorName={vendor.vendorName}
          />
        }
        actions={
          <CurateResponsePromptActions
            confirmColor="primary"
            confirmLabel="Confirm & Send"
            onCancel={() => state.setShowConfirmModal(false)}
            onConfirm={() => {
              state.setShowConfirmModal(false);
              onSend(rfq, state.curation);
            }}
          />
        }
      />
    </>
  );
}

export { CurateResponseModal };
