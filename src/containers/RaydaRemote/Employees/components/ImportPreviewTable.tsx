"use client";

function findCol(headers: string[], ...terms: string[]): number {
  return headers.findIndex((h) => terms.some((t) => h.toLowerCase().includes(t.toLowerCase())));
}

const DISPLAY_COLS = [
  {
    label: "Employee Details",
    getPrimary: (h: string[]) => findCol(h, "name", "employee name", "full name"),
    getSecondary: (h: string[]) => findCol(h, "role", "job title", "title", "position"),
  },
  {
    label: "Level",
    getPrimary: (h: string[]) => findCol(h, "level"),
    getSecondary: (h: string[]) => findCol(h, "department", "dept"),
  },
  {
    label: "Contact Data",
    getPrimary: (h: string[]) => findCol(h, "email", "personal email", "work email"),
    getSecondary: (h: string[]) => findCol(h, "phone", "mobile", "telephone"),
  },
  {
    label: "Address",
    getPrimary: (h: string[]) => findCol(h, "address"),
    getSecondary: (h: string[]) => findCol(h, "employment type", "contract type", "type"),
  },
];

function getValue(row: string[], index: number): string {
  return index >= 0 && row[index] ? row[index] : "----";
}

interface ImportPreviewTableProps {
  headers: string[];
  rows: string[][];
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
}

export function ImportPreviewTable({ headers, rows, onDelete, onEdit }: ImportPreviewTableProps) {
  const cols = DISPLAY_COLS.map((col) => ({
    label: col.label,
    primaryIdx: col.getPrimary(headers),
    secondaryIdx: col.getSecondary(headers),
  }));

  if (rows.length === 0) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-[#eaecf0] py-16 text-sm text-tertiary">
        No data found in file.
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-[#eaecf0] shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#eaecf0] bg-[#f9fafb]">
            {cols.map((col) => (
              <th key={col.label} className="px-6 py-3 text-left text-xs font-medium text-[#475467]">
                {col.label}
              </th>
            ))}
            <th className="px-6 py-3" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="border-b border-[#eaecf0] last:border-0">
              {cols.map((col, colIndex) => (
                <td key={col.label} className="max-w-[200px] px-6 py-4">
                  <p className={`truncate text-sm ${colIndex === 0 ? "font-semibold text-[#101828]" : "text-[#101828]"}`}>
                    {getValue(row, col.primaryIdx)}
                  </p>
                  <p className="mt-0.5 truncate text-sm text-[#475467]">{getValue(row, col.secondaryIdx)}</p>
                </td>
              ))}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-3 whitespace-nowrap">
                  <button type="button" className="text-sm font-semibold text-[#475467] hover:text-[#101828]" onClick={() => onDelete(rowIndex)}>
                    Delete
                  </button>
                  <button type="button" className="text-sm font-semibold text-[#003999] hover:text-[#004ccc]" onClick={() => onEdit(rowIndex)}>
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
