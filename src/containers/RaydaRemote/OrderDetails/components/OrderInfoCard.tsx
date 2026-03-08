import { ArrowDown, ChevronSelectorVertical, Eye, HelpCircle, ShieldTick } from "@untitledui/icons";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { EmpRow } from "../EmpRow";
import { orderTableHeaders } from "../orderTableHeaders";
import { EmpStatusBadge } from "./EmpStatusBadge";
import { SigBadge } from "./SigBadge";

function OrderInfoCard({
  employees,
  hasPending,
  onSort,
  onVerify,
  onVerifyAll,
  onView,
  sortDir,
  sortKey,
}: {
  employees: EmpRow[];
  hasPending: boolean;
  onSort: (key: "name" | "address" | "amount" | "status" | "signature") => void;
  onVerify: (employeeId: string) => void;
  onVerifyAll: () => void;
  onView: (employee: EmpRow) => void;
  sortDir: "asc" | "desc";
  sortKey: "name" | "address" | "amount" | "status" | "signature";
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#eaecf0] bg-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
      <div className="flex items-center justify-between border-b border-[#e9eaeb] px-6 py-4">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-[#181d27]">Order information</p>
          <span className="rounded-full bg-[#e7f0ff] px-2 py-0.5 text-xs font-medium text-[#0948b5] ring-1 ring-[#8fb9ff] ring-inset">
            {employees.length} Employees
          </span>
        </div>
        <div className="flex items-center gap-2">
          {hasPending && (
            <button
              type="button"
              onClick={onVerifyAll}
              className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]"
            >
              Verify all pending
            </button>
          )}
          <button type="button" className="rounded-lg bg-[#0b5de8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0948b5]">
            Make signature required
          </button>
        </div>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-[#e9eaeb] bg-[#fafafa]">
            {orderTableHeaders.map(({ key, label, help }) => (
              <th key={key} className="px-6 py-3 text-left text-xs font-semibold text-[#717680]">
                <div className="inline-flex items-center gap-1">
                  <button type="button" onClick={() => onSort(key)} className="inline-flex items-center gap-1 whitespace-nowrap hover:text-[#414651]">
                    {label}
                    {sortKey === key ? (
                      <ArrowDown className={`size-3 stroke-[3px] text-[#717680] ${sortDir === "asc" ? "rotate-180" : ""}`} />
                    ) : (
                      <ChevronSelectorVertical size={12} strokeWidth={3} className="text-[#717680]" />
                    )}
                  </button>
                  {help && (
                    <Tooltip title={help} placement="top">
                      <TooltipTrigger>
                        <HelpCircle className="size-3.5 cursor-default text-[#98a2b3]" />
                      </TooltipTrigger>
                    </Tooltip>
                  )}
                </div>
              </th>
            ))}
            <th className="py-3 pr-6" />
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-b border-[#e9eaeb] last:border-0 hover:bg-[#fafafa]">
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7]">
                    <span className="text-sm font-medium text-[#475467]">{employee.initials}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-[#181d27]">{employee.name}</p>
                    <p className="truncate text-sm text-[#535862]">{employee.role}</p>
                  </div>
                </div>
              </td>
              <td className="max-w-[200px] px-6 py-4 text-sm text-[#535862]">
                <span className="line-clamp-2">{employee.address}</span>
              </td>
              <td className="px-6 py-4 text-sm text-[#535862]">{employee.amount}</td>
              <td className="px-6 py-4">
                <EmpStatusBadge status={employee.status} />
              </td>
              <td className="px-6 py-4">
                <SigBadge sig={employee.signature} />
              </td>
              <td className="py-4 pr-6 pl-4 text-right">
                <Dropdown.Root>
                  <Dropdown.DotsButton />
                  <Dropdown.Popover>
                    <Dropdown.Menu
                      selectionMode="none"
                      onAction={(key) => {
                        if (key === "view") onView(employee);
                        if (key === "verify") onVerify(employee.id);
                      }}
                    >
                      <Dropdown.Item id="view" icon={Eye} label="View" />
                      {employee.status === "verification-pending" && <Dropdown.Item id="verify" icon={ShieldTick} label="Verify address" />}
                    </Dropdown.Menu>
                  </Dropdown.Popover>
                </Dropdown.Root>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-3">
        <span className="text-sm text-[#535862]">Page 1 of 10</span>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]"
          >
            Previous
          </button>
          <button
            type="button"
            className="rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export { OrderInfoCard };
