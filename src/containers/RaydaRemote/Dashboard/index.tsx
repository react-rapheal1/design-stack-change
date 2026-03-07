"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RemoteNavigation } from "../Shared/RemoteNavigation";
import { DashboardContent } from "./DashboardContent";
import { OnboardingModal } from "./OnboardingModal";
import { tourDestinations } from "./constants";

export default function DashboardPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(true);

  function handleComplete(method: string) {
    const destination = tourDestinations[method];
    if (destination) {
      router.push(destination);
      return;
    }
    setShowModal(false);
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#f9fafb]">
      <RemoteNavigation activeKey="overview" />
      <DashboardContent onOpenSetup={() => setShowModal(true)} showSetupBanner={!showModal} />
      {showModal && <OnboardingModal onComplete={handleComplete} onSkip={() => setShowModal(false)} />}
    </div>
  );
}
