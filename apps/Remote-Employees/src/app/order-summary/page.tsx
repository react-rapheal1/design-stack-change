"use client";

import { useEffect, useState, type ComponentType } from "react";
import { useRouter } from "next/navigation";
import {
    AlertTriangle,
    Bell02,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    Container,
    Edit05,
    HelpCircle,
    HomeLine,
    InfoOctagon,
    LayersTwo01,
    LogOut01,
    Menu01,
    MessageSmileCircle,
    Settings01,
    User01,
    UserPlus01,
    Users01,
    XClose,
    Zap,
} from "@untitledui/icons";
import { FlagGb, FlagNg, FlagUs, FlagCa, FlagDe, FlagFr, FlagAu } from "@untitledui/country-flags";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Select, type SelectItemType } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { TextArea } from "@/components/base/textarea/textarea";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { CloseButton } from "@/components/base/buttons/close-button";
import { SlideoutMenu } from "@/components/application/slideout-menus/slideout-menu";
import { FloatingAlert } from "@/components/application/alerts/floating-alert";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { saveProfileUpdate } from "@/utils/profile-store";
import { saveNotifications, ORDER_CONFIRMED_NOTIFICATIONS } from "@/utils/notification-store";
import { cx } from "@/utils/cx";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const navItems = [
    { label: "Overview", href: "#" },
    { label: "Orders", href: "#" },
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

const equipmentItems = [
    {
        id: "1",
        name: 'Apple MacBook Air 13" M1 Chip 8GB 256GB 2020 Model - Gray',
        image: "/devices/laptops/macbook.png",
    },
    {
        id: "2",
        name: "DELL Alienware X14 Core\u2122 I7-12700H 512GB SSD/16GB",
        image: "/devices/laptops/dell.png",
    },
    {
        id: "3",
        name: "Modern Office Table Desk Computer Table Furniture",
        image: "/devices/monitors/dell.png",
    },
    {
        id: "4",
        name: "Phone 8 - 256GB, 4G LTE, Green (Refurbished)",
        image: "/devices/phones/samsung.png",
    },
];

const countries: SelectItemType[] = [
    { id: "gb", label: "United Kingdom", icon: FlagGb },
    { id: "us", label: "United States", icon: FlagUs },
    { id: "ng", label: "Nigeria", icon: FlagNg },
    { id: "ca", label: "Canada", icon: FlagCa },
    { id: "de", label: "Germany", icon: FlagDe },
    { id: "fr", label: "France", icon: FlagFr },
    { id: "au", label: "Australia", icon: FlagAu },
];

const countryPhoneCodes: Record<string, string> = {
    gb: "+44",
    us: "+1",
    ng: "+234",
    ca: "+1",
    de: "+49",
    fr: "+33",
    au: "+61",
};

const countryStates: Record<string, SelectItemType[]> = {
    gb: [
        { id: "england", label: "England" },
        { id: "scotland", label: "Scotland" },
        { id: "wales", label: "Wales" },
        { id: "northern-ireland", label: "Northern Ireland" },
    ],
    us: [
        { id: "al", label: "Alabama" },
        { id: "ak", label: "Alaska" },
        { id: "az", label: "Arizona" },
        { id: "ca", label: "California" },
        { id: "co", label: "Colorado" },
        { id: "fl", label: "Florida" },
        { id: "ga", label: "Georgia" },
        { id: "il", label: "Illinois" },
        { id: "ny", label: "New York" },
        { id: "nc", label: "North Carolina" },
        { id: "oh", label: "Ohio" },
        { id: "pa", label: "Pennsylvania" },
        { id: "tx", label: "Texas" },
        { id: "va", label: "Virginia" },
        { id: "wa", label: "Washington" },
    ],
    ng: [
        { id: "abuja", label: "Abuja (FCT)" },
        { id: "anambra", label: "Anambra" },
        { id: "delta", label: "Delta" },
        { id: "enugu", label: "Enugu" },
        { id: "kaduna", label: "Kaduna" },
        { id: "kano", label: "Kano" },
        { id: "lagos", label: "Lagos" },
        { id: "ogun", label: "Ogun" },
        { id: "oyo", label: "Oyo" },
        { id: "rivers", label: "Rivers" },
    ],
    ca: [
        { id: "ab", label: "Alberta" },
        { id: "bc", label: "British Columbia" },
        { id: "mb", label: "Manitoba" },
        { id: "nb", label: "New Brunswick" },
        { id: "ns", label: "Nova Scotia" },
        { id: "on", label: "Ontario" },
        { id: "qc", label: "Quebec" },
        { id: "sk", label: "Saskatchewan" },
    ],
    de: [
        { id: "bw", label: "Baden-Württemberg" },
        { id: "by", label: "Bavaria" },
        { id: "be", label: "Berlin" },
        { id: "bb", label: "Brandenburg" },
        { id: "hb", label: "Bremen" },
        { id: "hh", label: "Hamburg" },
        { id: "he", label: "Hessen" },
        { id: "nw", label: "North Rhine-Westphalia" },
        { id: "sn", label: "Saxony" },
    ],
    fr: [
        { id: "ara", label: "Auvergne-Rhône-Alpes" },
        { id: "bfc", label: "Bourgogne-Franche-Comté" },
        { id: "bre", label: "Brittany" },
        { id: "idf", label: "Île-de-France" },
        { id: "naq", label: "Nouvelle-Aquitaine" },
        { id: "occ", label: "Occitanie" },
        { id: "pdl", label: "Pays de la Loire" },
        { id: "paca", label: "Provence-Alpes-Côte d'Azur" },
    ],
    au: [
        { id: "act", label: "Australian Capital Territory" },
        { id: "nsw", label: "New South Wales" },
        { id: "nt", label: "Northern Territory" },
        { id: "qld", label: "Queensland" },
        { id: "sa", label: "South Australia" },
        { id: "tas", label: "Tasmania" },
        { id: "vic", label: "Victoria" },
        { id: "wa", label: "Western Australia" },
    ],
};

interface DeliveryInfo {
    phone: string;
    phoneCountry: string;
    country: string;
    state: string;
    address: string;
    landmark: string;
}

// ---------------------------------------------------------------------------
// Edit Delivery Slideout
// ---------------------------------------------------------------------------

function EditDeliverySlideout({
    isOpen,
    onOpenChange,
    initialData,
    onSave,
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    initialData: DeliveryInfo;
    onSave: (data: DeliveryInfo, updateProfile: boolean) => void;
}) {
    const [phone, setPhone] = useState(initialData.phone);
    const [phoneCountry, setPhoneCountry] = useState(initialData.phoneCountry);
    const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
    const [country, setCountry] = useState<string | null>(initialData.country);
    const [state, setState] = useState<string | null>(initialData.state || null);
    const [address, setAddress] = useState(initialData.address);
    const [landmark, setLandmark] = useState(initialData.landmark);
    const [updateProfile, setUpdateProfile] = useState(false);

    // When country changes, clear the state selection
    const handleCountryChange = (key: string) => {
        setCountry(key);
        setState(null);
    };

    // Reset form to current saved data when the slideout opens
    useEffect(() => {
        if (isOpen) {
            setPhone(initialData.phone);
            setPhoneCountry(initialData.phoneCountry);
            setCountry(initialData.country);
            setState(initialData.state || null);
            setAddress(initialData.address);
            setLandmark(initialData.landmark);
            setUpdateProfile(false);
        }
    }, [isOpen, initialData]);

    return (
        <SlideoutMenu isOpen={isOpen} onOpenChange={onOpenChange}>
            {({ close }) => (
                <>
                    <SlideoutMenu.Header onClose={close}>
                        <div className="flex flex-col gap-1 pr-8">
                            <h2 className="text-lg font-semibold text-[#181d27]">Edit delivery information</h2>
                            <p className="text-sm text-[#535862]">Update the delivery details for this order.</p>
                        </div>
                    </SlideoutMenu.Header>

                    <SlideoutMenu.Content>
                        <div className="flex flex-col gap-5">
                            {/* Phone number with country code dropdown */}
                            <div className="flex flex-col gap-1.5">
                                <Label>Phone number</Label>
                                <div className="flex items-center overflow-hidden rounded-lg border border-primary bg-primary shadow-xs transition-shadow duration-100 ease-linear focus-within:ring-2 focus-within:ring-brand">
                                    {/* Country code dropdown trigger */}
                                    <DialogTrigger isOpen={isPhoneDropdownOpen} onOpenChange={setIsPhoneDropdownOpen}>
                                        <AriaButton
                                            className={({ isFocused }) =>
                                                cx(
                                                    "flex shrink-0 cursor-pointer items-center gap-1.5 border-r border-[#e9eaeb] px-3 py-2.5 outline-hidden transition hover:bg-gray-50",
                                                    isFocused && "bg-gray-50",
                                                )
                                            }
                                        >
                                            <span className="text-sm font-medium text-[#344054]">{phoneCountry.toUpperCase()}</span>
                                            <ChevronDown className="size-4 text-fg-quaternary" />
                                        </AriaButton>
                                        <Popover
                                            placement="bottom start"
                                            offset={4}
                                            className={({ isEntering, isExiting }) =>
                                                cx(
                                                    "z-50 w-64 overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-[#eaecf0] will-change-transform",
                                                    isEntering && "duration-200 ease-out animate-in fade-in slide-in-from-top-1",
                                                    isExiting && "duration-150 ease-in animate-out fade-out slide-out-to-top-1",
                                                )
                                            }
                                        >
                                            <div className="max-h-60 overflow-y-auto py-1">
                                                {countries.map((c) => {
                                                    const Flag = c.icon as ComponentType<{ className?: string }>;
                                                    return (
                                                        <button
                                                            key={c.id}
                                                            type="button"
                                                            className={cx(
                                                                "flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left transition hover:bg-gray-50",
                                                                phoneCountry === c.id && "bg-gray-50",
                                                            )}
                                                            onClick={() => {
                                                                setPhoneCountry(c.id);
                                                                setIsPhoneDropdownOpen(false);
                                                            }}
                                                        >
                                                            {Flag && <Flag className="size-5 shrink-0 overflow-hidden rounded-full" />}
                                                            <span className="text-sm font-medium text-[#344054]">{c.label}</span>
                                                            <span className="ml-auto text-sm text-[#667085]">{countryPhoneCodes[c.id]}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </Popover>
                                    </DialogTrigger>

                                    {/* Country calling code (placeholder style) */}
                                    <span className="pl-3 text-md text-placeholder select-none">{countryPhoneCodes[phoneCountry]}</span>

                                    {/* Phone number input */}
                                    <input
                                        type="tel"
                                        className="w-full bg-transparent py-2.5 pr-3.5 pl-1.5 text-md text-primary outline-hidden placeholder:text-placeholder"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="e.g. 78 2824 3334"
                                    />
                                </div>
                            </div>

                            <Select
                                items={countries}
                                label="Country"
                                placeholder="Select country"
                                size="md"
                                selectedKey={country}
                                onSelectionChange={(key) => handleCountryChange(key as string)}
                            >
                                {(item) => (
                                    <Select.Item key={item.id} {...item}>
                                        {item.label}
                                    </Select.Item>
                                )}
                            </Select>

                            <Select
                                items={country ? (countryStates[country] ?? []) : []}
                                label="State / Region"
                                placeholder={country ? "Select state / region" : "Select a country first"}
                                size="md"
                                selectedKey={state}
                                onSelectionChange={(key) => setState(key as string)}
                                isDisabled={!country || !countryStates[country]?.length}
                            >
                                {(item) => (
                                    <Select.Item key={item.id} {...item}>
                                        {item.label}
                                    </Select.Item>
                                )}
                            </Select>

                            <Input
                                label="Address"
                                placeholder="e.g. 8/101 Nicholson St, Camp Hill"
                                size="md"
                                value={address}
                                onChange={setAddress}
                            />

                            <TextArea
                                label="Nearest landmark"
                                placeholder="e.g. Opposite the main post office on King Street"
                                rows={3}
                                value={landmark}
                                onChange={setLandmark}
                            />

                            <div className="rounded-xl border border-[#e9eaeb] bg-[#f9fafb] p-4">
                                <Checkbox
                                    isSelected={updateProfile}
                                    onChange={setUpdateProfile}
                                    label="Also update my personal profile"
                                    hint="Checking this will update your delivery address in your personal profile as well."
                                />
                            </div>
                        </div>
                    </SlideoutMenu.Content>

                    <SlideoutMenu.Footer>
                        <div className="flex gap-3">
                            <Button color="secondary" size="lg" className="flex-1" onClick={close}>
                                Cancel
                            </Button>
                            <Button
                                size="lg"
                                className="flex-1"
                                onClick={() => {
                                    onSave({
                                        phone,
                                        phoneCountry,
                                        country: country || "gb",
                                        state: state || "",
                                        address,
                                        landmark,
                                    }, updateProfile);
                                    close();
                                }}
                            >
                                Save changes
                            </Button>
                        </div>
                    </SlideoutMenu.Footer>
                </>
            )}
        </SlideoutMenu>
    );
}

// ---------------------------------------------------------------------------
// Header Navigation
// ---------------------------------------------------------------------------

function HeaderNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative w-full border-b border-[#22262f] bg-[#0c0e12]">
            <div className="mx-auto flex h-[72px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
                {/* Left: Logo */}
                <div className="flex items-center gap-4">
                    <a href="/" aria-label="Go to homepage">
                        <RaydaLogo variant="white" />
                    </a>
                </div>

                {/* Right: Actions + Avatar */}
                <div className="flex items-center gap-4">
                    <div className="hidden gap-1 sm:flex">
                        <a
                            href="#"
                            aria-label="Settings"
                            className="flex items-center justify-center rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                            <Settings01 className="size-5" />
                        </a>
                        <a
                            href="#"
                            aria-label="Notifications"
                            className="relative flex items-center justify-center rounded-md p-2 text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                            <Bell02 className="size-5" />
                            <span className="absolute -top-1 right-0 flex items-center justify-center rounded-full bg-[#fda29b] px-1.5 py-0.5 text-xs font-medium text-white">
                                1
                            </span>
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
                                    className="size-10 bg-[#22262f] text-sm font-semibold text-[#94979c]"
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
                <div className="absolute inset-x-0 top-[72px] z-50 border-b border-[#22262f] bg-[#0c0e12] lg:hidden">
                    <nav className="flex flex-col px-4 pb-4 pt-2 sm:px-6">
                        <ul className="flex flex-col gap-1">
                            {navItems.map((item) => (
                                <li key={item.label}>
                                    <a
                                        href={item.href}
                                        className="block rounded-md px-3 py-2.5 text-sm font-semibold text-white transition duration-100 ease-linear hover:bg-white/10"
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="my-3 h-px bg-[#22262f]" />
                        <div className="mt-3 flex items-center gap-3 rounded-md px-3 py-2.5">
                            <Avatar
                                alt="Olivia Rhye"
                                initials="OR"
                                size="md"
                                contrastBorder={false}
                                className="size-10 bg-[#22262f] text-sm font-semibold text-[#94979c]"
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
                        className="size-10 bg-[#22262f] text-sm font-semibold text-[#94979c]"
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

function PageHeader({ termsAccepted, onConfirm }: { termsAccepted: boolean; onConfirm: () => void }) {
    return (
        <div className="w-full">
            <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-5">
                    {/* Title row */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-semibold leading-[32px] text-[#181d27] sm:text-[30px] sm:leading-[38px]">
                                Order summary
                            </h1>
                            <p className="text-base leading-6 text-[#535862]">
                                View the details of your order and explore popular add-ons for businesses like yours
                            </p>
                        </div>
                        <Button color="primary" size="md" isDisabled={!termsAccepted} className="shrink-0" onClick={onConfirm}>
                            Confirm Details
                        </Button>
                    </div>

                    {/* Divider */}
                    <div className="h-px w-full bg-border-secondary" />

                    {/* Breadcrumbs */}
                    <nav className="flex flex-wrap items-center gap-2">
                        <a href="#" className="rounded p-1 text-[#535862] transition hover:text-[#344054]">
                            <HomeLine className="size-4" />
                        </a>
                        <ChevronRight className="size-3 text-[#d5d7da]" />
                        <a href="/onboard-device" className="px-2 py-1 text-sm font-semibold text-[#535862] transition hover:text-[#344054]">
                            Onboard device
                        </a>
                        <ChevronRight className="size-3 text-[#d5d7da]" />
                        <span className="px-2 py-1 text-sm font-semibold text-[#535862]">...</span>
                        <ChevronRight className="size-3 text-[#d5d7da]" />
                        <span className="px-2 py-1 text-sm font-semibold text-[#0948b5]">Order summary</span>
                    </nav>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Delivery Address Card
// ---------------------------------------------------------------------------

function DeliveryAddressCard({ deliveryInfo }: { deliveryInfo: DeliveryInfo }) {
    const countryData = countries.find((c) => c.id === deliveryInfo.country);
    const CountryFlag = countryData?.icon as ComponentType<{ className?: string }> | undefined;
    const stateData = deliveryInfo.state ? countryStates[deliveryInfo.country]?.find((s) => s.id === deliveryInfo.state) : null;

    return (
        <div className="rounded-2xl border border-[#e9eaeb] bg-white p-5 sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-medium leading-8 text-[#181d27] sm:text-2xl">Delivery address</h2>
                    <p className="text-sm leading-5 text-[#535862]">Shared with our logistics partners.</p>
                </div>
                <div className="h-px w-full bg-border-secondary" />
            </div>

            {/* Address info */}
            <div className="mt-8 flex flex-col gap-4">
                {/* Country + Estimated date */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col">
                        <span className="text-sm text-[#717680]">Country</span>
                        <div className="mt-1 flex items-center gap-2">
                            {CountryFlag && <CountryFlag className="size-6 shrink-0 overflow-hidden rounded-full" />}
                            <span className="text-base font-medium text-[#414651]">
                                {stateData ? `${stateData.label}, ` : ""}{countryData?.label || "Unknown"}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-[#717680]">Estimated fulfillment start date</span>
                        <span className="mt-1 text-base font-medium text-[#414651]">23 October 2024</span>
                    </div>
                </div>

                {/* Address */}
                <div className="flex flex-col">
                    <span className="text-sm text-[#717680]">Address</span>
                    <span className="mt-1 text-base font-medium text-[#414651]">{deliveryInfo.address}</span>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-border-secondary" />

                {/* Full Name + Email */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col">
                        <span className="text-sm text-[#717680]">Full Name</span>
                        <span className="mt-1 text-base font-medium text-[#414651]">Phoenix Baker</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-[#717680]">Email address</span>
                        <span className="mt-1 text-base font-medium text-[#414651]">phoenix@rayda.co</span>
                    </div>
                </div>

                {/* Employee Type + Phone Number */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex flex-col">
                        <span className="text-sm text-[#717680]">Employee Type</span>
                        <span className="mt-1 text-base font-medium text-[#414651]">Product Designer (Full Time)</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-sm text-[#717680]">Phone Number</span>
                        <span className="mt-1 text-base font-medium text-[#414651]">{countryPhoneCodes[deliveryInfo.phoneCountry]} {deliveryInfo.phone}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Equipment Card
// ---------------------------------------------------------------------------

function EquipmentCard() {
    return (
        <div className="rounded-2xl border border-[#e9eaeb] bg-white p-5 sm:p-8">
            {/* Header */}
            <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-medium leading-8 text-[#181d27] sm:text-2xl">Equipment</h2>
                    <p className="text-sm leading-5 text-[#535862]">All the equipment for this order</p>
                </div>
                <div className="h-px w-full bg-border-secondary" />
            </div>

            {/* Equipment list */}
            <div className="mt-8 flex flex-col">
                {equipmentItems.map((item, index) => (
                    <div key={item.id}>
                        <div className="flex items-center gap-4">
                            <div className="size-12 shrink-0 overflow-hidden rounded-[10px] bg-[#f2f4f7]">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="size-full object-contain"
                                />
                            </div>
                            <p className="truncate text-base text-[#181d27]">{item.name}</p>
                        </div>
                        {index < equipmentItems.length - 1 && (
                            <div className="my-4 h-px w-full bg-border-secondary" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Right Column - Order Actions
// ---------------------------------------------------------------------------

function OrderActions({
    termsAccepted,
    onTermsChange,
    signatureRequired,
    onSignatureToggleOff,
    onSignatureToggleOn,
    specialInstructions,
    onSpecialInstructionsChange,
    onConfirm,
}: {
    termsAccepted: boolean;
    onTermsChange: (value: boolean) => void;
    signatureRequired: boolean;
    onSignatureToggleOff: () => void;
    onSignatureToggleOn: () => void;
    specialInstructions: string;
    onSpecialInstructionsChange: (value: string) => void;
    onConfirm: () => void;
}) {

    return (
        <div className="flex flex-col gap-6">
            {/* Terms and Conditions */}
            <div className="rounded-xl border border-[#e9eaeb] bg-white p-4">
                <Checkbox
                    isSelected={termsAccepted}
                    onChange={onTermsChange}
                    label="Terms and Conditions"
                    hint="I acknowledge my responsibility for providing the correct address. I also understand that incorrect information can impact the delivery or recovery process."
                />
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-[#eaecf0]" />

            {/* Special instructions */}
            <TextArea
                label="Special instructions or notes (Optional)"
                placeholder={'E.g Call when nearby," "Leave at front desk,"  "Building access code: 1234'}
                rows={5}
                value={specialInstructions}
                onChange={onSpecialInstructionsChange}
            />

            {/* Signature toggle section */}
            <div className="flex flex-col gap-4">
                {/* Signature Required toggle */}
                <div className="rounded-xl border border-[#e9eaeb] bg-white p-4">
                    <Toggle
                        className="w-full [&>div:first-of-type]:shrink-0"
                        isSelected={signatureRequired}
                        onChange={(val) => (val ? onSignatureToggleOn() : onSignatureToggleOff())}
                        label="Signature Required"
                        hint={
                            signatureRequired ? (
                                "Delivery will be attempted only when employee is available to receive. However, this will not always be guaranteed"
                            ) : (
                                <span className="text-[#d92d20]">
                                    Package may be left unattended if no one is available to receive it.
                                </span>
                            )
                        }
                    />
                </div>

                {/* Info alert */}
                <div className="rounded-xl border border-[#0c66ff] bg-white p-4">
                    <div className="flex gap-2">
                        <InfoOctagon className="mt-0.5 size-5 shrink-0 text-[#0c66ff]" />
                        <div className="flex flex-col text-sm">
                            <p className="font-medium text-[#052b6b]">
                                Signature requirement automatically enabled
                            </p>
                            <p className="text-[#0948b5]">(order value exceeds $2,500)</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Confirm Details button */}
            <Button size="xl" isDisabled={!termsAccepted} className="w-full" onClick={onConfirm}>
                Confirm Details
            </Button>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Remove Signature Modal
// ---------------------------------------------------------------------------

function RemoveSignatureModal({
    isOpen,
    onOpenChange,
    onRemove,
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onRemove: () => void;
}) {
    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
            <Modal className="max-w-[400px]">
                <Dialog className="relative w-full flex-col items-stretch overflow-hidden rounded-xl bg-white shadow-xl">
                    {({ close }) => (
                        <>
                            <div className="flex flex-col gap-4 px-6 pt-6">
                                {/* Warning icon */}
                                <div className="flex size-12 items-center justify-center rounded-full bg-[#fee4e2]">
                                    <AlertTriangle className="size-6 text-[#d92d20]" />
                                </div>

                                {/* Close button */}
                                <CloseButton size="md" className="absolute top-4 right-4" onClick={close} />

                                {/* Text content */}
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg font-semibold text-[#181d27]">Remove Signature Requirement?</h2>
                                    <p className="text-sm leading-5 text-[#535862]">
                                        Just a heads up: without signature requirement, your package could be left at the doorstep if no
                                        one&apos;s around to receive it. This means less security for your delivery.
                                    </p>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="mt-8 h-px w-full bg-[#eaecf0]" />

                            {/* Actions */}
                            <div className="flex gap-3 px-6 py-6">
                                <Button color="secondary" size="lg" className="flex-1" onClick={close}>
                                    Cancel
                                </Button>
                                <Button
                                    color="primary-destructive"
                                    size="lg"
                                    className="flex-1"
                                    onClick={() => {
                                        onRemove();
                                        close();
                                    }}
                                >
                                    Remove
                                </Button>
                            </div>
                        </>
                    )}
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

// ---------------------------------------------------------------------------
// Confirm Details Modal
// ---------------------------------------------------------------------------

function ConfirmDetailsModal({
    isOpen,
    onOpenChange,
    deliveryInfo,
    signatureRequired,
    specialInstructions,
    onConfirm,
}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    deliveryInfo: DeliveryInfo;
    signatureRequired: boolean;
    specialInstructions: string;
    onConfirm: () => void;
}) {
    const countryData = countries.find((c) => c.id === deliveryInfo.country);

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange} isDismissable>
            <Modal className="max-w-[400px]">
                <Dialog className="relative w-full flex-col items-stretch overflow-hidden rounded-xl bg-white shadow-xl">
                    {({ close }) => (
                        <>
                            {/* Header content */}
                            <div className="flex flex-col gap-4 px-6 pt-6">
                                {/* Featured icon */}
                                <div className="flex size-12 items-center justify-center rounded-full bg-[#dcfae6]">
                                    <CheckCircle className="size-6 text-[#17b26a]" />
                                </div>

                                {/* Close button */}
                                <CloseButton size="md" className="absolute top-4 right-4" onClick={close} />

                                {/* Text content */}
                                <div className="flex flex-col gap-1">
                                    <h2 className="text-lg font-semibold text-[#181d27]">Confirm delivery information</h2>
                                    <div className="text-sm leading-5 text-[#535862]">
                                        <p className="mb-3.5">
                                            This is to confirm all these details are correct before we proceed:
                                        </p>

                                        <p className="mb-3.5">
                                            Phone:{" "}
                                            <span className="font-medium">
                                                {countryPhoneCodes[deliveryInfo.phoneCountry]} {deliveryInfo.phone}
                                            </span>
                                        </p>

                                        <p className="mb-3.5">
                                            Address:{" "}
                                            <span className="font-medium">
                                                {deliveryInfo.address}
                                                {countryData ? `, ${countryData.label}` : ""}
                                            </span>
                                        </p>

                                        {specialInstructions && (
                                            <p className="mb-3.5">
                                                Delivery Notes:{" "}
                                                <span className="font-medium">&ldquo;{specialInstructions}&rdquo;</span>
                                            </p>
                                        )}

                                        {deliveryInfo.landmark && (
                                            <p className="mb-3.5">
                                                Nearest Landmark:{" "}
                                                <span className="font-medium">{deliveryInfo.landmark}</span>
                                            </p>
                                        )}

                                        <p className="mb-3.5">
                                            {signatureRequired ? "✍️ Signature Required." : "No signature required."}
                                        </p>

                                        <p>A confirmation email has been sent to you.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Divider */}
                            <div className="mt-8 h-px w-full bg-[#eaecf0]" />

                            {/* Actions */}
                            <div className="flex gap-3 px-6 py-6">
                                <Button color="secondary" size="lg" className="flex-1" onClick={close}>
                                    Cancel
                                </Button>
                                <Button size="lg" className="flex-1" onClick={() => { close(); onConfirm(); }}>
                                    Confirm
                                </Button>
                            </div>
                        </>
                    )}
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OrderSummaryPage() {
    const router = useRouter();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [deliveryInfo, setDeliveryInfo] = useState<DeliveryInfo>({
        phone: "78 2824 3334",
        phoneCountry: "gb",
        country: "gb",
        state: "england",
        address: "8/101 Nicholson St, Camp Hill EC1A 1AE",
        landmark: "",
    });
    const [showSaveAlert, setShowSaveAlert] = useState(false);
    const [showSignatureOnAlert, setShowSignatureOnAlert] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [signatureRequired, setSignatureRequired] = useState(true);
    const [isRemoveSignatureOpen, setIsRemoveSignatureOpen] = useState(false);
    const [specialInstructions, setSpecialInstructions] = useState("");
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleSaveDelivery = (data: DeliveryInfo, updateProfile: boolean) => {
        setDeliveryInfo(data);
        if (updateProfile) {
            const stateLabel = countryStates[data.country]?.find((s) => s.id === data.state)?.label ?? "";
            const countryLabel = countries.find((c) => c.id === data.country)?.label ?? "";
            saveProfileUpdate({
                address: data.address,
                stateLabel,
                countryId: data.country,
                countryLabel,
                phone: `${countryPhoneCodes[data.phoneCountry] ?? ""} ${data.phone}`.trim(),
            });
        }
        setShowSaveAlert(true);
        setTimeout(() => setShowSaveAlert(false), 4000);
    };

    const handleSignatureToggleOn = () => {
        setSignatureRequired(true);
        setShowSignatureOnAlert(true);
        setTimeout(() => setShowSignatureOnAlert(false), 4000);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#fdfdfd]">
            <FloatingAlert
                show={showSaveAlert}
                color="success"
                title="Changes saved"
                description="Your delivery information has been updated."
                onDismiss={() => setShowSaveAlert(false)}
            />
            <FloatingAlert
                show={showSignatureOnAlert}
                color="success"
                title="Signature requirement enabled"
                description="Your delivery will require a signature upon receipt."
                onDismiss={() => setShowSignatureOnAlert(false)}
                topOffset={showSaveAlert ? "top-[88px]" : "top-4"}
            />
            <HeaderNavigation />

            <main className="flex flex-1 flex-col gap-8 pb-12 pt-8 sm:pb-24 sm:pt-12">
                <PageHeader termsAccepted={termsAccepted} onConfirm={() => setIsConfirmOpen(true)} />

                <div className="w-full">
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 sm:px-6 lg:px-8 lg:flex-row lg:gap-8">
                        {/* Left Column - Details */}
                        <div className="flex min-w-0 flex-col gap-8 lg:flex-1">
                            <Button color="secondary" size="md" iconLeading={Edit05} className="w-full" onClick={() => setIsEditOpen(true)}>
                                Edit delivery information
                            </Button>

                            <div className="flex flex-col gap-8">
                                <DeliveryAddressCard deliveryInfo={deliveryInfo} />
                                <EquipmentCard />
                            </div>
                        </div>

                        {/* Right Column - Order actions */}
                        <div className="min-w-0 lg:flex-1">
                            <OrderActions
                                termsAccepted={termsAccepted}
                                onTermsChange={setTermsAccepted}
                                signatureRequired={signatureRequired}
                                onSignatureToggleOff={() => setIsRemoveSignatureOpen(true)}
                                onSignatureToggleOn={handleSignatureToggleOn}
                                specialInstructions={specialInstructions}
                                onSpecialInstructionsChange={setSpecialInstructions}
                                onConfirm={() => setIsConfirmOpen(true)}
                            />
                        </div>
                    </div>
                </div>
            </main>

            <EditDeliverySlideout isOpen={isEditOpen} onOpenChange={setIsEditOpen} initialData={deliveryInfo} onSave={handleSaveDelivery} />
            <RemoveSignatureModal
                isOpen={isRemoveSignatureOpen}
                onOpenChange={setIsRemoveSignatureOpen}
                onRemove={() => setSignatureRequired(false)}
            />
            <ConfirmDetailsModal
                isOpen={isConfirmOpen}
                onOpenChange={setIsConfirmOpen}
                deliveryInfo={deliveryInfo}
                signatureRequired={signatureRequired}
                specialInstructions={specialInstructions}
                onConfirm={() => {
                    saveNotifications(ORDER_CONFIRMED_NOTIFICATIONS);
                    router.push("/overview");
                }}
            />
        </div>
    );
}