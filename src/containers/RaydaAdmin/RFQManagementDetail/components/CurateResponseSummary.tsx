import { formatCurrency } from "../../shared";

function SummaryRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-tertiary">{label}</span>
      <span className={bold ? "font-semibold text-primary" : "font-medium text-primary"}>{value}</span>
    </div>
  );
}

function CurateResponseSummary({
  customerBudgetTotal,
  customerPriceTotal,
  totalMarkup,
  totalMarkupPercent,
  vendorCostTotal,
}: {
  customerBudgetTotal: number;
  customerPriceTotal: number;
  totalMarkup: number;
  totalMarkupPercent: string;
  vendorCostTotal: number;
}) {
  return (
    <div className="rounded-xl border border-secondary bg-secondary_alt p-4">
      <p className="mb-3 text-sm font-semibold text-primary">Summary</p>
      <div className="flex flex-col gap-2">
        {customerBudgetTotal > 0 && <SummaryRow label="Customer Budget" value={formatCurrency(customerBudgetTotal)} />}
        <SummaryRow label="Vendor Cost Total" value={formatCurrency(vendorCostTotal)} />
        <SummaryRow label="Admin Price Total" value={formatCurrency(customerPriceTotal)} bold />
        <div className="border-t border-secondary pt-2">
          <div className="flex items-center justify-between rounded-md bg-success-secondary px-2 py-1.5 text-sm">
            <span className="text-success-primary">Total Markup</span>
            <span className="font-semibold text-success-primary">
              {formatCurrency(totalMarkup)} ({totalMarkupPercent}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CurateResponseSummary };
