import type { CurrencyCode, CustomerCurrencyCode } from "../../shared";
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
  customerCurrency = "USD",
  customerPriceTotal,
  totalMarkup,
  totalMarkupPercent,
  vendorCostConverted,
  vendorCostTotal,
  vendorCurrency = "USD",
}: {
  customerBudgetTotal: number;
  customerCurrency?: CustomerCurrencyCode;
  customerPriceTotal: number;
  totalMarkup: number;
  totalMarkupPercent: string;
  vendorCostConverted?: number;
  vendorCostTotal: number;
  vendorCurrency?: CurrencyCode;
}) {
  const vendorLabel =
    vendorCurrency !== customerCurrency && vendorCostConverted != null
      ? `${formatCurrency(vendorCostTotal, vendorCurrency)} (~${formatCurrency(vendorCostConverted, customerCurrency)})`
      : formatCurrency(vendorCostTotal, vendorCurrency);

  return (
    <div className="rounded-xl border border-secondary bg-secondary_alt p-4">
      <p className="mb-3 text-sm font-semibold text-primary">Summary</p>
      <div className="flex flex-col gap-2">
        {customerBudgetTotal > 0 && <SummaryRow label="Customer Budget" value={formatCurrency(customerBudgetTotal, customerCurrency)} />}
        <SummaryRow label="Vendor Cost Total" value={vendorLabel} />
        <SummaryRow label="Admin Price Total" value={formatCurrency(customerPriceTotal, customerCurrency)} bold />
        <div className="border-t border-secondary pt-2">
          <div className="flex items-center justify-between rounded-md bg-success-secondary px-2 py-1.5 text-sm">
            <span className="text-success-primary">Total Markup</span>
            <span className="font-semibold text-success-primary">
              {formatCurrency(totalMarkup, customerCurrency)} ({totalMarkupPercent}%)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CurateResponseSummary };
