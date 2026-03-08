import { ChevronRight, Home01 } from "@untitledui/icons";
import Link from "next/link";
import { orders } from "../../Orders/data";

function OrderDetailHeader({ order }: { order: (typeof orders)[number] }) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-[#181d27]">{order.id}</h1>
          <p className="text-base text-[#475467]">View detailed information for this order</p>
        </div>
        <div className="h-px w-full bg-[#eaecf0]" />
      </div>
      <nav className="flex items-center gap-2">
        <Link href="/remote-employees/overview" className="rounded-md p-1 text-[#535862] hover:bg-[#f9fafb]">
          <Home01 className="size-5" />
        </Link>
        <ChevronRight className="size-4 text-[#535862]" />
        <span className="text-sm font-semibold text-[#535862]">Onboard device</span>
        <ChevronRight className="size-4 text-[#535862]" />
        <span className="text-sm font-semibold text-[#535862]">...</span>
        <ChevronRight className="size-4 text-[#535862]" />
        <Link href="/rayda-remote/orders" className="text-sm font-semibold text-[#535862] hover:text-[#0948b5]">
          Orders
        </Link>
        <ChevronRight className="size-4 text-[#535862]" />
        <span className="text-sm font-semibold text-[#0948b5]">{order.id}</span>
      </nav>
    </>
  );
}

export { OrderDetailHeader };
