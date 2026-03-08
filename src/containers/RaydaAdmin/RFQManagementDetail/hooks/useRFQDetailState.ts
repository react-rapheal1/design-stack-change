import { useState } from "react";
import { useParams } from "next/navigation";
import { CurationData, RFQ, RFQStatus, mockRFQs } from "../../shared";

function useRFQDetailState() {
  const params = useParams();
  const rfqId = params.id as string;
  const baseRfq = mockRFQs.find((item) => item.id === rfqId) ?? null;
  const [rfqOverrides, setRfqOverrides] = useState<Record<string, RFQ>>({});
  const [selectedVendorOverrides, setSelectedVendorOverrides] = useState<Record<string, string>>({});
  const [curatingRFQ, setCuratingRFQ] = useState<RFQ | null>(null);
  const [curatingVendorId, setCuratingVendorId] = useState("");
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const rfq = rfqOverrides[rfqId] ?? baseRfq;
  const selectedVendorId = selectedVendorOverrides[rfqId] ?? baseRfq?.curation?.selectedVendorId ?? "";

  const handleCurate = () => {
    if (!rfq) return;
    setCuratingRFQ(rfq);
    setCuratingVendorId(selectedVendorId);
  };

  const handleSendToCustomer = (nextRFQ: RFQ, curation: CurationData) => {
    const updated = { ...nextRFQ, status: "response_sent" as const, curation, sentAt: new Date().toISOString() };
    setRfqOverrides((prev) => ({ ...prev, [nextRFQ.id]: updated }));
    setCuratingRFQ(null);
    setSelectedVendorOverrides((prev) => ({ ...prev, [nextRFQ.id]: curation.selectedVendorId }));
    setSuccessMessage(`Response sent to customer for ${nextRFQ.id}`);
    setShowSuccessToast(true);
  };

  const handleRecall = () => {
    if (!rfq) return;
    const updated = { ...rfq, status: "vendors_responded" as RFQStatus, sentAt: undefined };
    const nextVendorId = rfq.curation?.selectedVendorId || rfq.vendorResponses[0]?.vendorId || "";
    setRfqOverrides((prev) => ({ ...prev, [rfq.id]: updated }));
    setCuratingRFQ(updated);
    setCuratingVendorId(nextVendorId);
  };

  const setSelectedVendorId = (value: string) => {
    setSelectedVendorOverrides((prev) => ({ ...prev, [rfqId]: value }));
  };

  return {
    curatingRFQ,
    curatingVendorId,
    handleCurate,
    handleRecall,
    handleSendToCustomer,
    rfq,
    rfqId,
    selectedVendorId,
    setCuratingRFQ,
    setSelectedVendorId,
    setShowSuccessToast,
    showSuccessToast,
    successMessage,
  };
}

export { useRFQDetailState };
