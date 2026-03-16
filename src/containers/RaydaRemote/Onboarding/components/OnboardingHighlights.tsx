import type { FC } from "react";

type Highlight = { icon: FC<{ className?: string }>; text: string };

function OnboardingHighlights({ highlights }: { highlights: Highlight[] }) {
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
