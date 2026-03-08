import { Input } from "@/components/base/input/input";
import { RFQDevice } from "../RFQDevice";
import { formatCurrency } from "../formatCurrency";

function QuoteResponseFields({ device, quotePrice, onChange }: { device: RFQDevice; quotePrice: string; onChange: (value: string) => void }) {
  return (
    <div className="mt-2 duration-200 animate-in fade-in slide-in-from-top-2">
      <Input label="Your price per unit" placeholder="0.00" value={quotePrice} onChange={onChange} type="number" />
      {quotePrice && <p className="mt-1.5 text-xs text-[#535862]">Subtotal: {formatCurrency(parseFloat(quotePrice) * device.quantity)}</p>}
    </div>
  );
}

export { QuoteResponseFields };
