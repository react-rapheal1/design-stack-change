import type { IconComponent } from "../types";

interface QuickActionCardProps {
  description: string;
  icon: IconComponent;
  id: string;
  title: string;
}

export function QuickActionCard({ description, icon: Icon, id, title }: QuickActionCardProps) {
  return (
    <button
      id={id}
      type="button"
      className="flex items-start gap-3 rounded-xl border border-[#eaecf0] bg-white p-4 text-left transition duration-100 hover:border-brand-200 hover:bg-brand-25"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2f4f7]">
        <Icon className="size-5 text-[#667085]" />
      </div>
      <div>
        <p className="text-sm font-semibold text-secondary">{title}</p>
        <p className="mt-0.5 text-xs text-tertiary">{description}</p>
      </div>
    </button>
  );
}
