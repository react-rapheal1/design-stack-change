"use client";

import Link from "next/link";
import { ArrowDown, ArrowUp, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeaturedIcon } from "@/components/ui/featured-icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import type { RFQ, SortField } from "../../shared";
import { formatCurrency } from "../../shared";
import { CountryFlag } from "./CountryFlag";
import { DeviceCountDisplay } from "./DeviceCountDisplay";
import { StatusBadge } from "./StatusBadge";

interface Column {
  id: string;
  name: string;
  allowsSorting: boolean;
}

const columns: Column[] = [
  { id: "id", name: "RFQ ID", allowsSorting: true },
  { id: "company", name: "Company", allowsSorting: true },
  { id: "devices", name: "Device(s)", allowsSorting: false },
  { id: "budget", name: "Budget", allowsSorting: true },
  { id: "country", name: "Country", allowsSorting: true },
  { id: "vendors", name: "Vendor Quotes", allowsSorting: false },
  { id: "status", name: "Status", allowsSorting: false },
  { id: "actions", name: "", allowsSorting: false },
];

interface SortDescriptor {
  column: SortField;
  direction: "ascending" | "descending";
}

interface RFQManagementTableProps {
  onClearFilters: () => void;
  onSortChange: (descriptor: { column: React.Key; direction: "ascending" | "descending" }) => void;
  rfqs: RFQ[];
  searchQuery: string;
  sortDescriptor?: SortDescriptor;
}

function RFQManagementTable({
  onClearFilters,
  onSortChange,
  rfqs,
  searchQuery,
  sortDescriptor,
}: RFQManagementTableProps) {
  const handleSort = (columnId: string) => {
    const column = columns.find((c) => c.id === columnId);
    if (!column?.allowsSorting) return;

    const newDirection =
      sortDescriptor?.column === columnId && sortDescriptor.direction === "ascending"
        ? "descending"
        : "ascending";

    onSortChange({ column: columnId, direction: newDirection });
  };

  if (rfqs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center px-8 py-24">
        <FeaturedIcon
          icon={<Search />}
          color="gray"
          size="lg"
          className="mb-4"
        />
        <h3 className="mb-1 text-lg font-semibold text-gray-900">
          No requests found
        </h3>
        <p className="mb-6 text-center text-sm text-gray-500">
          {searchQuery
            ? `Your search "${searchQuery}" did not match any RFQs.`
            : "No RFQs match your current filters."}
        </p>
        <Button variant="secondary" onClick={onClearFilters}>
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[900px]">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className={cn(
                  "whitespace-nowrap",
                  column.allowsSorting && "cursor-pointer select-none"
                )}
                onClick={() => column.allowsSorting && handleSort(column.id)}
              >
                <div className="flex items-center gap-1">
                  {column.name}
                  {column.allowsSorting && sortDescriptor?.column === column.id && (
                    sortDescriptor.direction === "ascending" ? (
                      <ArrowUp className="size-4" />
                    ) : (
                      <ArrowDown className="size-4" />
                    )
                  )}
                </div>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rfqs.map((rfq) => (
            <TableRow
              key={rfq.id}
              className="transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2"
            >
              <TableCell className="whitespace-nowrap font-medium text-gray-900">
                {rfq.id}
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-900">
                {rfq.company}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <DeviceCountDisplay devices={rfq.devices} />
              </TableCell>
              <TableCell className="whitespace-nowrap text-gray-900">
                {rfq.budget > 0 ? (
                  formatCurrency(rfq.budget, rfq.customerCurrency)
                ) : (
                  <span className="text-gray-500">—</span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <div className="flex items-center gap-1.5">
                  <CountryFlag country={rfq.country} />
                  <span className="text-gray-600">{rfq.country}</span>
                </div>
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {rfq.vendorResponses.length > 0 ? (
                  <span className="text-sm text-gray-900">
                    {rfq.vendorResponses.length} vendor
                    {rfq.vendorResponses.length !== 1 ? "s" : ""}
                  </span>
                ) : (
                  <span className="text-sm text-gray-500">—</span>
                )}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <StatusBadge status={rfq.status} />
              </TableCell>
              <TableCell className="whitespace-nowrap">
                <Link
                  href={`/rayda-admin/rfq-management/${rfq.id}`}
                  className="text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 hover:underline"
                >
                  {rfq.status === "vendors_responded" ? "Review" : "View"}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export { RFQManagementTable };
