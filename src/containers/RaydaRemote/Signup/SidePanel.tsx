import { DashboardPreview } from "./DashboardPreview";
import { TestimonialPanel } from "./TestimonialPanel";

function SidePanelBackground() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
      <filter id="grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#grain)" />
    </svg>
  );
}

export function SidePanel() {
  return (
    <div
      className="relative hidden h-full flex-col overflow-hidden lg:flex"
      style={{ background: "linear-gradient(160deg, #e8a0c8 0%, #c8a8e8 25%, #a8b8f0 55%, #90cce0 100%)" }}
    >
      <SidePanelBackground />
      <div className="relative flex h-full flex-col px-10 py-12">
        <TestimonialPanel />
        <DashboardPreview />
      </div>
    </div>
  );
}
