import { redirect } from "next/navigation";
import { appRoutes } from "@/lib/app-routes";

export default function RaydaAdminPage() {
  redirect(appRoutes.raydaAdmin.rfqManagement);
}
