import Link from "next/link";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { Table } from "@/components/application/table/table";
import { Button } from "@/components/base/buttons/button";
import { formatCurrency } from "../../shared";
import { CountryFlag } from "./CountryFlag";
import { DeviceCountDisplay } from "./DeviceCountDisplay";
import { StatusBadge } from "./StatusBadge";

const columns = [
  { id: "id", name: "RFQ ID", allowsSorting: true },
  { id: "company", name: "Company", allowsSorting: true },
  { id: "devices", name: "Device(s)", allowsSorting: false },
  { id: "budget", name: "Budget", allowsSorting: true },
  { id: "country", name: "Country", allowsSorting: true },
  { id: "vendors", name: "Vendor Quotes", allowsSorting: false },
  { id: "status", name: "Status", allowsSorting: false },
  { id: "actions", name: "", allowsSorting: false },
] as const;

function RFQManagementTable({
  onClearFilters,
  onSortChange,
  rfqs,
  searchQuery,
  sortDescriptor,
}: {
  onClearFilters: () => void;
  onSortChange: (descriptor: { column: React.Key; direction: "ascending" | "descending" }) => void;
  rfqs: import("../../shared").RFQ[];
  searchQuery: string;
  sortDescriptor?: { column: import("../../shared").SortField; direction: "ascending" | "descending" };
}) {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[900px]" aria-label="RFQ management table" sortDescriptor={sortDescriptor} onSortChange={onSortChange}>
        <Table.Header columns={columns}>
          {(column) => <Table.Head id={column.id} label={column.name} allowsSorting={column.allowsSorting} isRowHeader={column.id === "id"} />}
        </Table.Header>
        <Table.Body
          items={rfqs}
          renderEmptyState={() => (
            <div className="flex items-center justify-center overflow-hidden px-8 py-24">
              <EmptyState size="sm">
                <EmptyState.Header pattern="circle">
                  <EmptyState.FeaturedIcon color="gray" theme="modern-neue" />
                </EmptyState.Header>
                <EmptyState.Content>
                  <EmptyState.Title>No requests found</EmptyState.Title>
                  <EmptyState.Description>
                    {searchQuery ? `Your search "${searchQuery}" did not match any RFQs.` : "No RFQs match your current filters."}
                  </EmptyState.Description>
                </EmptyState.Content>
                <EmptyState.Footer>
                  <Button size="md" color="secondary" onClick={onClearFilters}>
                    Clear filters
                  </Button>
                </EmptyState.Footer>
              </EmptyState>
            </div>
          )}
        >
          {(rfq) => (
            <Table.Row key={rfq.id} id={rfq.id} className="transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2">
              <Table.Cell className="font-medium text-primary">{rfq.id}</Table.Cell>
              <Table.Cell className="text-primary">{rfq.company}</Table.Cell>
              <Table.Cell>
                <DeviceCountDisplay devices={rfq.devices} />
              </Table.Cell>
              <Table.Cell className="text-primary">{rfq.budget > 0 ? formatCurrency(rfq.budget) : <span className="text-tertiary">—</span>}</Table.Cell>
              <Table.Cell>
                <div className="flex items-center gap-1.5">
                  <CountryFlag country={rfq.country} />
                  <span className="text-secondary">{rfq.country}</span>
                </div>
              </Table.Cell>
              <Table.Cell>
                {rfq.vendorResponses.length > 0 ? (
                  <span className="text-sm text-primary">
                    {rfq.vendorResponses.length} vendor{rfq.vendorResponses.length !== 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="text-sm text-tertiary">—</span>
                )}
              </Table.Cell>
              <Table.Cell>
                <StatusBadge status={rfq.status} />
              </Table.Cell>
              <Table.Cell>
                <Link
                  href={`/rayda-admin/rfq-management/${rfq.id}`}
                  className="text-sm font-semibold text-brand-secondary transition-colors hover:text-brand-secondary_hover hover:underline"
                >
                  {rfq.status === "vendors_responded" ? "Review" : "View"}
                </Link>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
}

export { RFQManagementTable };
