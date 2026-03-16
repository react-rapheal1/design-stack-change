import { Package, Plus, SearchMd, Settings01, Upload01, UserPlus01, ZapFast } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Tooltip } from "@/components/base/tooltip/tooltip";
import { EQUIPMENT_ROWS } from "../data";
import type { EquipmentRow } from "../data";
import { EquipmentTableRow } from "./EquipmentTableRow";
import { SelectReceiverPanel } from "./SelectReceiverPanel";

interface EquipmentTableProps {
  isActionStep: boolean;
  onOpenAdd: () => void;
  onOpenCsv: () => void;
  onOpenSelfReport: () => void;
  tour: string;
}

export function EquipmentTable(_props: EquipmentTableProps) {
  const [rows, setRows] = useState(EQUIPMENT_ROWS);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [assignRows, setAssignRows] = useState<EquipmentRow[] | null>(null);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedRows = rows.filter((r) => selected.has(r.id));

  function handleAssign(assignments: Record<string, string>) {
    setRows((prev) =>
      prev.map((r) => {
        const emp = assignments[r.id];
        if (emp) return { ...r, assignee: emp, status: "active" as const };
        return r;
      }),
    );
    setSelected(new Set());
  }

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-xl border border-[#eaecf0] bg-white">
        <div className="flex items-center justify-between border-b border-[#eaecf0] px-5 py-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-primary">Equipment</p>
            <Badge size="sm" color="gray">{rows.length} devices</Badge>
          </div>
          <div className="flex items-center gap-2">
            {selected.size > 0 && (
              <>
                <Button color="secondary" size="sm">Delete</Button>
                <Tooltip title="Assign all selected items here" arrow placement="top">
                  <Button size="sm" onClick={() => setAssignRows(selectedRows)}>Assign</Button>
                </Tooltip>
                <Button color="secondary" size="sm">Sale</Button>
                <Button color="secondary" size="sm">Store</Button>
              </>
            )}
            <div className="flex h-9 items-center gap-2 rounded-lg border border-[#d0d5dd] px-3 text-sm text-tertiary">
              <SearchMd className="size-4 text-[#667085]" /><span>Search</span>
            </div>
            <Button color="secondary" size="sm" iconLeading={Settings01}>Filter</Button>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#eaecf0] bg-[#f9fafb]">
              <th className="px-4 py-3">
                <Checkbox
                  size="sm"
                  isSelected={selected.size === rows.length && rows.length > 0}
                  isIndeterminate={selected.size > 0 && selected.size < rows.length}
                  onChange={(isSelected) => setSelected(isSelected ? new Set(rows.map((r) => r.id)) : new Set())}
                />
              </th>
              {["Equipment name", "Serial number", "Assignee", "RAM/Storage", "Status", ""].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-[#475467]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <EquipmentTableRow key={row.id} row={row} selected={selected.has(row.id)} onToggle={() => toggle(row.id)} onAssign={() => setAssignRows([row])} />
            ))}
          </tbody>
        </table>
      </div>
      {assignRows && <SelectReceiverPanel rows={assignRows} onClose={() => setAssignRows(null)} onSubmit={handleAssign} />}
    </>
  );
}
