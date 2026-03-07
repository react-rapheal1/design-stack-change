/* eslint-disable */
// @ts-nocheck
import { Button } from "@/components/base/buttons/button";
import { CountryFlag } from "./CountryFlag";
import { Device } from "./Device";
import { DeviceAvatars } from "./DeviceAvatars";
import { ServiceBadge } from "./ServiceBadge";
import { StatusBadge } from "./StatusBadge";
import { recentOrders } from "./recentOrders";

function RecentOrdersTable() {
  return (
    <div className="min-w-0 rounded-xl border border-[#e9eaeb] bg-white">
      {" "}
      <div className="flex items-center justify-between border-b border-[#e9eaeb] px-4 py-4 md:px-6">
        {" "}
        <h3 className="text-lg font-semibold text-[#181d27]">Recent orders</h3> <Button size="sm">View orders</Button>{" "}
      </div>{" "}
      <div className="overflow-x-auto">
        {" "}
        <table className="w-full min-w-[900px] text-left text-sm [&_td]:whitespace-nowrap [&_th]:whitespace-nowrap">
          {" "}
          <thead>
            {" "}
            <tr className="border-b border-[#e9eaeb] text-xs font-medium text-[#535862]">
              {" "}
              <th className="px-3 py-3 font-medium">Order ID</th> <th className="px-3 py-3 font-medium">Device(s)</th>{" "}
              <th className="px-3 py-3 font-medium">Service</th> <th className="px-3 py-3 font-medium">Amount</th>{" "}
              <th className="px-3 py-3 font-medium">Delivery address</th> <th className="px-3 py-3 font-medium">Due Date</th>{" "}
              <th className="px-3 py-3 font-medium">Status</th> <th className="px-3 py-3 font-medium" />{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {recentOrders.map((order, i) => (
              <tr key={i} className="border-b border-[#e9eaeb] last:border-b-0">
                {" "}
                <td className="px-3 py-4 text-sm text-[#181d27]">{order.id}</td>{" "}
                <td className="px-3 py-4">
                  {" "}
                  <DeviceAvatars devices={order.devices} />{" "}
                </td>{" "}
                <td className="px-3 py-4">
                  {" "}
                  <ServiceBadge service={order.service} />{" "}
                </td>{" "}
                <td className="px-3 py-4 text-sm text-[#181d27]">{order.amount}</td>{" "}
                <td className="px-3 py-4">
                  {" "}
                  <div className="flex items-center gap-1.5">
                    {" "}
                    <CountryFlag country="United States" /> <span className="text-sm text-[#535862]">{order.address}</span>{" "}
                  </div>{" "}
                </td>{" "}
                <td className="px-3 py-4 text-sm text-[#535862]">{order.dueDate}</td>{" "}
                <td className="px-3 py-4">
                  {" "}
                  <StatusBadge status={order.status} />{" "}
                </td>{" "}
                <td className="px-3 py-4">
                  {" "}
                  <a href="#" className="text-sm font-semibold text-[#0948b5] hover:underline">
                    View
                  </a>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </table>{" "}
      </div>{" "}
    </div>
  );
}
export { RecentOrdersTable };
