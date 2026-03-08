const orderTableHeaders: { key: "name" | "address" | "amount" | "status" | "signature"; label: string; help?: string }[] = [
  { key: "name", label: "Name" },
  { key: "address", label: "Address" },
  { key: "amount", label: "Total amount" },
  { key: "status", label: "Order status", help: "Current delivery status for this employee's sub-order." },
  { key: "signature", label: "Signature", help: "Whether a recipient signature is required on delivery." },
];

export { orderTableHeaders };
