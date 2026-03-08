import { formatCurrency } from "../../shared";

function CurateResponseSummary({
  customerPriceTotal,
  totalMarkup,
  totalMarkupPercent,
  vendorCostTotal,
}: {
  customerPriceTotal: number;
  totalMarkup: number;
  totalMarkupPercent: string;
  vendorCostTotal: number;
}) {
  return (
    <div className="rounded-xl border border-secondary bg-secondary_alt p-4">
      <p className="mb-3 text-sm font-semibold text-primary">Summary</p>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-tertiary">Vendor Cost Total</span>
          <span className="font-medium text-primary">{formatCurrency(vendorCostTotal)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-tertiary">Customer Price Total</span>
          <span className="font-semibold text-primary">{formatCurrency(customerPriceTotal)}</span>
        </div>
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
