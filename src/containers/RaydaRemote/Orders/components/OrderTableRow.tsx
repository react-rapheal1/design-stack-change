import Link from "next/link";
import { countryMeta } from "../data";
import { Order } from "../data";
import { OrderRowActions } from "./OrderRowActions";
import { OrderSignatureBadge } from "./OrderSignatureBadge";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { OrderTypeBadge } from "./OrderTypeBadge";

function OrderTableRow({ order }: { order: Order }) {
  const { flag: Flag, name } = countryMeta[order.country];

  return (
    <tr className="border-b border-secondary last:border-0 hover:bg-bg-primary_hover">
      <td className="px-6 py-4">
        <Link
          href={`/rayda-remote/orders/${order.id}`}
          className="text-sm font-medium whitespace-nowrap text-primary hover:text-brand-secondary hover:underline"
        >
          {order.id}
        </Link>
      </td>
      <td className="px-6 py-4 text-sm whitespace-nowrap text-tertiary">{order.date}</td>
      <td className="px-6 py-4">
        <OrderStatusBadge status={order.status} />
      </td>
      <td className="px-6 py-4 text-sm text-tertiary">{order.total}</td>
      <td className="px-6 py-4 text-sm text-tertiary">{order.employeeCount}</td>
      <td className="px-6 py-4">
        <OrderTypeBadge type={order.type} />
      </td>
      <td className="px-6 py-4">
        <OrderSignatureBadge sig={order.signature} />
      </td>
      <td className="max-w-[140px] px-6 py-4">
        <div className="flex items-center gap-2">
          <Flag className="size-6 shrink-0" />
          <span className="truncate text-sm text-tertiary">{name}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <OrderRowActions orderId={order.id} />
      </td>
    </tr>
  );
}

export { OrderTableRow };
