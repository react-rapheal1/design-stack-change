import { BarChart01, CheckCircle, CurrencyDollar, Flag01, Laptop01, Settings01, Shield01, Users01, ZapFast } from "@untitledui/icons";
import type { FC } from "react";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { OnboardingHighlights } from "./OnboardingHighlights";

type Highlight = { icon: FC<{ className?: string }>; text: string };
type StepContent = { badge: string; heading: string; sub: string; highlights: Highlight[] };

const STEP_CONTENT: StepContent[] = [
  {
    badge: "Getting started",
    heading: "Tell us about\nyour company",
    sub: "We'll use this to personalise your workspace and match you with the right vendors.",
    highlights: [
      { icon: BarChart01, text: "Full asset visibility from day one" },
      { icon: Users01, text: "Automated new hire provisioning" },
      { icon: Shield01, text: "Compliance dashboards built-in" },
      { icon: ZapFast, text: "AI resolves tickets before you see them" },
      { icon: CurrencyDollar, text: "Track depreciation & cut hardware spend" },
    ],
  },
  {
    badge: "IT configuration",
    heading: "Configure your\nIT environment",
    sub: "We'll auto-configure asset tracking, device policies, and MDM sync to your exact setup.",
    highlights: [
      { icon: Settings01, text: "Automatic MDM integration" },
      { icon: Laptop01, text: "Device policy rules applied instantly" },
      { icon: Shield01, text: "Compliance checks tailored to your stack" },
      { icon: ZapFast, text: "Skip manual setup — we detect your tools" },
    ],
  },
  {
    badge: "Hardware & compliance",
    heading: "Protect your\nhardware investments",
    sub: "Your requirements inform every recommendation your AI Teammate makes from day one.",
    highlights: [
      { icon: Shield01, text: "Compliance-ready from day one" },
      { icon: Laptop01, text: "Smart procurement for your device stack" },
      { icon: CurrencyDollar, text: "Depreciation tracking built-in" },
      { icon: ZapFast, text: "AI flags compliance gaps automatically" },
    ],
  },
  {
    badge: "Your first mission",
    heading: "Pick your\nstarting point",
    sub: "Focus on one goal — the rest will be ready when you are. You can change this anytime.",
    highlights: [
      { icon: Flag01, text: "Tackle your top IT priority first" },
      { icon: CheckCircle, text: "Other goals stay queued for later" },
      { icon: ZapFast, text: "Your AI Teammate activates immediately" },
      { icon: BarChart01, text: "Progress tracked from the first action" },
    ],
  },
];

function OnboardingSidePanel({ step }: { step: number }) {
  const content = STEP_CONTENT[step] ?? STEP_CONTENT[0];

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
            {content.badge}
          </span>
          <h2 className="mt-4 whitespace-pre-line text-2xl leading-8 font-bold text-white">{content.heading}</h2>
          <p className="mt-3 text-sm leading-6 text-[#98a2b3]">{content.sub}</p>

          <OnboardingHighlights highlights={content.highlights} />
        </div>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
          <p className="text-xs text-[#98a2b3]">No credit card required. Setup takes under 3 minutes. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
}

export { OnboardingSidePanel };
