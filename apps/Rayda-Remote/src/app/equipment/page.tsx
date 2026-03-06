"use client";

import { useCallback, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    ArrowRight,
    Bell01,
    Check,
    Mail01,
    Package,
    Plus,
    SearchMd,
    Settings01,
    Upload01,
    UserPlus01,
    X,
    ZapFast,
} from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { Button } from "@/components/base/buttons/button";
import { GuidedTooltip } from "@/components/guided-tooltip";
import { cx } from "@/utils/cx";

// ---------------------------------------------------------------------------
// Shared nav
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
    { key: "overview",    label: "Overview",     href: "/dashboard" },
    { key: "orders",      label: "Orders",        href: "/orders" },
    { key: "marketplace", label: "Marketplace",   href: "/onboard-device/marketplace" },
    { key: "catalogs",    label: "Catalogs",      href: "#" },
    { key: "storage",     label: "Storage",       href: "#" },
    { key: "employees",   label: "Employees",     href: "/employees" },
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
// CSV upload modal
// ---------------------------------------------------------------------------

function CsvUploadModal({ onClose }: { onClose: () => void }) {
    const [stage, setStage] = useState<"upload" | "mapping" | "done">("upload");
    const [dragging, setDragging] = useState(false);
    const [fileName, setFileName] = useState("");

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
                        <div>
                            <h2 className="text-base font-bold text-primary">
                                {stage === "upload" ? "Upload equipment CSV" : stage === "mapping" ? "Map your columns" : "Import complete"}
                            </h2>
                            <p className="mt-0.5 text-sm text-tertiary">
                                {stage === "upload"
                                    ? "Drag & drop your file or click to browse."
                                    : stage === "mapping"
                                    ? "Match your spreadsheet columns to Rayda fields."
                                    : "Your devices have been imported successfully."}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]"
                        >
                            <X className="size-4" />
                        </button>
                    </div>

                    {stage === "upload" && (
                        <>
                            <div className="p-6">
                                <div
                                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                                    onDragLeave={() => setDragging(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDragging(false);
                                        const file = e.dataTransfer.files[0];
                                        if (file) setFileName(file.name);
                                    }}
                                    className={cx(
                                        "flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 text-center transition duration-100",
                                        dragging ? "border-brand-400 bg-brand-50" : "border-[#d0d5dd] bg-[#f9fafb]",
                                    )}
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                                        <Upload01 className="size-6 text-brand-600" />
                                    </div>
                                    <p className="mt-3 text-sm font-semibold text-secondary">
                                        {fileName || "Drop your CSV here"}
                                    </p>
                                    <p className="mt-1 text-xs text-tertiary">
                                        {fileName ? "Ready to upload" : "or click to browse · CSV files only"}
                                    </p>
                                </div>

                                <p className="mt-4 text-xs text-tertiary">
                                    Need a template? <a href="#" className="font-medium text-brand-600 hover:text-brand-700">Download sample CSV</a>
                                </p>
                            </div>
                            <div className="flex justify-end gap-2 border-t border-[#eaecf0] px-6 py-4">
                                <Button color="secondary" size="sm" onClick={onClose}>Cancel</Button>
                                <Button
                                    size="sm"
                                    iconTrailing={ArrowRight}
                                    isDisabled={!fileName}
                                    onClick={() => setStage("mapping")}
                                >
                                    Continue
                                </Button>
                            </div>
                        </>
                    )}

                    {stage === "mapping" && (
                        <>
                            <div className="divide-y divide-[#eaecf0] px-6 py-4">
                                {[
                                    { csv: "Device Name",   rayda: "Device name" },
                                    { csv: "Serial No.",    rayda: "Serial number" },
                                    { csv: "Assigned To",   rayda: "Assigned employee" },
                                    { csv: "Condition",     rayda: "Device condition" },
                                ].map((row) => (
                                    <div key={row.csv} className="flex items-center justify-between py-3">
                                        <span className="rounded-md bg-[#f2f4f7] px-2 py-1 text-xs font-mono text-secondary">{row.csv}</span>
                                        <ArrowRight className="size-4 shrink-0 text-tertiary" />
                                        <span className="text-sm font-medium text-secondary">{row.rayda}</span>
                                        <Check className="size-4 text-green-500" />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-2 border-t border-[#eaecf0] px-6 py-4">
                                <Button color="secondary" size="sm" onClick={() => setStage("upload")}>Back</Button>
                                <Button size="sm" onClick={() => setStage("done")}>Import devices</Button>
                            </div>
                        </>
                    )}

                    {stage === "done" && (
                        <div className="flex flex-col items-center px-6 py-10 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-25">
                                <Check className="size-7 text-green-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-primary">Import complete!</h3>
                            <p className="mt-2 text-sm text-tertiary">
                                Your devices have been added. Review them below and confirm any that need attention.
                            </p>
                            <Button size="md" className="mt-6" onClick={onClose}>View inventory</Button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Add device modal (manual)
// ---------------------------------------------------------------------------

function AddDeviceModal({ onClose }: { onClose: () => void }) {
    const [saved, setSaved] = useState(false);

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
                        <div>
                            <h2 className="text-base font-bold text-primary">Add device</h2>
                            <p className="mt-0.5 text-sm text-tertiary">Enter the details of the device you want to add.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]"
                        >
                            <X className="size-4" />
                        </button>
                    </div>

                    {saved ? (
                        <div className="flex flex-col items-center px-6 py-10 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-25">
                                <Check className="size-7 text-green-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-primary">Device added!</h3>
                            <p className="mt-2 text-sm text-tertiary">Your device has been added to the inventory.</p>
                            <Button size="md" className="mt-6" onClick={onClose}>View inventory</Button>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4 p-6">
                                {[
                                    { label: "Device name", placeholder: "e.g. MacBook Pro 14\"" },
                                    { label: "Serial number", placeholder: "e.g. C02X1234ABC" },
                                    { label: "Assigned employee", placeholder: "e.g. Olivia Rhye" },
                                    { label: "Condition", placeholder: "New / Used / Refurbished" },
                                ].map((field) => (
                                    <div key={field.label}>
                                        <label className="mb-1.5 block text-sm font-medium text-secondary">{field.label}</label>
                                        <input
                                            type="text"
                                            placeholder={field.placeholder}
                                            className="w-full rounded-lg border border-[#d0d5dd] px-3 py-2.5 text-sm text-primary placeholder:text-placeholder focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-end gap-2 border-t border-[#eaecf0] px-6 py-4">
                                <Button color="secondary" size="sm" onClick={onClose}>Cancel</Button>
                                <Button size="sm" iconLeading={Check} onClick={() => setSaved(true)}>
                                    Save device
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Self-report modal
// ---------------------------------------------------------------------------

function SelfReportModal({ onClose }: { onClose: () => void }) {
    const [sent, setSent] = useState(false);
    const [emails, setEmails] = useState("");

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4">
                        <div>
                            <h2 className="text-base font-bold text-primary">Send self-report form</h2>
                            <p className="mt-0.5 text-sm text-tertiary">Employees fill out a simple form listing their equipment.</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]"
                        >
                            <X className="size-4" />
                        </button>
                    </div>

                    {sent ? (
                        <div className="flex flex-col items-center px-6 py-10 text-center">
                            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50 ring-8 ring-green-25">
                                <Check className="size-7 text-green-600" />
                            </div>
                            <h3 className="mt-4 text-lg font-bold text-primary">Invites sent!</h3>
                            <p className="mt-2 text-sm text-tertiary">
                                Your employees will receive an email with a link to report their equipment. Responses will appear here automatically.
                            </p>
                            <Button size="md" className="mt-6" onClick={onClose}>Done</Button>
                        </div>
                    ) : (
                        <>
                            <div className="p-6">
                                <div className="rounded-xl border border-brand-200 bg-brand-50 p-4">
                                    <p className="text-sm font-semibold text-brand-700">How it works</p>
                                    <ol className="mt-2 flex flex-col gap-1.5 text-sm text-brand-600">
                                        <li>1. Enter your employees' email addresses below</li>
                                        <li>2. They receive a simple form asking about their equipment</li>
                                        <li>3. Responses are automatically added to your inventory</li>
                                    </ol>
                                </div>

                                <div className="mt-4">
                                    <label className="mb-1.5 block text-sm font-medium text-secondary">
                                        Employee emails
                                    </label>
                                    <textarea
                                        rows={4}
                                        placeholder="olivia@company.com, phoenix@company.com, lana@company.com"
                                        value={emails}
                                        onChange={(e) => setEmails(e.target.value)}
                                        className="w-full resize-none rounded-lg border border-[#d0d5dd] px-3 py-2.5 text-sm text-primary placeholder:text-placeholder focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600"
                                    />
                                    <p className="mt-1 text-xs text-tertiary">Separate multiple emails with a comma</p>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 border-t border-[#eaecf0] px-6 py-4">
                                <Button color="secondary" size="sm" onClick={onClose}>Cancel</Button>
                                <Button
                                    size="sm"
                                    iconLeading={Mail01}
                                    isDisabled={!emails.trim()}
                                    onClick={() => setSent(true)}
                                >
                                    Send invites
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Tour step definitions
// ---------------------------------------------------------------------------

const TOUR_STEPS: Record<string, { title: string; description: string; actionStep?: number }[]> = {
    csv: [
        {
            title: "Welcome to All Equipment",
            description: "This is your central device inventory. Everything your team owns or has been assigned will live here.",
        },
        {
            title: "Import your CSV",
            description: "Click 'Import CSV' to upload your spreadsheet. We'll walk you through mapping your columns to Rayda fields.",
            actionStep: 1,
        },
        {
            title: "Map your columns",
            description: "Match your spreadsheet headers to Rayda fields. We auto-detect most common formats — just confirm and import.",
        },
        {
            title: "Review and confirm",
            description: "After importing, check for any devices flagged as unassigned or with missing data, then confirm your inventory.",
        },
    ],
    manual: [
        {
            title: "Welcome to All Equipment",
            description: "This is your central device inventory. You can add devices here one at a time with full control over every field.",
        },
        {
            title: "Add your first device",
            description: "Click 'Add Device' to manually enter a device. You'll fill in the name, serial number, assigned employee, and condition.",
            actionStep: 1,
        },
        {
            title: "Keep building your inventory",
            description: "Add as many devices as you need. You can always come back and add more, or switch to CSV import for bulk uploads.",
        },
    ],
    "self-report": [
        {
            title: "Welcome to All Equipment",
            description: "This is your central device inventory. Once employees submit their self-report forms, their equipment appears here automatically.",
        },
        {
            title: "Send the self-report form",
            description: "Click 'Send self-report' to email your team. Each employee gets a simple form asking what equipment they're using.",
            actionStep: 1,
        },
        {
            title: "Responses fill your inventory",
            description: "As employees submit responses, devices are automatically added here. You can review, edit, or merge entries as needed.",
        },
    ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function EquipmentPage() {
    const searchParams = useSearchParams();
    const tour = searchParams.get("tour") ?? "";
    const steps = TOUR_STEPS[tour] ?? [];
    const isTourActive = steps.length > 0;

    const [tooltipStep, setTooltipStep] = useState<number | null>(isTourActive ? 0 : null);
    const [showCsvModal, setShowCsvModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSelfReportModal, setShowSelfReportModal] = useState(false);

    const currentTooltip = tooltipStep !== null ? steps[tooltipStep] : null;

    function handleTooltipNext() {
        if (tooltipStep === null) return;
        const step = steps[tooltipStep];

        // Open the relevant modal on action steps
        if (step?.actionStep === 1) {
            if (tour === "csv")           setShowCsvModal(true);
            if (tour === "manual")        setShowAddModal(true);
            if (tour === "self-report")   setShowSelfReportModal(true);
        }

        if (tooltipStep >= steps.length - 1) {
            setTooltipStep(null);
        } else {
            setTooltipStep((s) => (s ?? 0) + 1);
        }
    }

    const isActionStep = currentTooltip?.actionStep === 1;

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#f9fafb]">
            <DashboardNav activeKey="equipment" />

            <div className="flex-1 overflow-y-auto">
                <div className="page-px py-6 lg:py-8">
                    {/* Page header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-primary">All Equipment</h1>
                            <p className="mt-1 text-sm text-tertiary">
                                Manage all devices across your organization — assignments, conditions, and refresh schedules.
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            {(tour === "csv" || !tour) && (
                                <Button
                                    color="secondary"
                                    size="sm"
                                    iconLeading={Upload01}
                                    onClick={() => setShowCsvModal(true)}
                                    className={cx(isActionStep && tour === "csv" && "ring-2 ring-brand-400 ring-offset-2")}
                                >
                                    Import CSV
                                </Button>
                            )}
                            {(tour === "self-report" || !tour) && (
                                <Button
                                    color="secondary"
                                    size="sm"
                                    iconLeading={ZapFast}
                                    onClick={() => setShowSelfReportModal(true)}
                                    className={cx(isActionStep && tour === "self-report" && "ring-2 ring-brand-400 ring-offset-2")}
                                >
                                    Send self-report
                                </Button>
                            )}
                            <Button
                                size="sm"
                                iconLeading={Plus}
                                onClick={() => setShowAddModal(true)}
                                className={cx(isActionStep && tour === "manual" && "ring-2 ring-brand-400 ring-offset-2")}
                            >
                                Add Device
                            </Button>
                        </div>
                    </div>

                    {/* Tour context banner */}
                    {isTourActive && tooltipStep !== null && tooltipStep < 2 && (
                        <div className={cx(
                            "mt-6 flex items-center gap-3 rounded-xl border px-5 py-3.5",
                            tour === "csv"          && "border-blue-200 bg-blue-50",
                            tour === "manual"       && "border-purple-200 bg-purple-50",
                            tour === "self-report"  && "border-teal-200 bg-teal-50",
                        )}>
                            <p className={cx(
                                "text-sm",
                                tour === "csv"         && "text-blue-700",
                                tour === "manual"      && "text-purple-700",
                                tour === "self-report" && "text-teal-700",
                            )}>
                                <strong>Step {(tooltipStep ?? 0) + 1} of {steps.length}:</strong>{" "}
                                {tooltipStep === 0
                                    ? "You're on the All Equipment page. Click Continue on the guide to proceed."
                                    : tour === "csv"
                                    ? "Click 'Import CSV' above to upload your spreadsheet."
                                    : tour === "manual"
                                    ? "Click 'Add Device' above to add your first device."
                                    : "Click 'Send self-report' above to email your team."}
                            </p>
                        </div>
                    )}

                    {/* Empty equipment table */}
                    <div className="mt-6 overflow-hidden rounded-xl border border-[#eaecf0] bg-white">
                        <div className="flex items-center justify-between border-b border-[#eaecf0] px-5 py-4">
                            <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold text-primary">Equipment</p>
                                <span className="rounded-full bg-[#f2f4f7] px-2 py-0.5 text-xs font-semibold text-tertiary">
                                    0 devices
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="flex h-9 items-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-3 text-sm text-tertiary">
                                    <SearchMd className="size-4 text-[#667085]" />
                                    <span>Search</span>
                                </div>
                                <Button color="secondary" size="sm" iconLeading={Settings01}>
                                    Filter
                                </Button>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 border-b border-[#eaecf0] bg-[#f9fafb] px-5 py-3 text-xs font-semibold text-tertiary">
                            <span>Device</span>
                            <span>Serial number</span>
                            <span>Assigned to</span>
                            <span>Condition</span>
                            <span>Status</span>
                        </div>

                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2f4f7]">
                                <Package className="size-6 text-[#667085]" />
                            </div>
                            <p className="mt-3 text-sm font-semibold text-secondary">No devices yet</p>
                            <p className="mt-1 text-sm text-tertiary">
                                {tour === "csv"
                                    ? "Upload a CSV to bulk-import your device inventory."
                                    : tour === "manual"
                                    ? "Add devices one at a time to build your inventory."
                                    : tour === "self-report"
                                    ? "Send a self-report form so employees can log their devices."
                                    : "Add or import devices to start tracking your inventory."}
                            </p>
                            <div className="mt-4 flex gap-2">
                                {tour === "csv" && (
                                    <Button size="sm" iconLeading={Upload01} onClick={() => setShowCsvModal(true)}>
                                        Import CSV
                                    </Button>
                                )}
                                {tour === "manual" && (
                                    <Button size="sm" iconLeading={UserPlus01} onClick={() => setShowAddModal(true)}>
                                        Add device
                                    </Button>
                                )}
                                {tour === "self-report" && (
                                    <Button size="sm" iconLeading={ZapFast} onClick={() => setShowSelfReportModal(true)}>
                                        Send self-report
                                    </Button>
                                )}
                                {!tour && (
                                    <>
                                        <Button size="sm" iconLeading={Upload01} onClick={() => setShowCsvModal(true)}>
                                            Import CSV
                                        </Button>
                                        <Button color="secondary" size="sm" iconLeading={Plus} onClick={() => setShowAddModal(true)}>
                                            Add device
                                        </Button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            {showCsvModal        && <CsvUploadModal   onClose={() => setShowCsvModal(false)} />}
            {showAddModal        && <AddDeviceModal   onClose={() => setShowAddModal(false)} />}
            {showSelfReportModal && <SelfReportModal  onClose={() => setShowSelfReportModal(false)} />}

            {/* Guided tooltip */}
            {currentTooltip && tooltipStep !== null && (
                <GuidedTooltip
                    step={tooltipStep}
                    total={steps.length}
                    title={currentTooltip.title}
                    description={currentTooltip.description}
                    onNext={handleTooltipNext}
                    onSkip={() => setTooltipStep(null)}
                />
            )}
        </div>
    );
}
