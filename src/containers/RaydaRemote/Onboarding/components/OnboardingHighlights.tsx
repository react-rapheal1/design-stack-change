import { BarChart01, CurrencyDollar, Shield01, Users01, ZapFast } from "@untitledui/icons";

const highlights = [
  { icon: BarChart01, text: "Full asset visibility from day one" },
  { icon: Users01, text: "Automated new hire provisioning" },
  { icon: Shield01, text: "Compliance dashboards built-in" },
  { icon: ZapFast, text: "AI resolves tickets before you see them" },
  { icon: CurrencyDollar, text: "Track depreciation & cut hardware spend" },
];

function OnboardingHighlights() {
  return (
    <div className="mt-8 flex flex-col gap-3">
      {highlights.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-start gap-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
            <Icon className="size-3.5 text-brand-300" />
          </div>
          <p className="text-sm text-[#98a2b3]">{text}</p>
        </div>
      ))}
    </div>
  );
}

export { OnboardingHighlights };
