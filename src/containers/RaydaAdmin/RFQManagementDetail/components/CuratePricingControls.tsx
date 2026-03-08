import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { formatCurrency } from "../../shared";

function CuratePricingControls({
  getCustomerPrice,
  getEffectiveMarkup,
  index,
  onUpdate,
  pricing,
  vendorPrice,
}: {
  getCustomerPrice: (index: number) => number;
  getEffectiveMarkup: (index: number) => number;
  index: number;
  onUpdate: (index: number, updates: { fixedPrice?: number; isUnavailable?: boolean; markupPercent?: number; mode?: "markup" | "fixed" }) => void;
  pricing: { fixedPrice: number; isUnavailable: boolean; markupPercent: number; mode: "markup" | "fixed" };
  vendorPrice: number;
}) {
  return (
    <>
      <Checkbox
        size="sm"
        label="Mark as Unavailable"
        isSelected={pricing.isUnavailable}
        onChange={(selected) => onUpdate(index, { isUnavailable: selected })}
      />
      {!pricing.isUnavailable && (
        <div className="flex flex-col gap-3 rounded-lg border border-tertiary p-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-secondary">Pricing</span>
            <ButtonGroup
              size="sm"
              selectedKeys={new Set([pricing.mode === "markup" ? `markup-${index}` : `fixed-${index}`])}
              onSelectionChange={(keys) => {
                const selected = [...keys][0] as string;
                if (selected?.startsWith("markup")) {
                  onUpdate(index, { fixedPrice: Math.round(vendorPrice * (1 + pricing.markupPercent / 100)), mode: "markup" });
                  return;
                }
                onUpdate(index, { mode: "fixed" });
              }}
            >
              <ButtonGroupItem id={`markup-${index}`}>Markup %</ButtonGroupItem>
              <ButtonGroupItem id={`fixed-${index}`}>Fixed Price</ButtonGroupItem>
            </ButtonGroup>
          </div>
          {pricing.mode === "markup" ? (
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-tertiary">Markup</span>
                <input
                  type="number"
                  value={pricing.markupPercent}
                  onChange={(event) => {
                    const markup = Number(event.target.value) || 0;
                    onUpdate(index, { fixedPrice: Math.round(vendorPrice * (1 + markup / 100)), markupPercent: markup });
                  }}
                  className="w-20 rounded-lg bg-primary px-3 py-2 text-sm text-primary shadow-xs ring-1 ring-border-primary transition duration-100 ease-linear ring-inset focus:ring-2 focus:ring-brand focus:outline-hidden"
                  min={0}
                  max={200}
                />
                <span className="text-sm text-tertiary">%</span>
              </div>
              <span className="text-sm text-quaternary">=</span>
              <span className="text-sm font-semibold text-primary">{formatCurrency(getCustomerPrice(index))}/unit</span>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-tertiary">Price</span>
                <InputGroup
                  className="w-28"
                  value={String(pricing.fixedPrice)}
                  onChange={(value) =>
                    onUpdate(index, {
                      fixedPrice: Number(value) || 0,
                      markupPercent: vendorPrice > 0 ? Math.round((((Number(value) || 0) - vendorPrice) / vendorPrice) * 100) : 0,
                    })
                  }
                  aria-label="Customer price"
                  leadingAddon={<InputGroup.Prefix>$</InputGroup.Prefix>}
                >
                  <InputBase inputMode="numeric" pattern="[0-9]*" placeholder="0" />
                </InputGroup>
                <span className="text-sm text-tertiary">per unit</span>
              </div>
              <span className="text-sm text-quaternary">=</span>
              <span className="text-sm text-tertiary">
                Markup: <span className="font-semibold text-primary">{getEffectiveMarkup(index)}%</span>
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export { CuratePricingControls };
