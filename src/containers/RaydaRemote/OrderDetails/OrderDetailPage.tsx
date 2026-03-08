"use client";

import { EmployeeSlideout } from "./components/EmployeeSlideout";
import { HeaderNavigation } from "./components/HeaderNavigation";
import { OrderDetailHeader } from "./components/OrderDetailHeader";
import { OrderInfoCard } from "./components/OrderInfoCard";
import { OrderSidebar } from "./components/OrderSidebar";
import { OrderTabBar } from "./components/OrderTabBar";
import { OrderUpdatesCard } from "./components/OrderUpdatesCard";
import { VerifyAddressModal } from "./components/VerifyAddressModal";
import { useOrderDetailState } from "./hooks/useOrderDetailState";

export default function OrderDetailPage() {
  const state = useOrderDetailState();

  return (
    <div className="flex min-h-screen flex-col bg-[#fdfdfd]">
      <HeaderNavigation />
      <main className="flex flex-col items-center gap-8 pt-8 pb-12 sm:pt-12 sm:pb-24">
        <div className="flex w-full max-w-[1280px] flex-col gap-6 px-4 sm:px-6 lg:px-8">
          <OrderDetailHeader order={state.order} />
          <div className="flex items-start gap-6">
            <OrderSidebar order={state.order} />
            <div className="flex min-w-0 flex-1 flex-col gap-4">
              <OrderTabBar activeTab={state.activeTab} onChange={state.setActiveTab} />
              {state.activeTab === "info" ? (
                <OrderInfoCard
                  employees={state.sortedEmployees}
                  hasPending={state.hasPending}
                  onSort={state.handleSort}
                  onVerify={(employeeId) => state.setVerifyModal({ type: "single", empId: employeeId })}
                  onVerifyAll={() => state.setVerifyModal({ type: "bulk" })}
                  onView={state.setSelectedEmployee}
                  sortDir={state.sortDir}
                  sortKey={state.sortKey}
                />
              ) : (
                <OrderUpdatesCard items={state.feedItems} />
              )}
            </div>
          </div>
        </div>
      </main>
      {state.selectedEmployee && <EmployeeSlideout employee={state.selectedEmployee} onClose={() => state.setSelectedEmployee(null)} />}
      <VerifyAddressModal
        employees={state.sortedEmployees}
        verifyModal={state.verifyModal}
        onClose={state.closeVerifyModal}
        onConfirm={() => {
          if (!state.verifyModal) return;
          if (state.verifyModal.type === "bulk") {
            state.confirmVerifyAllPending();
            return;
          }
          state.confirmVerifyAddress(state.verifyModal.empId);
        }}
      />
    </div>
  );
}
