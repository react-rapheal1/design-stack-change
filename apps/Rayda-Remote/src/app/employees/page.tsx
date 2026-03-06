"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    ArrowLeft,
    Bell01,
    ChevronDown,
    FilterLines,
    Link04,
    Plus,
    SearchMd,
    Settings01,
    Users01,
    X,
} from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { Button } from "@/components/base/buttons/button";
import { GuidedTooltip } from "@/components/guided-tooltip";
import { cx } from "@/utils/cx";

// ---------------------------------------------------------------------------
// Shared nav (same across dashboard, employees, equipment)
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
    { key: "overview",    label: "Overview",     href: "/dashboard" },
    { key: "orders",      label: "Orders",        href: "/orders" },
    { key: "marketplace", label: "Marketplace",   href: "/onboard-device/marketplace" },
    { key: "catalogs",    label: "Catalogs",      href: "#" },
    { key: "storage",     label: "Storage",       href: "#" },
    { key: "employees",   label: "Employees",     href: "/employees", id: "nav-employees" },
    { key: "equipment",   label: "All equipment", href: "/equipment", id: "nav-equipment" },
];

function DashboardNav({ activeKey }: { activeKey: string }) {
    return (
        <nav className="flex h-14 shrink-0 items-center gap-1 border-b border-[#1d2939] bg-[#101828] px-4 lg:px-6">
            <div className="mr-6 shrink-0">
                <RaydaLogo variant="white" />
            </div>
            <div className="flex flex-1 items-center gap-0.5 overflow-x-auto">
                {NAV_ITEMS.map((item) => (
                    <a
                        key={item.key}
                        id={item.id}
                        href={item.href}
                        className={cx(
                            "whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition duration-100",
                            item.key === activeKey
                                ? "bg-white/10 text-white"
                                : "text-[#98a2b3] hover:bg-white/5 hover:text-white",
                        )}
                    >
                        {item.label}
                    </a>
                ))}
            </div>
            <div className="flex shrink-0 items-center gap-1">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#98a2b3] transition duration-100 hover:bg-white/5 hover:text-white">
                    <SearchMd className="size-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#98a2b3] transition duration-100 hover:bg-white/5 hover:text-white">
                    <Settings01 className="size-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#98a2b3] transition duration-100 hover:bg-white/5 hover:text-white">
                    <Bell01 className="size-4" />
                </button>
                <div className="ml-1 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                    OR
                </div>
            </div>
        </nav>
    );
}

// ---------------------------------------------------------------------------
// HRIS slide panel
// ---------------------------------------------------------------------------

const PANEL_TABS = [
    { key: "import" as const, label: "Import employees" },
    { key: "invite" as const, label: "Invite employee" },
    { key: "add"    as const, label: "Add employee" },
    { key: "hris"   as const, label: "HRIS integration" },
];
type PanelTab = "import" | "invite" | "add" | "hris";
type HrisView = "list" | "syncing" | "connected";

const HRIS_PROVIDERS_LIST = [
    { key: "bamboo",   name: "BambooHR",     color: "#00a651", letter: "B" },
    { key: "ultipro",  name: "UltiPro",      color: "#005b99", letter: "U" },
    { key: "workday",  name: "Workday",      color: "#f05a28", letter: "W" },
    { key: "optimum",  name: "Optimum HRIS", color: "#4285f4", letter: "O" },
    { key: "namely",   name: "Namely",       color: "#2563eb", letter: "N" },
    { key: "zenefits", name: "Zenefits",     color: "#ef4444", letter: "Z" },
    { key: "rippling", name: "Rippling",     color: "#111827", letter: "R" },
    { key: "gusto",    name: "Gusto",        color: "#f97316", letter: "G" },
];
type Provider = (typeof HRIS_PROVIDERS_LIST)[0];

function HrisPanel({
    onClose,
    onViewChange,
    onSave,
}: {
    onClose: () => void;
    onViewChange?: (view: HrisView) => void;
    onSave?: () => void;
}) {
    const [activeTab, setActiveTab] = useState<PanelTab>("hris");
    const [view, setView]           = useState<HrisView>("list");
    const [search, setSearch]       = useState("");
    const [provider, setProvider]   = useState<Provider | null>(null);
    const [syncFreq]                = useState("Daily");
    const [notifEmail, setNotifEmail] = useState("admin@rayda.co");

    const filtered = HRIS_PROVIDERS_LIST.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
    );

    function handleConnect(p: Provider) {
        setProvider(p);
        setView("syncing");
        onViewChange?.("syncing");
        // Auto-advance to connected after 4 seconds
        setTimeout(() => {
            setView("connected");
            onViewChange?.("connected");
        }, 4000);
    }

    // Sync data button is commented out — sync happens automatically
    // function handleSyncData() { ... }

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />

            {/* Slide panel */}
            <div className="fixed right-0 top-0 z-50 flex h-full w-[780px] flex-col bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between px-6 py-5">
                    <div>
                        <h2 className="text-lg font-bold text-primary">Add employees</h2>
                        <p className="mt-0.5 text-sm text-tertiary">
                            Download template to add employees or invite team members to add their details
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-[#eaecf0] px-2">
                    {PANEL_TABS.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={cx(
                                "-mb-px border-b-2 px-4 py-3 text-sm font-medium transition duration-100",
                                activeTab === tab.key
                                    ? "border-brand-600 text-brand-700"
                                    : "border-transparent text-tertiary hover:text-secondary",
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {activeTab === "hris" ? (
                        view === "list" ? (
                            <div className="p-6">
                                {/* Search */}
                                <div className="mb-5 flex h-10 items-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-3">
                                    <SearchMd className="size-4 shrink-0 text-tertiary" />
                                    <input
                                        type="text"
                                        placeholder="Search for integration"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-placeholder"
                                    />
                                </div>

                                {/* Provider grid */}
                                <div className="grid grid-cols-4 gap-3">
                                    {filtered.map((p) => (
                                        <div key={p.key} className="flex flex-col rounded-xl border border-[#eaecf0] p-4">
                                            <div
                                                className="mb-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
                                                style={{ backgroundColor: p.color }}
                                            >
                                                {p.letter}
                                            </div>
                                            <p className="text-sm font-semibold text-primary">{p.name}</p>
                                            <p className="mb-3 text-xs text-tertiary">Disconnected</p>
                                            <button
                                                onClick={() => handleConnect(p)}
                                                className="w-full cursor-pointer rounded-lg border border-[#d0d5dd] py-1.5 text-sm font-medium text-secondary transition duration-100 hover:bg-[#f9fafb]"
                                            >
                                                Connect
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : view === "syncing" ? (
                            <div className="flex flex-col items-center justify-center py-24">
                                {/* Rotating dots spinner */}
                                <div className="relative mb-6 h-20 w-20 animate-spin">
                                    {Array.from({ length: 12 }).map((_, i) => {
                                        const angle = (i * 30 * Math.PI) / 180;
                                        const radius = 30;
                                        const x = Math.sin(angle) * radius;
                                        const y = -Math.cos(angle) * radius;
                                        return (
                                            <div
                                                key={i}
                                                className="absolute h-2.5 w-2.5 rounded-full bg-brand-600"
                                                style={{
                                                    opacity: Math.max(0.08, 1 - i * 0.083),
                                                    left: `calc(50% + ${x}px - 5px)`,
                                                    top: `calc(50% + ${y}px - 5px)`,
                                                }}
                                            />
                                        );
                                    })}
                                </div>
                                <p className="text-lg font-semibold text-primary">Sync data...</p>
                            </div>
                        ) : (
                            /* Connected state */
                            <div className="p-6">
                                {/* Last sync */}
                                <p className="mb-4 text-sm text-tertiary">Last sync • 22 Jan at 10:40am</p>

                                {/* Connected provider card */}
                                {provider && (
                                    <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#eaecf0] p-4">
                                        <div
                                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                                            style={{ backgroundColor: provider.color }}
                                        >
                                            {provider.letter}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-primary">{provider.name}</p>
                                            <p className="text-xs text-tertiary">Next sync in: 13 minutes</p>
                                        </div>
                                        <div className="mr-4 text-right">
                                            <p className="text-sm font-medium text-primary">
                                                rayda.{provider.name.toLowerCase().replace(/\s+/g, "")}.com
                                            </p>
                                            <p className="text-xs text-tertiary">Found in your {provider.name} account URL</p>
                                        </div>
                                        <span className="inline-flex items-center gap-1.5 rounded-full border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                                            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                                            Connected
                                        </span>
                                    </div>
                                )}

                                {/* Sync Settings */}
                                <p className="mb-4 text-sm font-semibold text-brand-700">Sync Settings</p>

                                <div className="mb-4">
                                    <label className="mb-1.5 block text-sm font-medium text-secondary">
                                        Sync Frequency <span className="text-error-primary">*</span>
                                    </label>
                                    <div className="flex h-10 cursor-pointer items-center justify-between rounded-lg border border-[#d0d5dd] px-3">
                                        <span className="text-sm text-primary">{syncFreq}</span>
                                        <ChevronDown className="size-4 text-tertiary" />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-secondary">
                                        Notification Email
                                    </label>
                                    <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-lg border border-[#d0d5dd] px-3 py-2">
                                        {notifEmail && (
                                            <span className="inline-flex items-center gap-1 rounded-md bg-[#f2f4f7] px-2 py-0.5 text-sm text-secondary">
                                                {notifEmail}
                                                <button
                                                    onClick={() => setNotifEmail("")}
                                                    className="text-tertiary transition duration-100 hover:text-primary"
                                                >
                                                    <X className="size-3" />
                                                </button>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )
                    ) : (
                        /* Other tabs — placeholder */
                        <div className="flex items-center justify-center py-24 text-sm text-tertiary">
                            Coming soon
                        </div>
                    )}
                </div>

                {/* Footer */}
                {activeTab === "hris" && view === "syncing" && (
                    <div className="flex items-center justify-end gap-3 border-t border-[#eaecf0] px-6 py-4">
                        <Button color="secondary" iconLeading={ArrowLeft} onClick={() => { setView("list"); onViewChange?.("list"); }}>
                            Back
                        </Button>
                        {/* Sync data button removed — sync happens automatically after 4s */}
                    </div>
                )}
                {activeTab === "hris" && view === "connected" && (
                    <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-4">
                        <Button color="primary-destructive" onClick={onClose}>
                            Disconnect
                        </Button>
                        <Button color="secondary" onClick={onSave}>Save changes</Button>
                    </div>
                )}
            </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Dummy employee data
// ---------------------------------------------------------------------------

const DUMMY_EMPLOYEES = [
    { id: "1", name: "Olivia Rhye",     initials: "OR", role: "Product Designer",    dept: "Technology",  email: "olivia@rayda.co",   address: "1 Apple Park Way",    country: "United States", flag: null },
    { id: "2", name: "Phoenix Baker",   initials: "PB", role: "Sales Leader",         dept: "Sales",       email: "phoenix@rayda.co",  address: "456 Oak Ave",         country: "United Kingdom", flag: "No device assigned" },
    { id: "3", name: "Lana Steiner",    initials: "LS", role: "Frontend Developer",   dept: "Engineering", email: "lana@rayda.co",     address: "789 Pine Rd",         country: "Germany",        flag: null },
    { id: "4", name: "Demi Wilkinson",  initials: "DW", role: "Accountant",           dept: "Finance",     email: "demi@rayda.co",     address: "321 Elm St",          country: "Canada",         flag: "Device overdue" },
    { id: "5", name: "Candice Wu",      initials: "CW", role: "Fullstack Developer",  dept: "Engineering", email: "cand@rayda.co",     address: "654 Maple Ave",       country: "Australia",      flag: "Pending approval" },
];
type Employee = (typeof DUMMY_EMPLOYEES)[0];

// ---------------------------------------------------------------------------
// Resolve Flags panel
// ---------------------------------------------------------------------------

const RESOLVE_FLAGS_TOUR_STEPS = [
    {
        title: "Let's resolve your device flags",
        description: "We found 3 employees with device issues. Click 'Resolve' on each one to address them.",
        ctaLabel: "Got it",
    },
    {
        title: "All flags cleared!",
        description: "Great work — all device assignment issues have been resolved. Your employees are ready to go.",
        ctaLabel: "Done",
    },
];

function ResolveFlagsPanel({
    employees,
    onClose,
    onResolveStep,
}: {
    employees: Employee[];
    onClose: () => void;
    onResolveStep?: (step: number) => void;
}) {
    const flagged = employees.filter((e) => e.flag);
    const [resolved, setResolved] = useState<Set<string>>(new Set());

    function handleResolve(id: string) {
        const next = new Set(resolved).add(id);
        setResolved(next);
        if (next.size === flagged.length) {
            onResolveStep?.(1); // all resolved — advance to last step
        }
    }

    const allResolved = resolved.size === flagged.length;

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/20" onClick={onClose} />
            <div className="fixed right-0 top-0 z-50 flex h-full w-[720px] flex-col bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-start justify-between px-6 py-5">
                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-lg font-bold text-primary">Resolve flags</h2>
                            <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600">
                                {flagged.length - resolved.size} remaining
                            </span>
                        </div>
                        <p className="mt-0.5 text-sm text-tertiary">
                            Address device assignment issues for your employees
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                {/* Progress bar */}
                <div className="mx-6 mb-1 h-1.5 overflow-hidden rounded-full bg-[#f2f4f7]">
                    <div
                        className="h-full rounded-full bg-brand-600 transition-all duration-500"
                        style={{ width: `${flagged.length > 0 ? (resolved.size / flagged.length) * 100 : 0}%` }}
                    />
                </div>
                <p className="mb-4 px-6 text-xs text-tertiary">{resolved.size} of {flagged.length} resolved</p>

                <div className="flex-1 overflow-y-auto px-6">
                    {allResolved ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-50">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                                    <span className="text-lg">✓</span>
                                </div>
                            </div>
                            <p className="mt-4 text-base font-bold text-primary">All flags resolved!</p>
                            <p className="mt-1 text-sm text-tertiary">
                                Every device assignment is in order. Your team is ready to go.
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {flagged.map((emp) => {
                                const isResolved = resolved.has(emp.id);
                                return (
                                    <div
                                        key={emp.id}
                                        className={cx(
                                            "flex items-center gap-4 rounded-xl border p-4 transition duration-100",
                                            isResolved
                                                ? "border-green-200 bg-green-50"
                                                : "border-[#eaecf0] bg-white",
                                        )}
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7] text-xs font-semibold text-secondary">
                                            {emp.initials}
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-primary">{emp.name}</p>
                                            <p className="text-xs text-tertiary">{emp.dept}</p>
                                        </div>
                                        <span className={cx(
                                            "rounded-full px-2.5 py-1 text-xs font-medium",
                                            isResolved
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600",
                                        )}>
                                            {isResolved ? "Resolved" : emp.flag}
                                        </span>
                                        {!isResolved && (
                                            <Button size="sm" color="secondary" onClick={() => handleResolve(emp.id)}>
                                                Resolve
                                            </Button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-end border-t border-[#eaecf0] px-6 py-4">
                    <Button onClick={onClose} color={allResolved ? "primary" : "secondary"}>
                        {allResolved ? "Done" : "Close"}
                    </Button>
                </div>
            </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// HRIS tour steps
// ---------------------------------------------------------------------------

const HRIS_TOUR_STEPS = [
    {
        title: "Welcome to your Employees page",
        description: "This is where all your team members live. Once your HRIS is connected, employees and their device assignments will populate here automatically.",
        ctaLabel: "Select Another Method",
    },
    {
        title: "Select your HRIS provider",
        description: "Choose your HR platform from the list and click 'Connect'. The sync takes under 2 minutes.",
        ctaLabel: "Continue",
    },
    {
        title: "Syncing your data",
        description: "Rayda is pulling in your employee records. This usually takes a few seconds — hang tight!",
        ctaLabel: "Continue",
    },
    {
        title: "Save your settings",
        description: "Set your sync frequency and notification email, then click 'Save changes' to complete the setup.",
        ctaLabel: "Got it",
    },
    {
        title: "Employees are loaded!",
        description: "Your team is now in Rayda. We found 3 device flags that need your attention — let's resolve them.",
        ctaLabel: "Resolve flags",
    },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EmployeesPage() {
    const searchParams = useSearchParams();
    const tour = searchParams.get("tour");
    const isTourActive = tour === "hris";

    const [tooltipStep, setTooltipStep]         = useState<number | null>(isTourActive ? 0 : null);
    const [showHrisModal, setShowHrisModal]     = useState(false);
    const [employees, setEmployees]             = useState<Employee[]>([]);
    const [showResolvePanel, setShowResolvePanel] = useState(false);
    const [resolveTooltipStep, setResolveTooltipStep] = useState<number | null>(null);

    const currentTooltip = tooltipStep !== null ? HRIS_TOUR_STEPS[tooltipStep] : null;

    function handlePanelViewChange(view: HrisView) {
        if (view === "syncing" && tooltipStep === 1) setTooltipStep(2);
        if (view === "connected" && tooltipStep === 2) setTooltipStep(3);
    }

    function handlePanelSave() {
        setShowHrisModal(false);
        setEmployees(DUMMY_EMPLOYEES);
        setTooltipStep(4);
    }

    function handleTooltipNext() {
        if (tooltipStep === null) return;
        if (tooltipStep === 0) {
            setShowHrisModal(true);
            setTooltipStep(1);
        } else if (tooltipStep === 4) {
            // Transition to Resolve Flags journey
            setTooltipStep(null);
            setShowResolvePanel(true);
            setResolveTooltipStep(0);
        } else if (tooltipStep >= HRIS_TOUR_STEPS.length - 1) {
            setTooltipStep(null);
        } else {
            setTooltipStep((s) => (s ?? 0) + 1);
        }
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#f9fafb]">
            <DashboardNav activeKey="employees" />

            <div className="flex-1 overflow-y-auto">
                <div className="page-px py-6 lg:py-8">
                    {/* Page header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-primary">Manage Employees</h1>
                            <p className="mt-1 text-sm text-tertiary">
                                Easily provide your employees with the necessary hardware to start their journey in your company.
                            </p>
                        </div>
                        <div className="relative">
                            <Button
                                id="btn-import-employee"
                                size="sm"
                                iconLeading={Plus}
                                onClick={() => {
                                    setShowHrisModal(true);
                                    if (isTourActive && tooltipStep === 0) setTooltipStep(1);
                                }}
                            >
                                Import Employee
                            </Button>
                            {tooltipStep === 0 && currentTooltip && (
                                <GuidedTooltip
                                    step={tooltipStep}
                                    total={HRIS_TOUR_STEPS.length}
                                    title={currentTooltip.title}
                                    description={currentTooltip.description}
                                    ctaLabel={currentTooltip.ctaLabel}
                                    onNext={handleTooltipNext}
                                    className="absolute right-0 top-full z-50 mt-3"
                                />
                            )}
                        </div>
                    </div>

                    {/* Tour highlight banner */}
                    {isTourActive && tooltipStep !== null && tooltipStep < 2 && (
                        <div className="mt-6 flex items-center gap-3 rounded-xl border border-brand-200 bg-brand-50 px-5 py-3.5">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-100">
                                <Link04 className="size-4 text-brand-600" />
                            </div>
                            <p className="text-sm text-brand-700">
                                <strong>Step {(tooltipStep ?? 0) + 1} of {HRIS_TOUR_STEPS.length}:</strong>{" "}
                                {tooltipStep === 0
                                    ? "You're on the Employees page. Click 'Select Another Method' on the guide to proceed."
                                    : "Click the 'Import Employee' button above to connect your HRIS."}
                            </p>
                        </div>
                    )}

                    {/* Employees table */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-[#eaecf0] bg-white">
                        {/* Table header */}
                        <div className="flex items-center justify-between border-b border-[#eaecf0] px-5 py-4">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-primary">Employees</p>
                                <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-semibold text-brand-700">
                                    {employees.length} Employee{employees.length !== 1 ? "s" : ""}
                                </span>
                                {employees.some((e) => e.flag) && (
                                    <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-600">
                                        {employees.filter((e) => e.flag).length} flags
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 w-60 items-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-3 text-sm text-tertiary">
                                    <SearchMd className="size-4 text-[#667085]" />
                                    <span>Search</span>
                                </div>
                                <Button color="secondary" size="sm" iconLeading={FilterLines}>
                                    Filter
                                </Button>
                            </div>
                        </div>

                        {/* Column headers */}
                        <div className="grid grid-cols-5 border-b border-[#eaecf0] bg-[#f9fafb] px-5 py-3 text-xs font-semibold text-tertiary">
                            <span>Name</span>
                            <span>Department</span>
                            <span>Email address</span>
                            <span>Address</span>
                            <span>Country</span>
                        </div>

                        {employees.length === 0 ? (
                            /* Empty state */
                            <div className="flex flex-col items-center justify-center py-16 text-center">
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2f4f7]">
                                    <Users01 className="size-6 text-[#667085]" />
                                </div>
                                <p className="mt-3 text-sm font-semibold text-secondary">No employees yet</p>
                                <p className="mt-1 text-sm text-tertiary">
                                    Connect your HRIS or add employees manually to get started.
                                </p>
                                <div className="mt-4">
                                    <Button
                                        size="sm"
                                        iconLeading={Plus}
                                        onClick={() => {
                                            setShowHrisModal(true);
                                            if (isTourActive && tooltipStep === 0) setTooltipStep(1);
                                        }}
                                    >
                                        Import Employee
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            /* Populated rows */
                            <div>
                                {employees.map((emp, i) => (
                                    <div
                                        key={emp.id}
                                        className={cx(
                                            "grid grid-cols-5 items-center px-5 py-3.5 text-sm",
                                            i < employees.length - 1 && "border-b border-[#eaecf0]",
                                            emp.flag && "bg-red-50/40",
                                        )}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#f2f4f7] text-xs font-semibold text-secondary">
                                                {emp.initials}
                                            </div>
                                            <div>
                                                <p className="font-medium text-primary">{emp.name}</p>
                                                <p className="text-xs text-tertiary">{emp.role}</p>
                                            </div>
                                        </div>
                                        <span className="text-tertiary">{emp.dept}</span>
                                        <span className="text-tertiary">{emp.email}</span>
                                        <span className="text-tertiary">{emp.address}</span>
                                        <div className="flex items-center justify-between">
                                            <span className="text-tertiary">{emp.country}</span>
                                            {emp.flag && (
                                                <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-600">
                                                    {emp.flag}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                <div className="border-t border-[#eaecf0] px-5 py-3 text-xs text-tertiary">
                                    Page 1 of 10
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* HRIS slide panel */}
            {showHrisModal && (
                <HrisPanel
                    onClose={() => setShowHrisModal(false)}
                    onViewChange={handlePanelViewChange}
                    onSave={handlePanelSave}
                />
            )}

            {/* Resolve Flags panel */}
            {showResolvePanel && (
                <ResolveFlagsPanel
                    employees={employees}
                    onClose={() => setShowResolvePanel(false)}
                    onResolveStep={(s) => {
                        if (s === 1) setResolveTooltipStep(1);
                    }}
                />
            )}

            {/* HRIS guided tooltip — step 0 anchored to button, steps 1–4 bottom-left */}
            {currentTooltip && tooltipStep !== null && tooltipStep > 0 && (
                <GuidedTooltip
                    step={tooltipStep}
                    total={HRIS_TOUR_STEPS.length}
                    title={currentTooltip.title}
                    description={currentTooltip.description}
                    ctaLabel={currentTooltip.ctaLabel}
                    onNext={handleTooltipNext}
                    className="fixed bottom-6 left-6 z-[60]"
                />
            )}

            {/* Resolve Flags guided tooltip */}
            {showResolvePanel && resolveTooltipStep !== null && RESOLVE_FLAGS_TOUR_STEPS[resolveTooltipStep] && (
                <GuidedTooltip
                    step={resolveTooltipStep}
                    total={RESOLVE_FLAGS_TOUR_STEPS.length}
                    title={RESOLVE_FLAGS_TOUR_STEPS[resolveTooltipStep].title}
                    description={RESOLVE_FLAGS_TOUR_STEPS[resolveTooltipStep].description}
                    ctaLabel={RESOLVE_FLAGS_TOUR_STEPS[resolveTooltipStep].ctaLabel}
                    onNext={() => {
                        if (resolveTooltipStep >= RESOLVE_FLAGS_TOUR_STEPS.length - 1) {
                            setResolveTooltipStep(null);
                            setShowResolvePanel(false);
                        } else {
                            setResolveTooltipStep((s) => (s ?? 0) + 1);
                        }
                    }}
                    className="fixed bottom-6 left-6 z-[60]"
                />
            )}
        </div>
    );
}
