import { AlertCircle, ArrowLeft, ArrowRight, ClipboardCheck } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { CurationData, RFQ, formatCurrency } from "../../shared";
import { useCurateResponse } from "../hooks/useCurateResponse";
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
        <div className="flex items-center justify-between border-b border-secondary py-4 page-px">
          <button
            type="button"
            onClick={() => (state.hasChanges ? state.setShowDiscardModal(true) : onClose())}
            className="flex items-center gap-1.5 text-sm font-semibold text-tertiary transition hover:text-primary"
          >
            <ArrowLeft className="size-4" />
            Back to Review
          </button>
          <div className="text-center">
            <h2 className="text-lg font-semibold text-primary">Curate Response for {rfq.id}</h2>
            <p className="text-sm text-tertiary">Vendor: {vendor.vendorName}</p>
          </div>
          <div className="w-32" />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl py-6 page-px">
            <div className="flex flex-col gap-4">
              {rfq.devices.map((_, index) =>
                state.devicePricing[index] ? (
                  <CurateResponseDeviceCard
                    key={index}
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
                customerPriceTotal={state.customerPriceTotal}
                totalMarkup={state.totalMarkup}
                totalMarkupPercent={state.totalMarkupPercent}
                vendorCostTotal={state.vendorCostTotal}
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
        icon={ClipboardCheck}
        title="Send Response to Customer?"
        description={
          <>
            <p>You&apos;re about to send a curated response for {rfq.id}.</p>
            <div className="mt-3 rounded-lg bg-secondary p-3 text-left text-sm">
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between">
                  <span className="text-tertiary">Devices quoted</span>
                  <span className="font-medium text-primary">{state.quotedDeviceCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Vendor</span>
                  <span className="font-medium text-primary">{vendor.vendorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Customer total</span>
                  <span className="font-semibold text-primary">{formatCurrency(state.customerPriceTotal)}</span>
                </div>
              </div>
            </div>
            <p className="mt-3 text-xs text-tertiary">The customer will be notified and can accept or reject.</p>
          </>
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
