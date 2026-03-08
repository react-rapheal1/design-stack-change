import Link from "next/link";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Button } from "@/components/base/buttons/button";
import { appRoutes } from "@/lib/app-routes";

export function AssetsSection() {
  return (
    <div className="flex w-full flex-col gap-5">
      <div className="flex flex-col gap-5">
        <div className="flex items-center gap-4">
          <div className="flex flex-1 flex-col gap-1">
            <h2 className="text-lg font-semibold text-[#101828]">Assets</h2>
            <p className="text-sm text-[#475467]">Your recent assets here</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href={appRoutes.remoteEmployees.orderSummary}>
              <Button size="md" color="secondary">
                View Order
              </Button>
            </Link>
            <Button size="md">All assets</Button>
          </div>
        </div>
        <div className="h-px w-full bg-[#eaecf0]" />
      </div>
      <EmptyState>
        <EmptyState.Header pattern="none">
          <EmptyState.Illustration type="box" />
        </EmptyState.Header>
        <EmptyState.Content>
          <EmptyState.Title>No assets / catalogues assigned yet</EmptyState.Title>
          <EmptyState.Description>You don&apos;t have any assets / catalogues assigned to you yet.</EmptyState.Description>
        </EmptyState.Content>
      </EmptyState>
    </div>
  );
}
