/* eslint-disable */
// @ts-nocheck
import { useState } from "react";
import { Package, X } from "@untitledui/icons";
import { EmpRow } from "../EmpRow";
import { employeeOrderItems } from "../employeeOrderItems";
import { EmpStatusBadge } from "./EmpStatusBadge";
import { EmployeeVerificationProgress } from "./EmployeeVerificationProgress";
import { SigBadge } from "./SigBadge";

function EmployeeSlideout({ employee, onClose }: { employee: EmpRow; onClose: () => void }) {
  const [sigEnabled, setSigEnabled] = useState(employee.signature === "required");
  const completedSteps = employee.status === "completed" ? 4 : 1;
  return (
    <>
      {" "}
      {} <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} /> {}{" "}
      <div className="fixed top-0 right-0 z-50 flex h-full w-[440px] flex-col overflow-y-auto border-l border-[#eaecf0] bg-white shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]">
        {" "}
        {}{" "}
        <div className="flex items-center justify-between px-6 pt-6">
          {" "}
          <p className="text-xl font-semibold text-[#101828]">ORD-1007</p>{" "}
          <button type="button" onClick={onClose} className="flex size-10 items-center justify-center rounded-lg text-[#717680] hover:bg-[#f9fafb]">
            {" "}
            <X className="size-5" />{" "}
          </button>{" "}
        </div>{" "}
        {}{" "}
        <div className="relative mt-4">
          {" "}
          <div
            className="h-24 w-full"
            style={{
              background:
                "radial-gradient(ellipse at 20% 50%, #fde68a 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #bfdbfe 0%, transparent 60%), linear-gradient(135deg, #fef3c7 0%, #ede9fe 50%, #dbeafe 100%)",
            }}
          />{" "}
          <div className="absolute -bottom-10 left-6 size-20 shrink-0 overflow-hidden rounded-full border-4 border-white bg-[#f2f4f7] shadow-[0px_4px_8px_rgba(16,24,40,0.1)]">
            {" "}
            <p className="flex h-full items-center justify-center text-2xl font-medium text-[#475467]"> {employee.initials} </p>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="mt-14 px-6">
          {" "}
          <p className="text-2xl font-semibold text-[#101828]">{employee.name}</p> <p className="text-base text-[#475467]">{employee.email}</p>{" "}
        </div>{" "}
        {}{" "}
        <div className="mt-4 flex items-start gap-6 border-t border-[#eaecf0] px-6 py-4">
          {" "}
          <div className="flex shrink-0 flex-col gap-1">
            {" "}
            <p className="text-xs font-medium text-[#475467]">Total amount</p> <p className="text-sm text-[#475467]">{employee.amount}</p>{" "}
          </div>{" "}
          <div className="flex flex-col gap-1">
            {" "}
            <p className="text-xs font-medium text-[#475467]">Order status</p> <EmpStatusBadge status={employee.status} />{" "}
          </div>{" "}
          <div className="flex flex-col gap-1">
            {" "}
            <p className="text-xs font-medium text-[#475467]">Signature</p> <SigBadge sig={employee.signature} />{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="border-t border-[#eaecf0] px-6 py-4">
          {" "}
          <p className="text-xs font-medium text-[#475467]">Address</p> <p className="mt-1 text-sm text-[#475467]">{employee.address}</p>{" "}
        </div>{" "}
        {}{" "}
        <div className="border-t border-[#eaecf0] px-6 py-4">
          {" "}
          <p className="mb-3 text-sm font-medium text-[#344054]">Verification progress</p> <EmployeeVerificationProgress completedSteps={completedSteps} />{" "}
        </div>{" "}
        {}{" "}
        <div className="border-t border-[#eaecf0] px-6 py-4">
          {" "}
          <p className="text-sm font-medium text-[#344054]">Items</p>{" "}
          <p className="mt-0.5 text-sm text-[#475467]">The following items are included in this order.</p>{" "}
          <div className="mt-3 flex flex-col divide-y divide-[#eaecf0]">
            {" "}
            {employeeOrderItems.map((item) => (
              <div key={item.name} className="flex items-center gap-3 py-3">
                {" "}
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f9fafb]">
                  {" "}
                  <Package className="size-5 text-[#717680]" />{" "}
                </div>{" "}
                <p className="flex-1 truncate text-sm font-semibold text-[#344054]">{item.name}</p> <EmpStatusBadge status="in-progress" />{" "}
                <button type="button" className="shrink-0 text-sm font-semibold text-[#003999] hover:underline">
                  View
                </button>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="mx-6 mb-4 rounded-xl border border-[#e9eaeb] p-4">
          {" "}
          <div className="flex items-start gap-3">
            {" "}
            <button
              type="button"
              role="switch"
              aria-checked={sigEnabled}
              onClick={() => setSigEnabled((v) => !v)}
              className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${sigEnabled ? "bg-[#0b5de8]" : "bg-[#d0d5dd]"}`}
            >
              {" "}
              <span
                className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${sigEnabled ? "translate-x-4" : "translate-x-0"}`}
              />{" "}
            </button>{" "}
            <div>
              {" "}
              <p className="text-sm font-medium text-[#414651]">Signature Required</p>{" "}
              <p className="text-sm text-[#535862]">
                {" "}
                Delivery will be attempted only when employee is available to receive. However, this will not always be guaranteed.{" "}
              </p>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        {}{" "}
        <div className="mt-auto border-t border-[#eaecf0] px-6 py-4">
          {" "}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]"
          >
            {" "}
            Cancel{" "}
          </button>{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}
export { EmployeeSlideout };
