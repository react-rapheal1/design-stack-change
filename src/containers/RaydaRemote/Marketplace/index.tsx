import { Suspense } from "react";
import { MarketplacePageContent } from "./MarketplacePageContent";

function MarketplacePage() {
  return (
    <Suspense>
      <MarketplacePageContent />
    </Suspense>
  );
}
export default MarketplacePage;
