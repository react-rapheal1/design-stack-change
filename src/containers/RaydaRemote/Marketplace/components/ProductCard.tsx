/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { RefreshCw03, SearchLg } from "@untitledui/icons";
import { useRouter } from "next/navigation";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { products } from "../data";
import type { Product } from "../data";
import { CustomDeviceRequestModal } from "./CustomRequest";

function ProductBadge({ label, color }: { label: string; color: "purple" | "fuchsia" }) {
  const colors = { purple: "bg-[#f4f3ff] text-[#4a1fb8]", fuchsia: "bg-[#fdf4ff] text-[#821890]" };
  return (
    <div className={cx("absolute inset-x-0 bottom-0 flex items-center justify-center rounded-b-2xl py-1 text-sm font-medium", colors[color])}>{label}</div>
  );
}
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#eaecf0] bg-white p-4">
      {}
      <div className="relative aspect-[222/156] w-full overflow-hidden rounded-2xl bg-[#f2f4f7]">
        <img src={product.image} alt={product.name} className="size-full object-cover" />
        {product.badge && <ProductBadge label={product.badge.label} color={product.badge.color} />}
      </div>

      {}
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-5 font-semibold text-[#101828]">{product.name}</p>
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs text-[#98a2b3]">Price</span>
            <span className="text-lg font-semibold text-[#101828]">{product.price}</span>
          </div>
          <Button size="sm">Add to cart</Button>
        </div>
      </div>
    </div>
  );
}
function ProductGrid() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [isCustomRequestOpen, setIsCustomRequestOpen] = useState(false);
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6">
      {}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="flex-1">
            <Input icon={SearchLg} placeholder="Search" size="md" />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button color="secondary" size="lg" iconTrailing={RefreshCw03} onClick={() => router.back()}>
              Change Country
            </Button>
            <Button size="lg" onClick={() => setIsCustomRequestOpen(true)}>
              Custom device request
            </Button>
          </div>
        </div>
        <div className="h-px w-full bg-border-secondary" />
      </div>

      {}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {}
      <PaginationPageMinimalCenter page={page} total={10} onPageChange={setPage} />

      {}
      <CustomDeviceRequestModal isOpen={isCustomRequestOpen} onOpenChange={setIsCustomRequestOpen} />
    </div>
  );
}
export { ProductBadge, ProductCard, ProductGrid };
