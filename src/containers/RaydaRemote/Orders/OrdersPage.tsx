/* eslint-disable */
// @ts-nocheck
"use client";

import React, { useState } from "react";
import { Tabs } from "@/components/application/tabs/tabs";
import { CustomDeviceRequestsTable } from "./CustomDeviceRequestsTable";
import { HeaderNavigation } from "./HeaderNavigation";
import { OrdersTable } from "./OrdersTable";
import { PageHeader } from "./PageHeader";
import { orders } from "./data";

/* eslint-disable */
// @ts-nocheck

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState<"orders" | "custom_device_requests">("custom_device_requests");
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
      {" "}
      <HeaderNavigation />{" "}
      <main className="flex min-w-0 flex-col gap-8 pt-8 pb-12 sm:pt-12 sm:pb-24">
        {" "}
        <div className="flex w-full min-w-0 flex-col gap-6 page-px">
          {" "}
          <PageHeader /> {}{" "}
          <div className="w-full">
            {" "}
            {}{" "}
            <div className="mb-6">
              {" "}
              <Tabs selectedKey={activeTab} onSelectionChange={(key: React.Key) => setActiveTab(key as "orders" | "custom_device_requests")}>
                {" "}
                <Tabs.List type="underline" items={[]}>
                  {" "}
                  <Tabs.Item key="orders" id="orders">
                    {" "}
                    Orders{" "}
                  </Tabs.Item>{" "}
                  <Tabs.Item key="custom_device_requests" id="custom_device_requests">
                    {" "}
                    Custom Device Requests{" "}
                  </Tabs.Item>{" "}
                </Tabs.List>{" "}
              </Tabs>{" "}
            </div>{" "}
            {} {activeTab === "orders" ? <OrdersTable /> : <CustomDeviceRequestsTable />}{" "}
          </div>{" "}
        </div>{" "}
      </main>{" "}
    </div>
  );
}
