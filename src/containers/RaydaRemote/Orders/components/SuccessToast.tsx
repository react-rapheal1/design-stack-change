/* eslint-disable */
// @ts-nocheck
import { useEffect } from "react";
import { CheckCircle, XClose } from "@untitledui/icons";
import { cx } from "@/utils/cx";

function SuccessToast({ isVisible, onDismiss, message }: { isVisible: boolean; onDismiss: () => void; message: string }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onDismiss();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);
  return (
    <div
      className={cx(
        "fixed inset-x-4 top-4 z-[100] transition-all duration-300 ease-out md:inset-x-auto md:top-6 md:right-6 md:w-[400px]",
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
      )}
    >
      {" "}
      <div className="relative overflow-hidden rounded-xl border border-[#d5d7da] bg-white p-4 shadow-lg">
        {" "}
        {}{" "}
        <button type="button" onClick={onDismiss} className="absolute top-2 right-2 rounded-lg p-2 hover:bg-[#fafafa]">
          {" "}
          <XClose className="size-5 text-[#535862]" />{" "}
        </button>{" "}
        <div className="flex gap-4 pr-8">
          {" "}
          {}{" "}
          <div className="relative size-5 shrink-0">
            {" "}
            <div className="absolute -inset-[20%] rounded-full border-2 border-[#079455] opacity-30 duration-500 animate-in zoom-in-50" />{" "}
            <div className="absolute -inset-[45%] rounded-full border-2 border-[#079455] opacity-10 duration-700 animate-in zoom-in-0" />{" "}
            <CheckCircle className="relative size-5 text-[#079455] duration-300 animate-in zoom-in-50" />{" "}
          </div>{" "}
          <div className="flex flex-1 flex-col gap-3 pt-0.5">
            {" "}
            {}{" "}
            <div className="flex flex-col gap-1">
              {" "}
              <p className="text-sm font-semibold text-[#181d27]"> Order confirmed </p> <p className="text-sm text-[#414651]"> {message} </p>{" "}
            </div>{" "}
            {}{" "}
            <div className="flex gap-3">
              {" "}
              <button type="button" onClick={onDismiss} className="text-sm font-semibold text-[#535862] hover:text-[#414651]">
                {" "}
                Dismiss{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export { SuccessToast };
