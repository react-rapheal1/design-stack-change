/* eslint-disable */
// @ts-nocheck
import { useEffect } from "react";
import { CheckCircle, XClose } from "@untitledui/icons";

function SuccessToast({ isVisible, onDismiss, message }: { isVisible: boolean; onDismiss: () => void; message: string }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onDismiss, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onDismiss]);
  if (!isVisible) return null;
  return (
    <div className="fixed right-6 bottom-6 z-50 flex items-center gap-3 rounded-xl border border-[#abefc6] bg-[#ecfdf3] px-4 py-3 shadow-lg duration-300 animate-in slide-in-from-bottom-4">
      {" "}
      <CheckCircle className="size-5 text-[#067647]" /> <span className="text-sm font-medium text-[#067647]">{message}</span>{" "}
      <button type="button" onClick={onDismiss} className="ml-2 rounded p-1 hover:bg-[#d1fadf]">
        {" "}
        <XClose className="size-4 text-[#067647]" />{" "}
      </button>{" "}
    </div>
  );
}
export { SuccessToast };
