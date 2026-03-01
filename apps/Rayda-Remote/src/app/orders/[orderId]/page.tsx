"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowDown,
    Bell02,
    CheckCircle,
    ChevronRight,
    ChevronSelectorVertical,
    ClipboardCheck,
    Eye,
    HelpCircle,
    Home01,
    Mail01,
    Package,
    RefreshCw03,
    Settings01,
    ShieldTick,
    Truck01,
    X,
    ZapFast,
} from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { orders, countryMeta, type OrderStatus, type SignatureStatus } from "../data";

// ---------------------------------------------------------------------------
// Shared status/signature config helpers (used in sidebar + table)
// ---------------------------------------------------------------------------

const employees = [
    { id: "1", initials: "OR", name: "Olivia Rhye", email: "olivia@rayda.co", role: "Manager", address: "2972 Westheimer Rd. Santa Ana, Illinois 85486", amount: "$10,347.78", status: "verification-pending" as const, signature: "required" as const },
    { id: "2", initials: "PB", name: "Phoenix Baker", email: "phoenix@rayda.co", role: "Team Lead", address: "1901 Thornridge Cir. Shiloh, Hawaii 81063", amount: "$5,282.80", status: "verification-pending" as const, signature: "required" as const },
    { id: "3", initials: "LS", name: "Lana Steiner", email: "lana@rayda.co", role: "Entry-Level", address: "8502 Preston Rd. Inglewood, Maine 98380", amount: "$3,069.37", status: "verification-pending" as const, signature: "required" as const },
    { id: "4", initials: "DW", name: "Demi Wilkinson", email: "demi@rayda.co", role: "Middle Management", address: "2118 Thornridge Cir. Syracuse, Connecticut 35624", amount: "$8,073.94", status: "completed" as const, signature: "not-required" as const },
    { id: "5", initials: "CW", name: "Candice Wu", email: "candice@rayda.co", role: "Specialist", address: "4140 Parker Rd. Allentown, New Mexico 31008", amount: "$121.35", status: "completed" as const, signature: "not-required" as const },
    { id: "6", initials: "NC", name: "Natali Craig", email: "natali@rayda.co", role: "Senior Management", address: "2464 Royal Ln. Mesa, New Jersey 45463", amount: "$20,563.22", status: "completed" as const, signature: "not-required" as const },
];

interface EmpRow {
    id: string;
    initials: string;
    name: string;
    email: string;
    role: string;
    address: string;
    amount: string;
    status: EmpStatus;
    signature: SigStatus;
    adminAddressVerified: boolean;
}

interface FeedItem {
    id: string;
    type: string;
    initials: string;
    title: string;
    time: string;
    description?: string;
    highlight?: string | null;
    description2?: string;
    badge?: { label: string; style: string };
    action?: string;
    message?: string;
    attachment?: { name: string; size: string };
    isLast?: boolean;
}

const initialActivityFeed = [
    {
        id: "a1",
        type: "system",
        initials: "R",
        title: "Confirmation email sent",
        time: "11:50pm · 15 July 2025",
        description: "Delivery preferences confirmed, saved and sent to",
        highlight: "Sarah Chen",
    },
    {
        id: "a2",
        type: "user",
        initials: "SC",
        title: "Signature requirement set",
        time: "11:50pm · 15 July 2025",
        description: "Sarah Chen enabled signature requirement for sub-order",
        highlight: "#003",
        badge: { label: "Signature required", style: "bg-[#e7f0ff] text-[#0948b5] ring-[#8fb9ff]" },
    },
    {
        id: "a3",
        type: "user",
        initials: "SC",
        title: "Delivery information verified",
        time: "11:50pm · 15 July 2025",
        description: "Sarah Chen confirmed the address, phone, delivery notes, and signature requirement",
        highlight: null,
        badge: { label: "Not required", style: "bg-[#fafafa] text-[#414651] ring-[#e9eaeb]" },
    },
    {
        id: "a4",
        type: "system",
        initials: "R",
        title: "Verification email sent",
        time: "11:50pm · 15 July 2025",
        description: "A secure link was sent to",
        highlight: "Sarah Chen",
        description2: "to verify delivery information before the order ships.",
    },
    {
        id: "a5",
        type: "product",
        initials: "HP",
        title: "HP ProBook 440 G10 — 4GB Intel Core i7",
        time: "4:05am · 18 December 2025",
        action: "Set signature requirement: Required · Comment from",
        highlight: "Rayda",
        message: "Item out of stock. We're restocking soon and will notify you!",
    },
    {
        id: "a6",
        type: "product",
        initials: "HP",
        title: "HP ProBook 440 G10 — 4GB Intel Core i7",
        time: "2:20pm · 30 August 2025",
        action: "Document has been uploaded for equipment",
        highlight: null,
        attachment: { name: "Hashcode.zip", size: "720 KB" },
    },
    {
        id: "a7",
        type: "product",
        initials: "HP",
        title: "HP ProBook 440 G10 — 4GB Intel Core i7",
        time: "9:45am · 22 July 2025",
        action: "Serial number has been updated to",
        highlight: "C02FJ9D3H5G7",
    },
    {
        id: "a8",
        type: "product",
        initials: "HP",
        title: "HP ProBook 440 G10 — 4GB Intel Core i7",
        time: "11:50pm · 15 July 2025",
        action: "Item delivered! Use the tracking link in your email or contact support if needed.",
        badge: { label: "Delivered", style: "bg-[#ecfdf3] text-[#067647] ring-[#abefc6]" },
    },
    {
        id: "a9",
        type: "product",
        initials: "HP",
        title: "HP ProBook 440 G10 — 4GB Intel Core i7",
        time: "8:00am · 1 July 2025",
        action: "Order in transit. Check your email for tracking updates.",
        badge: { label: "In transit", style: "bg-[#fffaeb] text-[#b54708] ring-[#fedf89]" },
    },
    {
        id: "a10",
        type: "person",
        initials: "BP",
        title: "Foresight (Brian Paul)",
        time: "3:30pm · 12 April 2025",
        action: "Placed an order",
        highlight: "ORD-1007",
        isLast: true,
    },
];

// ---------------------------------------------------------------------------
// Verification steps
// ---------------------------------------------------------------------------

type VerifStep = { icon: React.ComponentType<{ className?: string }>; label: string; desc: string; done: boolean };

const verificationSteps: VerifStep[] = [
    { icon: Mail01, label: "Verification email sent", desc: "Secure link sent to employee's email", done: true },
    { icon: ClipboardCheck, label: "Delivery info confirmed", desc: "Employee verified address & phone", done: false },
    { icon: ShieldTick, label: "Documents verified", desc: "Identity & delivery docs approved", done: false },
    { icon: Truck01, label: "Ready to ship", desc: "Order dispatched to fulfilment", done: false },
];

// ---------------------------------------------------------------------------
// Shared badge helpers
// ---------------------------------------------------------------------------

type EmpStatus = "verification-pending" | "completed" | "in-progress";
type SigStatus = "required" | "not-required";

function EmpStatusBadge({ status }: { status: EmpStatus }) {
    const map: Record<EmpStatus, { label: string; style: string; icon: React.ComponentType<{ className?: string }> }> = {
        "verification-pending": { label: "Verification pending", style: "bg-[#fef6ee] text-[#b93815] ring-[#f9dbaf]", icon: ClipboardCheck },
        "in-progress": { label: "In progress", style: "bg-[#fffaeb] text-[#b54708] ring-[#fedf89]", icon: RefreshCw03 },
        completed: { label: "Completed", style: "bg-[#ecfdf3] text-[#067647] ring-[#abefc6]", icon: CheckCircle },
    };
    const { label, style, icon: Icon } = map[status];
    const tooltip = status === "verification-pending"
        ? "Delivery details unconfirmed. Order proceeds automatically after 24 hours."
        : status === "in-progress"
        ? "Delivery is in progress for this employee."
        : "All items have been delivered to this employee.";
    return (
        <Tooltip title={tooltip} placement="top">
            <TooltipTrigger>
                <span className={`inline-flex cursor-default items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}>
                    <Icon className="size-3" />
                    {label}
                </span>
            </TooltipTrigger>
        </Tooltip>
    );
}

function SigBadge({ sig }: { sig: SigStatus }) {
    const tooltip = sig === "required"
        ? "A recipient signature is required upon delivery."
        : "No signature needed — items will be left at the address.";
    const config: Record<SigStatus, { label: string; style: string }> = {
        "not-required": { label: "Not required", style: "bg-[#fafafa] text-[#414651] ring-[#e9eaeb]" },
        required: { label: "Signature required", style: "bg-[#e7f0ff] text-[#0948b5] ring-[#8fb9ff]" },
    };
    const { label, style } = config[sig];
    return (
        <Tooltip title={tooltip} placement="top">
            <TooltipTrigger>
                <span className={`inline-flex cursor-default items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${style}`}>
                    {label}
                </span>
            </TooltipTrigger>
        </Tooltip>
    );
}

// ---------------------------------------------------------------------------
// Employee row slideout
// ---------------------------------------------------------------------------

function EmployeeSlideout({
    employee,
    onClose,
}: {
    employee: EmpRow;
    onClose: () => void;
}) {
    const [sigEnabled, setSigEnabled] = useState(employee.signature === "required");
    const completedSteps = employee.status === "completed" ? verificationSteps.length : 1;

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

            {/* Panel */}
            <div className="fixed right-0 top-0 z-50 flex h-full w-[440px] flex-col overflow-y-auto border-l border-[#eaecf0] bg-white shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]">
                {/* Header */}
                <div className="flex items-center justify-between px-6 pt-6">
                    <p className="text-xl font-semibold text-[#101828]">ORD-1007</p>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex size-10 items-center justify-center rounded-lg text-[#717680] hover:bg-[#f9fafb]"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                {/* Cover + avatar */}
                <div className="relative mt-4">
                    <div
                        className="h-24 w-full"
                        style={{
                            background:
                                "radial-gradient(ellipse at 20% 50%, #fde68a 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, #bfdbfe 0%, transparent 60%), linear-gradient(135deg, #fef3c7 0%, #ede9fe 50%, #dbeafe 100%)",
                        }}
                    />
                    <div className="absolute -bottom-10 left-6 size-20 shrink-0 overflow-hidden rounded-full border-4 border-white bg-[#f2f4f7] shadow-[0px_4px_8px_rgba(16,24,40,0.1)]">
                        <p className="flex h-full items-center justify-center text-2xl font-medium text-[#475467]">
                            {employee.initials}
                        </p>
                    </div>
                </div>

                {/* Name */}
                <div className="mt-14 px-6">
                    <p className="text-2xl font-semibold text-[#101828]">{employee.name}</p>
                    <p className="text-base text-[#475467]">{employee.email}</p>
                </div>

                {/* Info row */}
                <div className="mt-4 flex items-start gap-6 border-t border-[#eaecf0] px-6 py-4">
                    <div className="flex shrink-0 flex-col gap-1">
                        <p className="text-xs font-medium text-[#475467]">Total amount</p>
                        <p className="text-sm text-[#475467]">{employee.amount}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-medium text-[#475467]">Order status</p>
                        <EmpStatusBadge status={employee.status} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-medium text-[#475467]">Signature</p>
                        <SigBadge sig={employee.signature} />
                    </div>
                </div>

                {/* Address */}
                <div className="border-t border-[#eaecf0] px-6 py-4">
                    <p className="text-xs font-medium text-[#475467]">Address</p>
                    <p className="mt-1 text-sm text-[#475467]">{employee.address}</p>
                </div>

                {/* Verification progress */}
                <div className="border-t border-[#eaecf0] px-6 py-4">
                    <p className="mb-3 text-sm font-medium text-[#344054]">Verification progress</p>
                    <div className="flex flex-col gap-0">
                        {verificationSteps.map((step, i) => {
                            const done = i < completedSteps;
                            const active = i === completedSteps;
                            const Icon = step.icon;
                            return (
                                <div key={step.label} className="flex gap-3">
                                    {/* Icon + line */}
                                    <div className="flex flex-col items-center">
                                        <div
                                            className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                                                done
                                                    ? "bg-[#ecfdf3] text-[#067647]"
                                                    : active
                                                    ? "bg-[#e7f0ff] text-[#0948b5]"
                                                    : "bg-[#f9fafb] text-[#d0d5dd]"
                                            }`}
                                        >
                                            <Icon className="size-4" />
                                        </div>
                                        {i < verificationSteps.length - 1 && (
                                            <div className={`w-0.5 flex-1 ${done ? "bg-[#abefc6]" : "bg-[#e9eaeb]"}`} style={{ minHeight: 20 }} />
                                        )}
                                    </div>
                                    {/* Content */}
                                    <div className="pb-4">
                                        <p className={`text-sm font-medium ${done ? "text-[#067647]" : active ? "text-[#0948b5]" : "text-[#717680]"}`}>
                                            {step.label}
                                        </p>
                                        <p className="text-xs text-[#717680]">{step.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Items */}
                <div className="border-t border-[#eaecf0] px-6 py-4">
                    <p className="text-sm font-medium text-[#344054]">Items</p>
                    <p className="mt-0.5 text-sm text-[#475467]">The following items are included in this order.</p>
                    <div className="mt-3 flex flex-col divide-y divide-[#eaecf0]">
                        {[
                            { name: 'Apple MacBook Air 13" M1 Chip 8GB 256GB 2020 Model - Rose Gold', img: "/devices/laptops/macbook.png" },
                            { name: "Apple iPhone 11 Pro Max 6.5-Inch (4GB RAM, 64GB ROM)", img: "/devices/phones" },
                        ].map((item) => (
                            <div key={item.name} className="flex items-center gap-3 py-3">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f9fafb]">
                                    <Package className="size-5 text-[#717680]" />
                                </div>
                                <p className="flex-1 truncate text-sm font-semibold text-[#344054]">{item.name}</p>
                                <EmpStatusBadge status="in-progress" />
                                <button type="button" className="shrink-0 text-sm font-semibold text-[#003999] hover:underline">View</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Signature toggle */}
                <div className="mx-6 mb-4 rounded-xl border border-[#e9eaeb] p-4">
                    <div className="flex items-start gap-3">
                        <button
                            type="button"
                            role="switch"
                            aria-checked={sigEnabled}
                            onClick={() => setSigEnabled((v) => !v)}
                            className={`relative mt-0.5 inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors focus:outline-none ${sigEnabled ? "bg-[#0b5de8]" : "bg-[#d0d5dd]"}`}
                        >
                            <span
                                className={`inline-block size-4 rounded-full bg-white shadow transition-transform ${sigEnabled ? "translate-x-4" : "translate-x-0"}`}
                            />
                        </button>
                        <div>
                            <p className="text-sm font-medium text-[#414651]">Signature Required</p>
                            <p className="text-sm text-[#535862]">
                                Delivery will be attempted only when employee is available to receive. However, this will not always be guaranteed.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto border-t border-[#eaecf0] px-6 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Activity feed
// ---------------------------------------------------------------------------

function FeedAvatar({ initials, type }: { initials: string; type: string }) {
    if (type === "system") {
        return (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e7f0ff]">
                <ZapFast className="size-5 text-[#0948b5]" />
            </div>
        );
    }
    return (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7]">
            <span className="text-sm font-medium text-[#475467]">{initials}</span>
        </div>
    );
}

function ActivityFeed({ items }: { items: FeedItem[] }) {
    return (
        <div className="flex flex-col py-2">
            {items.map((item, idx) => (
                <div key={item.id} className="flex gap-4">
                    {/* Left: avatar + connector */}
                    <div className="flex flex-col items-center">
                        <FeedAvatar initials={item.initials} type={item.type} />
                        {!item.isLast && idx < items.length - 1 && (
                            <div className="w-0.5 flex-1 bg-[#e9eaeb]" style={{ minHeight: 24 }} />
                        )}
                    </div>

                    {/* Right: content */}
                    <div className="flex-1 pb-8">
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-medium text-[#414651]">{item.title}</p>
                                <span className="size-2 rounded-full bg-[#17b26a]" />
                            </div>
                        </div>
                        <p className="text-xs text-[#535862]">{item.time}</p>

                        {/* Description */}
                        {(item.description || item.action) && (
                            <p className="mt-1 text-sm text-[#535862]">
                                {item.description || item.action}
                                {item.highlight && (
                                    <span className="font-medium text-[#0948b5]"> {item.highlight}</span>
                                )}
                                {item.description2 && ` ${item.description2}`}
                            </p>
                        )}

                        {/* Badge */}
                        {"badge" in item && item.badge && (
                            <span className={`mt-2 inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${item.badge.style}`}>
                                {item.badge.label}
                            </span>
                        )}

                        {/* Message bubble */}
                        {"message" in item && item.message && (
                            <div className="mt-2 rounded-b-lg rounded-tr-lg border border-[#e9eaeb] px-3 py-2 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                                <p className="text-sm text-[#535862]">{item.message}</p>
                            </div>
                        )}

                        {/* Attachment */}
                        {"attachment" in item && item.attachment && (
                            <div className="mt-2 flex items-center gap-2 rounded-lg border border-[#e9eaeb] px-3 py-2">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#e7f0ff]">
                                    <span className="text-xs font-bold text-[#0948b5]">ZIP</span>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-[#344054]">{item.attachment.name}</p>
                                    <p className="text-xs text-[#717680]">{item.attachment.size}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Header navigation
// ---------------------------------------------------------------------------

function HeaderNavigation() {
    const navItems = ["Overview", "Orders", "Marketplace", "Catalogs", "Storage", "Employees", "All equipment"];
    return (
        <header className="sticky top-0 z-40 flex w-full shrink-0 flex-col items-center border-b border-[#22262f] bg-[#0c0e12]">
            <div className="flex h-[72px] w-full max-w-[1280px] items-center justify-between px-8">
                <div className="flex items-center gap-6">
                    <RaydaLogo variant="white" />
                    <nav className="flex items-center gap-0.5">
                        {navItems.map((item) => (
                            <span
                                key={item}
                                className={`cursor-pointer rounded-md px-3 py-2 text-sm font-semibold ${item === "Orders" ? "bg-[#22262f] text-[#ececed]" : "text-[#cecfd2] hover:bg-white/5"}`}
                            >
                                {item}
                            </span>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-1">
                    <button type="button" className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5"><Bell02 className="size-5" /></button>
                    <button type="button" className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5"><Settings01 className="size-5" /></button>
                    <div className="relative size-10 shrink-0 cursor-pointer rounded-full bg-[#22262f]">
                        <span className="absolute inset-0 rounded-full border border-white/[0.12]" />
                        <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#94979c]">OR</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

// ---------------------------------------------------------------------------
// Sidebar
// ---------------------------------------------------------------------------

const statusConfig: Record<OrderStatus, { label: string; style: string; icon: React.ComponentType<{ className?: string }>; tooltip: string }> = {
    pending: { label: "Pending", style: "bg-[#f4f3ff] text-[#5925dc] ring-[#d9d6fe]", icon: RefreshCw03, tooltip: "This order has been placed and is awaiting processing." },
    "verification-pending": { label: "Verification pending", style: "bg-[#fef6ee] text-[#b93815] ring-[#f9dbaf]", icon: ClipboardCheck, tooltip: "Employees need to verify their delivery information. If not verified within 24 hours, the order will proceed automatically." },
    "in-progress": { label: "In progress", style: "bg-[#fffaeb] text-[#b54708] ring-[#fedf89]", icon: RefreshCw03, tooltip: "The order is currently being processed and items are being prepared." },
    completed: { label: "Completed", style: "bg-[#ecfdf3] text-[#067647] ring-[#abefc6]", icon: CheckCircle, tooltip: "All items in this order have been successfully delivered." },
};

const sigConfig: Record<SignatureStatus, { label: string; style: string; tooltip: string; pill: boolean }> = {
    "not-required": { label: "Not required", style: "bg-[#fafafa] text-[#414651] ring-[#e9eaeb]", tooltip: "No signature needed — items will be left at the address.", pill: false },
    "partial-required": { label: "Partial required", style: "bg-[#f4f3ff] text-[#5925dc] ring-[#d9d6fe]", tooltip: "Some items require a recipient signature, others do not.", pill: false },
    required: { label: "Signature required", style: "bg-[#e7f0ff] text-[#0948b5] ring-[#8fb9ff]", tooltip: "A recipient signature is required upon delivery for all items.", pill: false },
};

function OrderSidebar({ order }: { order: (typeof orders)[number] }) {
    const { flag: Flag, name: countryName } = countryMeta[order.country];
    const sts = statusConfig[order.status];
    const StatusIcon = sts.icon;
    const sig = sigConfig[order.signature];

    return (
        <div className="w-64 shrink-0 rounded-xl border border-[#eaecf0] bg-white p-6 shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
            <div className="flex flex-col gap-5">
                {[
                    { label: "Order date", value: order.date },
                    { label: "Ordered by", value: order.orderedBy },
                    { label: "Payment method", value: order.payment },
                    { label: "Items count", value: `${order.employeeCount} items` },
                    { label: "Total amount", value: order.total },
                ].map(({ label, value }) => (
                    <div key={label} className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-[#535862]">{label}</p>
                        <p className="text-lg font-medium text-[#414651]">{value}</p>
                    </div>
                ))}

                {/* Status */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-[#535862]">Status</p>
                    <Tooltip title={sts.tooltip} placement="right">
                        <TooltipTrigger>
                            <span className={`inline-flex cursor-default items-center gap-1.5 rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${sts.style}`}>
                                <StatusIcon className="size-3" />
                                {sts.label}
                            </span>
                        </TooltipTrigger>
                    </Tooltip>
                </div>

                {/* Type */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-[#535862]">Type</p>
                    <Tooltip
                        title={order.type === "onboarding" ? "Equipment is being set up and delivered to employees." : "Equipment is being collected from a departing employee."}
                        placement="right"
                    >
                        <TooltipTrigger>
                            <span className={`inline-flex cursor-default items-center rounded-full border-[1.5px] px-2 py-0.5 text-xs font-medium ${order.type === "onboarding" ? "border-[#079455] text-[#067647]" : "border-[#535862] text-[#414651]"}`}>
                                {order.type === "onboarding" ? "Onboarding" : "Off-boarding"}
                            </span>
                        </TooltipTrigger>
                    </Tooltip>
                </div>

                {/* Signature */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-[#535862]">Signature</p>
                    <Tooltip title={sig.tooltip} placement="right">
                        <TooltipTrigger>
                            <span className={`inline-flex cursor-default items-center rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${sig.style}`}>
                                {sig.label}
                            </span>
                        </TooltipTrigger>
                    </Tooltip>
                </div>

                {/* Country */}
                <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium text-[#535862]">Country</p>
                    <div className="flex items-center gap-2">
                        <Flag className="size-6 shrink-0" />
                        <p className="text-lg font-medium text-[#414651]">{countryName}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OrderDetailPage() {
    const { orderId } = useParams<{ orderId: string }>();
    const order = orders.find((o) => o.id === orderId) ?? orders[0];

    const [activeTab, setActiveTab] = useState<"info" | "updates">("info");
    const [selectedEmployee, setSelectedEmployee] = useState<EmpRow | null>(null);
    const [sortKey, setSortKey] = useState<"name" | "address" | "amount" | "status" | "signature">("name");
    const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
    const [empList, setEmpList] = useState<EmpRow[]>(() =>
        employees.map((e) => ({ ...e, adminAddressVerified: false }))
    );
    const [feedItems, setFeedItems] = useState<FeedItem[]>(initialActivityFeed);
    const [verifyModal, setVerifyModal] = useState<{ type: "single"; empId: string } | { type: "bulk" } | null>(null);

    const ADMIN_NAME = "Olivia Rhye";
    const ADMIN_INITIALS = "OR";

    function formatAuditTime(): string {
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true }).toLowerCase();
        const date = now.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
        return `${time} · ${date}`;
    }

    function confirmVerifyAddress(empId: string) {
        const emp = empList.find((e) => e.id === empId);
        if (!emp || emp.status !== "verification-pending") return;
        setEmpList((prev) =>
            prev.map((e) => (e.id === empId ? { ...e, adminAddressVerified: true, status: "in-progress" as const } : e))
        );
        setFeedItems((prev) => [
            {
                id: `audit-addr-${Date.now()}`,
                type: "user",
                initials: ADMIN_INITIALS,
                title: "Address verified by admin",
                time: formatAuditTime(),
                description: `${ADMIN_NAME} verified the delivery address for`,
                highlight: emp.name,
                isLast: false,
            },
            ...prev,
        ]);
        setVerifyModal(null);
    }

    function confirmVerifyAllPending() {
        const pending = empList.filter((e) => e.status === "verification-pending");
        if (pending.length === 0) return;
        setEmpList((prev) =>
            prev.map((e) => (e.status === "verification-pending" ? { ...e, adminAddressVerified: true, status: "in-progress" as const } : e))
        );
        setFeedItems((prev) => [
            {
                id: `audit-bulk-${Date.now()}`,
                type: "user",
                initials: ADMIN_INITIALS,
                title: "All pending addresses verified by admin",
                time: formatAuditTime(),
                description: `${ADMIN_NAME} verified delivery addresses for all ${pending.length} pending employee${pending.length > 1 ? "s" : ""}`,
                highlight: null,
                isLast: false,
            },
            ...prev,
        ]);
        setVerifyModal(null);
    }

    function handleSort(key: typeof sortKey) {
        if (sortKey === key) {
            setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        } else {
            setSortKey(key);
            setSortDir("asc");
        }
    }

    const sortedEmployees = [...empList].sort((a, b) => {
        let aVal: string | number = "";
        let bVal: string | number = "";
        if (sortKey === "amount") {
            aVal = parseFloat(a.amount.replace(/[$,]/g, ""));
            bVal = parseFloat(b.amount.replace(/[$,]/g, ""));
        } else {
            aVal = a[sortKey];
            bVal = b[sortKey];
        }
        if (typeof aVal === "number" && typeof bVal === "number") {
            return sortDir === "asc" ? aVal - bVal : bVal - aVal;
        }
        return sortDir === "asc"
            ? String(aVal).localeCompare(String(bVal))
            : String(bVal).localeCompare(String(aVal));
    });

    const hasPending = empList.some((e) => e.status === "verification-pending");

    return (
        <div className="flex min-h-screen flex-col bg-[#fdfdfd]">
            <HeaderNavigation />

            <main className="flex flex-col items-center gap-8 pb-12 pt-8 sm:pb-24 sm:pt-12">
                <div className="flex w-full max-w-[1280px] flex-col gap-6 px-4 sm:px-6 lg:px-8">
                    {/* Page header */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-semibold text-[#181d27]">{order.id}</h1>
                            <p className="text-base text-[#475467]">View detailed information for this order</p>
                        </div>
                        <div className="h-px w-full bg-[#eaecf0]" />
                    </div>

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2">
                        <Link href="/employee/overview" className="rounded-md p-1 text-[#535862] hover:bg-[#f9fafb]">
                            <Home01 className="size-5" />
                        </Link>
                        <ChevronRight className="size-4 text-[#535862]" />
                        <span className="text-sm font-semibold text-[#535862]">Onboard device</span>
                        <ChevronRight className="size-4 text-[#535862]" />
                        <span className="text-sm font-semibold text-[#535862]">...</span>
                        <ChevronRight className="size-4 text-[#535862]" />
                        <Link href="/orders" className="text-sm font-semibold text-[#535862] hover:text-[#0948b5]">
                            Orders
                        </Link>
                        <ChevronRight className="size-4 text-[#535862]" />
                        <span className="text-sm font-semibold text-[#0948b5]">{order.id}</span>
                    </nav>

                    {/* Two-column layout */}
                    <div className="flex items-start gap-6">
                        <OrderSidebar order={order} />

                        {/* Main content */}
                        <div className="flex min-w-0 flex-1 flex-col gap-4">
                            {/* Tabs */}
                            <div className="flex border-b border-[#e9eaeb]">
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("info")}
                                    className={`relative px-1 pb-3 text-base font-semibold ${activeTab === "info" ? "text-[#0948b5]" : "text-[#717680] hover:text-[#414651]"}`}
                                >
                                    Order information
                                    {activeTab === "info" && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0b5de8]" />}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setActiveTab("updates")}
                                    className={`relative ml-6 flex items-center gap-2 px-1 pb-3 text-base font-semibold ${activeTab === "updates" ? "text-[#0948b5]" : "text-[#717680] hover:text-[#414651]"}`}
                                >
                                    Order updates
                                    <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#fee4e2] px-1 text-xs font-medium text-[#b42318]">2</span>
                                    {activeTab === "updates" && <span className="absolute bottom-0 left-0 h-0.5 w-full bg-[#0b5de8]" />}
                                </button>
                            </div>

                            {/* Tab content */}
                            {activeTab === "info" && (
                                <div className="overflow-hidden rounded-xl border border-[#eaecf0] bg-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
                                    {/* Table header */}
                                    <div className="flex items-center justify-between border-b border-[#e9eaeb] px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <p className="text-lg font-semibold text-[#181d27]">Order information</p>
                                            <span className="rounded-full bg-[#e7f0ff] px-2 py-0.5 text-xs font-medium text-[#0948b5] ring-1 ring-inset ring-[#8fb9ff]">
                                                {order.employeeCount} Employees
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {hasPending && (
                                                <button
                                                    type="button"
                                                    onClick={() => setVerifyModal({ type: "bulk" })}
                                                    className="rounded-lg border border-[#d0d5dd] bg-white px-4 py-2 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]"
                                                >
                                                    Verify all pending
                                                </button>
                                            )}
                                            <button
                                                type="button"
                                                className="rounded-lg bg-[#0b5de8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#0948b5]"
                                            >
                                                Make signature required
                                            </button>
                                        </div>
                                    </div>
                                    <table className="w-full border-collapse">
                                        <thead>
                                            <tr className="border-b border-[#e9eaeb] bg-[#fafafa]">
                                                {(
                                                    [
                                                        { key: "name", label: "Name", help: null },
                                                        { key: "address", label: "Address", help: null },
                                                        { key: "amount", label: "Total amount", help: null },
                                                        { key: "status", label: "Order status", help: "Current delivery status for this employee's sub-order." },
                                                        { key: "signature", label: "Signature", help: "Whether a recipient signature is required on delivery." },
                                                    ] as const
                                                ).map(({ key, label, help }) => (
                                                    <th key={key} className="px-6 py-3 text-left text-xs font-semibold text-[#717680]">
                                                        <div className="inline-flex items-center gap-1">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleSort(key)}
                                                                className="inline-flex items-center gap-1 whitespace-nowrap hover:text-[#414651]"
                                                            >
                                                                {label}
                                                                {sortKey === key ? (
                                                                    <ArrowDown className={`size-3 stroke-[3px] text-[#717680] ${sortDir === "asc" ? "rotate-180" : ""}`} />
                                                                ) : (
                                                                    <ChevronSelectorVertical size={12} strokeWidth={3} className="text-[#717680]" />
                                                                )}
                                                            </button>
                                                            {help && (
                                                                <Tooltip title={help} placement="top">
                                                                    <TooltipTrigger>
                                                                        <HelpCircle className="size-3.5 cursor-default text-[#98a2b3]" />
                                                                    </TooltipTrigger>
                                                                </Tooltip>
                                                            )}
                                                        </div>
                                                    </th>
                                                ))}
                                                <th className="pr-6 py-3" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedEmployees.map((emp) => (
                                                <tr key={emp.id} className="border-b border-[#e9eaeb] last:border-0 hover:bg-[#fafafa]">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7]">
                                                                <span className="text-sm font-medium text-[#475467]">{emp.initials}</span>
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="truncate text-sm font-medium text-[#181d27]">{emp.name}</p>
                                                                <p className="truncate text-sm text-[#535862]">{emp.role}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="max-w-[200px] px-6 py-4 text-sm text-[#535862]">
                                                        <span className="line-clamp-2">{emp.address}</span>
                                                    </td>
                                                    <td className="px-6 py-4 text-sm text-[#535862]">{emp.amount}</td>
                                                    <td className="px-6 py-4"><EmpStatusBadge status={emp.status} /></td>
                                                    <td className="px-6 py-4"><SigBadge sig={emp.signature} /></td>
                                                    <td className="py-4 pl-4 pr-6 text-right">
                                                        <Dropdown.Root>
                                                            <Dropdown.DotsButton />
                                                            <Dropdown.Popover>
                                                                <Dropdown.Menu selectionMode="none" onAction={(key) => {
                                                                    if (key === "view") setSelectedEmployee(emp);
                                                                    if (key === "verify") setVerifyModal({ type: "single", empId: emp.id });
                                                                }}>
                                                                    <Dropdown.Item id="view" icon={Eye} label="View" />
                                                                    {emp.status === "verification-pending" && (
                                                                        <Dropdown.Item id="verify" icon={ShieldTick} label="Verify address" />
                                                                    )}
                                                                </Dropdown.Menu>
                                                            </Dropdown.Popover>
                                                        </Dropdown.Root>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-3">
                                        <span className="text-sm text-[#535862]">Page 1 of 10</span>
                                        <div className="flex gap-2">
                                            <button type="button" className="rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]">Previous</button>
                                            <button type="button" className="rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]">Next</button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "updates" && (
                                <div className="overflow-hidden rounded-xl border border-[#eaecf0] bg-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
                                    <div className="px-6 pt-5">
                                        <p className="text-lg font-semibold text-[#181d27]">Order updates</p>
                                    </div>
                                    <div className="h-px mt-4 w-full bg-[#eaecf0]" />
                                    <div className="px-6 py-6">
                                        <ActivityFeed items={feedItems} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Slideout */}
            {selectedEmployee && (
                <EmployeeSlideout
                    employee={selectedEmployee}
                    onClose={() => setSelectedEmployee(null)}
                />
            )}

            {/* Verify address confirmation modal */}
            <ModalOverlay isOpen={!!verifyModal} onOpenChange={(open) => !open && setVerifyModal(null)} isDismissable>
                <Modal className="sm:max-w-[480px]">
                    <Dialog>
                        <div className="w-full rounded-xl bg-white p-6 shadow-[0px_20px_24px_-4px_rgba(16,24,40,0.08),0px_8px_8px_-4px_rgba(16,24,40,0.03)]">
                            {/* Header */}
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e7f0ff]">
                                    <ShieldTick className="size-5 text-[#0948b5]" />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setVerifyModal(null)}
                                    className="ml-auto flex size-9 shrink-0 items-center justify-center rounded-lg text-[#717680] hover:bg-[#f9fafb]"
                                >
                                    <X className="size-5" />
                                </button>
                            </div>

                            <p className="mt-4 text-lg font-semibold text-[#181d27]">
                                {verifyModal?.type === "bulk" ? "Verify all pending addresses" : "Verify address"}
                            </p>
                            <p className="mt-1 text-sm text-[#535862]">
                                {verifyModal?.type === "bulk"
                                    ? "You're about to verify the delivery addresses for all pending employees. This allows their orders to proceed immediately without waiting for employee confirmation."
                                    : "You're about to verify this employee's delivery address on their behalf. This allows the order to proceed without waiting for their confirmation."}
                            </p>

                            {/* Address list */}
                            <div className="mt-5 flex flex-col gap-3">
                                {verifyModal?.type === "single" && (() => {
                                    const emp = empList.find((e) => e.id === verifyModal.empId);
                                    if (!emp) return null;
                                    return (
                                        <div className="flex items-start gap-3 rounded-xl border border-[#eaecf0] p-4">
                                            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7]">
                                                <span className="text-sm font-medium text-[#475467]">{emp.initials}</span>
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-[#181d27]">{emp.name}</p>
                                                <p className="text-xs text-[#717680]">{emp.role}</p>
                                                <p className="mt-1.5 text-sm text-[#535862]">{emp.address}</p>
                                            </div>
                                        </div>
                                    );
                                })()}

                                {verifyModal?.type === "bulk" && (
                                    <div className="flex max-h-[260px] flex-col gap-2 overflow-y-auto">
                                        {empList.filter((e) => e.status === "verification-pending").map((emp) => (
                                            <div key={emp.id} className="flex items-start gap-3 rounded-xl border border-[#eaecf0] p-4">
                                                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7]">
                                                    <span className="text-sm font-medium text-[#475467]">{emp.initials}</span>
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-semibold text-[#181d27]">{emp.name}</p>
                                                    <p className="text-xs text-[#717680]">{emp.role}</p>
                                                    <p className="mt-1.5 text-sm text-[#535862]">{emp.address}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="mt-6 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setVerifyModal(null)}
                                    className="flex-1 rounded-lg border border-[#d0d5dd] bg-white px-4 py-2.5 text-sm font-semibold text-[#344054] shadow-[0px_1px_2px_rgba(16,24,40,0.05)] hover:bg-[#f9fafb]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (verifyModal?.type === "single") confirmVerifyAddress(verifyModal.empId);
                                        else if (verifyModal?.type === "bulk") confirmVerifyAllPending();
                                    }}
                                    className="flex-1 rounded-lg bg-[#0b5de8] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0948b5]"
                                >
                                    {verifyModal?.type === "bulk" ? "Verify all" : "Verify address"}
                                </button>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </div>
    );
}
