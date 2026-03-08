import { MetricCard } from "./MetricCard";
import { MetricPeriodTabs } from "./MetricPeriodTabs";

function RFQManagementMetrics({
  metricPeriod,
  metrics,
  onPeriodChange,
}: {
  metricPeriod: string;
  metrics: {
    accepted: { change: string; up: boolean; value: number };
    rejected: { change: string; up: boolean; value: number };
    sent: { change: string; up: boolean; value: number };
  };
  onPeriodChange: (value: string) => void;
}) {
  return (
    <div className="w-full page-px">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
          <MetricPeriodTabs activeTab={metricPeriod} onTabChange={onPeriodChange} />
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
          <MetricCard label="Sent to Customer" value={metrics.sent.value} change={metrics.sent.change} up={metrics.sent.up} period={metricPeriod} />
          <MetricCard label="Accepted" value={metrics.accepted.value} change={metrics.accepted.change} up={metrics.accepted.up} period={metricPeriod} />
          <MetricCard label="Rejected" value={metrics.rejected.value} change={metrics.rejected.change} up={metrics.rejected.up} period={metricPeriod} />
        </div>
      </div>
    </div>
  );
}

export { RFQManagementMetrics };
