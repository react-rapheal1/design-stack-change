"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle,
    ChevronRight,
    Eye,
    Lightning01,
    Link04,
    Upload01,
    UserPlus01,
    Wifi,
    ZapFast,
} from "@untitledui/icons";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Answers = Record<string, string | string[]>;

// ---------------------------------------------------------------------------
// Goal 1 follow-up questions
// ---------------------------------------------------------------------------

const GOAL1_QUESTIONS = [
    {
        key: "trackingMethod",
        question: "How are assets currently tracked?",
        hint: "Be honest — most teams start from spreadsheets or nothing at all.",
        options: ["Spreadsheets", "Another asset management tool", "Our MDM only", "No formal tracking"],
        multiSelect: false,
    },
    {
        key: "fleetSize",
        question: "Approximately how many devices are in your fleet?",
        hint: "A rough estimate is fine — we'll help you discover the rest.",
        options: ["1–50", "51–200", "201–500", "500+"],
        multiSelect: false,
    },
    {
        key: "lostTrack",
        question: "Are there devices you've lost track of or are unsure who has them?",
        hint: "This is more common than you think.",
        options: ["Yes, quite a few", "A handful", "No, we have a good sense"],
        multiSelect: false,
    },
    {
        key: "importMethod",
        question: "How would you like to build your asset inventory?",
        hint: "Pick the method that works best for your current setup.",
        options: ["Connect HRIS (auto-import)", "Upload a CSV", "Add manually", "Install WiFi probe", "Ask employees to self-report"],
        multiSelect: false,
    },
];

// ---------------------------------------------------------------------------
// Mission steps
// ---------------------------------------------------------------------------

const MISSION_STEPS = [
    {
        id: "A",
        title: "Import / Connect",
        description: "Choose your import method. We'll pull in your devices and map them to your team.",
    },
    {
        id: "B",
        title: "AI Teammate Processes",
        description: "Rayda discovers devices, maps them to employees, and flags unassigned assets.",
    },
    {
        id: "C",
        title: "Review & Confirm",
        description: "Review your inventory. Confirm assignments and resolve any flagged items.",
    },
    {
        id: "D",
        title: "Mission Complete",
        description: "Your IT Health Score is unlocked and your inventory is live.",
    },
];

// ---------------------------------------------------------------------------
// Shared progress bar
// ---------------------------------------------------------------------------

function ProgressBar({ current, total }: { current: number; total: number }) {
    return (
        <div className="flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    className={cx(
                        "h-1 flex-1 rounded-full transition-all duration-300",
                        i < current ? "bg-brand-600" : i === current ? "bg-brand-300" : "bg-[#eaecf0]",
                    )}
                />
            ))}
        </div>
    );
}

// ---------------------------------------------------------------------------
// Option chip
// ---------------------------------------------------------------------------

function OptionChip({
    label,
    selected,
    onClick,
}: {
    label: string;
    selected: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={cx(
                "flex items-center gap-2 rounded-xl border px-4 py-3 text-left text-sm font-medium transition duration-100",
                selected
                    ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                    : "border-[#d0d5dd] bg-white text-secondary hover:border-brand-300 hover:bg-brand-25",
            )}
        >
            {selected && <Check className="size-4 shrink-0 text-brand-600" />}
            {label}
        </button>
    );
}

// ---------------------------------------------------------------------------
// Side panel (reused from onboarding, goal-1 themed)
// ---------------------------------------------------------------------------

function Goal1SidePanel({ missionStep }: { missionStep: number }) {
    return (
        <div className="relative flex h-full flex-col overflow-hidden bg-[#101828]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full bg-brand-600/15 blur-[100px]" />
                <div className="absolute -bottom-24 -right-16 h-[300px] w-[300px] rounded-full bg-brand-900/30 blur-[80px]" />
            </div>

            <div className="relative flex h-full flex-col px-8 py-8">
                <RaydaLogo variant="white" />

                <div className="mt-12 flex-1">
                    <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600">
                            <Eye className="size-4 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-brand-300">Goal 1</span>
                    </div>
                    <h2 className="mt-3 text-xl font-bold leading-7 text-white">
                        Get visibility into what you actually have
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#98a2b3]">
                        The universal starting point. Nearly every IT manager signing up has some version of this problem.
                    </p>

                    {/* Mission steps */}
                    <div className="mt-8 flex flex-col gap-2">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#667085]">Mission steps</p>
                        {MISSION_STEPS.map((ms, idx) => {
                            const isDone = missionStep > idx + GOAL1_QUESTIONS.length;
                            const isActive = missionStep === idx + GOAL1_QUESTIONS.length;
                            return (
                                <div
                                    key={ms.id}
                                    className={cx(
                                        "flex items-start gap-3 rounded-xl p-3 transition",
                                        isActive ? "bg-white/10" : "bg-transparent",
                                    )}
                                >
                                    <div className={cx(
                                        "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                                        isDone ? "bg-brand-600 text-white" : isActive ? "bg-brand-400 text-white" : "bg-white/10 text-[#667085]",
                                    )}>
                                        {isDone ? <Check className="size-3.5" /> : ms.id}
                                    </div>
                                    <div>
                                        <p className={cx("text-sm font-semibold", isActive || isDone ? "text-white" : "text-[#667085]")}>
                                            {ms.title}
                                        </p>
                                        {isActive && (
                                            <p className="mt-0.5 text-xs text-[#98a2b3]">{ms.description}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Completion preview */}
                <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs font-semibold text-brand-400">Mission completion state</p>
                    <p className="mt-1 text-xs italic text-[#667085]">
                        "You've imported 47 devices and 3 need employee confirmation."
                    </p>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Step: import method picker (Mission Step A)
// ---------------------------------------------------------------------------

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
        key: "wifi",
        icon: Wifi,
        title: "Install WiFi probe",
        description: "Discover devices on your network automatically",
        recommended: false,
    },
    {
        key: "self-report",
        icon: ZapFast,
        title: "Ask employees to self-report",
        description: "Send a form to your team",
        recommended: false,
    },
];

function ImportMethodStep({
    selected,
    onSelect,
}: {
    selected: string;
    onSelect: (key: string) => void;
}) {
    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold text-primary">Import / Connect your devices</h2>
                <p className="mt-2 text-base text-tertiary">
                    Choose how you'd like to build your asset inventory. We recommend connecting your HRIS for the fastest setup.
                </p>
            </div>

            <div className="flex flex-col gap-3">
                {IMPORT_OPTIONS.map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = selected === opt.key;
                    return (
                        <button
                            key={opt.key}
                            type="button"
                            onClick={() => onSelect(opt.key)}
                            className={cx(
                                "flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition duration-100",
                                isSelected
                                    ? "border-brand-600 bg-brand-50 ring-1 ring-brand-600"
                                    : "border-[#eaecf0] bg-white hover:border-brand-300 hover:bg-brand-25",
                            )}
                        >
                            <div className={cx(
                                "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
                                isSelected ? "bg-brand-100" : "bg-[#f2f4f7]",
                            )}>
                                <Icon className={cx("size-5", isSelected ? "text-brand-600" : "text-[#667085]")} />
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className={cx("text-sm font-semibold", isSelected ? "text-brand-700" : "text-secondary")}>
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
                            {isSelected && <Check className="size-5 shrink-0 text-brand-600" />}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Step: AI processing (Mission Step B)
// ---------------------------------------------------------------------------

function AIProcessingStep() {
    return (
        <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="relative mb-8">
                <div className="h-20 w-20 animate-spin rounded-full border-4 border-brand-100 border-t-brand-600" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <Lightning01 className="size-8 text-brand-600" />
                </div>
            </div>

            <h2 className="text-2xl font-bold text-primary">AI Teammate is working…</h2>
            <p className="mt-3 max-w-sm text-base text-tertiary">
                Discovering devices, mapping them to your employees, and flagging anything that needs your attention.
            </p>

            <div className="mt-8 flex w-full max-w-md flex-col gap-3">
                {[
                    { label: "Pulling employee directory", done: true },
                    { label: "Matching devices to employees", done: true },
                    { label: "Flagging unassigned devices", done: false },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl border border-[#eaecf0] bg-white px-4 py-3">
                        {item.done ? (
                            <CheckCircle className="size-5 shrink-0 text-brand-600" />
                        ) : (
                            <div className="h-5 w-5 shrink-0 animate-pulse rounded-full bg-brand-200" />
                        )}
                        <span className={cx("text-sm font-medium", item.done ? "text-secondary" : "text-tertiary")}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Step: Review inventory (Mission Step C)
// ---------------------------------------------------------------------------

const MOCK_DEVICES = [
    { name: "MacBook Pro 14\"", serial: "C02X1234ABC", user: "Sarah Chen", status: "confirmed" },
    { name: "MacBook Air M2", serial: "C02Y5678DEF", user: "Marcus Johnson", status: "confirmed" },
    { name: "Dell XPS 15", serial: "DXPS9876GHI", user: "Unassigned", status: "needs-confirmation" },
    { name: "MacBook Pro 16\"", serial: "C02Z4321JKL", user: "Unknown", status: "needs-confirmation" },
    { name: "Lenovo ThinkPad", serial: "LNV1122MNO", user: "Priya Sharma", status: "confirmed" },
    { name: "HP EliteBook 840", serial: "HP8765PQR", user: "James Wu", status: "confirmed" },
];

function ReviewInventoryStep({ onConfirm }: { onConfirm: () => void }) {
    const [confirmed, setConfirmed] = useState<Set<number>>(new Set());

    const needsAction = MOCK_DEVICES.filter((d) => d.status === "needs-confirmation");
    const allConfirmed = MOCK_DEVICES.filter((d) => d.status === "confirmed");

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h2 className="text-2xl font-bold text-primary">Review your inventory</h2>
                <p className="mt-2 text-base text-tertiary">
                    We found <strong>{MOCK_DEVICES.length} devices</strong>. Review the ones that need your attention.
                </p>
            </div>

            {/* Flagged items */}
            {needsAction.length > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                    <p className="mb-3 text-sm font-semibold text-amber-800">
                        {needsAction.length} devices need confirmation
                    </p>
                    <div className="flex flex-col gap-2">
                        {needsAction.map((device, idx) => (
                            <div key={idx} className="flex items-center justify-between rounded-lg bg-white px-3 py-2.5">
                                <div>
                                    <p className="text-sm font-medium text-primary">{device.name}</p>
                                    <p className="text-xs text-tertiary">{device.serial}</p>
                                </div>
                                {confirmed.has(idx) ? (
                                    <div className="flex items-center gap-1.5 text-brand-600">
                                        <CheckCircle className="size-4" />
                                        <span className="text-xs font-semibold">Confirmed</span>
                                    </div>
                                ) : (
                                    <Button
                                        size="sm"
                                        color="secondary"
                                        onClick={() => setConfirmed((prev) => new Set([...prev, idx]))}
                                    >
                                        Confirm
                                    </Button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Confirmed devices */}
            <div className="overflow-hidden rounded-xl border border-[#eaecf0]">
                <div className="border-b border-[#eaecf0] bg-[#f9fafb] px-4 py-2.5">
                    <p className="text-xs font-semibold text-tertiary">
                        {allConfirmed.length} confirmed devices
                    </p>
                </div>
                <div className="divide-y divide-[#eaecf0]">
                    {allConfirmed.map((device, idx) => (
                        <div key={idx} className="flex items-center justify-between px-4 py-3">
                            <div>
                                <p className="text-sm font-medium text-primary">{device.name}</p>
                                <p className="text-xs text-tertiary">{device.user} · {device.serial}</p>
                            </div>
                            <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5">
                                <Check className="size-3 text-green-600" />
                                <span className="text-[11px] font-medium text-green-700">Active</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Mission complete screen
// ---------------------------------------------------------------------------

function MissionCompleteStep() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center py-8 text-center">
            {/* Trophy icon */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 ring-8 ring-brand-25">
                <CheckCircle className="size-10 text-brand-600" />
            </div>

            <h2 className="mt-6 text-3xl font-bold text-primary">Mission complete!</h2>
            <p className="mt-3 max-w-sm text-base text-tertiary">
                You've imported 47 devices and 3 need employee confirmation.
            </p>

            {/* IT Health score */}
            <div className="mt-8 w-full max-w-sm rounded-2xl border border-[#eaecf0] bg-white p-6 shadow-sm">
                <p className="text-sm font-semibold text-tertiary">Your IT Health Score</p>
                <div className="mt-3 flex items-end gap-2">
                    <span className="text-5xl font-bold text-primary">22</span>
                    <span className="mb-1 text-lg text-tertiary">/ 100</span>
                </div>
                <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#eaecf0]">
                    <div className="h-full rounded-full bg-brand-600 transition-all duration-1000" style={{ width: "22%" }} />
                </div>
                <p className="mt-2 text-xs text-tertiary">Complete more goals to increase your score.</p>
            </div>

            {/* Quick wins */}
            <div className="mt-6 flex w-full max-w-sm flex-col gap-3">
                <p className="text-left text-sm font-semibold text-secondary">Quick wins we spotted</p>
                {[
                    { text: "3 devices have unknown encryption status", action: "Review" },
                    { text: "No offboarding workflow detected", action: "Set up" },
                    { text: "2 devices approaching end-of-life", action: "View" },
                ].map((win) => (
                    <div key={win.text} className="flex items-center justify-between rounded-xl border border-[#eaecf0] bg-[#f9fafb] px-4 py-3">
                        <p className="text-left text-sm text-secondary">{win.text}</p>
                        <button className="ml-3 shrink-0 text-xs font-semibold text-brand-600 hover:text-brand-700">
                            {win.action} <ChevronRight className="inline size-3" />
                        </button>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex w-full max-w-sm flex-col gap-3">
                <Button
                    size="lg"
                    className="w-full"
                    onClick={() => router.push("/onboard-device")}
                >
                    Go to dashboard
                </Button>
                <Button color="secondary" size="lg" className="w-full">
                    Explore next goal
                </Button>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Main Goal 1 page
// ---------------------------------------------------------------------------

// step 0–3: follow-up questions
// step 4: import method (Mission A)
// step 5: AI processing (Mission B)
// step 6: review inventory (Mission C)
// step 7: mission complete (Mission D)

const TOTAL_STEPS = 8; // 4 questions + 4 mission steps

export default function Goal1Page() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [importMethod, setImportMethod] = useState("");

    const isQuestionStep = step < 4;
    const isMissionA = step === 4;
    const isMissionB = step === 5;
    const isMissionC = step === 6;
    const isMissionD = step === 7;

    const currentQ = isQuestionStep ? GOAL1_QUESTIONS[step] : null;
    const currentAnswer = currentQ ? (answers[currentQ.key] ?? "") : "";

    const canContinue =
        isMissionD ? true :
        isMissionC ? true :
        isMissionB ? true :
        isMissionA ? importMethod !== "" :
        currentQ ? currentAnswer !== "" : false;

    function handleNext() {
        if (!canContinue) return;
        if (step < TOTAL_STEPS - 1) {
            setStep((s) => s + 1);
        }
    }

    function handleBack() {
        if (step === 0) {
            router.push("/onboarding");
        } else {
            setStep((s) => s - 1);
        }
    }

    return (
        <div className="flex min-h-screen">
            {/* Left: side panel */}
            <div className="hidden w-[420px] shrink-0 lg:block xl:w-[480px]">
                <div className="sticky top-0 h-screen">
                    <Goal1SidePanel missionStep={step} />
                </div>
            </div>

            {/* Right: content */}
            <div className="flex flex-1 flex-col">
                {/* Mobile header */}
                <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-4 lg:hidden">
                    <RaydaLogo />
                </div>

                <div className="flex flex-1 flex-col px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
                    {/* Progress */}
                    {!isMissionD && (
                        <div className="flex flex-col gap-3">
                            <ProgressBar current={step} total={TOTAL_STEPS - 1} />
                            <p className="text-sm font-medium text-tertiary">
                                {isQuestionStep
                                    ? `Follow-up questions · ${step + 1} of 4`
                                    : isMissionA ? "Mission Step A — Import"
                                    : isMissionB ? "Mission Step B — Processing"
                                    : "Mission Step C — Review"}
                            </p>
                        </div>
                    )}

                    {/* Step content */}
                    <div className={cx("flex-1", !isMissionD && "mt-10")}>
                        {isQuestionStep && currentQ && (
                            <div className="flex flex-col gap-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary">{currentQ.question}</h2>
                                    <p className="mt-2 text-base text-tertiary">{currentQ.hint}</p>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {currentQ.options.map((opt) => (
                                        <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setAnswers((p) => ({ ...p, [currentQ.key]: opt }))}
                                            className={cx(
                                                "flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition duration-100",
                                                currentAnswer === opt
                                                    ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                                                    : "border-[#d0d5dd] bg-white text-secondary hover:border-brand-300 hover:bg-brand-25",
                                            )}
                                        >
                                            {currentAnswer === opt && <Check className="size-4 shrink-0 text-brand-600" />}
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isMissionA && (
                            <ImportMethodStep
                                selected={importMethod}
                                onSelect={setImportMethod}
                            />
                        )}

                        {isMissionB && <AIProcessingStep />}

                        {isMissionC && (
                            <ReviewInventoryStep onConfirm={handleNext} />
                        )}

                        {isMissionD && <MissionCompleteStep />}
                    </div>

                    {/* Navigation (hidden on complete screen) */}
                    {!isMissionD && (
                        <div className="mt-10 flex items-center justify-between">
                            <Button
                                color="tertiary"
                                size="md"
                                iconLeading={ArrowLeft}
                                onClick={handleBack}
                            >
                                Back
                            </Button>

                            <Button
                                size="md"
                                iconTrailing={ArrowRight}
                                onClick={handleNext}
                                isDisabled={!canContinue}
                            >
                                {isMissionC ? "Confirm inventory" : isMissionB ? "Continue" : "Continue"}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
