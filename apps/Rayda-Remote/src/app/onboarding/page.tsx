"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ArrowLeft,
    ArrowRight,
    BarChart01,
    Check,
    CurrencyDollar,
    Eye,
    Lightning01,
    Package,
    RefreshCw01,
    Shield01,
    Users01,
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
// Data
// ---------------------------------------------------------------------------

// Step 0: Company & team
const STEP_0_QUESTIONS = [
    {
        key: "employeeCount",
        question: "How many employees are in your organization?",
        options: ["1–50", "51–200", "201–500", "500+"],
        multiSelect: false,
    },
    {
        key: "teamSetup",
        question: "How is your team set up?",
        options: ["Single office", "Multi-office", "Fully remote", "Hybrid"],
        multiSelect: false,
    },
    {
        key: "role",
        question: "What best describes your role?",
        options: ["IT Admin/Manager", "HR/People Ops", "Finance/Operations", "Founder wearing multiple hats"],
        multiSelect: false,
    },
];

// Step 1: IT coverage & devices
const STEP_1_QUESTIONS = [
    {
        key: "itCoverage",
        question: "Do you have a dedicated IT person or team?",
        options: ["Yes, dedicated IT team", "Yes, one IT person", "No, IT is handled ad hoc"],
        multiSelect: false,
    },
    {
        key: "devicePolicy",
        question: "What is your device policy?",
        options: ["BYOD", "Company-issued", "Both"],
        multiSelect: false,
    },
    {
        key: "mdm",
        question: "Do you use an MDM?",
        options: ["Yes — Jamf", "Yes — Intune", "Yes — Kandji", "Yes — Other", "No"],
        multiSelect: false,
    },
];

// Step 2: Hardware & compliance
const STEP_2_QUESTIONS = [
    {
        key: "laptopTypes",
        question: "What laptops does your company issue?",
        options: ["MacBooks", "Windows (HP, Dell, Lenovo…)", "Both"],
        multiSelect: false,
    },
    {
        key: "compliance",
        question: "Do you have any compliance requirements?",
        options: ["SOC 2", "ISO 27001", "HIPAA", "GDPR", "Cyber Essentials", "None", "Exploring"],
        multiSelect: true,
    },
];

const ALL_QUESTION_STEPS = [STEP_0_QUESTIONS, STEP_1_QUESTIONS, STEP_2_QUESTIONS];

const GOALS = [
    {
        id: 1,
        key: "visibility",
        icon: Eye,
        title: "Get visibility into what we actually have",
        description: "Build a complete asset inventory and know who has what.",
        color: "brand",
    },
    {
        id: 2,
        key: "equip",
        icon: Package,
        title: "Equip new hires faster",
        description: "Automate provisioning so devices arrive before day one.",
        color: "green",
    },
    {
        id: 3,
        key: "offboarding",
        icon: RefreshCw01,
        title: "Recover and manage offboarding equipment",
        description: "Identify unrecovered devices and reclaim their value.",
        color: "amber",
    },
    {
        id: 4,
        key: "compliance",
        icon: Shield01,
        title: "Prepare for or maintain compliance",
        description: "SOC 2, ISO 27001, HIPAA, GDPR — we've got the dashboards.",
        color: "purple",
    },
    {
        id: 5,
        key: "it-support",
        icon: ZapFast,
        title: "Resolve IT issues faster & reduce ticket volume",
        description: "Self-service resolution so employees get help instantly.",
        color: "teal",
    },
    {
        id: 6,
        key: "costs",
        icon: CurrencyDollar,
        title: "Reduce IT hardware costs",
        description: "Find idle devices, track depreciation, cut procurement spend.",
        color: "orange",
    },
];

// 4 steps: 0–2 = questions, 3 = goal selection
const TOTAL_STEPS = 4;

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

function ProgressBar({ current, total }: { current: number; total: number }) {
    return (
        <div className="flex gap-1.5">
            {Array.from({ length: total }).map((_, i) => (
                <div
                    key={i}
                    className={cx(
                        "h-1 flex-1 rounded-full transition-all duration-300",
                        i < current
                            ? "bg-brand-600"
                            : i === current
                            ? "bg-brand-300"
                            : "bg-[#eaecf0]",
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
                "flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition duration-100 cursor-pointer",
                selected
                    ? "border-brand-600 bg-brand-50 text-brand-700 ring-1 ring-brand-600"
                    : "border-[#d0d5dd] bg-white text-secondary hover:border-brand-300 hover:bg-brand-25",
            )}
        >
            {selected && <Check className="size-3.5 shrink-0 text-brand-600" />}
            {label}
        </button>
    );
}

// ---------------------------------------------------------------------------
// Single question block (label + chips row)
// ---------------------------------------------------------------------------

function QuestionBlock({
    question,
    options,
    multiSelect,
    answer,
    onAnswer,
    index,
}: {
    question: string;
    options: string[];
    multiSelect: boolean;
    answer: string | string[];
    onAnswer: (value: string | string[]) => void;
    index: number;
}) {
    function toggle(opt: string) {
        if (!multiSelect) {
            onAnswer(opt);
            return;
        }
        const arr = Array.isArray(answer) ? answer : [];
        if (arr.includes(opt)) {
            onAnswer(arr.filter((v) => v !== opt));
        } else {
            onAnswer([...arr, opt]);
        }
    }

    function isSelected(opt: string) {
        if (Array.isArray(answer)) return answer.includes(opt);
        return answer === opt;
    }

    const hasAnswer = Array.isArray(answer) ? answer.length > 0 : answer !== "";

    return (
        <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3">
                <span className={cx(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all duration-200",
                    hasAnswer ? "bg-brand-600 text-white" : "bg-[#eaecf0] text-[#667085]",
                )}>
                    {hasAnswer ? <Check className="size-3.5" /> : index + 1}
                </span>
                <div className="flex-1">
                    <p className="text-base font-semibold text-primary">{question}</p>
                    {multiSelect && (
                        <p className="mt-0.5 text-xs text-tertiary">Select all that apply</p>
                    )}
                </div>
            </div>

            <div className="flex flex-wrap gap-2 pl-10">
                {options.map((opt) => (
                    <OptionChip
                        key={opt}
                        label={opt}
                        selected={isSelected(opt)}
                        onClick={() => toggle(opt)}
                    />
                ))}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Step metadata
// ---------------------------------------------------------------------------

const STEP_META = [
    { label: "About your company", heading: "Tell us about your company",    sub: "A few quick questions — no typing needed." },
    { label: "Your IT setup",      heading: "Your IT setup",                 sub: "Help us configure device tracking and workflows." },
    { label: "Hardware & compliance", heading: "Hardware & compliance",      sub: "Informs your AI Teammate's recommendations from day one." },
    { label: "Your first goal",    heading: "What's the one thing you want to tackle first?", sub: "Pick your top priority — the other goals will be ready when you are." },
];

// ---------------------------------------------------------------------------
// Generic questions page
// ---------------------------------------------------------------------------

function QuestionsPage({
    stepIndex,
    answers,
    onAnswer,
}: {
    stepIndex: number;
    answers: Answers;
    onAnswer: (key: string, value: string | string[]) => void;
}) {
    const meta = STEP_META[stepIndex];
    const questions = ALL_QUESTION_STEPS[stepIndex];

    return (
        <div className="flex flex-col gap-6">
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    Step {stepIndex + 1} of {TOTAL_STEPS} · {meta.label}
                </p>
                <h2 className="mt-1.5 text-2xl font-bold text-primary">{meta.heading}</h2>
                <p className="mt-1 text-sm text-tertiary">{meta.sub}</p>
            </div>

            <div className="flex flex-col">
                {questions.map((q, idx) => (
                    <div key={q.key}>
                        {idx > 0 && <div className="my-6 h-px bg-[#f2f4f7]" />}
                        <QuestionBlock
                            index={idx}
                            question={q.question}
                            options={q.options}
                            multiSelect={q.multiSelect}
                            answer={answers[q.key] ?? (q.multiSelect ? [] : "")}
                            onAnswer={(v) => onAnswer(q.key, v)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page 2: Goal Selection
// ---------------------------------------------------------------------------

const goalColorMap: Record<string, { border: string; bg: string; icon: string; check: string; iconBg: string }> = {
    brand:  { border: "border-brand-600 ring-brand-600",   bg: "bg-brand-50",   icon: "text-brand-600",   check: "bg-brand-600",   iconBg: "bg-brand-100" },
    green:  { border: "border-green-600 ring-green-600",   bg: "bg-green-50",   icon: "text-green-600",   check: "bg-green-600",   iconBg: "bg-green-100" },
    amber:  { border: "border-amber-500 ring-amber-500",   bg: "bg-amber-50",   icon: "text-amber-600",   check: "bg-amber-500",   iconBg: "bg-amber-100" },
    purple: { border: "border-purple-600 ring-purple-600", bg: "bg-purple-50",  icon: "text-purple-600",  check: "bg-purple-600",  iconBg: "bg-purple-100" },
    teal:   { border: "border-teal-600 ring-teal-600",     bg: "bg-teal-50",    icon: "text-teal-600",    check: "bg-teal-600",    iconBg: "bg-teal-100" },
    orange: { border: "border-orange-500 ring-orange-500", bg: "bg-orange-50",  icon: "text-orange-600",  check: "bg-orange-500",  iconBg: "bg-orange-100" },
};

function GoalSelectionPage({
    selected,
    onSelect,
}: {
    selected: string;
    onSelect: (key: string) => void;
}) {
    const meta = STEP_META[3];
    return (
        <div className="flex flex-col gap-4">
            <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand-600">
                    Step 4 of {TOTAL_STEPS} · Goal selection
                </p>
                <h2 className="mt-2 text-2xl font-bold text-primary">{meta.heading}</h2>
                <p className="mt-1.5 text-base text-tertiary">{meta.sub}</p>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 p-1 -m-1">
                {GOALS.map((goal) => {
                    const isSelected = selected === goal.key;
                    const colors = goalColorMap[goal.color];
                    const Icon = goal.icon;

                    return (
                        <button
                            key={goal.key}
                            type="button"
                            onClick={() => onSelect(goal.key)}
                            className={cx(
                                "relative flex flex-col gap-2 rounded-2xl border p-4 text-left transition duration-100",
                                isSelected
                                    ? `${colors.border} ${colors.bg} ring-1`
                                    : "border-[#eaecf0] bg-white hover:border-brand-200 hover:bg-[#f9fafb]",
                            )}
                        >
                            {isSelected && (
                                <div className={cx("absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full", colors.check)}>
                                    <Check className="size-3 text-white" />
                                </div>
                            )}
                            <div className={cx(
                                "flex h-10 w-10 items-center justify-center rounded-xl",
                                isSelected ? colors.iconBg : "bg-[#f2f4f7]",
                            )}>
                                <Icon className={cx("size-5", isSelected ? colors.icon : "text-[#667085]")} />
                            </div>
                            <div>
                                <p className={cx(
                                    "text-sm font-semibold leading-5",
                                    isSelected ? "text-primary" : "text-secondary",
                                )}>
                                    {goal.title}
                                </p>
                                <p className="mt-1 text-xs leading-4 text-tertiary">{goal.description}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Side panel
// ---------------------------------------------------------------------------

function OnboardingSidePanel() {
    return (
        <div className="relative flex h-full flex-col overflow-hidden bg-[#101828]">
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-24 -top-24 h-[400px] w-[400px] rounded-full bg-brand-600/15 blur-[100px]" />
                <div className="absolute -bottom-24 -right-16 h-[300px] w-[300px] rounded-full bg-brand-900/30 blur-[80px]" />
            </div>

            <div className="relative flex h-full flex-col px-8 py-8">
                <RaydaLogo variant="white" />

                <div className="mt-12 flex-1">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-900/50 px-3 py-1 text-xs font-semibold text-brand-300 ring-1 ring-brand-700/50">
                        <Lightning01 className="size-3" /> AI IT Teammate
                    </span>
                    <h2 className="mt-4 text-2xl font-bold leading-8 text-white">
                        Let&apos;s set up your<br />IT workspace.
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-[#98a2b3]">
                        A few quick questions and we&apos;ll have your platform configured, your devices tracked, and your first goal underway — in under 3 minutes.
                    </p>

                    <div className="mt-8 flex flex-col gap-3">
                        {[
                            { icon: BarChart01, text: "Full asset visibility from day one" },
                            { icon: Users01, text: "Automated new hire provisioning" },
                            { icon: Shield01, text: "Compliance dashboards built-in" },
                            { icon: ZapFast, text: "AI resolves tickets before you see them" },
                            { icon: CurrencyDollar, text: "Track depreciation & cut hardware spend" },
                        ].map(({ icon: Icon, text }) => (
                            <div key={text} className="flex items-start gap-3">
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                                    <Icon className="size-3.5 text-brand-300" />
                                </div>
                                <p className="text-sm text-[#98a2b3]">{text}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-xs text-[#667085]">
                        No credit card required. Setup takes under 3 minutes. Cancel anytime.
                    </p>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Validation helpers
// ---------------------------------------------------------------------------

function isStageComplete(step: number, answers: Answers, selectedGoal: string): boolean {
    if (step < 3) {
        return ALL_QUESTION_STEPS[step].every((q) => {
            const a = answers[q.key];
            return Array.isArray(a) ? a.length > 0 : a !== undefined && a !== "";
        });
    }
    if (step === 3) return selectedGoal !== "";
    return false;
}

// ---------------------------------------------------------------------------
// Main page
// ---------------------------------------------------------------------------

export default function OnboardingPage() {
    const router = useRouter();
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<Answers>({});
    const [selectedGoal, setSelectedGoal] = useState("");

    const canContinue = isStageComplete(step, answers, selectedGoal);

    function handleAnswer(key: string, value: string | string[]) {
        setAnswers((prev) => ({ ...prev, [key]: value }));
    }

    function handleNext() {
        if (!canContinue) return;
        if (step < TOTAL_STEPS - 1) {
            setStep((s) => s + 1);
        } else {
            router.push("/dashboard");
        }
    }

    function handleBack() {
        if (step === 0) {
            router.push("/signup");
        } else {
            setStep((s) => s - 1);
        }
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left: side panel */}
            <div className="hidden w-[420px] shrink-0 lg:block xl:w-[480px]">
                <OnboardingSidePanel />
            </div>

            {/* Right: fixed-height, no scroll */}
            <div className="flex flex-1 flex-col h-full overflow-hidden">
                {/* Mobile header */}
                <div className="flex items-center justify-between border-b border-[#eaecf0] px-6 py-3 lg:hidden">
                    <RaydaLogo />
                </div>

                <div className="flex flex-col flex-1 overflow-hidden px-8 py-6 lg:px-12 lg:py-8">
                    {/* Progress */}
                    <div className="flex flex-col gap-1.5 shrink-0">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-tertiary">
                                {STEP_META[step].label}
                            </p>
                            <p className="text-xs text-tertiary">{step + 1} / {TOTAL_STEPS}</p>
                        </div>
                        <ProgressBar current={step} total={TOTAL_STEPS} />
                    </div>

                    {/* Page content — scrollable only if it overflows */}
                    <div className="mt-6 flex-1 overflow-y-visible">
                        {step < 3 && (
                            <QuestionsPage stepIndex={step} answers={answers} onAnswer={handleAnswer} />
                        )}
                        {step === 3 && (
                            <GoalSelectionPage selected={selectedGoal} onSelect={setSelectedGoal} />
                        )}
                    </div>

                    {/* Navigation */}
                    <div className="mt-4 flex items-center justify-between border-t border-[#eaecf0] pt-4 shrink-0">
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
                            {step === 3 ? "Start mission" : "Continue"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
