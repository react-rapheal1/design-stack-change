import type { FC } from "react";
import { BarChartSquare02, CheckDone01, Settings01, ShoppingBag01 } from "@untitledui/icons";
import { appRoutes } from "@/lib/app-routes";

export interface ProjectCard {
  description: string;
  href: string;
  icon: FC<{ className?: string }>;
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
  },
  {
    description: "Vendor order intake, RFQ handling, and catalog management.",
    href: appRoutes.vendorPortal.root,
    icon: BarChartSquare02,
    name: "Vendor Portal",
    status: "Supplier workspace",
  },
  {
    description: "Internal administration for RFQ oversight and platform operations.",
    href: appRoutes.raydaAdmin.root,
    icon: Settings01,
    name: "Rayda Admin",
    status: "Operations workspace",
  },
  {
    description: "Employee self-service pages for device visibility and fulfillment tracking.",
    href: appRoutes.remoteEmployees.root,
    icon: CheckDone01,
    name: "Remote Employees",
    status: "Employee workspace",
  },
];
