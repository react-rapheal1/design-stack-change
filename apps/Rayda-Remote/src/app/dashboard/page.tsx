"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowRight,
    BarChart01,
    Bell01,
    Check,
    CurrencyDollar,
    Globe01,
    Link04,
    Package,
    RefreshCw01,
    SearchMd,
    Settings01,
    Shield01,
    ShoppingBag01,
    Upload01,
    UserPlus01,
    Users01,
    X,
    ZapFast,
} from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

const NAV_ITEMS = [
    { key: "overview",     label: "Overview",      href: "/dashboard" },
    { key: "orders",       label: "Orders",         href: "/orders" },
    { key: "marketplace",  label: "Marketplace",    href: "/onboard-device/marketplace" },
    { key: "catalogs",     label: "Catalogs",       href: "#" },
    { key: "storage",      label: "Storage",        href: "#" },
    { key: "employees",    label: "Employees",      href: "#", id: "nav-employees" },
    { key: "equipment",    label: "All equipment",  href: "#", id: "nav-equipment" },
];

function DashboardNav() {
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
                            item.key === "overview"
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
// Metric card
// ---------------------------------------------------------------------------

function MetricCard({ label, value, icon: Icon }: { label: string; value: string; icon: React.FC<{ className?: string }> }) {
    return (
        <div className="flex flex-col gap-3 rounded-xl border border-[#eaecf0] bg-white p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#f2f4f7]">
                <Icon className="size-5 text-[#667085]" />
            </div>
            <div>
                <p className="text-xs font-medium text-tertiary">{label}</p>
                <p className="mt-1 text-2xl font-bold text-primary">{value}</p>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Quick action card
// ---------------------------------------------------------------------------

function QuickActionCard({
    id,
    icon: Icon,
    title,
    description,
    onClick,
}: {
    id?: string;
    icon: React.FC<{ className?: string }>;
    title: string;
    description: string;
    onClick?: () => void;
}) {
    return (
        <button
            id={id}
            type="button"
            onClick={onClick}
            className="flex items-start gap-3 rounded-xl border border-[#eaecf0] bg-white p-4 text-left transition duration-100 hover:border-brand-200 hover:bg-brand-25"
        >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2f4f7]">
                <Icon className="size-5 text-[#667085]" />
            </div>
            <div>
                <p className="text-sm font-semibold text-secondary">{title}</p>
                <p className="mt-0.5 text-xs text-tertiary">{description}</p>
            </div>
        </button>
    );
}

// ---------------------------------------------------------------------------
// Onboarding modal — 3 questions + import method picker
// ---------------------------------------------------------------------------

const MODAL_QUESTIONS = [
    {
        key: "trackingMethod",
        question: "How are assets currently tracked?",
        hint: "Be honest — most teams start from spreadsheets or nothing at all.",
        options: ["Spreadsheets", "Another asset management tool", "Our MDM only", "No formal tracking"],
    },
    {
        key: "fleetSize",
        question: "Approximately how many devices are in your fleet?",
        hint: "A rough estimate is fine — we'll help you discover the rest.",
        options: ["1–50", "51–200", "201–500", "500+"],
    },
    {
        key: "lostTrack",
        question: "Are there devices you've lost track of?",
        hint: "This is more common than you think.",
        options: ["Yes, quite a few", "A handful", "No, we have a good sense"],
    },
];

const IMPORT_OPTIONS = [
    {
        key: "hris",
        icon: Link04,
        title: "Connect HRIS",
        description: "Auto-import from BambooHR, Workday, Rippling & more",
        recommended: true,
    },
    {
        key: "csv",
        icon: Upload01,
        title: "Upload a CSV",
        description: "Map your existing spreadsheet columns",
        recommended: false,
    },
    {
        key: "manual",
        icon: UserPlus01,
        title: "Add manually",
        description: "Add devices one at a time",
        recommended: false,
    },
    {
        key: "self-report",
        icon: ZapFast,
        title: "Ask employees to self-report equipment",
        description: "Send a form link to your team to log their devices",
        recommended: false,
    },
];

function OnboardingModal({
    onComplete,
    onSkip,
}: {
    onComplete: (method: string) => void;
    onSkip: () => void;
}) {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [importMethod, setImportMethod] = useState("");

    const totalSteps = MODAL_QUESTIONS.length + 1; // 3 questions + import method
    const isImportStep = step === MODAL_QUESTIONS.length;
    const currentQ = !isImportStep ? MODAL_QUESTIONS[step] : null;
    const currentAnswer = currentQ ? (answers[currentQ.key] ?? "") : "";
    const canContinue = isImportStep ? importMethod !== "" : currentAnswer !== "";

    function handleContinue() {
        if (!canContinue) return;
        if (isImportStep) {
            onComplete(importMethod);
        } else {
            setStep((s) => s + 1);
        }
    }

    return (
        <>
            <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">
                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-[#eaecf0] px-6 py-5">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                                Step {step + 1} of {totalSteps}
                            </p>
                            <h2 className="mt-1 text-lg font-bold text-primary">
                                {isImportStep
                                    ? "How would you like to build your asset inventory?"
                                    : currentQ?.question}
                            </h2>
                            <p className="mt-1 text-sm text-tertiary">
                                {isImportStep
                                    ? "Choose the method that works best for your current setup."
                                    : currentQ?.hint}
                            </p>
                        </div>
                        <button
                            onClick={onSkip}
                            className="ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-tertiary transition duration-100 hover:bg-[#f2f4f7]"
                        >
                            <X className="size-4" />
                        </button>
                    </div>

                    {/* Progress bar */}
                    <div className="flex gap-1 px-6 pt-4">
                        {Array.from({ length: totalSteps }).map((_, i) => (
                            <div
                                key={i}
                                className={cx(
                                    "h-1 flex-1 rounded-full transition-all duration-300",
                                    i < step ? "bg-brand-600" : i === step ? "bg-brand-300" : "bg-[#eaecf0]",
                                )}
                            />
                        ))}
                    </div>

                    {/* Options */}
                    <div className="px-6 py-5">
                        {currentQ && (
                            <div className="flex flex-wrap gap-2">
                                {currentQ.options.map((opt) => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setAnswers((p) => ({ ...p, [currentQ.key]: opt }))}
                                        className={cx(
                                            "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition duration-100 cursor-pointer",
                                            currentAnswer === opt
                                                ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                                                : "border-[#d0d5dd] bg-white text-secondary hover:border-brand-300 hover:bg-brand-25",
                                        )}
                                    >
                                        {currentAnswer === opt && <Check className="size-3.5 shrink-0 text-brand-600" />}
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        )}

                        {isImportStep && (
                            <div className="flex flex-col gap-2">
                                {IMPORT_OPTIONS.map((opt) => {
                                    const Icon = opt.icon;
                                    const isSelected = importMethod === opt.key;
                                    return (
                                        <button
                                            key={opt.key}
                                            type="button"
                                            onClick={() => setImportMethod(opt.key)}
                                            className={cx(
                                                "flex items-center gap-4 rounded-xl border px-4 py-3 text-left transition duration-100 cursor-pointer",
                                                isSelected
                                                    ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                                                    : "border-[#eaecf0] bg-white hover:border-brand-300 hover:bg-brand-25",
                                            )}
                                        >
                                            <div className={cx(
                                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                                                isSelected ? "bg-brand-100" : "bg-[#f2f4f7]",
                                            )}>
                                                <Icon className={cx("size-[18px]", isSelected ? "text-brand-600" : "text-[#667085]")} />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className={cx(
                                                        "text-sm font-semibold",
                                                        isSelected ? "text-brand-700" : "text-secondary",
                                                    )}>
                                                        {opt.title}
                                                    </span>
                                                    {opt.recommended && (
                                                        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
                                                            Recommended
                                                        </span>
                                                    )}
                                                </div>
                                                <p className="mt-0.5 text-xs text-tertiary">{opt.description}</p>
                                            </div>
                                            {isSelected && <Check className="size-4 shrink-0 text-brand-600" />}
                                        </button>
                                    );
                                })}
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between border-t border-[#eaecf0] px-6 py-4">
                        <button
                            onClick={onSkip}
                            className="text-sm font-medium text-tertiary transition duration-100 hover:text-secondary"
                        >
                            Skip for now
                        </button>
                        <Button
                            size="md"
                            iconTrailing={ArrowRight}
                            isDisabled={!canContinue}
                            onClick={handleContinue}
                        >
                            {isImportStep ? "Get started" : "Continue"}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}

// ---------------------------------------------------------------------------
// Main dashboard page
// ---------------------------------------------------------------------------

// Destination pages per import method
const TOUR_DESTINATIONS: Record<string, string> = {
    hris:          "/employees?tour=hris",
    csv:           "/equipment?tour=csv",
    manual:        "/equipment?tour=manual",
    "self-report": "/equipment?tour=self-report",
};

export default function DashboardPage() {
    const router = useRouter();
    const [showModal, setShowModal] = useState(true);

    function handleModalComplete(method: string) {
        const dest = TOUR_DESTINATIONS[method];
        if (dest) {
            router.push(dest);
        } else {
            setShowModal(false);
        }
    }

    return (
        <div className="flex h-screen flex-col overflow-hidden bg-[#f9fafb]">
            <DashboardNav />

            <div className="flex-1 overflow-y-auto">
                <div className="page-px py-6 lg:py-8">
                    {/* Page header */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-primary">Overview</h1>
                            <p className="mt-1 text-sm text-tertiary">A quick snapshot of your account</p>
                        </div>
                        <div className="flex gap-2">
                            <Button color="secondary" size="sm">Export report</Button>
                            <Button size="sm">+ Invite</Button>
                        </div>
                    </div>

                    {/* Setup banner — only shown when modal is dismissed */}
                    {!showModal && (
                        <div className="mt-6 flex items-center justify-between rounded-xl border border-brand-200 bg-brand-50 px-6 py-4">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100">
                                    <ZapFast className="size-5 text-brand-600" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-brand-700">Your dashboard is ready — let's fill it in</p>
                                    <p className="text-sm text-brand-600">Import your devices to start tracking inventory, assignments, and refresh schedules.</p>
                                </div>
                            </div>
                            <Button size="sm" onClick={() => setShowModal(true)}>Set up now</Button>
                        </div>
                    )}

                    {/* Metric cards */}
                    <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                        <MetricCard label="Total employees" value="—" icon={Users01} />
                        <MetricCard label="Total inventory" value="—" icon={Package} />
                        <MetricCard label="Active orders"   value="—" icon={ShoppingBag01} />
                        <MetricCard label="Active catalogs" value="—" icon={Globe01} />
                        <MetricCard label="Total order value" value="—" icon={CurrencyDollar} />
                    </div>

                    {/* What do you want to do today? */}
                    <div className="mt-8">
                        <p className="text-base font-semibold text-primary">What do you want to do today?</p>
                        <p className="mt-0.5 text-sm text-tertiary">Select an option to manage equipment and employee resources.</p>
                        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                            <QuickActionCard
                                id="action-equip"
                                icon={Users01}
                                title="Equip your employee"
                                description="Give employees top-quality work tools."
                            />
                            <QuickActionCard
                                id="action-offboard"
                                icon={RefreshCw01}
                                title="Off-board devices"
                                description="Gather all employee equipment and secure it."
                            />
                            <QuickActionCard
                                id="action-catalog"
                                icon={BarChart01}
                                title="Create Micro-Catalogs"
                                description="Create organized equipment lists for each department."
                            />
                            <QuickActionCard
                                id="action-service"
                                icon={Shield01}
                                title="Service contract for equipment"
                                description="Offer support for any equipment issues."
                            />
                        </div>
                    </div>

                    {/* What's happening — empty state */}
                    <div className="mt-8">
                        <p className="text-base font-semibold text-primary">What's happening?</p>
                        <p className="mt-0.5 text-sm text-tertiary">Stay updated on key metrics and recent activities within your organization.</p>
                        <div className="mt-4 flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-dashed border-[#d0d5dd] bg-white px-8 py-12 text-center">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f2f4f7]">
                                <BarChart01 className="size-6 text-[#667085]" />
                            </div>
                            <p className="mt-3 text-sm font-semibold text-secondary">No data yet</p>
                            <p className="mt-1 text-sm text-tertiary">Import your devices to start seeing activity, metrics, and trends.</p>
                            <Button size="sm" color="secondary" className="mt-4" onClick={() => setShowModal(true)}>
                                Import devices
                            </Button>
                        </div>
                    </div>

                    {/* Recent orders — empty state */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-base font-semibold text-primary">Recent orders</p>
                                <p className="mt-0.5 text-sm text-tertiary">View the latest orders placed.</p>
                            </div>
                            <Button color="secondary" size="sm">View orders</Button>
                        </div>
                        <div className="mt-4 flex min-h-[140px] flex-col items-center justify-center rounded-xl border border-dashed border-[#d0d5dd] bg-white px-8 py-10 text-center">
                            <p className="text-sm font-semibold text-secondary">No orders yet</p>
                            <p className="mt-1 text-sm text-tertiary">Orders will appear here once devices have been requested.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Onboarding modal */}
            {showModal && (
                <OnboardingModal
                    onComplete={handleModalComplete}
                    onSkip={() => setShowModal(false)}
                />
            )}
        </div>
    );
}
