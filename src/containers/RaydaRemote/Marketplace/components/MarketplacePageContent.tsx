"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/base/buttons/button";
import { HeaderNavigation } from "../../OnboardDevice/components/HeaderNavigation";
import { FilterSidebar, MobileFilterDrawer } from "./Filters";
import { MarketplacePageHeader } from "./MarketplacePageHeader";
import { ProductGrid } from "./ProductCard";

function MarketplacePageContent() {
  const searchParams = useSearchParams();
  const countryName = searchParams.get("country") || "United States";
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
      <HeaderNavigation />

      <main className="flex flex-1 flex-col gap-6 pt-8 pb-12 sm:gap-8 sm:pt-12 sm:pb-24">
        <MarketplacePageHeader countryName={countryName} />

        <div className="w-full page-px">
          {}
          <div className="mb-4 lg:hidden">
            <Button color="secondary" size="md" onClick={() => setMobileFilterOpen(true)}>
              Filters
            </Button>
          </div>

          <div className="flex gap-8">
            <FilterSidebar />
            <div className="hidden w-px self-stretch bg-border-secondary lg:block" />
            <ProductGrid />
          </div>
        </div>
      </main>

      <MobileFilterDrawer isOpen={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)} />
    </div>
  );
}
export { MarketplacePageContent };
