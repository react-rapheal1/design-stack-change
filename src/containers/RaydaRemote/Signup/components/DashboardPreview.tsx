import { cx } from "@/utils/cx";
import { previewNavItems, stats } from "../sidePanelData";
import { ChartPreview } from "./ChartPreview";
import { DotsIcon, LogoGlyph } from "./PanelIcons";

function DashboardPreview() {
  return (
    <div className="mt-8 overflow-hidden rounded-t-2xl shadow-2xl">
      <div className="flex items-center gap-1 bg-[#0f1629] px-5 py-3">
        <div className="mr-4 flex items-center gap-1.5">
          <LogoGlyph />
          <span className="text-xs font-bold tracking-widest text-white">RAYDA</span>
        </div>
        {previewNavItems.map((item, index) => (
          <span
            key={item}
            className={cx("rounded-md px-3 py-1.5 text-xs font-medium transition duration-100", index === 0 ? "bg-white/15 text-white" : "text-white/50")}
          >
            {item}
          </span>
        ))}
      </div>
      <div className="bg-white px-5 py-4">
        <h3 className="text-sm font-bold text-[#101828]">Overview</h3>
        <p className="text-xs text-[#667085]">Your current sales summary and activity.</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
        <ChartPreview />
        <p className="mt-2 text-xs font-bold text-[#101828]">Start creating content</p>
      </div>
    </div>
  );
}

function StatCard({ change, label, value }: { change: string; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-[#eaecf0] p-3">
      <div className="flex items-start justify-between">
        <p className="text-xs text-[#667085]">{label}</p>
        <DotsIcon />
      </div>
      <div className="mt-1 flex items-end justify-between">
        <p className="text-xl font-bold text-[#101828]">{value}</p>
        <span className="text-xs font-semibold text-green-600">{change}</span>
      </div>
      <p className="mt-2 text-right text-xs font-medium text-brand-600">View report</p>
    </div>
  );
}

export { DashboardPreview };
