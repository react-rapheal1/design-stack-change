/* eslint-disable */
// @ts-nocheck
import { useRef, useState } from "react";
import { ChevronDown, ShoppingBag01 } from "@untitledui/icons";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";
import { CountryFlag } from "./CountryFlag";
import { DeclineRFQModal } from "./DeclineRFQModal";
import { Device } from "./Device";
import { RFQ } from "./RFQ";
import { RFQDeadlineBadge } from "./RFQDeadlineBadge";
import { RespondToBudgetModal } from "./RespondToBudgetModal";
import { formatCurrency } from "./formatCurrency";
import { isRFQExpired } from "./isRFQExpired";
import { useCurrentTime } from "./useCurrentTime";

function RFQDetailsSidebar({
  rfq,
  isOpen,
  onClose,
  onDecline,
  onRespond,
}: {
  rfq: RFQ | null;
  isOpen: boolean;
  onClose: () => void;
  onDecline: (rfqId: string) => void;
  onRespond: (rfqId: string) => void;
}) {
  const [expandedDevice, setExpandedDevice] = useState<number | null>(null);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showRespondModal, setShowRespondModal] = useState(false);
  const nowMs = useCurrentTime();
  const lastRfqRef = useRef<RFQ | null>(null);
  if (rfq) lastRfqRef.current = rfq;
  const displayRfq = rfq ?? lastRfqRef.current;
  const toggleDevice = (index: number) => {
    setExpandedDevice(expandedDevice === index ? null : index);
  };
  if (!displayRfq) return null;
  const totalQuantity = displayRfq.devices.reduce((sum, d) => sum + d.quantity, 0);
  return (
    <>
      {" "}
      <SlideoutMenu isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
        {" "}
        <SlideoutMenu.Header onClose={onClose}>
          {" "}
          <div className="flex items-start gap-4">
            {" "}
            <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
              {" "}
              <ShoppingBag01 className="size-5 text-fg-quaternary" />{" "}
            </div>{" "}
            <div className="flex flex-1 flex-col gap-1.5">
              {" "}
              <h2 className="text-xl font-semibold text-primary"> RFQ #{displayRfq.id} </h2>{" "}
            </div>{" "}
          </div>{" "}
        </SlideoutMenu.Header>{" "}
        <SlideoutMenu.Content>
          {" "}
          <div className="flex flex-col gap-4">
            {" "}
            {}{" "}
            <div className="rounded-xl border border-[#e9eaeb] bg-white">
              {" "}
              {}{" "}
              <div className="flex items-center justify-between border-b border-[#e9eaeb] px-3 py-3">
                {" "}
                <span className="text-sm font-semibold text-[#414651]">Device(s)</span>{" "}
                <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]"> {totalQuantity} </span>{" "}
              </div>{" "}
              {}{" "}
              <div className="flex flex-col divide-y divide-[#e9eaeb]">
                {" "}
                {displayRfq.devices.map((device, index) => {
                  const deviceTotal = device.unitPrice !== undefined ? device.unitPrice * device.quantity : null;
                  const isExpanded = expandedDevice === index;
                  return (
                    <div key={index} className={cx("flex flex-col transition-colors duration-200", isExpanded ? "bg-[#fafafa]" : "")}>
                      {" "}
                      {}{" "}
                      <button
                        type="button"
                        onClick={() => toggleDevice(index)}
                        className="flex w-full items-center justify-between p-3 text-left transition-colors hover:bg-[#fafafa]"
                      >
                        {" "}
                        <div className="flex min-w-0 flex-1 flex-col gap-1 pr-2">
                          {" "}
                          {} <span className="line-clamp-1 text-sm font-semibold text-[#181d27]"> {device.name} </span> {}{" "}
                          <span className="text-sm text-[#535862]">
                            {" "}
                            ×{device.quantity}
                            {deviceTotal !== null && ` | ${formatCurrency(deviceTotal)}`}{" "}
                          </span>{" "}
                        </div>{" "}
                        <ChevronDown className={cx("size-5 shrink-0 text-[#535862] transition-transform duration-200", isExpanded && "rotate-180")} />{" "}
                      </button>{" "}
                      {}{" "}
                      {isExpanded && (
                        <div className="flex flex-col gap-4 px-3 pb-4 duration-200 animate-in fade-in slide-in-from-top-2">
                          {" "}
                          <div className="h-px bg-[#e9eaeb]" /> {}{" "}
                          <div className="grid grid-cols-2 gap-3">
                            {" "}
                            <div className="flex flex-col gap-0.5">
                              {" "}
                              <span className="text-xs font-medium text-[#717680]">Quantity</span>{" "}
                              <span className="text-sm font-medium text-[#181d27]">{device.quantity}</span>{" "}
                            </div>{" "}
                            <div className="flex flex-col gap-0.5">
                              {" "}
                              <span className="text-xs font-medium text-[#717680]">Asset Type</span>{" "}
                              <span className="text-sm font-medium text-[#181d27]">{device.assetType}</span>{" "}
                            </div>{" "}
                          </div>{" "}
                          {}{" "}
                          <div className="flex flex-col gap-1.5">
                            {" "}
                            <span className="text-xs font-medium text-[#717680]">Description</span>{" "}
                            <p className="text-sm leading-relaxed text-[#535862]"> {device.description} </p>{" "}
                          </div>{" "}
                        </div>
                      )}{" "}
                    </div>
                  );
                })}{" "}
              </div>{" "}
              {}{" "}
            </div>{" "}
            {}{" "}
            <div className="flex flex-col gap-6 rounded-xl border border-[#e9eaeb] bg-white p-4">
              {" "}
              <div className="flex flex-col gap-1">
                {" "}
                <span className="text-sm font-semibold text-[#252b37]">Country</span>{" "}
                <div className="flex items-center gap-1.5">
                  {" "}
                  <CountryFlag country={displayRfq.country} /> <span className="text-sm text-[#535862]">{displayRfq.country}</span>{" "}
                </div>{" "}
              </div>{" "}
              <div className="flex flex-col gap-1.5">
                {" "}
                <span className="text-sm font-semibold text-[#252b37]">Response Deadline</span>{" "}
                <div className="flex items-center gap-2">
                  {" "}
                  <RFQDeadlineBadge createdAt={displayRfq.createdAt} nowMs={nowMs} />{" "}
                  <span className="text-xs text-[#535862]">
                    {" "}
                    {isRFQExpired(displayRfq.createdAt, nowMs) ? "This RFQ has expired." : "Respond within this timeline."}{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </SlideoutMenu.Content>{" "}
        <SlideoutMenu.Footer>
          {" "}
          <div className="flex gap-3">
            {" "}
            <Button size="lg" color="secondary" className="flex-1" onClick={() => setShowDeclineModal(true)}>
              {" "}
              Decline RFQ{" "}
            </Button>{" "}
            <Button size="lg" color="primary" className="flex-1" onClick={() => setShowRespondModal(true)}>
              {" "}
              Respond{" "}
            </Button>{" "}
          </div>{" "}
        </SlideoutMenu.Footer>{" "}
      </SlideoutMenu>{" "}
      {}{" "}
      <RespondToBudgetModal
        isOpen={showRespondModal}
        onClose={() => setShowRespondModal(false)}
        onSubmit={() => {
          onRespond(displayRfq.id);
          onClose();
        }}
        devices={displayRfq.devices}
        rfqId={displayRfq.id}
      />{" "}
      {}{" "}
      <DeclineRFQModal
        isOpen={showDeclineModal}
        onClose={() => setShowDeclineModal(false)}
        onConfirm={() => {
          setShowDeclineModal(false);
          onDecline(displayRfq.id);
          onClose();
        }}
        rfqId={displayRfq.id}
      />{" "}
    </>
  );
}
export { RFQDetailsSidebar };
