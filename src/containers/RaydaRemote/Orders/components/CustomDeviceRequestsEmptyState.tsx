import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Button } from "@/components/base/buttons/button";

function CustomDeviceRequestsEmptyState({ onClear, searchQuery }: { onClear: () => void; searchQuery: string }) {
  return (
    <div className="flex items-center justify-center overflow-hidden px-8 py-24">
      <EmptyState size="sm">
        <EmptyState.Header pattern="circle">
          <EmptyState.FeaturedIcon color="gray" theme="modern-neue" />
        </EmptyState.Header>
        <EmptyState.Content>
          <EmptyState.Title>No requests found</EmptyState.Title>
          <EmptyState.Description>
            {searchQuery ? `Your search "${searchQuery}" did not match any requests. Please try again.` : "No device requests match your current filters."}
          </EmptyState.Description>
        </EmptyState.Content>
        <EmptyState.Footer>
          <Button size="md" color="secondary" onClick={onClear}>
            Clear filters
          </Button>
        </EmptyState.Footer>
      </EmptyState>
    </div>
  );
}

export { CustomDeviceRequestsEmptyState };
