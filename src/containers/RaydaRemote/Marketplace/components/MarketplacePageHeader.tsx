import { ChevronRight, HomeLine } from "@untitledui/icons";

function MarketplacePageHeader({ countryName }: { countryName: string }) {
  return (
    <div className="w-full page-px">
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl leading-[32px] font-semibold text-[#101828]">Marketplace</h1>
          <p className="text-base leading-6 text-[#475467]">Select items for this catalogs</p>
        </div>
        <div className="h-px w-full bg-border-secondary" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
        <a href="#" className="text-[#667085] transition hover:text-[#344054]">
          <HomeLine className="size-5" />
        </a>
        <ChevronRight className="size-4 text-[#d0d5dd]" />
        <a href="#" className="text-sm font-medium text-[#475467] transition hover:text-[#344054]">
          Overview
        </a>
        <ChevronRight className="size-4 text-[#d0d5dd]" />
        <span className="text-sm font-semibold text-[#003999]">Marketplace - {countryName}</span>
      </div>
    </div>
  );
}
export { MarketplacePageHeader };
