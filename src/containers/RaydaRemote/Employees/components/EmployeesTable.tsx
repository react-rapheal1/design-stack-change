import { FilterLines, Plus, SearchMd, Users01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { cx } from "@/utils/cx";
import type { Employee } from "../data";

function EmployeesTable({
  employees,
  isTourActive,
  onImport,
  tooltipStep,
}: {
  employees: Employee[];
  isTourActive: boolean;
  onImport: () => void;
  tooltipStep: number | null;
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-xl border border-[#eaecf0] bg-white">
      <div className="flex items-center justify-between border-b border-[#eaecf0] px-5 py-4">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-primary">Employees</p>
          <Badge size="sm" color="brand">{employees.length} Employee{employees.length !== 1 ? "s" : ""}</Badge>
          {employees.some((employee) => employee.flag) && (
            <Badge size="sm" color="error">{employees.filter((employee) => employee.flag).length} flags</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-60 items-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-3 text-sm text-tertiary">
            <SearchMd className="size-4 text-[#667085]" />
            <span>Search</span>
          </div>
          <Button color="secondary" size="sm" iconLeading={FilterLines}>
            Filter
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-5 border-b border-[#eaecf0] bg-[#f9fafb] px-5 py-3 text-xs font-semibold text-tertiary">
        <span>Name</span>
        <span>Department</span>
        <span>Email address</span>
        <span>Address</span>
        <span>Country</span>
      </div>
      {employees.length === 0 ? (
        <EmptyEmployeesState isTourActive={isTourActive} tooltipStep={tooltipStep} onImport={onImport} />
      ) : (
        <EmployeesRows employees={employees} />
      )}
    </div>
  );
}

function EmptyEmployeesState({ isTourActive, onImport, tooltipStep }: { isTourActive: boolean; onImport: () => void; tooltipStep: number | null }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2f4f7]">
        <Users01 className="size-6 text-[#667085]" />
      </div>
      <p className="mt-3 text-sm font-semibold text-secondary">No employees yet</p>
      <p className="mt-1 text-sm text-tertiary">Connect your HRIS or add employees manually to get started.</p>
      <div className="mt-4">
        <Button
          size="sm"
          iconLeading={Plus}
          onClick={() => {
            onImport();
            if (isTourActive && tooltipStep === 0) return;
          }}
        >
          Import Employee
        </Button>
      </div>
    </div>
  );
}

function EmployeesRows({ employees }: { employees: Employee[] }) {
  return (
    <div>
      {employees.map((employee, index) => (
        <div
          key={employee.id}
          className={cx(
            "grid grid-cols-5 items-center px-5 py-3.5 text-sm",
            index < employees.length - 1 && "border-b border-[#eaecf0]",
            employee.flag && "bg-red-50/40",
          )}
        >
          <div className="flex items-center gap-3">
            <Avatar size="sm" initials={employee.initials} />
            <div>
              <p className="font-medium text-primary">{employee.name}</p>
              <p className="text-xs text-tertiary">{employee.role}</p>
            </div>
          </div>
          <span className="text-tertiary">{employee.dept}</span>
          <span className="text-tertiary">{employee.email}</span>
          <span className="text-tertiary">{employee.address}</span>
          <div className="flex items-center justify-between">
            <span className="text-tertiary">{employee.country}</span>
            {employee.flag && <Badge size="sm" color="error">{employee.flag}</Badge>}
          </div>
        </div>
      ))}
      <div className="border-t border-[#eaecf0] px-5 py-3 text-xs text-tertiary">Page 1 of 10</div>
    </div>
  );
}

export { EmployeesTable };
