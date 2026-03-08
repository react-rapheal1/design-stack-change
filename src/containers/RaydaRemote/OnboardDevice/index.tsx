import { HeaderNavigation } from "./components/HeaderNavigation";
import { PageHeader } from "./components/PageHeader";
import { SelectCountryCard } from "./components/SelectCountryCard";

function OnboardDevicePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
      <HeaderNavigation />

      <main className="flex flex-1 flex-col gap-6 pt-8 pb-12 sm:gap-8 sm:pt-12 sm:pb-24">
        <PageHeader />
        <SelectCountryCard />
      </main>
    </div>
  );
}
export default OnboardDevicePage;
