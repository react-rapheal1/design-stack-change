function OrderTabBar({ activeTab, onChange }: { activeTab: "info" | "updates"; onChange: (tab: "info" | "updates") => void }) {
  return (
    <div className="flex border-b border-[#e9eaeb]">
      {[
        ["info", "Order information", null],
        ["updates", "Order updates", "2"],
      ].map(([tab, label, badge]) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab as "info" | "updates")}
          className={`relative ${tab === "updates" ? "ml-6 flex items-center gap-2" : ""} px-1 pb-3 text-base font-semibold ${activeTab === tab ? "text-[#0948b5]" : "text-[#717680] hover:text-[#414651]"}`}
        >
          {label}
          {badge && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#fee4e2] px-1 text-xs font-medium text-[#b42318]">{badge}</span>
          )}
          {activeTab === tab && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0b5de8]" />}
        </button>
      ))}
    </div>
  );
}

export { OrderTabBar };
