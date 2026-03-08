import { ChevronSelectorVertical } from "@untitledui/icons";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { cx } from "@/utils/cx";
import { RFQSortField } from "../RFQSortField";

function RFQsTableHead({ onSort, sortField }: { onSort: (field: RFQSortField) => void; sortField: RFQSortField | null }) {
  return (
    <thead>
      <tr className="border-b border-[#e9eaeb] text-xs font-medium text-[#535862]">
        <th className="px-6 py-3 font-medium">
          <button
            type="button"
            onClick={() => onSort("id")}
            className={cx("flex items-center gap-1 hover:text-[#181d27]", sortField === "id" && "text-[#181d27]")}
          >
            Request ID
            <ChevronSelectorVertical className={cx("size-4", sortField === "id" ? "text-[#181d27]" : "text-[#d0d5dd]")} />
          </button>
        </th>
        <th className="px-6 py-3 font-medium">Device(s)</th>
        <th className="px-6 py-3 font-medium">
          <button
            type="button"
            onClick={() => onSort("country")}
            className={cx("flex items-center gap-1 hover:text-[#181d27]", sortField === "country" && "text-[#181d27]")}
          >
            Country
            <ChevronSelectorVertical className={cx("size-4", sortField === "country" ? "text-[#181d27]" : "text-[#d0d5dd]")} />
          </button>
        </th>
        <th className="px-6 py-3 font-medium">
          <Tooltip title="Vendors must respond within 24 hours of RFQ creation or the request expires." placement="top" arrow>
            <TooltipTrigger>
              <span
                role="button"
                tabIndex={0}
                onClick={() => onSort("deadline")}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onSort("deadline");
                  }
                }}
                className={cx("flex cursor-pointer items-center gap-1 hover:text-[#181d27]", sortField === "deadline" && "text-[#181d27]")}
              >
                Time Remaining
                <ChevronSelectorVertical className={cx("size-4", sortField === "deadline" ? "text-[#181d27]" : "text-[#d0d5dd]")} />
              </span>
            </TooltipTrigger>
          </Tooltip>
        </th>
        <th className="px-6 py-3 font-medium" />
      </tr>
    </thead>
  );
}

export { RFQsTableHead };
