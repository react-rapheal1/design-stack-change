"use client";

import { useState } from "react";
import { OrderRequest } from "./OrderRequest";
import { RFQ } from "./RFQ";
import { ErrorToast } from "./components/ErrorToast";
import { MetricCard } from "./components/MetricCard";
import { MobileHeader } from "./components/MobileHeader";
import { MobileSidebar } from "./components/MobileSidebar";
import { OrderDetailsSidebar } from "./components/OrderDetailsSidebar";
import { OrderRequestsTable } from "./components/OrderRequestsTable";
import { PeriodTabs } from "./components/PeriodTabs";
import { RFQChartSection } from "./components/RFQChartSection";
import { RFQDetailsSidebar } from "./components/RFQDetailsSidebar";
import { RFQErrorToast } from "./components/RFQErrorToast";
import { RFQRespondToast } from "./components/RFQRespondToast";
import { RFQsTable } from "./components/RFQsTable";
import { RecentOrdersTable } from "./components/RecentOrdersTable";
import { RegionSection } from "./components/RegionSection";
import { Sidebar } from "./components/Sidebar";
import { SuccessToast } from "./components/SuccessToast";
import { UpdatesWidget } from "./components/UpdatesWidget";
import { metrics } from "./metrics";

export default function VendorPortalPage() {
  const [headerActiveTab, setHeaderActiveTab] = useState("12 months");
  const [selectedOrder, setSelectedOrder] = useState<OrderRequest | null>(null);
  const [selectedRFQ, setSelectedRFQ] = useState<RFQ | null>(null);
  const [acceptedOrderIds, setAcceptedOrderIds] = useState<string[]>([]);
  const [declinedOrderIds, setDeclinedOrderIds] = useState<string[]>([]);
  const [declinedRFQIds, setDeclinedRFQIds] = useState<string[]>([]);
  const [respondedRFQIds, setRespondedRFQIds] = useState<string[]>([]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showRFQErrorToast, setShowRFQErrorToast] = useState(false);
  const [showRFQRespondToast, setShowRFQRespondToast] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const handleAcceptOrder = (orderId: string) => {
    setAcceptedOrderIds((prev) => [...prev, orderId]);
    setShowSuccessToast(true);
  };

  const handleDeclineOrder = (orderId: string) => {
    setDeclinedOrderIds((prev) => [...prev, orderId]);
    setShowErrorToast(true);
  };

  const handleDeclineRFQ = (rfqId: string) => {
    setDeclinedRFQIds((prev) => [...prev, rfqId]);
    setShowRFQErrorToast(true);
  };

  const handleRespondRFQ = (rfqId: string) => {
    setRespondedRFQIds((prev) => [...prev, rfqId]);
    setShowRFQRespondToast(true);
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-white">
      <Sidebar />
      <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col lg:ml-60">
        <MobileHeader onMenuOpen={() => setIsMobileSidebarOpen(true)} />
        <div className="flex min-w-0 flex-1">
          <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                <h1 className="text-2xl font-semibold text-[#181d27]">Dashboard</h1>
                <PeriodTabs activeTab={headerActiveTab} onTabChange={setHeaderActiveTab} />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </div>
            </div>
            <div className="mt-6 flex min-w-0 flex-col gap-6 md:mt-8 md:gap-8">
              <OrderRequestsTable onViewOrder={setSelectedOrder} excludeOrderIds={[...acceptedOrderIds, ...declinedOrderIds]} />
              <RFQsTable onViewRFQ={setSelectedRFQ} excludeRFQIds={[...declinedRFQIds, ...respondedRFQIds]} />
              <RecentOrdersTable />
            </div>
            <div className="mt-6 md:mt-8">
              <RegionSection />
            </div>
            <div className="mt-6 pb-8 md:mt-8 md:pb-12">
              <RFQChartSection />
            </div>
          </div>
        </div>
      </div>
      {selectedOrder && (
        <OrderDetailsSidebar
          key={selectedOrder.id}
          order={selectedOrder}
          isOpen
          onClose={() => setSelectedOrder(null)}
          onAccept={handleAcceptOrder}
          onDecline={handleDeclineOrder}
        />
      )}
      {selectedRFQ && (
        <RFQDetailsSidebar
          key={selectedRFQ.id}
          rfq={selectedRFQ}
          isOpen
          onClose={() => setSelectedRFQ(null)}
          onDecline={handleDeclineRFQ}
          onRespond={handleRespondRFQ}
        />
      )}
      <SuccessToast isVisible={showSuccessToast} onDismiss={() => setShowSuccessToast(false)} onViewOrder={() => setShowSuccessToast(false)} />
      <ErrorToast isVisible={showErrorToast} onDismiss={() => setShowErrorToast(false)} />
      <RFQErrorToast isVisible={showRFQErrorToast} onDismiss={() => setShowRFQErrorToast(false)} />
      <RFQRespondToast isVisible={showRFQRespondToast} onDismiss={() => setShowRFQRespondToast(false)} />
      <UpdatesWidget />
    </div>
  );
}
