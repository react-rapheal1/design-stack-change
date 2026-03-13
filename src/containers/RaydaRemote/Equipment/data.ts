const EQUIPMENT_ROWS = [
  { id: "1", name: "HP EliteDisplay", serial: "Z6A7B8C9D0", source: "Rayda bought", assignee: "Kerry Gorczany", ram: "64 GB / 256 GB", country: "Argentina", status: "active" as const },
  { id: "2", name: "Dell XPS 13", serial: "P6Q7R8S9T0", source: "Rayda bought", assignee: "Victor Owen", ram: "16 GB / 1TB", country: "China", status: "active" as const },
  { id: "3", name: "iPhone 12", serial: "U1V2W3X4Y5", source: "Rayda bought", assignee: "Candice Wu", ram: "8 GB / 512 GB", country: "Spain", status: "active" as const },
  { id: "4", name: "iPad Pro", serial: "A1B2C3D4E5", source: "Rayda bought", assignee: "Olivia Ryhe", ram: "32 GB / 2TB", country: "France", status: "active" as const },
  { id: "5", name: "Standing Desk", serial: "K1L2M3N4O5", source: "External", assignee: "", ram: "—", country: "United States", status: "unassigned" as const },
  { id: "6", name: "Logitech MX", serial: "F6G7H8I9J0", source: "External", assignee: "", ram: "—", country: "United Kingdom", status: "unassigned" as const },
];

const EMPLOYEES_LIST = [
  "Kerry Gorczany", "Martin Kling", "Jimmy Schumm", "Michele Lakin", "Shane Price",
  "Olivia Rhye", "Phoenix Baker", "Lana Steiner", "Demi Wilkinson", "Candice Wu",
];

type EquipmentStatus = "unassigned" | "active" | "in_transit";
type EquipmentRow = (typeof EQUIPMENT_ROWS)[0];

export { EQUIPMENT_ROWS, EMPLOYEES_LIST };
export type { EquipmentStatus, EquipmentRow };
