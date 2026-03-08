"use client";

import { CheckCircle, ChevronRight } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { Button } from "@/components/base/buttons/button";

function MissionCompleteStep() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center py-8 text-center">
      {}
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-25">
        <CheckCircle className="size-10 text-brand-600" />
      </div>

      <h2 className="mt-6 text-3xl font-bold text-primary">Mission complete!</h2>
      <p className="mt-3 max-w-sm text-base text-tertiary">You&apos;ve imported 47 devices and 3 need employee confirmation.</p>

      {}
      <div className="mt-8 w-full max-w-sm rounded-2xl border border-[#eaecf0] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-tertiary">Your IT Health Score</p>
        <div className="mt-3 flex items-end gap-2">
          <span className="text-5xl font-bold text-primary">22</span>
          <span className="mb-1 text-lg text-tertiary">/ 100</span>
        </div>
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#eaecf0]">
          <div className="h-full rounded-full bg-brand-600 transition-all duration-1000" style={{ width: "22%" }} />
        </div>
        <p className="mt-2 text-xs text-tertiary">Complete more goals to increase your score.</p>
      </div>

      {}
      <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
        <p className="text-left text-sm font-semibold text-secondary">Quick wins we spotted</p>
        {[
          { text: "3 devices have unknown encryption status", action: "Review" },
          { text: "No offboarding workflow detected", action: "Set up" },
          { text: "2 devices approaching end-of-life", action: "View" },
        ].map((win) => (
          <div key={win.text} className="flex items-center justify-between rounded-xl border border-[#eaecf0] bg-[#f9fafb] px-4 py-3">
            <p className="text-left text-sm text-secondary">{win.text}</p>
            <button className="ml-3 shrink-0 text-xs font-semibold text-brand-600 hover:text-brand-700">
              {win.action} <ChevronRight className="inline size-3" />
            </button>
          </div>
        ))}
      </div>

      {}
      <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
        <Button size="lg" className="w-full" onClick={() => router.push("/rayda-remote/onboard-device")}>
          Go to dashboard
        </Button>
        <Button color="secondary" size="lg" className="w-full">
          Explore next goal
        </Button>
      </div>
    </div>
  );
}
export { MissionCompleteStep };
