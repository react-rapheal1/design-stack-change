import type { ComponentType } from "react";
import { FlagGb, FlagUs, FlagUy, FlagMy, FlagPt, FlagZa } from "@untitledui/country-flags";

export type OrderStatus = "pending" | "verification-pending" | "in-progress" | "completed";
export type OrderType = "onboarding" | "off-boarding";
export type SignatureStatus = "not-required" | "partial-required" | "required";

export interface Order {
    id: string;
    date: string;
    orderedBy: string;
    payment: string;
    status: OrderStatus;
    total: string;
    employeeCount: number;
    type: OrderType;
    signature: SignatureStatus;
    country: string;
}

export const countryMeta: Record<string, { flag: ComponentType<{ className?: string }>; name: string }> = {
    us: { flag: FlagUs, name: "United States of America" },
    gb: { flag: FlagGb, name: "United Kingdom" },
    uy: { flag: FlagUy, name: "Uruguay" },
    my: { flag: FlagMy, name: "Malaysia" },
    pt: { flag: FlagPt, name: "Portugal" },
    za: { flag: FlagZa, name: "South Africa" },
};

export const orders: Order[] = [
    { id: "ORD-1007", date: "Dec 1, 2022", orderedBy: "Olivia Rhye", payment: "Wallet", status: "pending", total: "$412,319.49", employeeCount: 6, type: "onboarding", signature: "not-required", country: "us" },
    { id: "ORD-1006", date: "Nov 1, 2022", orderedBy: "Phoenix Baker", payment: "Wallet", status: "verification-pending", total: "$150,000", employeeCount: 8, type: "onboarding", signature: "not-required", country: "gb" },
    { id: "ORD-1005", date: "Oct 1, 2022", orderedBy: "Lana Steiner", payment: "Credit card", status: "in-progress", total: "$1,170,000", employeeCount: 12, type: "off-boarding", signature: "partial-required", country: "uy" },
    { id: "ORD-1004", date: "Sep 1, 2022", orderedBy: "Demi Wilkinson", payment: "Wallet", status: "completed", total: "$208,500", employeeCount: 9, type: "onboarding", signature: "required", country: "my" },
    { id: "ORD-1003", date: "Aug 1, 2022", orderedBy: "Candice Wu", payment: "Bank transfer", status: "completed", total: "$110,160", employeeCount: 6, type: "onboarding", signature: "required", country: "pt" },
    { id: "ORD-1002", date: "Jul 1, 2022", orderedBy: "Natali Craig", payment: "Wallet", status: "completed", total: "$100,000", employeeCount: 9, type: "onboarding", signature: "required", country: "za" },
    { id: "ORD-1001", date: "Jun 1, 2022", orderedBy: "Drew Cano", payment: "Credit card", status: "completed", total: "$200,000", employeeCount: 4, type: "onboarding", signature: "required", country: "gb" },
];
