/* eslint-disable */
// @ts-nocheck
"use client";

import { useState } from "react";
import { ErrorToast } from "./ErrorToast";
import { MetricCard } from "./MetricCard";
import { MobileHeader } from "./MobileHeader";
import { MobileSidebar } from "./MobileSidebar";
import { OrderDetailsSidebar } from "./OrderDetailsSidebar";
import { OrderRequest } from "./OrderRequest";
import { OrderRequestsTable } from "./OrderRequestsTable";
import { PeriodTabs } from "./PeriodTabs";
import { RFQ } from "./RFQ";
import { RFQChartSection } from "./RFQChartSection";
import { RFQDetailsSidebar } from "./RFQDetailsSidebar";
import { RFQErrorToast } from "./RFQErrorToast";
import { RFQRespondToast } from "./RFQRespondToast";
import { RFQsTable } from "./RFQsTable";
import { RecentOrdersTable } from "./RecentOrdersTable";
import { RegionSection } from "./RegionSection";
import { Sidebar } from "./Sidebar";
import { SuccessToast } from "./SuccessToast";
import { UpdatesWidget } from "./UpdatesWidget";
import { metrics } from "./metrics";

/* eslint-disable */
// @ts-nocheck

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
  const handleViewOrder = () => {
    setShowSuccessToast(false);
  };
  return (
    <div className="flex min-h-screen overflow-x-hidden bg-white">
      {" "}
      <Sidebar /> <MobileSidebar isOpen={isMobileSidebarOpen} onClose={() => setIsMobileSidebarOpen(false)} />{" "}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-60">
        {" "}
        <MobileHeader onMenuOpen={() => setIsMobileSidebarOpen(true)} /> {}{" "}
        <div className="flex min-w-0 flex-1">
          {" "}
          {}{" "}
          <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:px-8 md:py-8">
            {" "}
            {}{" "}
            <div className="flex flex-col gap-5">
              {" "}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                {" "}
                <h1 className="text-2xl font-semibold text-[#181d27]">Dashboard</h1>{" "}
                <PeriodTabs activeTab={headerActiveTab} onTabChange={setHeaderActiveTab} />{" "}
              </div>{" "}
              {}{" "}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
                {" "}
                {metrics.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}{" "}
              </div>{" "}
            </div>{" "}
            {}{" "}
            <div className="mt-6 flex min-w-0 flex-col gap-6 md:mt-8 md:gap-8">
              {" "}
              <OrderRequestsTable onViewOrder={setSelectedOrder} excludeOrderIds={[...acceptedOrderIds, ...declinedOrderIds]} />{" "}
              <RFQsTable onViewRFQ={setSelectedRFQ} excludeRFQIds={[...declinedRFQIds, ...respondedRFQIds]} /> <RecentOrdersTable />{" "}
            </div>{" "}
            {}{" "}
            <div className="mt-6 md:mt-8">
              {" "}
              <RegionSection />{" "}
            </div>{" "}
            {}{" "}
            <div className="mt-6 pb-8 md:mt-8 md:pb-12">
              {" "}
              <RFQChartSection />{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      {}{" "}
      <OrderDetailsSidebar
        order={selectedOrder}
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        onAccept={handleAcceptOrder}
        onDecline={handleDeclineOrder}
      />{" "}
      {}{" "}
      <RFQDetailsSidebar
        rfq={selectedRFQ}
        isOpen={!!selectedRFQ}
        onClose={() => setSelectedRFQ(null)}
        onDecline={handleDeclineRFQ}
        onRespond={handleRespondRFQ}
      />{" "}
      {} <SuccessToast isVisible={showSuccessToast} onDismiss={() => setShowSuccessToast(false)} onViewOrder={handleViewOrder} /> {}{" "}
      <ErrorToast isVisible={showErrorToast} onDismiss={() => setShowErrorToast(false)} /> {}{" "}
      <RFQErrorToast isVisible={showRFQErrorToast} onDismiss={() => setShowRFQErrorToast(false)} /> {}{" "}
      <RFQRespondToast isVisible={showRFQRespondToast} onDismiss={() => setShowRFQRespondToast(false)} /> {} <UpdatesWidget />{" "}
    </div>
  );
}
