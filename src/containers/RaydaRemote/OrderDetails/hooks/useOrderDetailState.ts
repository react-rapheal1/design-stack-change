import { useState } from "react";
import { useParams } from "next/navigation";
import { orders } from "../../Orders/data";
import { EmpRow } from "../EmpRow";
import { FeedItem } from "../FeedItem";
import { VerifyModalState } from "../VerifyModalState";
import { employees } from "../employees";
import { initialActivityFeed } from "../initialActivityFeed";

const ADMIN_INITIALS = "OR";
const ADMIN_NAME = "Olivia Rhye";

function useOrderDetailState() {
  const { orderId } = useParams<{ orderId: string }>();
  const order = orders.find((item) => item.id === orderId) ?? orders[0];
  const [activeTab, setActiveTab] = useState<"info" | "updates">("info");
  const [selectedEmployee, setSelectedEmployee] = useState<EmpRow | null>(null);
  const [sortKey, setSortKey] = useState<"name" | "address" | "amount" | "status" | "signature">("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [employeeList, setEmployeeList] = useState<EmpRow[]>(() => employees.map((employee) => ({ ...employee, adminAddressVerified: false })));
  const [feedItems, setFeedItems] = useState<FeedItem[]>(initialActivityFeed);
  const [verifyModal, setVerifyModal] = useState<VerifyModalState>(null);

  const formatAuditTime = () => {
    const now = new Date();
    const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
    const date = now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
    return `${time} · ${date}`;
  };

  const handleSort = (key: typeof sortKey) => {
    if (sortKey === key) {
      setSortDir((value) => (value === "asc" ? "desc" : "asc"));
      return;
    }
    setSortKey(key);
    setSortDir("asc");
  };

  const sortedEmployees = [...employeeList].sort((first, second) => {
    const [firstValue, secondValue] =
      sortKey === "amount"
        ? [parseFloat(first.amount.replace(/[$,]/g, "")), parseFloat(second.amount.replace(/[$,]/g, ""))]
        : [String(first[sortKey]), String(second[sortKey])];
    if (typeof firstValue === "number" && typeof secondValue === "number") {
      return sortDir === "asc" ? firstValue - secondValue : secondValue - firstValue;
    }
    return sortDir === "asc" ? String(firstValue).localeCompare(String(secondValue)) : String(secondValue).localeCompare(String(firstValue));
  });

  const closeVerifyModal = () => setVerifyModal(null);
  const hasPending = employeeList.some((employee) => employee.status === "verification-pending");

  const appendAuditFeedItem = (item: FeedItem) => setFeedItems((prev) => [{ ...item, isLast: false }, ...prev]);

  const confirmVerifyAddress = (employeeId: string) => {
    const employee = employeeList.find((item) => item.id === employeeId);
    if (!employee || employee.status !== "verification-pending") return;
    setEmployeeList((prev) => prev.map((item) => (item.id === employeeId ? { ...item, adminAddressVerified: true, status: "in-progress" as const } : item)));
    appendAuditFeedItem({
      id: `audit-addr-${Date.now()}`,
      type: "user",
      initials: ADMIN_INITIALS,
      title: "Address verified by admin",
      time: formatAuditTime(),
      description: `${ADMIN_NAME} verified the delivery address for`,
      highlight: employee.name,
    });
    closeVerifyModal();
  };

  const confirmVerifyAllPending = () => {
    const pendingEmployees = employeeList.filter((employee) => employee.status === "verification-pending");
    if (pendingEmployees.length === 0) return;
    setEmployeeList((prev) =>
      prev.map((employee) =>
        employee.status === "verification-pending" ? { ...employee, adminAddressVerified: true, status: "in-progress" as const } : employee,
      ),
    );
    appendAuditFeedItem({
      id: `audit-bulk-${Date.now()}`,
      type: "user",
      initials: ADMIN_INITIALS,
      title: "All pending addresses verified by admin",
      time: formatAuditTime(),
      description: `${ADMIN_NAME} verified delivery addresses for all ${pendingEmployees.length} pending employee${pendingEmployees.length > 1 ? "s" : ""}`,
      highlight: null,
    });
    closeVerifyModal();
  };

  return {
    activeTab,
    closeVerifyModal,
    confirmVerifyAddress,
    confirmVerifyAllPending,
    feedItems,
    handleSort,
    hasPending,
    order,
    selectedEmployee,
    setActiveTab,
    setSelectedEmployee,
    setVerifyModal,
    sortDir,
    sortKey,
    sortedEmployees,
    verifyModal,
  };
}

export { useOrderDetailState };
