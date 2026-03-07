import { redirect } from "next/navigation";
import { appRoutes } from "@/lib/app-routes";

export default function RaydaRemotePage() {
  redirect(appRoutes.raydaRemote.signup);
}
