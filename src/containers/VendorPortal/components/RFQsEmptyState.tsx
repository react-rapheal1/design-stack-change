import { SearchLg } from "@untitledui/icons";

function RFQsEmptyState() {
  return (
    <tr>
      <td colSpan={5} className="px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-2">
          <SearchLg className="size-8 text-[#d0d5dd]" />
          <p className="text-sm font-medium text-[#535862]">No RFQs found</p>
          <p className="text-sm text-[#535862]">Try adjusting your search or filter criteria</p>
        </div>
      </td>
    </tr>
  );
}

export { RFQsEmptyState };
