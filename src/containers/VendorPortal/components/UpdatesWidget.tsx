/* eslint-disable */
// @ts-nocheck
import { useEffect, useState } from "react";
import { ChevronDown, MessageChatCircle, XClose } from "@untitledui/icons";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { activityFeed } from "../activityFeed";
import { UpdatesFeedContent } from "./UpdatesFeedContent";

function UpdatesWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const isMd = useBreakpoint("md");
  const unreadCount = activityFeed.length;
  useEffect(() => {
    if (!isMd && isExpanded) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isMd, isExpanded]);
  if (!isMd) {
    return (
      <>
        {" "}
        {} {isExpanded && <div className="fixed inset-0 z-40 bg-black/5 backdrop-blur-[2px]" onClick={() => setIsExpanded(false)} />}{" "}
        <div className="fixed right-4 bottom-5 z-50">
          {" "}
          {}{" "}
          {isExpanded && (
            <>
              {" "}
              <div
                className="absolute right-0 bottom-16 z-50 flex w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-2xl bg-primary duration-200 animate-in fade-in slide-in-from-bottom-4"
                style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.2), 0 0 1px rgba(0,0,0,0.1)" }}
              >
                {" "}
                {}{" "}
                <div className="flex items-center gap-3 bg-brand-solid px-4 py-3.5">
                  {" "}
                  <MessageChatCircle className="size-5 shrink-0 text-fg-white" aria-hidden="true" />{" "}
                  <span className="text-sm font-semibold text-white">Order Updates</span>{" "}
                  {unreadCount > 0 && (
                    <span className="flex size-5 items-center justify-center rounded-full bg-error-solid text-xs font-semibold text-white ring-2 ring-white">
                      {" "}
                      {unreadCount}{" "}
                    </span>
                  )}{" "}
                  <button
                    type="button"
                    onClick={() => setIsExpanded(false)}
                    className="ml-auto rounded-md p-0.5 transition duration-100 ease-linear hover:bg-white/10"
                  >
                    {" "}
                    <XClose className="size-5 text-fg-white" aria-hidden="true" />{" "}
                  </button>{" "}
                </div>{" "}
                {}{" "}
                <div className="max-h-[60vh] overflow-y-auto p-4">
                  {" "}
                  <UpdatesFeedContent />{" "}
                </div>{" "}
              </div>{" "}
            </>
          )}{" "}
          {}{" "}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="relative flex size-14 items-center justify-center rounded-full bg-brand-solid transition duration-200 ease-linear hover:bg-brand-solid_hover active:scale-95"
            style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.18), 0 8px 32px rgba(0,0,0,0.12)" }}
          >
            {" "}
            {isExpanded ? (
              <ChevronDown className="size-6 text-fg-white" aria-hidden="true" />
            ) : (
              <MessageChatCircle className="size-6 text-fg-white" aria-hidden="true" />
            )}{" "}
            {}{" "}
            {!isExpanded && unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-error-solid text-xs font-semibold text-white ring-2 ring-white">
                {" "}
                {unreadCount}{" "}
              </span>
            )}{" "}
          </button>{" "}
        </div>{" "}
      </>
    );
  }
  return (
    <div
      className="fixed right-4 bottom-0 z-50 flex flex-col sm:right-6"
      style={{ filter: "drop-shadow(0 -4px 24px rgba(0,0,0,0.12)) drop-shadow(0 8px 32px rgba(0,0,0,0.16))" }}
    >
      {" "}
      {}{" "}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        className={cx(
          "flex w-[340px] items-center gap-3 rounded-t-lg bg-brand-solid px-4 py-3.5 transition duration-200 ease-linear hover:bg-brand-solid_hover sm:w-[380px]",
          !isExpanded && "rounded-b-none",
        )}
      >
        {" "}
        <MessageChatCircle className="size-5 shrink-0 text-fg-white" aria-hidden="true" />{" "}
        <span className="text-sm font-semibold text-white">Order Updates</span>{" "}
        {unreadCount > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-error-solid text-xs font-semibold text-white ring-2 ring-white">
            {" "}
            {unreadCount}{" "}
          </span>
        )}{" "}
        <ChevronDown className={cx("ml-auto size-4 text-fg-white transition duration-200 ease-linear", isExpanded && "rotate-180")} aria-hidden="true" />{" "}
      </button>{" "}
      {}{" "}
      <div
        className={cx(
          "grid w-[340px] bg-primary transition-[grid-template-rows] duration-300 ease-out sm:w-[380px]",
          isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        {" "}
        <div className="overflow-hidden">
          {" "}
          <div className="flex max-h-[70vh] flex-col overflow-y-auto p-4">
            {" "}
            <UpdatesFeedContent />{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
}
export { UpdatesWidget };
