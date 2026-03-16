import type { FC } from "react";
import { BarChartSquare02, CheckDone01, Settings01, ShoppingBag01 } from "@untitledui/icons";
import { appRoutes } from "@/lib/app-routes";

export interface ProjectCard {
  description: string;
  href: string;
  icon: FC<{ className?: string }>;
  links: { label: string; href: string }[];
  name: string;
  status: string;
}

export const projects: ProjectCard[] = [
  {
    description: "Customer onboarding, marketplace browsing, and order management.",
    href: appRoutes.raydaRemote.root,
    icon: ShoppingBag01,
    name: "Rayda Remote",
    status: "Customer workspace",
    links: [
      { label: "Dashboard", href: appRoutes.raydaRemote.dashboard },
      { label: "Orders", href: appRoutes.raydaRemote.orders },
      { label: "Equipment", href: appRoutes.raydaRemote.equipment },
      { label: "Employees", href: appRoutes.raydaRemote.employees },
      { label: "Marketplace", href: appRoutes.raydaRemote.marketplace },
      { label: "Onboarding", href: appRoutes.raydaRemote.onboarding },
      { label: "Sign Up", href: appRoutes.raydaRemote.signup },
    ],
  },
  {
    description: "Vendor order intake, RFQ handling, and catalog management.",
    href: appRoutes.vendorPortal.root,
    icon: BarChartSquare02,
    name: "Vendor Portal",
    status: "Supplier workspace",
    links: [{ label: "Portal", href: appRoutes.vendorPortal.root }],
  },
  {
    description: "Internal administration for RFQ oversight and platform operations.",
    href: appRoutes.raydaAdmin.root,
    icon: Settings01,
    name: "Rayda Admin",
    status: "Operations workspace",
    links: [{ label: "RFQ Management", href: appRoutes.raydaAdmin.rfqManagement }],
  },
  {
    description: "Employee self-service pages for device visibility and fulfillment tracking.",
    href: appRoutes.remoteEmployees.root,
    icon: CheckDone01,
    name: "Remote Employees",
    status: "Employee workspace",
    links: [
      { label: "Overview", href: appRoutes.remoteEmployees.overview },
      { label: "Order Summary", href: appRoutes.remoteEmployees.orderSummary },
    ],
  },
];
