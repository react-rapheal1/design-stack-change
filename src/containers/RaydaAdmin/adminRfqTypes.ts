export type RFQStatus = "pending_vendors" | "vendors_responded" | "response_sent" | "fully_accepted" | "partially_accepted" | "customer_rejected" | "expired";

export type DeviceResponseType = "quoted" | "alternative" | "unavailable";

export interface VendorDeviceResponse {
  type: DeviceResponseType;
  quotedPrice?: number;
  alternativeName?: string;
  alternativePrice?: number;
  alternativeSpecs?: string;
  unavailableReason?: string;
}

export interface VendorResponse {
  deviceResponses: VendorDeviceResponse[];
  respondedAt: string;
  totalPrice: number;
  vendorId: string;
  vendorName: string;
  vendorNote?: string;
}

export interface RFQDevice {
  assetType: string;
  name: string;
  quantity: number;
  unitBudget?: number;
}

export interface CurationDevicePricing {
  mode: "markup" | "fixed";
  markupPercent: number;
  fixedPrice: number;
  isUnavailable: boolean;
}

export interface CurationData {
  devicePricing: CurationDevicePricing[];
  notes: string;
  selectedVendorId: string;
}

export interface RFQ {
  budget: number;
  company: string;
  country: string;
  createdAt: string;
  devices: RFQDevice[];
  id: string;
  status: RFQStatus;
  vendorResponses: VendorResponse[];
  acceptedDevices?: boolean[];
  curation?: CurationData;
  customerDecision?: "fully_accepted" | "partially_accepted" | "rejected";
  rejectionReason?: string;
  sentAt?: string;
}

export interface RequestFilters {
  budgetRange: [number, number];
  countries: string[];
  statuses: RFQStatus[];
  vendors: string[];
}

export type FilterTab = "all" | "accepted" | RFQStatus;
export type SortField = "id" | "company" | "budget" | "country";
export type SortDirection = "asc" | "desc";
export type StatusColor = "warning" | "brand" | "success" | "error" | "gray" | "blue" | "blue-light" | "purple";
