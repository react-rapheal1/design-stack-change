import { appRoutes } from "@/lib/app-routes";

interface RemoteNavItem {
  href: string;
  id?: string;
  key: string;
  label: string;
}

export const remoteNavItems: RemoteNavItem[] = [
  { key: "overview", label: "Overview", href: appRoutes.raydaRemote.dashboard },
  { key: "orders", label: "Orders", href: appRoutes.raydaRemote.orders },
  { key: "marketplace", label: "Marketplace", href: appRoutes.raydaRemote.marketplace },
  { key: "catalogs", label: "Catalogs", href: "#" },
  { key: "storage", label: "Storage", href: "#" },
  { key: "employees", label: "Employees", href: appRoutes.raydaRemote.employees, id: "nav-employees" },
  { key: "equipment", label: "All equipment", href: appRoutes.raydaRemote.equipment, id: "nav-equipment" },
] as const;
