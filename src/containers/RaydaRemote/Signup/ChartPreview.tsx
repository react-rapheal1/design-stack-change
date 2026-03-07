import { previewMonths } from "./sidePanelData";

function ChartPreview() {
  return (
    <div className="mt-3">
      <p className="text-xs font-bold text-[#101828]">Onboarding report</p>
      <div className="relative mt-2 h-20">
        <svg className="h-full w-full" viewBox="0 0 300 64" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,46 C30,44 60,43 90,41 C120,39 150,42 180,40 C210,38 240,34 270,30 C285,28 295,26 300,24" stroke="#3b82f6" strokeWidth="2" fill="none" />
          <path d="M0,46 C30,44 60,43 90,41 C120,39 150,42 180,40 C210,38 240,34 270,30 C285,28 295,26 300,24 L300,64 L0,64 Z" fill="url(#chartFill)" />
          <path d="M0,54 C30,53 60,52 90,51 C120,50 150,51 180,50 C210,49 240,47 270,44 C285,43 295,42 300,41" stroke="#93c5fd" strokeWidth="1.5" fill="none" />
        </svg>
        <div className="absolute right-0 bottom-0 left-0 flex justify-between px-1">
          {previewMonths.map((month) => (
            <span key={month} className="text-[9px] text-[#98a2b3]">
              {month}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export { ChartPreview };
