"use client";

import { Suspense, useCallback, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
    CheckCircle,
    ChevronDown,
    ChevronRight,
    Container,
    HelpCircle,
    Headphones01,
    HomeLine,
    Keyboard01,
    Laptop01,
    LayersTwo01,
    Lightning01,
    LogOut01,
    Menu01,
    MessageSmileCircle,
    Monitor01,
    Mouse,
    Phone01,
    Plus,
    RefreshCw03,
    SearchLg,
    Settings01,
    ShoppingCart01,
    Tablet01,
    Trash03,
    User01,
    UserPlus01,
    Users01,
    VideoRecorder,
    XClose,
    Zap,
} from "@untitledui/icons";
import { today, getLocalTimeZone } from "@internationalized/date";
import type { DateValue } from "react-aria-components";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Dialog, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { DateRangePicker } from "@/components/application/date-picker/date-range-picker";
import { Input } from "@/components/base/input/input";
import { Select, type SelectItemType } from "@/components/base/select/select";
import { Slider } from "@/components/base/slider/slider";
import { TextArea } from "@/components/base/textarea/textarea";
import { PaginationPageMinimalCenter } from "@/components/application/pagination/pagination";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const navItems = [
    { label: "Overview", href: "#" },
    { label: "Orders", href: "#" },
    { label: "Marketplace", href: "#", current: true },
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
            { label: "Keyboard shortcuts", icon: Zap, shortcut: "?" },
        ],
    },
    {
        items: [
            { label: "Company profile", icon: HomeLine, shortcut: "⌘K→C" },
            { label: "Team", icon: Users01, shortcut: "⌘K→T" },
            { label: "Invite colleagues", icon: UserPlus01, shortcut: "⌘I" },
        ],
    },
    {
        items: [
            { label: "Changelog", icon: LayersTwo01, shortcut: "⌘K→C" },
            { label: "Slack Community", icon: MessageSmileCircle, shortcut: "⌘K→S" },
            { label: "Support", icon: HelpCircle, shortcut: "⌘/" },
            { label: "API", icon: Container, shortcut: "⌘A" },
        ],
    },
    {
        items: [{ label: "Log out", icon: LogOut01, shortcut: "⌥⇧Q" }],
    },
];

const typeFilters = ["Accessories", "Computers", "Monitors", "Office Chair", "Phones", "Tablets", "Work Desk"];
const assetStateFilters = ["Brand New", "Refurbished", "Used"];
const hardDriveFilters = ["256GB", "512GB", "1024GB"];
const ramFilters = ["8GB", "16GB"];
const osFilters = ["Windows Home", "Windows Pro", "MAC OS"];

const assetTypes: SelectItemType[] = [
    { id: "laptop", label: "Laptop" },
    { id: "monitors", label: "Monitors" },
    { id: "headphones", label: "Headphones" },
    { id: "chargers", label: "Chargers" },
    { id: "keyboard", label: "Keyboard" },
    { id: "mouse", label: "Mouse" },
    { id: "webcam", label: "Webcam" },
    { id: "phone", label: "Phone" },
    { id: "tablet", label: "Tablet" },
    { id: "earpods", label: "Earpods" },
    { id: "other", label: "Other" },
];

// Icon mapping for asset types
const assetTypeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    laptop: Laptop01,
    monitors: Monitor01,
    headphones: Headphones01,
    chargers: Lightning01,
    keyboard: Keyboard01,
    mouse: Mouse,
    webcam: VideoRecorder,
    phone: Phone01,
    tablet: Tablet01,
    earpods: Headphones01,
    other: Container,
};

// Device image mapping based on asset type
const deviceImages: Record<string, string[]> = {
    laptop: [
        "/devices/laptops/macbook.png",
        "/devices/laptops/hp.png",
        "/devices/laptops/dell.png",
        "/devices/laptops/lenovo.png",
        "/devices/laptops/asus.png",
    ],
    monitors: [
        "/devices/monitors/dell.png",
        "/devices/monitors/samsung.png",
        "/devices/monitors/lg.png",
        "/devices/monitors/benq.png",
        "/devices/monitors/acer.png",
    ],
    headphones: [
        "/devices/accessories/headphones/sony.png",
        "/devices/accessories/headphones/sony-beige.png",
        "/devices/accessories/headphones/logitech.png",
        "/devices/accessories/headphones/jabra.png",
        "/devices/accessories/headphones/epos.png",
        "/devices/accessories/headphones/plantronics.png",
    ],
    mouse: [
        "/devices/accessories/mice/logitech-mx.png",
        "/devices/accessories/mice/logitech-g.png",
        "/devices/accessories/mice/microsoft.png",
        "/devices/accessories/mice/hp.png",
        "/devices/accessories/mice/dell.png",
        "/devices/accessories/mice/lenovo.png",
    ],
    phone: [
        "/devices/phones/iphone.png",
        "/devices/phones/samsung.png",
        "/devices/phones/google-pixel.png",
        "/devices/phones/oneplus.png",
        "/devices/phones/xiaomi.png",
    ],
    tablet: [
        "/devices/tablets/ipad.png",
        "/devices/tablets/samsung.png",
        "/devices/tablets/microsoft.png",
        "/devices/tablets/lenovo.png",
        "/devices/tablets/huawei.png",
    ],
    earpods: [
        "/devices/accessories/earpods/airpods-pro.png",
        "/devices/accessories/earpods/airpods.png",
        "/devices/accessories/earpods/jabra.png",
        "/devices/accessories/earpods/bo.png",
    ],
    chargers: [
        "/devices/accessories/chargers/anker.png",
    ],
};

function getDeviceImage(assetType: string | null, deviceId: string): string | null {
    if (!assetType || !deviceImages[assetType]) return null;
    const images = deviceImages[assetType];
    // Use device ID to consistently pick an image
    const index = parseInt(deviceId, 10) % images.length;
    return images[index];
}

interface DeviceEntry {
    id: string;
    deviceName: string;
    assetType: string | null;
    quantity: string;
    budgetPrice: string;
    description: string;
}

function createEmptyDevice(id: string): DeviceEntry {
    return { id, deviceName: "", assetType: null, quantity: "", budgetPrice: "", description: "" };
}

function isDeviceFilled(device: DeviceEntry): boolean {
    return (
        device.deviceName.trim() !== "" &&
        device.assetType !== null &&
        device.quantity.trim() !== "" &&
        device.description.trim() !== ""
    );
}

const minDeliveryDate = today(getLocalTimeZone()).add({ days: 2 });

function isWeekendDay(date: DateValue) {
    const d = date.toDate(getLocalTimeZone());
    const day = d.getDay();
    return day === 0 || day === 6;
}

interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    badge?: { label: string; color: "purple" | "fuchsia" };
}

const products: Product[] = [
    {
        id: "1",
        name: 'Apple MacBook Air 13" M1 Chip 8GB 256GB 2020 Model - Gray',
        price: "$95,000",
        image: "/devices/laptops/macbook.png",
    },
    {
        id: "2",
        name: "Samsung Galaxy S24 - 256GB, 5G LTE, Green (Refurbished)",
        price: "$12,999",
        image: "/devices/phones/samsung.png",
        badge: { label: "Refurbished", color: "purple" },
    },
    {
        id: "3",
        name: "Dell UltraSharp 27\" 4K USB-C Monitor",
        price: "$9,000",
        image: "/devices/monitors/dell.png",
    },
    {
        id: "4",
        name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        price: "$21,900",
        image: "/devices/accessories/headphones/sony.png",
        badge: { label: "Used", color: "fuchsia" },
    },
    {
        id: "5",
        name: "Apple AirPods Pro (2nd Generation) with MagSafe Case",
        price: "$2,000",
        image: "/devices/accessories/earpods/airpods-pro.png",
    },
    {
        id: "6",
        name: "Logitech MX Master 3S Wireless Performance Mouse",
        price: "$5,900",
        image: "/devices/accessories/mice/logitech-mx.png",
    },
];

// ---------------------------------------------------------------------------
// Header Navigation (reused from onboard-device page)
// ---------------------------------------------------------------------------

function HeaderNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative w-full border-b border-[#475467] bg-[#101828]">
            <div className="mx-auto flex h-[72px] w-full items-center justify-between page-px">
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

            {mobileMenuOpen && (
                <div className="absolute inset-x-0 top-[72px] z-50 border-b border-[#475467] bg-[#101828] lg:hidden">
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
                        <div className="my-3 h-px bg-[#475467]" />
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

function MarketplacePageHeader({ countryName }: { countryName: string }) {
    return (
        <div className="w-full page-px">
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold leading-[32px] text-[#101828]">
                        Marketplace
                    </h1>
                    <p className="text-base leading-6 text-[#475467]">
                        Select items for this catalogs
                    </p>
                </div>
                <div className="h-px w-full bg-border-secondary" />
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 sm:gap-3">
                <a href="#" className="text-[#667085] transition hover:text-[#344054]">
                    <HomeLine className="size-5" />
                </a>
                <ChevronRight className="size-4 text-[#d0d5dd]" />
                <a href="#" className="text-sm font-medium text-[#475467] transition hover:text-[#344054]">
                    Overview
                </a>
                <ChevronRight className="size-4 text-[#d0d5dd]" />
                <span className="text-sm font-semibold text-[#003999]">
                    Marketplace - {countryName}
                </span>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Filter Section
// ---------------------------------------------------------------------------

function FilterSection({
    title,
    children,
    defaultOpen = true,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="flex flex-col gap-4">
            <button
                type="button"
                className="flex w-full items-center justify-between px-3.5 py-2.5"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-lg font-semibold text-[#101828]">{title}</span>
                <ChevronDown
                    className={cx(
                        "size-5 text-[#667085] transition-transform duration-200",
                        isOpen && "rotate-180",
                    )}
                />
            </button>
            {isOpen && <div className="flex flex-col gap-1 px-3.5">{children}</div>}
        </div>
    );
}

function CheckboxFilterItem({ label }: { label: string }) {
    return (
        <div className="py-2">
            <Checkbox size="md" label={label} />
        </div>
    );
}

function FilterSidebarContent() {
    return (
        <div className="flex flex-col gap-2">
            {/* Filter header */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg font-semibold leading-7 text-[#101828]">Filter</h2>
                    <p className="text-sm text-[#475467]">Find the right hardware for your team</p>
                </div>
                <div className="h-px w-full bg-border-secondary" />
            </div>

            {/* Price filter */}
            <div className="flex flex-col gap-4">
                <div className="px-3.5 py-2.5">
                    <span className="text-lg font-semibold text-[#101828]">Price</span>
                </div>
                <div className="flex flex-col gap-2.5 px-3.5">
                    <div className="flex gap-6">
                        <div className="flex flex-1 flex-col gap-1.5">
                            <label className="text-sm font-medium text-[#344054]">From</label>
                            <div className="flex items-center rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 shadow-xs">
                                <span className="text-base text-[#475467]">₦</span>
                                <input
                                    type="text"
                                    defaultValue="1,000.00"
                                    className="ml-2 w-full bg-transparent text-base text-[#667085] outline-none"
                                />
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-1.5">
                            <label className="text-sm font-medium text-[#344054]">To</label>
                            <div className="flex items-center rounded-lg border border-[#d0d5dd] bg-white px-3 py-2 shadow-xs">
                                <span className="text-base text-[#475467]">₦</span>
                                <input
                                    type="text"
                                    defaultValue="1,000,000.00"
                                    className="ml-2 w-full bg-transparent text-base text-[#667085] outline-none"
                                />
                            </div>
                        </div>
                    </div>
                    <Slider
                        defaultValue={[0, 75]}
                        minValue={0}
                        maxValue={100}
                    />
                </div>
            </div>
            <div className="h-px w-full bg-border-secondary" />

            {/* Type filter */}
            <FilterSection title="Type">
                {typeFilters.map((filter) => (
                    <CheckboxFilterItem key={filter} label={filter} />
                ))}
            </FilterSection>
            <div className="h-px w-full bg-border-secondary" />

            {/* Asset State filter */}
            <FilterSection title="Asset State">
                {assetStateFilters.map((filter) => (
                    <CheckboxFilterItem key={filter} label={filter} />
                ))}
            </FilterSection>
            <div className="h-px w-full bg-border-secondary" />

            {/* Hard Drive filter */}
            <FilterSection title="Hard Drive">
                {hardDriveFilters.map((filter) => (
                    <CheckboxFilterItem key={filter} label={filter} />
                ))}
            </FilterSection>
            <div className="h-px w-full bg-border-secondary" />

            {/* RAM filter */}
            <FilterSection title="RAM">
                {ramFilters.map((filter) => (
                    <CheckboxFilterItem key={filter} label={filter} />
                ))}
            </FilterSection>
            <div className="h-px w-full bg-border-secondary" />

            {/* OS filter */}
            <FilterSection title="OS">
                {osFilters.map((filter) => (
                    <CheckboxFilterItem key={filter} label={filter} />
                ))}
            </FilterSection>
            <div className="h-px w-full bg-border-secondary" />

            {/* Actions */}
            <div className="flex items-start gap-6 pt-4">
                <Button size="lg" className="flex-1">
                    Apply Filter
                </Button>
                <button
                    type="button"
                    className="flex size-12 items-center justify-center rounded-full border border-[#d0d5dd] bg-white shadow-xs transition hover:bg-gray-50"
                >
                    <Trash03 className="size-5 text-[#344054]" />
                </button>
            </div>
        </div>
    );
}

function FilterSidebar() {
    return (
        <aside className="hidden w-[280px] shrink-0 flex-col gap-2 lg:flex xl:w-[348px]">
            <FilterSidebarContent />
        </aside>
    );
}

// ---------------------------------------------------------------------------
// Product Card
// ---------------------------------------------------------------------------

function ProductBadge({ label, color }: { label: string; color: "purple" | "fuchsia" }) {
    const colors = {
        purple: "bg-[#f4f3ff] text-[#4a1fb8]",
        fuchsia: "bg-[#fdf4ff] text-[#821890]",
    };

    return (
        <div
            className={cx(
                "absolute inset-x-0 bottom-0 flex items-center justify-center rounded-b-2xl py-1 text-sm font-medium",
                colors[color],
            )}
        >
            {label}
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    return (
        <div className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#eaecf0] bg-white p-4">
            {/* Image */}
            <div className="relative aspect-[222/156] w-full overflow-hidden rounded-2xl bg-[#f2f4f7]">
                <img
                    src={product.image}
                    alt={product.name}
                    className="size-full object-cover"
                />
                {product.badge && (
                    <ProductBadge label={product.badge.label} color={product.badge.color} />
                )}
            </div>

            {/* Bottom content */}
            <div className="flex flex-col gap-4">
                <p className="text-sm font-semibold leading-5 text-[#101828]">
                    {product.name}
                </p>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-[#98a2b3]">Price</span>
                        <span className="text-lg font-semibold text-[#101828]">
                            {product.price}
                        </span>
                    </div>
                    <Button size="sm">Add to cart</Button>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Custom Device Request Modal
// ---------------------------------------------------------------------------

function DeleteConfirmDialog({
    isOpen,
    onConfirm,
    onCancel,
    skipConfirm,
    onSkipConfirmChange,
}: {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
    skipConfirm: boolean;
    onSkipConfirmChange: (value: boolean) => void;
}) {
    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={(open) => { if (!open) onCancel(); }}>
            <Modal className="max-w-[400px]">
                <Dialog>
                    <div className="flex w-full flex-col rounded-xl bg-white p-6 shadow-xl">
                        <h3 className="text-lg font-semibold text-[#101828]">Delete device?</h3>
                        <p className="mt-2 text-sm text-[#475467]">
                            Are you sure you want to remove this device entry? This action cannot be undone.
                        </p>
                        <div className="mt-4">
                            <Checkbox
                                size="sm"
                                label="Don't ask again"
                                isSelected={skipConfirm}
                                onChange={(val) => onSkipConfirmChange(val)}
                            />
                        </div>
                        <div className="mt-6 flex justify-end gap-3">
                            <Button color="secondary" size="md" onClick={onCancel}>
                                Cancel
                            </Button>
                            <Button
                                color="primary-destructive"
                                size="md"
                                onClick={onConfirm}
                            >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

function DeviceEntrySection({
    device,
    index,
    totalDevices,
    onChange,
    onDelete,
}: {
    device: DeviceEntry;
    index: number;
    totalDevices: number;
    onChange: (updated: DeviceEntry) => void;
    onDelete: () => void;
}) {
    const [isOpen, setIsOpen] = useState(true);
    const AssetIcon = device.assetType ? assetTypeIcons[device.assetType] : null;

    return (
        <div className="rounded-lg border border-[#eaecf0]">
            {/* Device header */}
            <div className="flex items-center justify-between border-b border-[#eaecf0] px-4 py-3">
                <button
                    type="button"
                    className="flex flex-1 items-center gap-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/* Device icon thumbnail */}
                    {AssetIcon && (
                        <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-[#f2f4f7]">
                            <AssetIcon className="size-4 text-[#667085]" />
                        </div>
                    )}
                    <span className="text-sm font-semibold text-[#101828]">
                        <span className="sm:hidden">
                            Device {index + 1}{device.deviceName.trim() ? ` - ${device.deviceName.trim().length > 16 ? `${device.deviceName.trim().slice(0, 16)}...` : device.deviceName.trim()}` : ""}
                        </span>
                        <span className="hidden sm:inline">
                            Device {index + 1}{device.deviceName.trim() ? ` - ${device.deviceName.trim().length > 24 ? `${device.deviceName.trim().slice(0, 24)}...` : device.deviceName.trim()}` : ""}
                        </span>
                    </span>
                    <ChevronDown
                        className={cx(
                            "size-4 text-[#667085] transition-transform duration-200",
                            isOpen && "rotate-180",
                        )}
                    />
                </button>
                <button
                    type="button"
                    disabled={totalDevices <= 1}
                    onClick={onDelete}
                    className={cx(
                        "rounded-md p-1.5 transition",
                        totalDevices <= 1
                            ? "cursor-not-allowed text-[#d0d5dd]"
                            : "text-[#667085] hover:bg-[#f9fafb] hover:text-[#475467]",
                    )}
                    aria-label={`Delete device ${index + 1}`}
                >
                    <Trash03 className="size-4" />
                </button>
            </div>

            {/* Collapsed subtotal */}
            {!isOpen && (
                <div className="flex items-center justify-between px-4 py-2 text-sm text-[#475467]">
                    <span>Subtotal</span>
                    {device.budgetPrice && device.quantity ? (
                        <span>
                            {parseInt(device.budgetPrice, 10).toLocaleString()} × {device.quantity} ={" "}
                            <span className="font-semibold text-[#101828]">
                                {(parseInt(device.budgetPrice, 10) * parseInt(device.quantity, 10)).toLocaleString()}
                            </span>
                        </span>
                    ) : (
                        <span className="italic">No budget added</span>
                    )}
                </div>
            )}

            {/* Device fields */}
            {isOpen && (
                <div className="flex flex-col gap-4 p-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                            label="Device Name"
                            placeholder="e.g., MacBook Pro M3"
                            size="sm"
                            isRequired
                            value={device.deviceName}
                            onChange={(val) => onChange({ ...device, deviceName: val })}
                        />
                        <Select
                            items={assetTypes}
                            label="Asset Type"
                            placeholder="Select asset type"
                            size="sm"
                            isRequired
                            selectedKey={device.assetType}
                            onSelectionChange={(key) =>
                                onChange({ ...device, assetType: key as string })
                            }
                        >
                            {(item) => (
                                <Select.Item key={item.id} {...item}>
                                    {item.label}
                                </Select.Item>
                            )}
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Input
                            label="Quantity"
                            placeholder="e.g., 5"
                            size="sm"
                            isRequired
                            inputMode="numeric"
                            value={device.quantity}
                            onChange={(val) => onChange({ ...device, quantity: val.replace(/\D/g, "") })}
                        />
                        <Input
                            label="Budget"
                            placeholder="e.g., 2500"
                            size="sm"
                            inputMode="numeric"
                            value={device.budgetPrice}
                            onChange={(val) => onChange({ ...device, budgetPrice: val.replace(/\D/g, "") })}
                        />
                    </div>
                    <TextArea
                        label="Description"
                        placeholder="Describe the device specifications and requirements..."
                        rows={3}
                        isRequired
                        value={device.description}
                        onChange={(val) => onChange({ ...device, description: val })}
                    />
                    {/* Subtotal */}
                    {device.budgetPrice && device.quantity && (
                        <div className="flex items-center justify-between rounded-lg bg-[#f9fafb] px-3 py-2 text-sm">
                            <span className="text-[#475467]">Subtotal</span>
                            <span className="text-[#475467]">
                                {parseInt(device.budgetPrice, 10).toLocaleString()} × {device.quantity} ={" "}
                                <span className="font-semibold text-[#101828]">
                                    {(parseInt(device.budgetPrice, 10) * parseInt(device.quantity, 10)).toLocaleString()}
                                </span>
                            </span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function CustomDeviceRequestModal({
    isOpen,
    onOpenChange,
}: {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
}) {
    const [devices, setDevices] = useState<DeviceEntry[]>([createEmptyDevice("1")]);
    const [nextId, setNextId] = useState(2);
    const [submitted, setSubmitted] = useState(false);

    // Delete confirmation
    const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
    const [skipDeleteConfirm, setSkipDeleteConfirm] = useState(false);

    const handleAddDevice = useCallback(() => {
        setDevices((prev) => [...prev, createEmptyDevice(String(nextId))]);
        setNextId((prev) => prev + 1);
    }, [nextId]);

    const handleUpdateDevice = useCallback((id: string, updated: DeviceEntry) => {
        setDevices((prev) => prev.map((d) => (d.id === id ? updated : d)));
    }, []);

    const handleRequestDelete = useCallback(
        (id: string) => {
            if (skipDeleteConfirm) {
                setDevices((prev) => prev.filter((d) => d.id !== id));
            } else {
                setDeleteTargetId(id);
            }
        },
        [skipDeleteConfirm],
    );

    const handleConfirmDelete = useCallback(() => {
        if (deleteTargetId) {
            setDevices((prev) => prev.filter((d) => d.id !== deleteTargetId));
            setDeleteTargetId(null);
        }
    }, [deleteTargetId]);

    const isFormValid = devices.every(isDeviceFilled);

    // Calculate total budget
    const totalBudget = devices.reduce((sum, device) => {
        const budget = parseInt(device.budgetPrice, 10) || 0;
        const quantity = parseInt(device.quantity, 10) || 0;
        return sum + budget * quantity;
    }, 0);

    const resetForm = () => {
        setDevices([createEmptyDevice("1")]);
        setNextId(2);
        setSubmitted(false);
    };

    const handleSubmit = () => {
        if (!isFormValid) return;
        // In a real app, submit the form data here
        setSubmitted(true);
    };

    const handleClose = () => {
        onOpenChange(false);
        resetForm();
    };

    return (
        <>
            <ModalOverlay isOpen={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
                <Modal className="max-w-[560px]">
                    <Dialog>
                        {({ close }) =>
                            submitted ? (
                                <div className="flex w-full flex-col items-center rounded-xl bg-white px-6 py-8 shadow-xl sm:px-10 sm:py-10">
                                    <div className="flex size-12 items-center justify-center rounded-full bg-[#d1fadf]">
                                        <CheckCircle className="size-6 text-[#039855]" />
                                    </div>
                                    <h2 className="mt-4 text-center text-lg font-semibold text-[#101828]">
                                        Request Submitted Successfully!
                                    </h2>
                                    <p className="mt-2 text-center text-sm text-[#475467]">
                                        Thank you for submitting your custom device request. Our team has received your
                                        specifications and will review them carefully.
                                    </p>
                                    <div className="mt-5 w-full rounded-lg bg-[#f9fafb] px-4 py-3">
                                        <p className="text-sm font-semibold text-[#344054]">Expected Response Time</p>
                                        <p className="mt-1 text-sm text-[#475467]">
                                            You can expect to hear from us within 2-3 working days with a quote and next steps.
                                        </p>
                                    </div>
                                    <div className="mt-8 flex w-full gap-3">
                                        <Button color="secondary" size="lg" className="flex-1" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button size="lg" className="flex-1" href="/orders">
                                            View requests
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex w-full flex-col rounded-xl bg-white shadow-xl">
                                    {/* Header */}
                                    <div className="flex items-start justify-between px-6 pt-6">
                                        <div className="flex flex-col gap-1">
                                            <h2 className="text-lg font-semibold text-[#101828]">
                                                Custom Device Request
                                            </h2>
                                            <p className="text-sm text-[#475467]">
                                                Add custom device requests with specifications and requirements.
                                            </p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={close}
                                            className="rounded-md p-1 text-[#667085] transition hover:text-[#101828]"
                                        >
                                            <XClose className="size-5" />
                                        </button>
                                    </div>

                                    {/* Body */}
                                    <div className="flex max-h-[60vh] flex-col gap-5 overflow-y-auto px-6 pt-5 pb-6">
                                        {/* Device entries */}
                                        <div className="flex flex-col gap-4">
                                            {devices.map((device, index) => (
                                                <DeviceEntrySection
                                                    key={device.id}
                                                    device={device}
                                                    index={index}
                                                    totalDevices={devices.length}
                                                    onChange={(updated) =>
                                                        handleUpdateDevice(device.id, updated)
                                                    }
                                                    onDelete={() => handleRequestDelete(device.id)}
                                                />
                                            ))}
                                        </div>

                                        {/* Add another device */}
                                        <button
                                            type="button"
                                            onClick={handleAddDevice}
                                            className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#d0d5dd] px-4 py-3 text-sm font-semibold text-[#344054] transition hover:bg-[#f9fafb]"
                                        >
                                            <Plus className="size-4" />
                                            Add Another Device
                                        </button>
                                    </div>

                                    {/* Footer */}
                                    <div className="flex flex-col gap-4 border-t border-[#eaecf0] px-6 py-4">
                                        {totalBudget > 0 && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium text-[#344054]">Total Budget</span>
                                                <span className="text-lg font-semibold text-[#101828]">
                                                    {totalBudget.toLocaleString()}
                                                </span>
                                            </div>
                                        )}
                                        <div className="flex items-center justify-end gap-3">
                                            <Button color="secondary" size="md" onClick={close}>
                                                Cancel
                                            </Button>
                                            <Button
                                                size="md"
                                                isDisabled={!isFormValid}
                                                onClick={handleSubmit}
                                            >
                                                Submit Request
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    </Dialog>
                </Modal>
            </ModalOverlay>

            <DeleteConfirmDialog
                isOpen={deleteTargetId !== null}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteTargetId(null)}
                skipConfirm={skipDeleteConfirm}
                onSkipConfirmChange={setSkipDeleteConfirm}
            />
        </>
    );
}

// ---------------------------------------------------------------------------
// Product Grid
// ---------------------------------------------------------------------------

function ProductGrid() {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [isCustomRequestOpen, setIsCustomRequestOpen] = useState(false);

    return (
        <div className="flex min-w-0 flex-1 flex-col gap-6">
            {/* Search bar and action buttons */}
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <div className="flex-1">
                        <Input
                            icon={SearchLg}
                            placeholder="Search"
                            size="md"
                        />
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Button
                            color="secondary"
                            size="lg"
                            iconTrailing={RefreshCw03}
                            onClick={() => router.back()}
                        >
                            Change Country
                        </Button>
                        <Button
                            size="lg"
                            onClick={() => setIsCustomRequestOpen(true)}
                        >
                            Custom device request
                        </Button>
                    </div>
                </div>
                <div className="h-px w-full bg-border-secondary" />
            </div>

            {/* Product cards grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            <PaginationPageMinimalCenter
                page={page}
                total={10}
                onPageChange={setPage}
            />

            {/* Custom Device Request Modal */}
            <CustomDeviceRequestModal
                isOpen={isCustomRequestOpen}
                onOpenChange={setIsCustomRequestOpen}
            />
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

function MobileFilterDrawer({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="absolute inset-y-0 left-0 flex w-full max-w-[340px] flex-col bg-[#fcfcfd]">
                <div className="flex items-center justify-between border-b border-[#eaecf0] px-4 py-4">
                    <h2 className="text-lg font-semibold text-[#101828]">Filters</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md p-1 text-[#667085] transition hover:text-[#101828]"
                    >
                        <XClose className="size-5" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4">
                    <FilterSidebarContent />
                </div>
            </div>
        </div>
    );
}

function MarketplacePageContent() {
    const searchParams = useSearchParams();
    const countryName = searchParams.get("country") || "United States";
    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    return (
        <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
            <HeaderNavigation />

            <main className="flex flex-1 flex-col gap-6 pb-12 pt-8 sm:gap-8 sm:pb-24 sm:pt-12">
                <MarketplacePageHeader countryName={countryName} />

                <div className="w-full page-px">
                    {/* Mobile filter toggle */}
                    <div className="mb-4 lg:hidden">
                        <Button
                            color="secondary"
                            size="md"
                            onClick={() => setMobileFilterOpen(true)}
                        >
                            Filters
                        </Button>
                    </div>

                    <div className="flex gap-8">
                        <FilterSidebar />
                        <div className="hidden w-px self-stretch bg-border-secondary lg:block" />
                        <ProductGrid />
                    </div>
                </div>
            </main>

            <MobileFilterDrawer
                isOpen={mobileFilterOpen}
                onClose={() => setMobileFilterOpen(false)}
            />
        </div>
    );
}

export default function MarketplacePage() {
    return (
        <Suspense>
            <MarketplacePageContent />
        </Suspense>
    );
}
