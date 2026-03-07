"use client";

import { AssetsSection } from "./AssetsSection";
import { DetailsBar } from "./DetailsBar";
import { HeaderNavigation } from "./HeaderNavigation";
import { ProfileHeader } from "./ProfileHeader";

export default function OverviewPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <HeaderNavigation />
      <main className="flex flex-col items-center gap-8 pb-12 sm:pb-24">
        <ProfileHeader />
        <div className="w-full">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 sm:px-6 lg:px-8">
            <DetailsBar />
            <AssetsSection />
          </div>
        </div>
      </main>
    </div>
  );
}
