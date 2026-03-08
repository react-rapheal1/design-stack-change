import type { ReactNode } from "react";
import { BarChart01, ZapFast } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { metricCards, quickActions } from "../constants";
import { MetricCard } from "./MetricCard";
import { QuickActionCard } from "./QuickActionCard";

interface DashboardContentProps {
  onOpenSetup: () => void;
  showSetupBanner: boolean;
}

export function DashboardContent({ onOpenSetup, showSetupBanner }: DashboardContentProps) {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="py-6 page-px lg:py-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Overview</h1>
            <p className="mt-1 text-sm text-tertiary">A quick snapshot of your account</p>
          </div>
          <div className="flex gap-2">
            <Button color="secondary" size="sm">
              Export report
            </Button>
            <Button size="sm">+ Invite</Button>
          </div>
        </div>
        {showSetupBanner && (
          <div className="mt-6 flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
                <ZapFast className="size-5 text-brand-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-brand-700">Your dashboard is ready. Let&apos;s fill it in.</p>
                <p className="text-sm text-brand-600">Import your devices to start tracking inventory, assignments, and refresh schedules.</p>
              </div>
            </div>
            <Button size="sm" onClick={onOpenSetup}>
              Set up now
            </Button>
          </div>
        )}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {metricCards.map((card) => (
            <MetricCard key={card.label} {...card} />
          ))}
        </div>
        <div className="mt-8">
          <p className="text-base font-semibold text-primary">What do you want to do today?</p>
          <p className="mt-0.5 text-sm text-tertiary">Select an option to manage equipment and employee resources.</p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions.map((action) => (
              <QuickActionCard key={action.id} {...action} />
            ))}
          </div>
        </div>
        <EmptySection
          action={
            <Button size="sm" color="secondary" className="mt-4" onClick={onOpenSetup}>
              Import devices
            </Button>
          }
          description="Import your devices to start seeing activity, metrics, and trends."
          icon={<BarChart01 className="size-6 text-[#667085]" />}
          title="What's happening?"
          valueTitle="No data yet"
        />
        <div className="mt-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-base font-semibold text-primary">Recent orders</p>
              <p className="mt-0.5 text-sm text-tertiary">View the latest orders placed.</p>
            </div>
            <Button color="secondary" size="sm">
              View orders
            </Button>
          </div>
          <div className="mt-4 flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-[#d0d5dd] bg-white px-8 py-10 text-center">
            <p className="text-sm font-semibold text-secondary">No orders yet</p>
            <p className="mt-1 text-sm text-tertiary">Orders will appear here once devices have been requested.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptySection({
  action,
  description,
  icon,
  title,
  valueTitle,
}: {
  action: ReactNode;
  description: string;
  icon: ReactNode;
  title: string;
  valueTitle: string;
}) {
  return (
    <div className="mt-8">
      <p className="text-base font-semibold text-primary">{title}</p>
      <p className="mt-0.5 text-sm text-tertiary">Stay updated on key metrics and recent activities within your organization.</p>
      <div className="mt-4 flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-[#d0d5dd] bg-white px-8 py-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2f4f7]">{icon}</div>
        <p className="mt-3 text-sm font-semibold text-secondary">{valueTitle}</p>
        <p className="mt-1 text-sm text-tertiary">{description}</p>
        {action}
      </div>
    </div>
  );
}
