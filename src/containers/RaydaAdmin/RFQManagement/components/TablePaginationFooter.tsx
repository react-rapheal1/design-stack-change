"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PAGE_SIZES = [10, 25, 50];

interface TablePaginationFooterProps {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
  totalPages: number;
}

function TablePaginationFooter({
  currentPage,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
  totalItems,
  totalPages,
}: TablePaginationFooterProps) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4">
      <div className="flex items-center gap-2">
        <span className="hidden text-sm text-tertiary md:inline">
          Rows per page
        </span>
        <div className="w-[72px]">
          <Select
            value={String(itemsPerPage)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger className="h-9" aria-label="Rows per page">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZES.map((size) => (
                <SelectItem
                  key={size}
                  value={String(size)}
                  disabled={size > totalItems}
                >
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="text-sm text-tertiary">
          {start}-{end}{" "}
          <span className="hidden md:inline">of {totalItems}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-4" />
        </Button>
        <span className="hidden text-sm text-tertiary md:inline">
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          variant="secondary"
          size="sm"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export { TablePaginationFooter };
