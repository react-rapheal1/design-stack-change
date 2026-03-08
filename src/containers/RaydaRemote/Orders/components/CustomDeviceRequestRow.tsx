import { Table } from "@/components/application/table/table";
import { CustomDeviceRequest } from "../CustomDeviceRequest";
import { calculateBudgetTotal } from "../calculateBudgetTotal";
import { formatCurrency } from "../formatCurrency";
import { CountryFlag } from "./CountryFlag";
import { RFQDeviceCount } from "./RFQDeviceCount";
import { StatusBadge } from "./StatusBadge";

function CustomDeviceRequestRow({ onView, request }: { onView: (request: CustomDeviceRequest) => void; request: CustomDeviceRequest }) {
  const budgetTotal = calculateBudgetTotal(request);

  return (
    <Table.Row id={request.id} className="transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2">
      <Table.Cell className="font-medium text-primary">{request.id}</Table.Cell>
      <Table.Cell>
        <RFQDeviceCount devices={request.devices} />
      </Table.Cell>
      <Table.Cell className="text-primary">{budgetTotal ? formatCurrency(budgetTotal.total) : "—"}</Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-1.5">
          <CountryFlag country={request.country} />
          <span className="text-secondary">{request.country}</span>
        </div>
      </Table.Cell>
      <Table.Cell>
        <StatusBadge status={request.status} />
      </Table.Cell>
      <Table.Cell>{request.requiredBudget ? formatCurrency(request.requiredBudget) : "—"}</Table.Cell>
      <Table.Cell>
        <button
          type="button"
          className="text-sm font-semibold text-brand-secondary transition-colors hover:text-brand-secondary_hover hover:underline"
          onClick={() => onView(request)}
        >
          View
        </button>
      </Table.Cell>
    </Table.Row>
  );
}

export { CustomDeviceRequestRow };
