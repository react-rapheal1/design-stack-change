import { ArrowLeft, ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Select } from "@/components/base/select/select";

const PAGE_SIZES = [10, 25, 50];

function TablePaginationFooter({
  currentPage,
  itemsPerPage,
  onPageChange,
  onPageSizeChange,
  totalItems,
  totalPages,
}: {
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  totalItems: number;
  totalPages: number;
}) {
  const start = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);
  const pageSizeItems = PAGE_SIZES.map((size) => ({ id: String(size), label: String(size), isDisabled: size > totalItems }));

  return (
    <div className="flex items-center justify-between border-t border-secondary px-4 py-3 md:px-6 md:pt-3 md:pb-4">
      <div className="flex items-center gap-2">
        <span className="hidden text-sm text-tertiary md:inline">Rows per page</span>
        <div className="w-[72px]">
          <Select
            size="sm"
            selectedKey={String(itemsPerPage)}
            onSelectionChange={(key) => onPageSizeChange(Number(key))}
            items={pageSizeItems}
            aria-label="Rows per page"
          >
            {(item) => (
              <Select.Item id={item.id} isDisabled={item.isDisabled}>
                {item.label}
              </Select.Item>
            )}
          </Select>
        </div>
        <span className="text-sm text-tertiary">
          {start}-{end} <span className="hidden md:inline">of {totalItems}</span>
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button
          size="sm"
          color="secondary"
          iconLeading={ArrowLeft}
          isDisabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Previous page"
        />
        <span className="hidden text-sm text-tertiary md:inline">
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          size="sm"
          color="secondary"
          iconLeading={ArrowRight}
          isDisabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Next page"
        />
      </div>
    </div>
  );
}

export { TablePaginationFooter };
