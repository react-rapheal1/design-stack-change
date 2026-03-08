/* eslint-disable */
// @ts-nocheck
import { ChevronRight, HomeLine } from "@untitledui/icons";
import { orders } from "../data";

function PageHeader() {
  return (
    <div className="w-full">
      {" "}
      <div className="flex flex-col gap-5">
        {" "}
        {}{" "}
        <div className="flex flex-col gap-1">
          {" "}
          <h1 className="text-2xl leading-[32px] font-semibold text-[#101828] sm:text-[30px] sm:leading-[38px]"> Orders </h1>{" "}
          <p className="text-sm leading-5 text-[#475467] sm:text-base sm:leading-6"> View, track and manage your orders </p>{" "}
        </div>{" "}
        {} <div className="h-px w-full bg-border-secondary" />{" "}
      </div>{" "}
      {}{" "}
      <div className="mt-6 flex items-center gap-3">
        {" "}
        <a href="#" className="text-[#667085] transition hover:text-[#344054]">
          {" "}
          <HomeLine className="size-5" />{" "}
        </a>{" "}
        <ChevronRight className="size-4 text-[#d0d5dd]" />{" "}
        <a href="#" className="text-sm font-semibold text-[#003999]">
          {" "}
          Orders{" "}
        </a>{" "}
      </div>{" "}
    </div>
  );
}
export { PageHeader };
