import { Lightning01 } from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { OnboardingHighlights } from "./OnboardingHighlights";

function OnboardingSidePanel() {
  return (
    <div className="relative flex h-full flex-col overflow-hidden bg-[#101828]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-[400px] w-[400px] rounded-full bg-brand-600/15 blur-[100px]" />
        <div className="absolute -right-16 -bottom-24 h-[300px] w-[300px] rounded-full bg-brand-900/30 blur-[80px]" />
      </div>

      <div className="relative flex h-full flex-col px-8 py-8">
        <RaydaLogo variant="white" />

        <div className="mt-12 flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-900/50 px-3 py-1 text-xs font-semibold text-brand-300 ring-1 ring-brand-700/50">
            <Lightning01 className="size-3" />
            AI IT Teammate
          </span>
          <h2 className="mt-4 text-2xl leading-8 font-bold text-white">
            Let&apos;s set up your
            <br />
            IT workspace.
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#98a2b3]">
            A few quick questions and we&apos;ll have your platform configured, your devices tracked, and your first goal underway — in under 3 minutes.
          </p>

          <OnboardingHighlights />
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs text-[#667085]">No credit card required. Setup takes under 3 minutes. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
}

export { OnboardingSidePanel };
