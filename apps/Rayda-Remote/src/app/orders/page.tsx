"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    AlertCircle,
    Check,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    ChevronSelectorVertical,
    Clock,
    FilterLines,
    HelpCircle,
    HomeLine,
    LayersTwo01,
    LogOut01,
    Menu01,
    MessageSmileCircle,
    SearchLg,
    Settings01,
    ShoppingBag01,
    ShoppingCart01,
    User01,
    UserPlus01,
    Users01,
    XCircle,
    XClose,
    Zap,
} from "@untitledui/icons";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Input } from "@/components/base/input/input";
import { Tabs } from "@/components/application/tabs/tabs";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Table, TableCard } from "@/components/application/table/table";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { Select } from "@/components/base/select/select";
import { TextArea } from "@/components/base/textarea/textarea";
import { Slider } from "@/components/base/slider/slider";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { cx } from "@/utils/cx";
import { useBreakpoint } from "@/hooks/use-breakpoint";

// ---------------------------------------------------------------------------
// Navigation Data
// ---------------------------------------------------------------------------

const navItems = [
    { label: "Overview", href: "#" },
    { label: "Orders", href: "#", current: true },
    { label: "Marketplace", href: "#" },
    { label: "Storage", href: "#" },
    { label: "Catalogs", href: "#" },
    { label: "Employees", href: "#" },
    { label: "All Equipments", href: "#" },
];

const dropdownMenuItems = [
    {
        items: [
            { label: "View profile", icon: User01, shortcut: "⌘K→P" },
            { label: "Settings", icon: Settings01, shortcut: "⌘S" },
            { label: "Keyboard shortcuts", icon: Zap, shortcut: "?/" },
        ],
    },
    {
        items: [
            { label: "Company profile", icon: HomeLine, shortcut: "" },
            { label: "Team", icon: Users01, shortcut: "" },
            { label: "Invite colleagues", icon: UserPlus01, shortcut: "" },
        ],
    },
    {
        items: [
            { label: "Changelog", icon: LayersTwo01, shortcut: "" },
            { label: "Support", icon: MessageSmileCircle, shortcut: "" },
            { label: "API", icon: HelpCircle, shortcut: "" },
        ],
    },
    {
        items: [{ label: "Log out", icon: LogOut01, shortcut: "⌥⇧Q" }],
    },
];

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type RequestStatus = "pending" | "waiting_for_action" | "confirmed" | "rejected" | "expired";
type DeviceResponseType = "quoted" | "alternative" | "unavailable";

interface AlternativeDevice {
    name: string;
    price: number;
    specs?: string;
}

interface DeviceVendorResponse {
    type: DeviceResponseType;
    quotedPrice?: number;
    alternative?: AlternativeDevice;
    unavailableReason?: string;
}

interface RFQDevice {
    name: string;
    quantity: number;
    unitPrice?: number;
    assetType: string;
    description?: string;
    vendorResponse?: DeviceVendorResponse;
}

interface CustomDeviceRequest {
    id: string;
    devices: RFQDevice[];
    requestBudget: number;
    requiredBudget?: number; // Vendor's response total
    country: string;
    status: RequestStatus;
    createdAt?: string;
    expiresAt?: string;
}

// ---------------------------------------------------------------------------
// Data Templates (matching vendor portal exactly)
// ---------------------------------------------------------------------------

const rfqDeviceTemplates = [
    { name: "MacBook Pro 14\" M3 Pro", assetType: "Laptop", basePrice: 1999 },
    { name: "Dell Precision 5680", assetType: "Laptop", basePrice: 3500 },
    { name: "Lenovo ThinkPad X1 Carbon", assetType: "Laptop", basePrice: 1649 },
    { name: "LG 27UP850-W 27\" 4K Monitor", assetType: "Monitor", basePrice: 450 },
    { name: "Dell UltraSharp U3223QE 32\"", assetType: "Monitor", basePrice: 1100 },
    { name: "Samsung 49\" Odyssey G9", assetType: "Monitor", basePrice: 1299 },
    { name: "Herman Miller Aeron Chair", assetType: "Furniture", basePrice: 1395 },
    { name: "Fully Jarvis Standing Desk", assetType: "Furniture", basePrice: 750 },
    { name: "Logitech Rally Bar", assetType: "Conference", basePrice: 2999 },
    { name: "iPhone 15 Pro Max", assetType: "Phone", basePrice: 1199 },
    { name: "Apple AirPods Pro 2", assetType: "Audio", basePrice: 249 },
    { name: "CalDigit TS4 Thunderbolt Dock", assetType: "Accessory", basePrice: 400 },
    { name: "Razer BlackWidow V4 Pro", assetType: "Peripheral", basePrice: 230 },
    { name: "Microsoft Surface Pro 9", assetType: "Tablet", basePrice: 1599 },
    { name: "BenQ ScreenBar Monitor Light", assetType: "Accessory", basePrice: 109 },
];

const countries = ["United States", "Canada", "United Kingdom", "Germany", "France", "Australia", "Japan", "Singapore"];

// ---------------------------------------------------------------------------
// Generate 50 Custom Device Requests (matching vendor portal RFQ structure)
// ---------------------------------------------------------------------------

// Alternative device suggestions
const alternativeDevices = [
    { name: "MacBook Pro 16\" M3 Max", price: 3499, specs: "M3 Max chip, 36GB RAM, 1TB SSD" },
    { name: "Dell XPS 15", price: 1799, specs: "Intel i7, 32GB RAM, 1TB SSD" },
    { name: "HP EliteBook 840", price: 1599, specs: "Intel i7, 16GB RAM, 512GB SSD" },
    { name: "LG 32\" UltraFine 4K", price: 699, specs: "4K IPS, USB-C, 32 inch" },
    { name: "Samsung Galaxy Tab S9", price: 849, specs: "Snapdragon, 256GB, WiFi" },
];

function generateCustomDeviceRequests(count: number): CustomDeviceRequest[] {
    const requests: CustomDeviceRequest[] = [];
    // Distribute statuses realistically across 50 entries
    const statuses: RequestStatus[] = [
        "pending", "waiting_for_action", "confirmed", "rejected", "expired",
        "pending", "confirmed", "waiting_for_action", "pending", "confirmed",
    ];
    const baseId = 26700;

    // Deterministic multipliers for vendor responses (no Math.random)
    const multipliers = [0.95, 0.92, 0.98, 0.90, 0.97, 0.93, 0.96, 0.91, 0.94, 0.99, 0.88, 0.89, 0.87, 0.96, 0.93];

    // Response type patterns for variety
    const responsePatterns: DeviceResponseType[][] = [
        ["quoted"],
        ["quoted", "quoted"],
        ["quoted", "alternative"],
        ["quoted", "unavailable"],
        ["alternative"],
        ["quoted", "quoted", "quoted"],
        ["quoted", "alternative", "quoted"],
        ["quoted", "quoted", "unavailable"],
    ];

    for (let i = 0; i < count; i++) {
        const numDevices = (i % 3) + 1; // 1-3 devices
        const devices: RFQDevice[] = [];
        const hasBudget = i % 3 !== 0; // 2/3 have full budget, 1/3 have partial or no budget
        const status = statuses[i % statuses.length];
        const hasVendorResponse = status === "confirmed" || status === "waiting_for_action" || status === "expired" || status === "rejected";
        const responsePattern = responsePatterns[i % responsePatterns.length];

        for (let j = 0; j < numDevices; j++) {
            const template = rfqDeviceTemplates[(i + j * 3) % rfqDeviceTemplates.length];
            const quantity = (i % 5) + 1;
            const deviceHasBudget = hasBudget || (j === 0 && i % 4 !== 0);
            const unitPrice = deviceHasBudget ? template.basePrice + (i * 50) % 500 : undefined;

            // Generate vendor response for this device
            let vendorResponse: DeviceVendorResponse | undefined;
            if (hasVendorResponse) {
                const responseType = responsePattern[j % responsePattern.length];
                if (responseType === "quoted") {
                    vendorResponse = {
                        type: "quoted",
                        quotedPrice: unitPrice ? Math.round(unitPrice * multipliers[(i + j) % multipliers.length]) : Math.round(template.basePrice * 0.95),
                    };
                } else if (responseType === "alternative") {
                    const alt = alternativeDevices[(i + j) % alternativeDevices.length];
                    vendorResponse = {
                        type: "alternative",
                        alternative: alt,
                    };
                } else if (responseType === "unavailable") {
                    vendorResponse = {
                        type: "unavailable",
                        unavailableReason: ["Out of stock", "Discontinued", "Not available in this region"][(i + j) % 3],
                    };
                }
            }

            devices.push({
                name: template.name,
                quantity,
                unitPrice,
                assetType: template.assetType,
                description: `High-quality ${template.assetType.toLowerCase()} for professional use.`,
                vendorResponse,
            });
        }

        // Calculate total request budget
        const requestBudget = devices.reduce((sum, d) => sum + (d.unitPrice || 0) * d.quantity, 0);

        // Calculate vendor's total quote
        let requiredBudget: number | undefined;
        if (hasVendorResponse) {
            requiredBudget = devices.reduce((sum, d) => {
                if (!d.vendorResponse) return sum;
                if (d.vendorResponse.type === "quoted" && d.vendorResponse.quotedPrice) {
                    return sum + d.vendorResponse.quotedPrice * d.quantity;
                }
                if (d.vendorResponse.type === "alternative" && d.vendorResponse.alternative) {
                    return sum + d.vendorResponse.alternative.price * d.quantity;
                }
                return sum; // unavailable devices don't add to total
            }, 0);
        }

        // Generate dates
        const dayOffset = i * 2;
        const createdAt = `Jan ${(dayOffset % 28) + 1}, 2025`;
        const expiresAt = `Jan ${((dayOffset + 3) % 28) + 1}, 2025`;

        requests.push({
            id: (baseId + i).toString(),
            devices,
            requestBudget,
            requiredBudget,
            country: countries[i % countries.length],
            status,
            createdAt,
            expiresAt,
        });
    }

    return requests;
}

const customDeviceRequests = generateCustomDeviceRequests(50);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function truncateDeviceName(name: string, maxLength = 32): string {
    if (name.length <= maxLength) return name;
    return `${name.slice(0, maxLength)}...`;
}

function formatCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

// ---------------------------------------------------------------------------
// Country Flag
// ---------------------------------------------------------------------------

const countryCodeMap: Record<string, string> = {
    "United States": "US",
    "Canada": "CA",
    "United Kingdom": "GB",
    "Germany": "DE",
    "France": "FR",
    "Australia": "AU",
    "Japan": "JP",
    "Singapore": "SG",
};

function CountryFlag({ country }: { country: string }) {
    const code = countryCodeMap[country] || "US";
    return (
        <img
            src={`https://www.untitledui.com/images/flags/${code}.svg`}
            alt={`${country} flag`}
            className="size-5 shrink-0 rounded-full"
        />
    );
}

// ---------------------------------------------------------------------------
// RFQ Device Count (with tooltip)
// ---------------------------------------------------------------------------

function RFQDeviceCount({ devices }: { devices: RFQDevice[] }) {
    const totalQuantity = devices.reduce((sum, d) => sum + d.quantity, 0);

    const tooltipTitle = (
        <div className="flex flex-col gap-1">
            {devices.map((device, i) => (
                <span key={i}>{truncateDeviceName(device.name)} (×{device.quantity})</span>
            ))}
        </div>
    );

    return (
        <Tooltip title={tooltipTitle} placement="top" arrow>
            <TooltipTrigger>
                <span className="cursor-default text-sm text-fg-primary">{totalQuantity}</span>
            </TooltipTrigger>
        </Tooltip>
    );
}

// ---------------------------------------------------------------------------
// Calculate Budget Total
// ---------------------------------------------------------------------------

function calculateBudgetTotal(request: CustomDeviceRequest): { total: number; isPartial: boolean } | null {
    const devicesWithPrice = request.devices.filter((device) => device.unitPrice !== undefined);
    if (devicesWithPrice.length === 0) return null;
    const total = devicesWithPrice.reduce((sum, device) => sum + device.quantity * (device.unitPrice ?? 0), 0);
    const isPartial = devicesWithPrice.length < request.devices.length;
    return { total, isPartial };
}

// ---------------------------------------------------------------------------
// Header Navigation
// ---------------------------------------------------------------------------

function HeaderNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative w-full border-b border-[#475467] bg-primary-solid">
            <div className="flex h-[72px] w-full items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left: Logo + Nav */}
                <div className="flex items-center gap-4">
                    <a href="/" aria-label="Go to homepage">
                        <RaydaLogo variant="white" />
                    </a>

                    <nav className="hidden lg:block">
                        <ul className="flex items-center gap-1">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className={cx(
                                            "rounded-md px-3 py-2 text-sm font-semibold text-white transition duration-100 ease-linear",
                                            item.current ? "bg-[#344054]" : "hover:bg-white/10",
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>

                {/* Right: Actions + Avatar */}
                <div className="flex items-center gap-4">
                    <div className="hidden gap-1 sm:flex">
                        <a
                            href="#"
                            aria-label="Settings"
                            className="flex items-center justify-center rounded-md p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                            <Settings01 className="size-5" />
                        </a>
                        <a
                            href="#"
                            aria-label="Shopping cart"
                            className="flex items-center justify-center rounded-md p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                            <ShoppingCart01 className="size-5" />
                        </a>
                    </div>

                    {/* Avatar with Dropdown (desktop) */}
                    <div className="hidden lg:block">
                        <DialogTrigger>
                            <AriaButton
                                className={({ isFocused }) =>
                                    cx(
                                        "cursor-pointer rounded-full outline-none transition",
                                        isFocused && "ring-4 ring-[#e6efff]",
                                    )
                                }
                            >
                                <Avatar
                                    alt="Olivia Rhye"
                                    initials="OR"
                                    size="md"
                                    contrastBorder={false}
                                    className="size-10 bg-[#e6efff] text-sm font-semibold text-[#003999]"
                                />
                            </AriaButton>
                            <Popover
                                placement="bottom right"
                                offset={8}
                                className={({ isEntering, isExiting }) =>
                                    cx(
                                        "z-50 will-change-transform",
                                        isEntering && "duration-200 ease-out animate-in fade-in slide-in-from-top-1",
                                        isExiting && "duration-150 ease-in animate-out fade-out slide-out-to-top-1",
                                    )
                                }
                            >
                                <AvatarDropdownMenu />
                            </Popover>
                        </DialogTrigger>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        className="flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10 lg:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <XClose className="size-6" /> : <Menu01 className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile navigation overlay */}
            {mobileMenuOpen && (
                <div className="absolute inset-x-0 top-[72px] z-50 border-b border-[#475467] bg-primary-solid lg:hidden">
                    <nav className="flex flex-col px-4 pb-4 pt-2 sm:px-6">
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className={cx(
                                            "block rounded-md px-3 py-2.5 text-sm font-semibold text-white transition duration-100 ease-linear",
                                            item.current ? "bg-[#344054]" : "hover:bg-white/10",
                                        )}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        {/* Divider */}
                        <div className="my-3 h-px bg-[#475467]" />

                        {/* Mobile-only actions */}
                        <div className="flex flex-col gap-1 sm:hidden">
                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                <Settings01 className="size-5 text-white/70" />
                                Settings
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                <ShoppingCart01 className="size-5 text-white/70" />
                                Shopping cart
                            </a>
                        </div>

                        {/* User info */}
                        <div className="mt-3 flex items-center gap-3 rounded-md px-3 py-2.5">
                            <Avatar
                                alt="Olivia Rhye"
                                initials="OR"
                                size="md"
                                contrastBorder={false}
                                className="size-10 bg-[#e6efff] text-sm font-semibold text-[#003999]"
                            />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-white">Olivia Rhye</p>
                                <p className="truncate text-sm text-[#98a2b3]">olivia@rayda.co</p>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

// ---------------------------------------------------------------------------
// Avatar Dropdown Menu
// ---------------------------------------------------------------------------

function AvatarDropdownMenu() {
    return (
        <div className="w-60 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-[#eaecf0]">
            {/* User info header */}
            <div className="border-b border-[#eaecf0] px-4 py-3">
                <div className="flex items-center gap-3">
                    <Avatar
                        alt="Olivia Rhye"
                        initials="OR"
                        size="md"
                        status="online"
                        contrastBorder={false}
                        className="size-10 bg-[#e6efff] text-sm font-semibold text-[#003999]"
                    />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#344054]">Olivia Rhye</p>
                        <p className="truncate text-sm text-[#475467]">olivia@rayda.co</p>
                    </div>
                </div>
            </div>

            {/* Menu sections */}
            {dropdownMenuItems.map((section, sectionIdx) => (
                <div key={sectionIdx} className="border-b border-[#eaecf0] py-1">
                    {section.items.map((item) => (
                        <button
                            key={item.label}
                            className="group flex w-full cursor-pointer items-center px-1.5 py-0.5"
                        >
                            <div className="flex w-full items-center justify-between rounded-md px-2.5 py-[9px] group-hover:bg-gray-50">
                                <div className="flex items-center gap-2">
                                    <item.icon className="size-4 text-[#667085]" />
                                    <span className="text-sm font-medium text-[#344054]">{item.label}</span>
                                </div>
                                <span className="text-xs text-[#667085]">{item.shortcut}</span>
                            </div>
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page Header
// ---------------------------------------------------------------------------

function PageHeader() {
    return (
        <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5">
                {/* Title and description */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold leading-[32px] text-[#101828] sm:text-[30px] sm:leading-[38px]">
                        Orders
                    </h1>
                    <p className="text-sm leading-5 text-[#475467] sm:text-base sm:leading-6">
                        View, track and manage your orders
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-border-secondary" />
            </div>

            {/* Breadcrumbs */}
            <div className="mt-6 flex items-center gap-3">
                <a href="#" className="text-[#667085] transition hover:text-[#344054]">
                    <HomeLine className="size-5" />
                </a>
                <ChevronRight className="size-4 text-[#d0d5dd]" />
                <a href="#" className="text-sm font-semibold text-[#003999]">
                    Orders
                </a>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: RequestStatus }) {
    const config: Record<RequestStatus, { label: string; color: "warning" | "brand" | "success" | "error" | "gray" }> = {
        pending: { label: "Pending", color: "warning" },
        waiting_for_action: { label: "Waiting For Action", color: "brand" },
        confirmed: { label: "Confirmed", color: "success" },
        rejected: { label: "Rejected", color: "error" },
        expired: { label: "Expired", color: "gray" },
    };

    const { label, color } = config[status];

    return (
        <Badge size="sm" type="pill-color" color={color}>
            {label}
        </Badge>
    );
}

// ---------------------------------------------------------------------------
// Filter Tabs
// ---------------------------------------------------------------------------

type FilterTab = "all" | "pending" | "waiting_for_action" | "confirmed" | "rejected" | "expired";

const filterTabs = [
    { id: "all", label: "All requests" },
    { id: "pending", label: "Pending" },
    { id: "waiting_for_action", label: "Waiting for Action" },
    { id: "confirmed", label: "Confirmed" },
    { id: "rejected", label: "Rejected" },
    { id: "expired", label: "Expired" },
];

// ---------------------------------------------------------------------------
// Sort types (matching vendor portal)
// ---------------------------------------------------------------------------

type SortField = "id" | "budget" | "country";
type SortDirection = "asc" | "desc";

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

interface RequestFilters {
    countries: string[];
    assetTypes: string[];
    budgetRange: [number, number];
}

const defaultRequestFilters: RequestFilters = {
    countries: [],
    assetTypes: [],
    budgetRange: [0, 50000],
};

// Available asset types from the device templates
const assetTypes = ["Laptop", "Monitor", "Furniture", "Conference", "Phone", "Audio", "Accessory", "Peripheral", "Tablet"];

// ---------------------------------------------------------------------------
// Filter Dropdown
// ---------------------------------------------------------------------------

function FilterDropdown({
    isOpen,
    onClose,
    filters,
    onApply,
    resultCount,
}: {
    isOpen: boolean;
    onClose: () => void;
    filters: RequestFilters;
    onApply: (filters: RequestFilters) => void;
    resultCount: number;
}) {
    const [localFilters, setLocalFilters] = useState<RequestFilters>(filters);
    const dropdownRef = React.useRef<HTMLDivElement>(null);
    const isMd = useBreakpoint("md");

    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters);
        }
    }, [isOpen, filters]);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen, onClose]);

    const handleReset = () => {
        setLocalFilters(defaultRequestFilters);
    };

    const handleApply = () => {
        onApply(localFilters);
        onClose();
    };

    const toggleCountry = (country: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            countries: prev.countries.includes(country)
                ? prev.countries.filter((c) => c !== country)
                : [...prev.countries, country],
        }));
    };

    const toggleAssetType = (assetType: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            assetTypes: prev.assetTypes.includes(assetType)
                ? prev.assetTypes.filter((a) => a !== assetType)
                : [...prev.assetTypes, assetType],
        }));
    };

    const hasActiveFilters =
        localFilters.countries.length > 0 ||
        localFilters.assetTypes.length > 0 ||
        localFilters.budgetRange[0] > 0 ||
        localFilters.budgetRange[1] < 50000;

    if (!isOpen) return null;

    return (
        <>
        {/* Backdrop overlay on mobile */}
        {!isMd && (
            <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
        )}
        <div
            ref={dropdownRef}
            className={cx(
                "z-50 rounded-xl border border-[#e9eaeb] bg-white shadow-lg",
                isMd
                    ? "absolute right-0 top-full mt-2 w-[340px]"
                    : "fixed inset-x-4 bottom-4 max-h-[80vh] overflow-y-auto"
            )}
        >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#e9eaeb] px-5 py-3">
                <h3 className="text-base font-semibold text-[#181d27]">Filter Requests</h3>
                <button
                    type="button"
                    onClick={handleReset}
                    className="text-sm font-semibold text-[#0948b5] hover:text-[#073d8a]"
                >
                    Reset
                </button>
            </div>

            {/* Filter Options */}
            <div className="flex flex-col gap-5 p-5">
                {/* Country */}
                <div className="flex flex-col gap-2.5">
                    <span className="text-sm font-semibold text-[#414651]">Country</span>
                    <div className="flex flex-wrap gap-2">
                        {countries.map((country) => (
                            <button
                                key={country}
                                type="button"
                                onClick={() => toggleCountry(country)}
                                className={cx(
                                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                                    localFilters.countries.includes(country)
                                        ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                                        : "border-[#e9eaeb] bg-white text-[#535862] hover:bg-[#fafafa]"
                                )}
                            >
                                {localFilters.countries.includes(country) && (
                                    <Check className="size-3.5" />
                                )}
                                <CountryFlag country={country} />
                                {country}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Asset Type */}
                <div className="flex flex-col gap-2.5">
                    <span className="text-sm font-semibold text-[#414651]">Asset Type</span>
                    <div className="flex flex-wrap gap-2">
                        {assetTypes.map((assetType) => (
                            <button
                                key={assetType}
                                type="button"
                                onClick={() => toggleAssetType(assetType)}
                                className={cx(
                                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                                    localFilters.assetTypes.includes(assetType)
                                        ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                                        : "border-[#e9eaeb] bg-white text-[#535862] hover:bg-[#fafafa]"
                                )}
                            >
                                {localFilters.assetTypes.includes(assetType) && (
                                    <Check className="size-3.5" />
                                )}
                                {assetType}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Budget Range */}
                <div className="flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#414651]">Budget Range</span>
                    </div>
                    <Slider
                        value={localFilters.budgetRange}
                        onChange={(value) =>
                            setLocalFilters((prev) => ({
                                ...prev,
                                budgetRange: value as [number, number],
                            }))
                        }
                        minValue={0}
                        maxValue={50000}
                        step={500}
                    />
                    <div className="flex items-center justify-between text-sm text-[#535862]">
                        <span>${localFilters.budgetRange[0].toLocaleString()}</span>
                        <span>${localFilters.budgetRange[1].toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="border-t border-[#e9eaeb] px-5 py-3">
                <Button size="md" color="primary" className="w-full" iconLeading={FilterLines} onClick={handleApply}>
                    Apply Filter{hasActiveFilters ? ` (${resultCount})` : ""}
                </Button>
            </div>
        </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Custom Device Requests Table
// ---------------------------------------------------------------------------

function CustomDeviceRequestsTable() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState<FilterTab>("all");
    const [sortField, setSortField] = useState<SortField | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRequest, setSelectedRequest] = useState<CustomDeviceRequest | null>(null);
    const [requests, setRequests] = useState(customDeviceRequests);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState<RequestFilters>(defaultRequestFilters);
    const [mounted, setMounted] = useState(false);
    const isMd = useBreakpoint("md");
    const itemsPerPage = 10;

    useEffect(() => {
        setMounted(true);
    }, []);

    // Count active filters
    const activeFilterCount =
        filters.countries.length +
        filters.assetTypes.length +
        (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 50000 ? 1 : 0);

    // Handle accept quote
    const handleAcceptQuote = (id: string, itemCount: number) => {
        setRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: "confirmed" as RequestStatus } : req
            )
        );
        setSelectedRequest(null);
        setSuccessMessage(`Your order with ${itemCount} item${itemCount !== 1 ? "s" : ""} is being processed.`);
        setShowSuccessToast(true);
    };

    // Handle decline quote
    const handleDeclineQuote = (id: string) => {
        setRequests((prev) =>
            prev.map((req) =>
                req.id === id ? { ...req, status: "rejected" as RequestStatus } : req
            )
        );
        setSelectedRequest(null);
        setShowErrorToast(true);
    };

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortField(field);
            setSortDirection("asc");
        }
    };

    // Filter requests
    const filteredRequests = requests.filter((request) => {
        // Filter by search query (ID or device names)
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesId = request.id.toLowerCase().includes(query);
            const matchesDevice = request.devices.some((device) => device.name.toLowerCase().includes(query));
            if (!matchesId && !matchesDevice) return false;
        }

        // Filter by status tab
        if (activeFilter !== "all" && request.status !== activeFilter) {
            return false;
        }

        // Filter by countries from filter modal
        if (filters.countries.length > 0 && !filters.countries.includes(request.country)) {
            return false;
        }

        // Filter by asset types from filter modal
        if (filters.assetTypes.length > 0) {
            const requestAssetTypes = request.devices.map((d) => d.assetType);
            const hasMatchingAssetType = filters.assetTypes.some((at) => requestAssetTypes.includes(at));
            if (!hasMatchingAssetType) return false;
        }

        // Filter by budget range
        const budgetResult = calculateBudgetTotal(request);
        if (budgetResult) {
            if (budgetResult.total < filters.budgetRange[0] || budgetResult.total > filters.budgetRange[1]) {
                return false;
            }
        }

        return true;
    });

    // Sort requests (matching vendor portal)
    const sortedRequests = [...filteredRequests].sort((a, b) => {
        if (!sortField) return 0;

        let aValue: string | number;
        let bValue: string | number;

        switch (sortField) {
            case "id":
                aValue = a.id;
                bValue = b.id;
                break;
            case "budget":
                const aTotal = calculateBudgetTotal(a);
                const bTotal = calculateBudgetTotal(b);
                aValue = aTotal?.total ?? 0;
                bValue = bTotal?.total ?? 0;
                break;
            case "country":
                aValue = a.country;
                bValue = b.country;
                break;
            default:
                return 0;
        }

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedRequests.length / itemsPerPage);
    const paginatedRequests = sortedRequests.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when filter changes
    const handleFilterChange = (key: React.Key) => {
        setActiveFilter(key as FilterTab);
        setCurrentPage(1);
    };

    // Define table columns for sorting
    const columns = [
        { id: "id", name: "Request ID", allowsSorting: true },
        { id: "devices", name: "Device(s)", allowsSorting: false },
        { id: "budget", name: "Budget", allowsSorting: true },
        { id: "country", name: "Country", allowsSorting: true },
        { id: "status", name: "Status", allowsSorting: false },
        { id: "quote", name: "Quote", allowsSorting: false },
        { id: "actions", name: "", allowsSorting: false },
    ];

    // Handle column sort from Table component
    const handleColumnSort = (descriptor: { column: React.Key; direction: "ascending" | "descending" }) => {
        const field = descriptor.column as SortField;
        setSortField(field);
        setSortDirection(descriptor.direction === "ascending" ? "asc" : "desc");
    };

    if (!mounted) {
        return (
            <TableCard.Root size="sm">
                <div className="flex items-center justify-center py-24">
                    <div className="size-6 animate-spin rounded-full border-2 border-border-secondary border-t-border-brand" />
                </div>
            </TableCard.Root>
        );
    }

    return (
        <TableCard.Root size="sm">
            {/* Header with tabs and search */}
            <div className="flex flex-col gap-4 border-b border-secondary px-5 py-4">
                <h2 className="text-md font-semibold text-primary">
                    Custom Device Requests{" "}
                    <span className="text-tertiary">({filteredRequests.length})</span>
                </h2>

                {/* Filter tabs and search */}
                <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
                    {/* Filter tabs — full tabs on md+, dropdown on mobile */}
                    {isMd ? (
                        <Tabs
                            selectedKey={activeFilter}
                            onSelectionChange={handleFilterChange}
                            className="w-max"
                        >
                            <Tabs.List type="button-minimal" items={filterTabs}>
                                {(tab) => <Tabs.Item {...tab} />}
                            </Tabs.List>
                        </Tabs>
                    ) : (
                        <div className="w-full">
                            <Select
                                size="sm"
                                placeholder="Filter by status"
                                selectedKey={activeFilter}
                                onSelectionChange={(key) => handleFilterChange(key as React.Key)}
                                items={filterTabs}
                            >
                                {(tab) => <Select.Item id={tab.id}>{tab.label}</Select.Item>}
                            </Select>
                        </div>
                    )}

                    {/* Search and filters — stacked on mobile, inline on md+ */}
                    <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row md:items-center">
                        <div className="w-full md:w-56">
                            <Input
                                size="sm"
                                icon={SearchLg}
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(value) => {
                                    setSearchQuery(value);
                                    setCurrentPage(1);
                                }}
                            />
                        </div>
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setShowFilterModal(!showFilterModal)}
                                className={cx(
                                    "flex h-10 w-full items-center justify-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors md:w-auto",
                                    showFilterModal
                                        ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                                        : "border-[#e9eaeb] bg-white text-[#414651] hover:bg-[#fafafa]"
                                )}
                            >
                                <FilterLines className="size-5" />
                                Filters
                                {activeFilterCount > 0 && (
                                    <span className="flex size-5 items-center justify-center rounded-full bg-[#0948b5] text-xs font-medium text-white">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>
                            <FilterDropdown
                                isOpen={showFilterModal}
                                onClose={() => setShowFilterModal(false)}
                                filters={filters}
                                onApply={(newFilters: RequestFilters) => {
                                    setFilters(newFilters);
                                    setCurrentPage(1);
                                }}
                                resultCount={filteredRequests.length}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
            <Table
                aria-label="Custom device requests table"
                sortDescriptor={sortField ? { column: sortField, direction: sortDirection === "asc" ? "ascending" : "descending" } : undefined}
                onSortChange={handleColumnSort}
                className="min-w-[800px]"
            >
                <Table.Header columns={columns}>
                    {(column) => (
                        <Table.Head
                            id={column.id}
                            label={column.name}
                            allowsSorting={column.allowsSorting}
                            isRowHeader={column.id === "id"}
                        />
                    )}
                </Table.Header>
                <Table.Body
                    items={paginatedRequests}
                    renderEmptyState={() => (
                        <div className="flex items-center justify-center overflow-hidden px-8 py-24">
                            <EmptyState size="sm">
                                <EmptyState.Header pattern="circle">
                                    <EmptyState.FeaturedIcon color="gray" theme="modern-neue" />
                                </EmptyState.Header>

                                <EmptyState.Content>
                                    <EmptyState.Title>No requests found</EmptyState.Title>
                                    <EmptyState.Description>
                                        {searchQuery
                                            ? `Your search "${searchQuery}" did not match any requests. Please try again.`
                                            : "No device requests match your current filters."}
                                    </EmptyState.Description>
                                </EmptyState.Content>

                                <EmptyState.Footer>
                                    <Button
                                        size="md"
                                        color="secondary"
                                        onClick={() => {
                                            setSearchQuery("");
                                            setFilters(defaultRequestFilters);
                                        }}
                                    >
                                        Clear filters
                                    </Button>
                                </EmptyState.Footer>
                            </EmptyState>
                        </div>
                    )}
                >
                    {(request) => (
                        <Table.Row
                            key={request.id}
                            id={request.id}
                            className="transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2"
                        >
                            <Table.Cell className="font-medium text-primary">{request.id}</Table.Cell>
                            <Table.Cell>
                                <RFQDeviceCount devices={request.devices} />
                            </Table.Cell>
                            <Table.Cell className="text-primary">
                                {(() => {
                                    const result = calculateBudgetTotal(request);
                                    if (!result) return "—";
                                    return formatCurrency(result.total);
                                })()}
                            </Table.Cell>
                            <Table.Cell>
                                <div className="flex items-center gap-1.5">
                                    <CountryFlag country={request.country} />
                                    <span className="text-secondary">{request.country}</span>
                                </div>
                            </Table.Cell>
                            <Table.Cell>
                                <StatusBadge status={request.status} />
                            </Table.Cell>
                            <Table.Cell>
                                {request.requiredBudget
                                    ? formatCurrency(request.requiredBudget)
                                    : "—"}
                            </Table.Cell>
                            <Table.Cell>
                                <button
                                    type="button"
                                    className="text-sm font-semibold text-brand-secondary transition-colors hover:text-brand-secondary_hover hover:underline"
                                    onClick={() => setSelectedRequest(request)}
                                >
                                    View
                                </button>
                            </Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <PaginationCardDefault
                    page={currentPage}
                    total={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* RFQ Details Sidebar */}
            <RFQDetailsSidebar
                request={selectedRequest}
                isOpen={!!selectedRequest}
                onClose={() => setSelectedRequest(null)}
                onAccept={handleAcceptQuote}
                onDecline={handleDeclineQuote}
            />

            {/* Success Toast */}
            <SuccessToast
                isVisible={showSuccessToast}
                onDismiss={() => setShowSuccessToast(false)}
                message={successMessage}
            />

            {/* Error Toast */}
            <ErrorToast
                isVisible={showErrorToast}
                onDismiss={() => setShowErrorToast(false)}
            />
        </TableCard.Root>
    );
}

// ---------------------------------------------------------------------------
// RFQ Details Sidebar (Customer View)
// ---------------------------------------------------------------------------

function RFQDetailsSidebar({
    request,
    isOpen,
    onClose,
    onAccept,
    onDecline,
}: {
    request: CustomDeviceRequest | null;
    isOpen: boolean;
    onClose: () => void;
    onAccept: (id: string, itemCount: number) => void;
    onDecline: (id: string) => void;
}) {
    const [expandedDevice, setExpandedDevice] = useState<number | null>(null);
    const [showAcceptModal, setShowAcceptModal] = useState(false);
    const [showDeclineModal, setShowDeclineModal] = useState(false);
    const [declineReason, setDeclineReason] = useState<string>("");
    const [otherReason, setOtherReason] = useState<string>("");

    // Keep last valid request so content stays rendered during exit animation
    const lastRequestRef = useRef<CustomDeviceRequest | null>(null);
    if (request) lastRequestRef.current = request;
    const displayRequest = request ?? lastRequestRef.current;

    // Track selected devices for confirmation (indices of devices to include in order)
    const [selectedDevices, setSelectedDevices] = useState<Set<number>>(new Set());

    // Reset selected devices when request changes
    useEffect(() => {
        if (request) {
            const available = new Set<number>();
            request.devices.forEach((d, i) => {
                if (d.vendorResponse?.type !== "unavailable") {
                    available.add(i);
                }
            });
            setSelectedDevices(available);
            setExpandedDevice(null);
        }
    }, [request]);

    if (!displayRequest) return null;

    const toggleDevice = (index: number) => {
        setExpandedDevice(expandedDevice === index ? null : index);
    };

    const totalQuantity = displayRequest.devices.reduce((sum, d) => sum + d.quantity, 0);
    const budgetResult = calculateBudgetTotal(displayRequest);

    // Calculate vendor total from responses
    const vendorTotal = displayRequest.devices.reduce((sum, d) => {
        if (!d.vendorResponse) return sum;
        if (d.vendorResponse.type === "quoted" && d.vendorResponse.quotedPrice) {
            return sum + d.vendorResponse.quotedPrice * d.quantity;
        }
        if (d.vendorResponse.type === "alternative" && d.vendorResponse.alternative) {
            return sum + d.vendorResponse.alternative.price * d.quantity;
        }
        return sum;
    }, 0);

    const hasVendorResponse = displayRequest.devices.some((d) => d.vendorResponse);
    const hasUnavailableItems = displayRequest.devices.some((d) => d.vendorResponse?.type === "unavailable");

    // Calculate total for selected devices only
    const selectedTotal = displayRequest.devices.reduce((sum, d, i) => {
        if (!selectedDevices.has(i) || !d.vendorResponse) return sum;
        if (d.vendorResponse.type === "quoted" && d.vendorResponse.quotedPrice) {
            return sum + d.vendorResponse.quotedPrice * d.quantity;
        }
        if (d.vendorResponse.type === "alternative" && d.vendorResponse.alternative) {
            return sum + d.vendorResponse.alternative.price * d.quantity;
        }
        return sum;
    }, 0);

    // Toggle device selection
    const toggleDeviceSelection = (index: number) => {
        setSelectedDevices((prev) => {
            const next = new Set(prev);
            if (next.has(index)) {
                next.delete(index);
            } else {
                next.add(index);
            }
            return next;
        });
    };

    // Response badge for each device
    function DeviceResponseBadge({ response }: { response?: DeviceVendorResponse }) {
        if (!response) return null;

        const config: Record<DeviceResponseType, { label: string; className: string }> = {
            quoted: { label: "Quoted", className: "bg-[#dcfae6] text-[#067647]" },
            alternative: { label: "Alternative", className: "bg-[#eff8ff] text-[#0948b5]" },
            unavailable: { label: "Unavailable", className: "bg-[#fef3f2] text-[#b42318]" },
        };

        const { label, className } = config[response.type];

        return (
            <span className={cx("rounded-full px-2 py-0.5 text-xs font-medium", className)}>
                {label}
            </span>
        );
    }

    return (
        <>
            <SlideoutMenu isOpen={isOpen} onOpenChange={(open) => !open && onClose()} isDismissable>
                <SlideoutMenu.Header onClose={onClose}>
                    <div className="flex items-start gap-4 pr-8">
                        <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
                            <ShoppingBag01 className="size-5 text-fg-quaternary" />
                        </div>
                        <div className="flex flex-1 flex-col gap-1.5">
                            <h2 className="text-xl font-semibold text-primary">
                                Request #{displayRequest.id}
                            </h2>
                            <StatusBadge status={displayRequest.status} />
                        </div>
                    </div>
                </SlideoutMenu.Header>

                <SlideoutMenu.Content>
                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out">
                        {/* Status Message */}
                        {displayRequest.status === "pending" && (
                            <div className="flex items-start gap-3 rounded-lg border border-[#fedf89] bg-[#fffaeb] p-4">
                                <Clock className="size-5 shrink-0 text-[#dc6803]" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#b54708]">Pending Vendor Response</span>
                                    <span className="text-sm text-[#b54708]">
                                        Your request has been sent to vendors. You will be notified when a quote is available.
                                    </span>
                                </div>
                            </div>
                        )}

                        {displayRequest.status === "waiting_for_action" && hasUnavailableItems && (
                            <div className="flex items-start gap-3 rounded-lg border border-[#fecdca] bg-[#fef3f2] p-4">
                                <AlertCircle className="size-5 shrink-0 text-[#d92d20]" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#b42318]">Some Items Unavailable</span>
                                    <span className="text-sm text-[#b42318]">
                                        The vendor cannot fulfill all requested items. Review the quote below for details.
                                    </span>
                                </div>
                            </div>
                        )}

                        {displayRequest.status === "confirmed" && (
                            <div className="flex items-start gap-3 rounded-lg border border-[#abefc6] bg-[#ecfdf3] p-4">
                                <CheckCircle className="size-5 shrink-0 text-[#067647]" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#067647]">Order Confirmed</span>
                                    <span className="text-sm text-[#067647]">
                                        Your order has been confirmed and is being processed.
                                    </span>
                                </div>
                            </div>
                        )}

                        {displayRequest.status === "rejected" && (
                            <div className="flex items-start gap-3 rounded-lg border border-[#e9eaeb] bg-[#fafafa] p-4">
                                <XCircle className="size-5 shrink-0 text-[#535862]" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#535862]">Quote Rejected</span>
                                    <span className="text-sm text-[#535862]">
                                        You have rejected this quote. You can submit a new request if needed.
                                    </span>
                                </div>
                            </div>
                        )}

                        {displayRequest.status === "expired" && (
                            <div className="flex items-start gap-3 rounded-lg border border-[#e9eaeb] bg-[#fafafa] p-4">
                                <Clock className="size-5 shrink-0 text-[#535862]" />
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-semibold text-[#535862]">Quote Expired</span>
                                    <span className="text-sm text-[#535862]">
                                        This quote was not confirmed or declined within 3 days and has expired. Please submit a new request if you still need these items.
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Devices Card */}
                        <div className="rounded-xl border border-[#e9eaeb] bg-white">
                            {/* Devices Header */}
                            <div className="flex items-center justify-between border-b border-[#e9eaeb] px-3 py-3">
                                <span className="text-sm font-semibold text-[#414651]">Requested Device(s)</span>
                                <span className="rounded-full border border-[#e9eaeb] bg-[#fafafa] px-2 py-0.5 text-xs font-medium text-[#414651]">
                                    {totalQuantity}
                                </span>
                            </div>

                            {/* Device List */}
                            <div className="flex flex-col divide-y divide-[#e9eaeb]">
                                {displayRequest.devices.map((device, index) => {
                                    const deviceTotal = device.unitPrice !== undefined ? device.unitPrice * device.quantity : null;
                                    const isExpanded = expandedDevice === index;
                                    const response = device.vendorResponse;

                                    return (
                                        <div
                                            key={index}
                                            className={cx(
                                                "flex flex-col transition-colors duration-200",
                                                isExpanded ? "bg-[#fafafa]" : "",
                                            )}
                                        >
                                            {/* Device Row - Collapsed */}
                                            <button
                                                type="button"
                                                onClick={() => toggleDevice(index)}
                                                className="flex items-center justify-between p-3 text-left w-full hover:bg-[#fafafa] transition-colors"
                                            >
                                                <div className="flex flex-col gap-1 flex-1 min-w-0 pr-2">
                                                    {/* Device Name + Response Badge */}
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-sm font-semibold text-[#181d27] line-clamp-1">
                                                            {device.name}
                                                        </span>
                                                        <DeviceResponseBadge response={response} />
                                                    </div>
                                                    {/* Quantity & Subtotal */}
                                                    <span className="text-sm text-[#535862]">
                                                        ×{device.quantity}{deviceTotal !== null && ` | Budget: ${formatCurrency(deviceTotal)}`}
                                                    </span>
                                                </div>
                                                <ChevronDown
                                                    className={cx(
                                                        "size-5 text-[#535862] transition-transform duration-200 shrink-0",
                                                        isExpanded && "rotate-180",
                                                    )}
                                                />
                                            </button>

                                            {/* Expanded Device Details */}
                                            {isExpanded && (
                                                <div className="flex flex-col gap-4 px-3 pb-4 animate-in fade-in slide-in-from-top-2 duration-200">
                                                    <div className="h-px bg-[#e9eaeb]" />

                                                    {/* Original Request Details */}
                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-xs font-medium text-[#717680]">Your Budget</span>
                                                            <span className="text-sm font-medium text-[#181d27]">
                                                                {device.unitPrice !== undefined ? formatCurrency(device.unitPrice) : "Not specified"}
                                                            </span>
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-xs font-medium text-[#717680]">Quantity</span>
                                                            <span className="text-sm font-medium text-[#181d27]">{device.quantity}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-xs font-medium text-[#717680]">Asset Type</span>
                                                            <span className="text-sm font-medium text-[#181d27]">{device.assetType}</span>
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <span className="text-xs font-medium text-[#717680]">Budget Subtotal</span>
                                                            <span className="text-sm font-medium text-[#181d27]">
                                                                {deviceTotal !== null ? formatCurrency(deviceTotal) : "—"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Vendor Response Section */}
                                                    {response && (
                                                        <>
                                                            <div className="h-px bg-[#e9eaeb]" />
                                                            <div className="flex flex-col gap-3">
                                                                <span className="text-xs font-semibold uppercase tracking-wide text-[#717680]">
                                                                    Vendor Response
                                                                </span>

                                                                {response.type === "quoted" && response.quotedPrice && (
                                                                    <div className="flex flex-col gap-2 rounded-lg border border-[#abefc6] bg-[#ecfdf3] p-3">
                                                                        <div className="flex items-center justify-between">
                                                                            <span className="text-sm font-medium text-[#067647]">Quoted Price</span>
                                                                            <span className="text-sm font-semibold text-[#067647]">
                                                                                {formatCurrency(response.quotedPrice)} /unit
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center justify-between border-t border-[#abefc6] pt-2">
                                                                            <span className="text-sm font-medium text-[#067647]">Total ({device.quantity} units)</span>
                                                                            <span className="text-sm font-bold text-[#067647]">
                                                                                {formatCurrency(response.quotedPrice * device.quantity)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {response.type === "alternative" && response.alternative && (
                                                                    <div className="flex flex-col gap-2 rounded-lg border border-[#b2ddff] bg-[#eff8ff] p-3">
                                                                        <span className="text-xs font-medium text-[#0948b5]">Suggested Alternative</span>
                                                                        <span className="text-sm font-semibold text-[#0948b5]">
                                                                            {response.alternative.name}
                                                                        </span>
                                                                        {response.alternative.specs && (
                                                                            <span className="text-xs text-[#0948b5]">
                                                                                {response.alternative.specs}
                                                                            </span>
                                                                        )}
                                                                        <div className="flex items-center justify-between border-t border-[#b2ddff] pt-2">
                                                                            <span className="text-sm font-medium text-[#0948b5]">Price ({device.quantity} units)</span>
                                                                            <span className="text-sm font-bold text-[#0948b5]">
                                                                                {formatCurrency(response.alternative.price * device.quantity)}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                )}

                                                                {response.type === "unavailable" && (
                                                                    <div className="flex flex-col gap-1 rounded-lg border border-[#fecdca] bg-[#fef3f2] p-3">
                                                                        <span className="text-sm font-medium text-[#b42318]">Unable to Fulfill</span>
                                                                        {response.unavailableReason && (
                                                                            <span className="text-sm text-[#b42318]">
                                                                                {response.unavailableReason}
                                                                            </span>
                                                                        )}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </>
                                                    )}

                                                    {/* Description */}
                                                    {device.description && (
                                                        <div className="flex flex-col gap-1.5">
                                                            <span className="text-xs font-medium text-[#717680]">Description</span>
                                                            <p className="text-sm text-[#535862] leading-relaxed">
                                                                {device.description}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Budget Totals */}
                            <div className="border-t border-[#e9eaeb] bg-[#fafafa] rounded-b-xl">
                                {budgetResult !== null && (
                                    <div className="flex items-center justify-between px-3 py-2 border-b border-[#e9eaeb]">
                                        <span className="text-sm text-[#535862]">
                                            Your Budget{budgetResult.isPartial && " (partial)"}
                                        </span>
                                        <span className="text-sm font-medium text-[#535862]">
                                            {formatCurrency(budgetResult.total)}
                                        </span>
                                    </div>
                                )}
                                {hasVendorResponse && vendorTotal > 0 && (
                                    <div className="flex items-center justify-between px-3 py-3">
                                        <span className="text-sm font-semibold text-[#181d27]">Vendor Quote Total</span>
                                        <span className="text-sm font-bold text-[#181d27]">
                                            {formatCurrency(vendorTotal)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Request Details Card */}
                        <div className="flex flex-col gap-4 rounded-xl border border-[#e9eaeb] bg-white p-4">
                            <span className="text-sm font-semibold text-[#252b37]">Request Details</span>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-xs font-medium text-[#717680]">Country</span>
                                    <div className="flex items-center gap-1.5">
                                        <CountryFlag country={displayRequest.country} />
                                        <span className="text-sm text-[#535862]">{displayRequest.country}</span>
                                    </div>
                                </div>
                                {displayRequest.createdAt && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-[#717680]">Submitted</span>
                                        <span className="text-sm text-[#535862]">{displayRequest.createdAt}</span>
                                    </div>
                                )}
                                {displayRequest.expiresAt && displayRequest.status === "waiting_for_action" && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-[#717680]">Quote Expires</span>
                                        <span className="text-sm text-[#d92d20] font-medium">{displayRequest.expiresAt}</span>
                                    </div>
                                )}
                                {displayRequest.expiresAt && displayRequest.status === "expired" && (
                                    <div className="flex flex-col gap-1">
                                        <span className="text-xs font-medium text-[#717680]">Expired On</span>
                                        <span className="text-sm text-[#535862]">{displayRequest.expiresAt}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </SlideoutMenu.Content>

                {/* Footer */}
                {displayRequest.status === "waiting_for_action" && (
                    <SlideoutMenu.Footer>
                        <div className="flex gap-3">
                            <Button
                                size="lg"
                                color="secondary"
                                className="flex-1"
                                onClick={() => setShowDeclineModal(true)}
                            >
                                Reject Quote
                            </Button>
                            <Button
                                size="lg"
                                color="primary"
                                className="flex-1"
                                onClick={() => setShowAcceptModal(true)}
                            >
                                Confirm Order
                            </Button>
                        </div>
                    </SlideoutMenu.Footer>
                )}

                {displayRequest.status === "pending" && (
                    <SlideoutMenu.Footer>
                        <Button size="lg" color="secondary" className="w-full" onClick={onClose}>
                            Close
                        </Button>
                    </SlideoutMenu.Footer>
                )}
            </SlideoutMenu>

            {/* Confirm Order Modal */}
            <ModalOverlay
                isOpen={showAcceptModal}
                onOpenChange={setShowAcceptModal}
                isDismissable
            >
                <Modal className="max-w-lg">
                    <Dialog>
                        <div className="flex flex-col gap-5 rounded-xl bg-white p-6 shadow-xl">
                            {/* Header */}
                            <div className="flex items-start gap-4">
                                <FeaturedIcon icon={CheckCircle} color="success" theme="light" size="lg" />
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-semibold text-primary">
                                        Confirm your order
                                    </h3>
                                    <p className="text-sm text-tertiary">
                                        Select the items you want to proceed with. Uncheck any items you don't want to include.
                                    </p>
                                </div>
                            </div>

                            {/* Device Selection List */}
                            <div className="flex max-h-[300px] flex-col divide-y divide-border-secondary overflow-y-auto rounded-lg border border-secondary">
                                {displayRequest.devices.map((device, index) => {
                                    const response = device.vendorResponse;
                                    const isUnavailable = response?.type === "unavailable";
                                    const isSelected = selectedDevices.has(index);

                                    // Get the price for this device
                                    let devicePrice = 0;
                                    let priceLabel = "";
                                    if (response?.type === "quoted" && response.quotedPrice) {
                                        devicePrice = response.quotedPrice * device.quantity;
                                        priceLabel = `${formatCurrency(response.quotedPrice)} × ${device.quantity}`;
                                    } else if (response?.type === "alternative" && response.alternative) {
                                        devicePrice = response.alternative.price * device.quantity;
                                        priceLabel = `${formatCurrency(response.alternative.price)} × ${device.quantity}`;
                                    }

                                    return (
                                        <div
                                            key={index}
                                            className={cx(
                                                "flex items-start gap-3 px-4 py-3 transition duration-100 ease-linear",
                                                isUnavailable
                                                    ? "bg-bg-disabled_subtle opacity-60"
                                                    : isSelected
                                                      ? "bg-bg-brand-primary_alt"
                                                      : "bg-bg-primary hover:bg-bg-primary_hover",
                                            )}
                                        >
                                            <Checkbox
                                                size="sm"
                                                isSelected={isSelected}
                                                isDisabled={isUnavailable}
                                                onChange={() => !isUnavailable && toggleDeviceSelection(index)}
                                                className="mt-0.5"
                                            />
                                            <div className="flex flex-1 flex-col gap-0.5">
                                                <div className="flex flex-wrap items-center gap-1.5">
                                                    <span className={cx(
                                                        "text-sm font-medium",
                                                        isUnavailable ? "text-disabled" : "text-primary"
                                                    )}>
                                                        {device.name}
                                                    </span>
                                                    {response?.type === "alternative" && (
                                                        <Badge size="sm" color="blue">Alternative</Badge>
                                                    )}
                                                    {isUnavailable && (
                                                        <Badge size="sm" color="error">Unavailable</Badge>
                                                    )}
                                                </div>
                                                {response?.type === "alternative" && response.alternative && (
                                                    <span className="text-xs text-tertiary">
                                                        {response.alternative.name}
                                                        {response.alternative.specs && ` · ${response.alternative.specs}`}
                                                    </span>
                                                )}
                                                {isUnavailable && response.unavailableReason && (
                                                    <span className="text-xs text-error-primary">
                                                        {response.unavailableReason}
                                                    </span>
                                                )}
                                            </div>
                                            {!isUnavailable && (
                                                <div className="flex shrink-0 flex-col items-end">
                                                    <span className="text-sm font-semibold text-primary">
                                                        {formatCurrency(devicePrice)}
                                                    </span>
                                                    <span className="text-xs text-tertiary">{priceLabel}</span>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Total */}
                            <div className="flex items-center justify-between border-t border-secondary pt-4">
                                <span className="text-sm font-medium text-tertiary">
                                    Order Total ({selectedDevices.size} item{selectedDevices.size !== 1 ? "s" : ""})
                                </span>
                                <span className="text-lg font-bold text-primary">
                                    {formatCurrency(selectedTotal)}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex w-full gap-3">
                                <Button
                                    size="lg"
                                    color="secondary"
                                    className="flex-1"
                                    onClick={() => setShowAcceptModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="lg"
                                    color="primary"
                                    className="flex-1"
                                    isDisabled={selectedDevices.size === 0}
                                    onClick={() => {
                                        setShowAcceptModal(false);
                                        onAccept(displayRequest.id, selectedDevices.size);
                                    }}
                                >
                                    Confirm Order
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>

            {/* Reject Confirmation Modal */}
            <ModalOverlay
                isOpen={showDeclineModal}
                onOpenChange={setShowDeclineModal}
                isDismissable
            >
                <Modal className="max-w-md">
                    <Dialog>
                        <div className="flex flex-col gap-5 rounded-xl bg-white p-6 shadow-xl">
                            {/* Header */}
                            <div className="flex items-start gap-4">
                                <FeaturedIcon color="error" theme="light">
                                    <XCircle className="size-6" />
                                </FeaturedIcon>
                                <div className="flex flex-col gap-1">
                                    <h3 className="text-lg font-semibold text-[#181d27]">
                                        Reject this quote?
                                    </h3>
                                    <p className="text-sm text-[#535862]">
                                        Please let us know why you're rejecting this quote.
                                    </p>
                                </div>
                            </div>

                            {/* Reject Reason Selection */}
                            <div className="flex flex-col gap-3">
                                <Select
                                    label="Reason for rejecting"
                                    placeholder="Select a reason..."
                                    selectedKey={declineReason || null}
                                    onSelectionChange={(key) => {
                                        setDeclineReason(key as string);
                                        if (key !== "other") {
                                            setOtherReason("");
                                        }
                                    }}
                                    items={[
                                        { id: "price_too_high", label: "Price is too high" },
                                        { id: "found_alternative", label: "Found an alternative" },
                                        { id: "no_longer_needed", label: "No longer needed" },
                                        { id: "other", label: "Other" },
                                    ]}
                                >
                                    {(item) => <Select.Item {...item} />}
                                </Select>

                                {/* Other reason textarea */}
                                {declineReason === "other" && (
                                    <TextArea
                                        value={otherReason}
                                        onChange={(value) => setOtherReason(value)}
                                        placeholder="Please tell us more..."
                                        rows={3}
                                    />
                                )}
                            </div>

                            {/* Actions */}
                            <div className="flex w-full gap-3 pt-2">
                                <Button
                                    size="lg"
                                    color="secondary"
                                    className="flex-1"
                                    onClick={() => {
                                        setShowDeclineModal(false);
                                        setDeclineReason("");
                                        setOtherReason("");
                                    }}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="lg"
                                    color="primary-destructive"
                                    className="flex-1"
                                    isDisabled={!declineReason || (declineReason === "other" && !otherReason.trim())}
                                    onClick={() => {
                                        setShowDeclineModal(false);
                                        onDecline(displayRequest.id);
                                        setDeclineReason("");
                                        setOtherReason("");
                                    }}
                                >
                                    Reject Quote
                                </Button>
                            </div>
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </>
    );
}

// ---------------------------------------------------------------------------
// Success Toast (Order Confirmed)
// ---------------------------------------------------------------------------

function SuccessToast({
    isVisible,
    onDismiss,
    message,
}: {
    isVisible: boolean;
    onDismiss: () => void;
    message: string;
}) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onDismiss]);

    return (
        <div
            className={cx(
                "fixed inset-x-4 top-4 z-[100] transition-all duration-300 ease-out md:inset-x-auto md:right-6 md:top-6 md:w-[400px]",
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 pointer-events-none opacity-0",
            )}
        >
            <div className="relative overflow-hidden rounded-xl border border-[#d5d7da] bg-white p-4 shadow-lg">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onDismiss}
                    className="absolute right-2 top-2 rounded-lg p-2 hover:bg-[#fafafa]"
                >
                    <XClose className="size-5 text-[#535862]" />
                </button>

                <div className="flex gap-4 pr-8">
                    {/* Success icon with rings */}
                    <div className="relative size-5 shrink-0">
                        <div className="absolute -inset-[20%] rounded-full border-2 border-[#079455] opacity-30 animate-in zoom-in-50 duration-500" />
                        <div className="absolute -inset-[45%] rounded-full border-2 border-[#079455] opacity-10 animate-in zoom-in-0 duration-700" />
                        <CheckCircle className="relative size-5 text-[#079455] animate-in zoom-in-50 duration-300" />
                    </div>

                    <div className="flex flex-1 flex-col gap-3 pt-0.5">
                        {/* Text */}
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-[#181d27]">
                                Order confirmed
                            </p>
                            <p className="text-sm text-[#414651]">
                                {message}
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onDismiss}
                                className="text-sm font-semibold text-[#535862] hover:text-[#414651]"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Error Toast (Quote Rejected)
// ---------------------------------------------------------------------------

function ErrorToast({
    isVisible,
    onDismiss,
}: {
    isVisible: boolean;
    onDismiss: () => void;
}) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onDismiss();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onDismiss]);

    return (
        <div
            className={cx(
                "fixed inset-x-4 top-4 z-[100] transition-all duration-300 ease-out md:inset-x-auto md:right-6 md:top-6 md:w-[400px]",
                isVisible
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-4 pointer-events-none opacity-0",
            )}
        >
            <div className="relative overflow-hidden rounded-xl border border-[#d5d7da] bg-white p-4 shadow-lg">
                {/* Close button */}
                <button
                    type="button"
                    onClick={onDismiss}
                    className="absolute right-2 top-2 rounded-lg p-2 hover:bg-[#fafafa]"
                >
                    <XClose className="size-5 text-[#535862]" />
                </button>

                <div className="flex gap-4 pr-8">
                    {/* Error icon with rings */}
                    <div className="relative size-5 shrink-0">
                        <div className="absolute -inset-[20%] rounded-full border-2 border-[#d92d20] opacity-30 animate-in zoom-in-50 duration-500" />
                        <div className="absolute -inset-[45%] rounded-full border-2 border-[#d92d20] opacity-10 animate-in zoom-in-0 duration-700" />
                        <XCircle className="relative size-5 text-[#d92d20] animate-in zoom-in-50 duration-300" />
                    </div>

                    <div className="flex flex-1 flex-col gap-3 pt-0.5">
                        {/* Text */}
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-semibold text-[#181d27]">
                                Quote rejected
                            </p>
                            <p className="text-sm text-[#414651]">
                                You have rejected this quote.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onDismiss}
                                className="text-sm font-semibold text-[#535862] hover:text-[#414651]"
                            >
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Empty Orders Table
// ---------------------------------------------------------------------------

function EmptyOrdersTable() {
    return (
        <TableCard.Root>
            <div className="flex items-center justify-center overflow-hidden px-8 py-24">
                <EmptyState size="sm">
                    <EmptyState.Header pattern="circle">
                        <EmptyState.FeaturedIcon color="gray" theme="modern-neue" />
                    </EmptyState.Header>

                    <EmptyState.Content>
                        <EmptyState.Title>No orders yet</EmptyState.Title>
                        <EmptyState.Description>
                            When you place orders, they will appear here. Start by browsing the marketplace or creating a custom device request.
                        </EmptyState.Description>
                    </EmptyState.Content>

                    <EmptyState.Footer>
                        <Button size="md" color="primary" href="/onboard-device">
                            Browse Marketplace
                        </Button>
                    </EmptyState.Footer>
                </EmptyState>
            </div>
        </TableCard.Root>
    );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

export default function OrdersPage() {
    const [activeTab, setActiveTab] = useState<"orders" | "custom_device_requests">("custom_device_requests");

    return (
        <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
            <HeaderNavigation />

            <main className="flex flex-1 flex-col gap-6 pb-12 pt-8 sm:gap-8 sm:pb-24 sm:pt-12">
                <PageHeader />

                {/* Content */}
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    {/* Tabs */}
                    <div className="mb-6">
                        <Tabs
                            selectedKey={activeTab}
                            onSelectionChange={(key: React.Key) => setActiveTab(key as "orders" | "custom_device_requests")}
                        >
                            <Tabs.List type="underline" items={[]}>
                                <Tabs.Item key="orders" id="orders">
                                    Orders
                                </Tabs.Item>
                                <Tabs.Item key="custom_device_requests" id="custom_device_requests">
                                    Custom Device Requests
                                </Tabs.Item>
                            </Tabs.List>
                        </Tabs>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "orders" ? (
                        <EmptyOrdersTable />
                    ) : (
                        <CustomDeviceRequestsTable />
                    )}
                </div>
            </main>
        </div>
    );
}
