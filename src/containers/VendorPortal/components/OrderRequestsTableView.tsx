import { ChevronSelectorVertical, SearchLg } from "@untitledui/icons";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { cx } from "@/utils/cx";
import { OrderRequest } from "../OrderRequest";
import { OrderSortField } from "../OrderSortField";
import { CountryFlag } from "./CountryFlag";
import { DeviceAvatars } from "./DeviceAvatars";
import { ServiceBadge } from "./ServiceBadge";

function OrderRequestsTableView({
  currentPage,
  onPageChange,
  onSort,
  onViewOrder,
  orders,
  sortField,
  totalPages,
}: {
  currentPage: number;
  onPageChange: (page: number) => void;
  onSort: (field: OrderSortField) => void;
  onViewOrder: (order: OrderRequest) => void;
  orders: OrderRequest[];
  sortField: OrderSortField | null;
  totalPages: number;
}) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-left text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
          <thead>
            <tr className="border-b border-[#e9eaeb] text-xs font-medium text-[#535862]">
              {[
                { id: "id", label: "Order ID" },
                { id: "devices", label: "Device(s)" },
                { id: "service", label: "Service" },
                { id: "total", label: "Amount" },
                { id: "country", label: "Country" },
                { id: "dueDate", label: "Due Date" },
              ].map((column) => (
                <th key={column.id} className="px-6 py-3 font-medium">
                  {column.id === "devices" ? (
                    column.label
                  ) : (
                    <SortableHeader field={column.id as OrderSortField} label={column.label} onSort={onSort} sortField={sortField} />
                  )}
                </th>
              ))}
              <th className="px-6 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? <EmptyOrdersRow /> : orders.map((order) => <OrderRow key={order.id} order={order} onView={() => onViewOrder(order)} />)}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && <PaginationCardDefault page={currentPage} total={totalPages} onPageChange={onPageChange} />}
    </>
  );
}

function SortableHeader({
  field,
  label,
  onSort,
  sortField,
}: {
  field: OrderSortField;
  label: string;
  onSort: (field: OrderSortField) => void;
  sortField: OrderSortField | null;
}) {
  return (
    <button type="button" onClick={() => onSort(field)} className={cx("flex items-center gap-1 hover:text-[#181d27]", sortField === field && "text-[#181d27]")}>
      {label}
      <ChevronSelectorVertical className={cx("size-4", sortField === field ? "text-[#181d27]" : "text-[#d0d5dd]")} />
    </button>
  );
}

function EmptyOrdersRow() {
  return (
    <tr>
      <td colSpan={7} className="px-6 py-24 text-center">
        <div className="flex flex-col items-center gap-2">
          <SearchLg className="size-8 text-[#d0d5dd]" />
          <p className="text-sm font-medium text-[#535862]">No orders found</p>
          <p className="text-sm text-[#535862]">Try adjusting your search or filter criteria</p>
        </div>
      </td>
    </tr>
  );
}

function OrderRow({ onView, order }: { onView: () => void; order: OrderRequest }) {
  return (
    <tr className="border-b border-[#e9eaeb] transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2 last:border-b-0">
      <td className="px-6 py-4 text-sm text-[#181d27]">{order.id}</td>
      <td className="px-6 py-4">
        <DeviceAvatars devices={order.devices} />
      </td>
      <td className="px-6 py-4">
        <ServiceBadge service={order.service} />
      </td>
      <td className="px-6 py-4 text-sm text-[#181d27]">{order.total}</td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-1.5">
          <CountryFlag country={order.country} />
          <span className="text-sm text-[#535862]">{order.country}</span>
        </div>
      </td>
      <td className="px-6 py-4 text-sm text-[#535862]">{order.dueDate}</td>
      <td className="px-6 py-4">
        <button type="button" onClick={onView} className="text-sm font-semibold text-[#0948b5] transition-colors hover:text-[#073d8a] hover:underline">
          View
        </button>
      </td>
    </tr>
  );
}

export { OrderRequestsTableView };
