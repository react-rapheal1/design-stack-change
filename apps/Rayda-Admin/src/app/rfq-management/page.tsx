"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
    ArrowUpRight,
    ArrowDownRight,
    Check,
    FilterLines,
    Menu01,
    SearchLg,
    Settings01,
    XClose,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import {
    ButtonGroup,
    ButtonGroupItem,
} from "@/components/base/button-group/button-group";
import { Input } from "@/components/base/input/input";
import { PaginationCardDefault } from "@/components/application/pagination/pagination";
import { Table, TableCard } from "@/components/application/table/table";
import { Tabs } from "@/components/application/tabs/tabs";
import { Select } from "@/components/base/select/select";
import { Slider } from "@/components/base/slider/slider";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { Tooltip, TooltipTrigger } from "@/components/base/tooltip/tooltip";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";

import {
    type RFQ,
    type RFQStatus,
    type RequestFilters,
    type FilterTab,
    type SortField,
    type SortDirection,
    mockRFQs,
    countries,
    countryCodeMap,
    navItems,
    defaultFilters,
    filterTabs,
    formatCurrency,
    getStatusConfig,
} from "./_shared";

// ---------------------------------------------------------------------------
// Header Navigation
// ---------------------------------------------------------------------------

function HeaderNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative w-full border-b border-[#475467] bg-primary-solid">
            <div className="flex h-[72px] w-full items-center justify-between page-px">
                {/* Left: Logo + Nav */}
                <div className="flex items-center gap-4">
                    <a href="/" aria-label="Go to homepage">
                        <RaydaLogo variant="white" />
                    </a>

                    <nav className="hidden xl:block">
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
                    </div>

                    {/* Avatar (desktop) */}
                    <Avatar
                        alt="Jane Admin"
                        initials="JA"
                        size="md"
                        contrastBorder={false}
                        className="hidden size-10 bg-[#e6efff] text-sm font-semibold text-[#003999] sm:flex"
                    />

                    {/* Mobile menu button */}
                    <button
                        type="button"
                        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                        className="flex items-center justify-center rounded-md p-2 text-white transition hover:bg-white/10 xl:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <XClose className="size-6" /> : <Menu01 className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile navigation overlay */}
            {mobileMenuOpen && (
                <div className="absolute inset-x-0 top-[72px] z-50 border-b border-[#475467] bg-primary-solid xl:hidden">
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
                        </div>

                        <div className="mt-3 flex items-center gap-3 rounded-md px-3 py-2.5">
                            <Avatar
                                alt="Jane Admin"
                                initials="JA"
                                size="md"
                                contrastBorder={false}
                                className="size-10 bg-[#e6efff] text-sm font-semibold text-[#003999]"
                            />
                            <div className="min-w-0">
                                <p className="truncate text-sm font-semibold text-white">Jane Admin</p>
                                <p className="truncate text-sm text-[#98a2b3]">jane@rayda.co</p>
                            </div>
                        </div>
                    </nav>
                </div>
            )}
        </header>
    );
}

// ---------------------------------------------------------------------------
// Period Tabs
// ---------------------------------------------------------------------------

const periodTabs = ["24 hours", "7 days", "30 days", "12 months"];

function PeriodTabs({ activeTab, onTabChange }: { activeTab: string; onTabChange: (tab: string) => void }) {
    const isMd = useBreakpoint("md");

    if (!isMd) {
        return (
            <Select
                size="sm"
                selectedKey={activeTab}
                onSelectionChange={(key) => onTabChange(key as string)}
                items={periodTabs.map((tab) => ({ id: tab, label: tab }))}
            >
                {(item) => <Select.Item id={item.id}>{item.label}</Select.Item>}
            </Select>
        );
    }

    return (
        <ButtonGroup size="sm">
            {periodTabs.map((tab) => (
                <ButtonGroupItem
                    key={tab}
                    isSelected={activeTab === tab}
                    onClick={() => onTabChange(tab)}
                >
                    {tab}
                </ButtonGroupItem>
            ))}
        </ButtonGroup>
    );
}

// ---------------------------------------------------------------------------
// Sparkline SVG (smooth cubic bezier curve with gradient fill)
// ---------------------------------------------------------------------------

type TrendDirection = "up" | "down" | "neutral";

const trendColors: Record<TrendDirection, { stroke: string; gradFrom: string; gradTo: string }> = {
    up: {
        stroke: "var(--color-success-500)",
        gradFrom: "var(--color-success-200)",
        gradTo: "var(--color-success-50)",
    },
    down: {
        stroke: "var(--color-error-500)",
        gradFrom: "var(--color-error-200)",
        gradTo: "var(--color-error-50)",
    },
    neutral: {
        stroke: "var(--color-gray-400)",
        gradFrom: "var(--color-gray-200)",
        gradTo: "var(--color-gray-50)",
    },
};

function Sparkline({ points, id, trend = "up", className }: { points: number[]; id: string; trend?: TrendDirection; className?: string }) {
    const width = 200;
    const height = 56;
    const paddingX = 2;
    const paddingY = 10;

    const max = Math.max(...points);
    const min = Math.min(...points);
    const range = max - min || 1;

    const coords = points.map((val, i) => ({
        x: paddingX + (i / (points.length - 1)) * (width - paddingX * 2),
        y: paddingY + (1 - (val - min) / range) * (height - paddingY * 2),
    }));

    // Neutral trend → flat straight line at center
    if (trend === "neutral") {
        const midY = height / 2;
        const linePath = `M${paddingX},${midY} L${width - paddingX},${midY}`;
        const areaPath = `${linePath} L${width - paddingX},${height} L${paddingX},${height} Z`;
        const gradId = `sparkGrad-${id}`;
        const colors = trendColors[trend];

        return (
            <svg viewBox={`0 0 ${width} ${height}`} className={cx("h-full w-full", className)} preserveAspectRatio="none">
                <defs>
                    <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={colors.gradFrom} stopOpacity="0.6" />
                        <stop offset="100%" stopColor={colors.gradTo} stopOpacity="0" />
                    </linearGradient>
                </defs>
                <path d={areaPath} fill={`url(#${gradId})`} />
                <path d={linePath} fill="none" stroke={colors.stroke} strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        );
    }

    // Build smooth cubic bezier path
    let linePath = `M${coords[0].x},${coords[0].y}`;
    for (let i = 0; i < coords.length - 1; i++) {
        const curr = coords[i];
        const next = coords[i + 1];
        const tension = 0.3;
        const prev = coords[i - 1] || curr;
        const after = coords[i + 2] || next;

        const cp1x = curr.x + (next.x - prev.x) * tension;
        const cp1y = curr.y + (next.y - prev.y) * tension;
        const cp2x = next.x - (after.x - curr.x) * tension;
        const cp2y = next.y - (after.y - curr.y) * tension;

        linePath += ` C${cp1x},${cp1y} ${cp2x},${cp2y} ${next.x},${next.y}`;
    }

    const areaPath = `${linePath} L${width},${height} L0,${height} Z`;
    const gradId = `sparkGrad-${id}`;
    const colors = trendColors[trend];

    return (
        <svg viewBox={`0 0 ${width} ${height}`} className={cx("h-full w-full", className)} preserveAspectRatio="none">
            <defs>
                <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={colors.gradFrom} stopOpacity="0.6" />
                    <stop offset="100%" stopColor={colors.gradTo} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={areaPath} fill={`url(#${gradId})`} />
            <path d={linePath} fill="none" stroke={colors.stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

// Period-aware sparkline data — shapes match each metric's trend direction
const sparklineDataByPeriod: Record<string, Record<string, number[]>> = {
    "12 months": {
        "Sent to Customer": [10, 12, 13, 14, 16, 15, 17, 18, 19, 20, 21, 22],
        Accepted: [15, 18, 22, 24, 26, 28, 30, 31, 33, 34, 36, 38],
        Rejected: [5, 6, 4, 7, 5, 6, 8, 7, 6, 5, 7, 8],
    },
    "30 days": {
        "Sent to Customer": [4, 5, 5, 6, 5, 7, 6, 7, 8, 8],
        Accepted: [9, 10, 11, 10, 12, 11, 13, 12, 14, 13],
        Rejected: [2, 3, 2, 3, 4, 3, 2, 3, 4, 3],
    },
    "7 days": {
        "Sent to Customer": [2, 3, 2, 3, 4, 3, 5],
        Accepted: [4, 5, 6, 7, 7, 8, 9],
        Rejected: [1, 2, 1, 1, 2, 1, 2],
    },
    "24 hours": {
        "Sent to Customer": [0, 0, 1, 1, 2, 2],
        Accepted: [0, 1, 1, 2, 2, 3],
        Rejected: [0, 0, 0, 1, 1, 1],
    },
};

// ---------------------------------------------------------------------------
// Metric Card (Figma: Type=Chart 04)
// ---------------------------------------------------------------------------

function getTrend(change: string, up: boolean): TrendDirection {
    const val = parseFloat(change);
    if (val === 0) return "neutral";
    return up ? "up" : "down";
}

const periodComparisonLabel: Record<string, string> = {
    "24 hours": "vs yesterday",
    "7 days": "vs prev 7 days",
    "30 days": "vs prev 30 days",
    "12 months": "vs last year",
};

function MetricCard({
    label,
    value,
    change,
    up,
    period,
}: {
    label: string;
    value: number | string;
    change: string;
    up: boolean;
    period: string;
}) {
    const periodData = sparklineDataByPeriod[period] || sparklineDataByPeriod["24 hours"];
    const points = periodData[label] || [3, 5, 4, 6, 8, 7, 5, 6, 4, 5];
    const sparkId = `${label.replace(/\s+/g, "-").toLowerCase()}-${period.replace(/\s+/g, "-")}`;
    const trend = getTrend(change, up);

    const trendTextColor: Record<TrendDirection, string> = {
        up: "text-success-primary",
        down: "text-error-primary",
        neutral: "text-tertiary",
    };

    return (
        <div className="flex flex-col overflow-hidden rounded-xl border border-secondary bg-primary shadow-xs">
            {/* Title */}
            <div className="px-5 py-3.5">
                <p className="text-sm font-medium text-secondary">{label}</p>
            </div>

            {/* Inner content */}
            <div className="flex flex-col gap-5 overflow-hidden rounded-xl border-t border-secondary p-5">
                {/* Number and badge */}
                <div className="flex flex-wrap content-center items-center gap-3">
                    <p className="text-[30px] font-semibold leading-[38px] text-primary">{value}</p>
                    <div className="flex items-center gap-2">
                        <span className={cx("flex items-center gap-1 text-sm font-medium", trendTextColor[trend])}>
                            {trend === "up" && <ArrowUpRight className="size-5" />}
                            {trend === "down" && <ArrowDownRight className="size-5" />}
                            {change}
                        </span>
                        <span className="text-sm text-tertiary">{periodComparisonLabel[period] || "vs last year"}</span>
                    </div>
                </div>

                {/* Chart */}
                <div className="h-[56px] w-full">
                    <Sparkline points={points} id={sparkId} trend={trend} />
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Status Badge
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: RFQStatus }) {
    const config = getStatusConfig(status);
    return (
        <Badge size="sm" type="pill-color" color={config.color}>
            {config.label}
        </Badge>
    );
}

// ---------------------------------------------------------------------------
// Country Flag
// ---------------------------------------------------------------------------

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
// Device Count Display
// ---------------------------------------------------------------------------

function DeviceCountDisplay({ devices }: { devices: { name: string; quantity: number }[] }) {
    const totalQuantity = devices.reduce((sum, d) => sum + d.quantity, 0);

    const maxVisible = 3;
    const remaining = devices.length - maxVisible;

    const tooltipContent = (
        <div className="flex flex-col gap-1">
            {devices.slice(0, maxVisible).map((device, i) => {
                const name = device.name.length > 30 ? device.name.slice(0, 30) + "…" : device.name;
                return <span key={i}>{name} × {device.quantity}</span>;
            })}
            {remaining > 0 && <span>+ {remaining} more device{remaining === 1 ? "" : "s"}</span>}
        </div>
    );

    return (
        <Tooltip title={tooltipContent} placement="top" arrow>
            <TooltipTrigger>
                <span className="cursor-default text-sm text-primary">{totalQuantity}</span>
            </TooltipTrigger>
        </Tooltip>
    );
}

// ---------------------------------------------------------------------------
// Filter Dropdown
// ---------------------------------------------------------------------------

function FilterDropdown({
    isOpen,
    onClose,
    filters,
    onApply,
    resultCount,
    anchorRef,
}: {
    isOpen: boolean;
    onClose: () => void;
    filters: RequestFilters;
    onApply: (f: RequestFilters) => void;
    resultCount: number;
    anchorRef: React.RefObject<HTMLButtonElement | null>;
}) {
    const [localFilters, setLocalFilters] = useState<RequestFilters>(filters);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState<{ top: number; right: number }>({ top: 0, right: 0 });

    // Calculate position from anchor button
    const updatePosition = useCallback(() => {
        if (anchorRef.current) {
            const rect = anchorRef.current.getBoundingClientRect();
            setPosition({
                top: rect.bottom + 8,
                right: window.innerWidth - rect.right,
            });
        }
    }, [anchorRef]);

    useEffect(() => {
        if (isOpen) {
            setLocalFilters(filters);
            updatePosition();
        }
    }, [isOpen, filters, updatePosition]);

    // Reposition on scroll/resize
    useEffect(() => {
        if (!isOpen) return;
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [isOpen, updatePosition]);

    useEffect(() => {
        if (!isOpen) return;
        const handler = (e: MouseEvent) => {
            if (
                dropdownRef.current && !dropdownRef.current.contains(e.target as Node) &&
                anchorRef.current && !anchorRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [isOpen, onClose, anchorRef]);

    if (!isOpen) return null;

    const allStatuses: RFQStatus[] = [
        "pending_vendors",
        "vendors_responded",
        "response_sent",
        "fully_accepted",
        "partially_accepted",
        "customer_rejected",
        "expired",
    ];

    const toggleStatus = (s: RFQStatus) => {
        setLocalFilters((prev) => ({
            ...prev,
            statuses: prev.statuses.includes(s)
                ? prev.statuses.filter((x) => x !== s)
                : [...prev.statuses, s],
        }));
    };

    const toggleCountry = (c: string) => {
        setLocalFilters((prev) => ({
            ...prev,
            countries: prev.countries.includes(c)
                ? prev.countries.filter((x) => x !== c)
                : [...prev.countries, c],
        }));
    };

    return (
        <div
            ref={dropdownRef}
            style={{ top: position.top, right: position.right }}
            className="fixed z-50 w-80 rounded-xl border border-secondary bg-primary p-4 shadow-lg"
        >
            <div className="flex flex-col gap-5">
                {/* Status filter */}
                <div>
                    <p className="mb-2 text-sm font-medium text-primary">Status</p>
                    <div className="flex flex-wrap gap-2">
                        {allStatuses.map((s) => {
                            const config = getStatusConfig(s);
                            const isSelected = localFilters.statuses.includes(s);
                            return (
                                <button key={s} type="button" onClick={() => toggleStatus(s)}>
                                    {isSelected ? (
                                        <BadgeWithIcon size="md" color={config.color} type="pill-color" iconLeading={Check}>
                                            {config.label}
                                        </BadgeWithIcon>
                                    ) : (
                                        <Badge size="md" color={config.color} type="pill-color">
                                            {config.label}
                                        </Badge>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Country filter */}
                <div>
                    <p className="mb-2 text-sm font-medium text-primary">Country</p>
                    <div className="flex flex-wrap gap-2">
                        {countries.map((c) => {
                            const isSelected = localFilters.countries.includes(c);
                            return (
                                <button key={c} type="button" onClick={() => toggleCountry(c)}>
                                    {isSelected ? (
                                        <BadgeWithIcon size="md" color="brand" type="pill-color" iconLeading={Check}>
                                            {c}
                                        </BadgeWithIcon>
                                    ) : (
                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-utility-gray-50 px-2.5 py-0.5 text-sm font-medium text-utility-gray-700 ring-1 ring-inset ring-utility-gray-200">
                                            <CountryFlag country={c} />
                                            {c}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Budget range */}
                <div>
                    <p className="mb-2 text-sm font-medium text-primary">Budget Range</p>
                    <Slider
                        minValue={0}
                        maxValue={100000}
                        step={1000}
                        value={localFilters.budgetRange}
                        onChange={(val) => setLocalFilters((prev) => ({ ...prev, budgetRange: val as [number, number] }))}
                    />
                    <div className="mt-1 flex justify-between text-xs text-tertiary">
                        <span>{formatCurrency(localFilters.budgetRange[0])}</span>
                        <span>{formatCurrency(localFilters.budgetRange[1])}</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between border-t border-secondary pt-4">
                    <button
                        type="button"
                        className="text-sm font-semibold text-tertiary transition hover:text-primary"
                        onClick={() => {
                            setLocalFilters(defaultFilters);
                            onApply(defaultFilters);
                            onClose();
                        }}
                    >
                        Reset
                    </button>
                    <Button
                        size="sm"
                        color="primary"
                        onClick={() => {
                            onApply(localFilters);
                            onClose();
                        }}
                    >
                        Show {resultCount} results
                    </Button>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// RFQ Management Page
// ---------------------------------------------------------------------------

// Persist list page state in sessionStorage so it survives client-side
// navigation (e.g. view RFQ detail → breadcrumb back) but resets on
// full page refresh (beforeunload clears the key).
const RFQ_STATE_KEY = "rfq-list-state";

interface PersistedState {
    q: string;
    tab: FilterTab;
    sort: SortField | null;
    dir: SortDirection;
    page: number;
    filters: RequestFilters;
}

function readPersistedState(): PersistedState | null {
    try {
        const raw = sessionStorage.getItem(RFQ_STATE_KEY);
        if (!raw) return null;
        return JSON.parse(raw) as PersistedState;
    } catch {
        return null;
    }
}

export default function RFQManagementPage() {
    // Read persisted state once on mount (returns null on fresh load / refresh)
    const saved = useRef(readPersistedState()).current;

    const [rfqs] = useState<RFQ[]>(mockRFQs);
    const [metricPeriod, setMetricPeriod] = useState("24 hours");
    const [searchQuery, setSearchQuery] = useState(saved?.q ?? "");
    const [activeFilter, setActiveFilter] = useState<FilterTab>(saved?.tab ?? "all");
    const [sortField, setSortField] = useState<SortField | null>(saved?.sort ?? null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(saved?.dir ?? "asc");
    const [currentPage, setCurrentPage] = useState(saved?.page ?? 1);
    const [showFilterModal, setShowFilterModal] = useState(false);
    const [filters, setFilters] = useState<RequestFilters>(saved?.filters ?? defaultFilters);
    const [mounted, setMounted] = useState(false);
    const filterBtnRef = useRef<HTMLButtonElement>(null);

    const isMd = useBreakpoint("md");
    const itemsPerPage = 10;

    // Persist state to sessionStorage on every change
    useEffect(() => {
        const state: PersistedState = { q: searchQuery, tab: activeFilter, sort: sortField, dir: sortDirection, page: currentPage, filters };
        sessionStorage.setItem(RFQ_STATE_KEY, JSON.stringify(state));
    }, [searchQuery, activeFilter, sortField, sortDirection, currentPage, filters]);

    // Clear persisted state on full page refresh so it resets
    useEffect(() => {
        const handleBeforeUnload = () => sessionStorage.removeItem(RFQ_STATE_KEY);
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, []);

    useEffect(() => { setMounted(true); }, []);

    // Compute metrics from actual RFQ data based on selected period
    const computeMetrics = useCallback((period: string) => {
        const now = new Date(2026, 1, 20, 21, 0); // Feb 20, 2026 9pm — latest mock data date
        const periodMs: Record<string, number> = {
            "24 hours": 24 * 3600000,
            "7 days": 7 * 24 * 3600000,
            "30 days": 30 * 24 * 3600000,
            "12 months": 365 * 24 * 3600000,
        };
        const ms = periodMs[period] || periodMs["12 months"];
        const cutoff = new Date(now.getTime() - ms);
        const prevCutoff = new Date(cutoff.getTime() - ms);

        const inPeriod = rfqs.filter((r) => new Date(r.createdAt) >= cutoff);
        const inPrev = rfqs.filter((r) => {
            const d = new Date(r.createdAt);
            return d >= prevCutoff && d < cutoff;
        });

        const count = (list: RFQ[], test: (r: RFQ) => boolean) => list.filter(test).length;
        const isSent = (r: RFQ) => r.status === "response_sent";
        const isAccepted = (r: RFQ) => r.status === "fully_accepted" || r.status === "partially_accepted";
        const isRejected = (r: RFQ) => r.status === "customer_rejected";

        const calc = (test: (r: RFQ) => boolean) => {
            const cur = count(inPeriod, test);
            const prev = count(inPrev, test);
            const pct = prev === 0 ? (cur > 0 ? 100 : 0) : Math.round(((cur - prev) / prev) * 1000) / 10;
            return { value: cur, change: `${Math.abs(pct)}%`, up: pct >= 0 };
        };

        return { sent: calc(isSent), accepted: calc(isAccepted), rejected: calc(isRejected) };
    }, [rfqs]);

    const currentMetrics = computeMetrics(metricPeriod);

    // Active filter count
    const activeFilterCount =
        filters.countries.length +
        filters.statuses.length +
        (filters.budgetRange[0] > 0 || filters.budgetRange[1] < 100000 ? 1 : 0);

    // Filter
    const filteredRfqs = rfqs.filter((rfq) => {
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const matchesId = rfq.id.toLowerCase().includes(query);
            const matchesCompany = rfq.company.toLowerCase().includes(query);
            const matchesDevice = rfq.devices.some((d) => d.name.toLowerCase().includes(query));
            const matchesVendor = rfq.vendorResponses.some((v) => v.vendorName.toLowerCase().includes(query));
            if (!matchesId && !matchesCompany && !matchesDevice && !matchesVendor) return false;
        }

        if (activeFilter !== "all") {
            if (activeFilter === "accepted") {
                if (rfq.status !== "fully_accepted" && rfq.status !== "partially_accepted") return false;
            } else if (rfq.status !== activeFilter) {
                return false;
            }
        }

        if (filters.countries.length > 0 && !filters.countries.includes(rfq.country)) return false;
        if (filters.statuses.length > 0 && !filters.statuses.includes(rfq.status)) return false;
        // Only apply budget filter to RFQs that have a budget; no-budget RFQs always pass
        if (rfq.budget > 0 && (rfq.budget < filters.budgetRange[0] || rfq.budget > filters.budgetRange[1])) return false;

        return true;
    });

    // Sort
    const sortedRfqs = [...filteredRfqs].sort((a, b) => {
        if (!sortField) return 0;
        let aVal: string | number;
        let bVal: string | number;
        switch (sortField) {
            case "id": aVal = a.id; bVal = b.id; break;
            case "company": aVal = a.company; bVal = b.company; break;
            case "budget": aVal = a.budget; bVal = b.budget; break;
            case "country": aVal = a.country; bVal = b.country; break;
            default: return 0;
        }
        if (aVal < bVal) return sortDirection === "asc" ? -1 : 1;
        if (aVal > bVal) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedRfqs.length / itemsPerPage);
    const paginatedRfqs = sortedRfqs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const handleFilterChange = (key: React.Key) => {
        setActiveFilter(key as FilterTab);
        setCurrentPage(1);
    };

    const handleColumnSort = (descriptor: { column: React.Key; direction: "ascending" | "descending" }) => {
        setSortField(descriptor.column as SortField);
        setSortDirection(descriptor.direction === "ascending" ? "asc" : "desc");
    };

    const columns = [
        { id: "id", name: "RFQ ID", allowsSorting: true },
        { id: "company", name: "Company", allowsSorting: true },
        { id: "devices", name: "Device(s)", allowsSorting: false },
        { id: "budget", name: "Budget", allowsSorting: true },
        { id: "country", name: "Country", allowsSorting: true },
        { id: "vendors", name: "Vendor Quotes", allowsSorting: false },
        { id: "status", name: "Status", allowsSorting: false },
        { id: "actions", name: "", allowsSorting: false },
    ];

    return (
        <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
            <HeaderNavigation />

            <main className="flex flex-1 flex-col gap-6 pb-12 pt-8 sm:gap-8 sm:pb-24 sm:pt-12">
                {/* Page Header */}
                <div className="w-full page-px">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-semibold leading-[32px] text-primary sm:text-[30px] sm:leading-[38px]">
                            RFQs
                        </h1>
                        <p className="text-sm text-tertiary">
                            Review vendor quotes and curate responses for customer requests.
                        </p>
                    </div>
                </div>

                {/* Period Tabs + Metric Cards */}
                <div className="w-full page-px">
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
                            <PeriodTabs activeTab={metricPeriod} onTabChange={setMetricPeriod} />
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-5">
                            <MetricCard label="Sent to Customer" value={currentMetrics.sent.value} change={currentMetrics.sent.change} up={currentMetrics.sent.up} period={metricPeriod} />
                            <MetricCard label="Accepted" value={currentMetrics.accepted.value} change={currentMetrics.accepted.change} up={currentMetrics.accepted.up} period={metricPeriod} />
                            <MetricCard label="Rejected" value={currentMetrics.rejected.value} change={currentMetrics.rejected.change} up={currentMetrics.rejected.up} period={metricPeriod} />
                        </div>
                    </div>
                </div>

                {/* RFQ Table */}
                <div className="w-full page-px">
                    <TableCard.Root size="sm">
                        {/* Header with tabs and search */}
                        <div className="flex flex-col gap-4 border-b border-secondary px-5 py-4">
                            <h2 className="text-md font-semibold text-primary">
                                All Requests{" "}
                                <span className="text-tertiary">({filteredRfqs.length})</span>
                            </h2>

                            <div className="flex flex-col items-start gap-4 md:flex-row md:flex-wrap md:items-center md:justify-between">
                                {/* Filter tabs */}
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

                                {/* Search and filters */}
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
                                    <div>
                                        <button
                                            ref={filterBtnRef}
                                            type="button"
                                            onClick={() => setShowFilterModal(!showFilterModal)}
                                            className={cx(
                                                "flex h-10 w-full items-center justify-center gap-2 rounded-lg border px-3.5 text-sm font-semibold transition-colors md:w-auto",
                                                showFilterModal
                                                    ? "border-[#0948b5] bg-[#eff8ff] text-[#0948b5]"
                                                    : "border-[#e9eaeb] bg-white text-[#414651] hover:bg-[#fafafa]",
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
                                            onApply={(newFilters) => {
                                                setFilters(newFilters);
                                                setCurrentPage(1);
                                            }}
                                            resultCount={filteredRfqs.length}
                                            anchorRef={filterBtnRef}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Table */}
                        {!mounted ? (
                            <div className="flex items-center justify-center py-24">
                                <div className="size-6 animate-spin rounded-full border-2 border-border-secondary border-t-border-brand" />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table
                                    className="min-w-[900px]"
                                    aria-label="RFQ management table"
                                    sortDescriptor={
                                        sortField
                                            ? { column: sortField, direction: sortDirection === "asc" ? "ascending" : "descending" }
                                            : undefined
                                    }
                                    onSortChange={handleColumnSort}
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
                                        items={paginatedRfqs}
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
                                                                ? `Your search "${searchQuery}" did not match any RFQs.`
                                                                : "No RFQs match your current filters."}
                                                        </EmptyState.Description>
                                                    </EmptyState.Content>
                                                    <EmptyState.Footer>
                                                        <Button
                                                            size="md"
                                                            color="secondary"
                                                            onClick={() => {
                                                                setSearchQuery("");
                                                                setFilters(defaultFilters);
                                                                setActiveFilter("all");
                                                            }}
                                                        >
                                                            Clear filters
                                                        </Button>
                                                    </EmptyState.Footer>
                                                </EmptyState>
                                            </div>
                                        )}
                                    >
                                        {(rfq) => (
                                            <Table.Row
                                                key={rfq.id}
                                                id={rfq.id}
                                                className="transition-all duration-300 ease-out animate-in fade-in slide-in-from-top-2"
                                            >
                                                <Table.Cell className="font-medium text-primary">{rfq.id}</Table.Cell>
                                                <Table.Cell className="text-primary">{rfq.company}</Table.Cell>
                                                <Table.Cell>
                                                    <DeviceCountDisplay devices={rfq.devices} />
                                                </Table.Cell>
                                                <Table.Cell className="text-primary">
                                                    {rfq.budget > 0 ? formatCurrency(rfq.budget) : <span className="text-tertiary">—</span>}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <div className="flex items-center gap-1.5">
                                                        <CountryFlag country={rfq.country} />
                                                        <span className="text-secondary">{rfq.country}</span>
                                                    </div>
                                                </Table.Cell>
                                                <Table.Cell>
                                                    {rfq.vendorResponses.length > 0 ? (
                                                        <span className="text-sm text-primary">
                                                            {rfq.vendorResponses.length} vendor{rfq.vendorResponses.length !== 1 ? "s" : ""}
                                                        </span>
                                                    ) : (
                                                        <span className="text-sm text-tertiary">—</span>
                                                    )}
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <StatusBadge status={rfq.status} />
                                                </Table.Cell>
                                                <Table.Cell>
                                                    <Link
                                                        href={`/rfq-management/${rfq.id}`}
                                                        className="text-sm font-semibold text-brand-secondary transition-colors hover:text-brand-secondary_hover hover:underline"
                                                    >
                                                        {rfq.status === "vendors_responded" ? "Review" : "View"}
                                                    </Link>
                                                </Table.Cell>
                                            </Table.Row>
                                        )}
                                    </Table.Body>
                                </Table>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <PaginationCardDefault
                                page={currentPage}
                                total={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        )}
                    </TableCard.Root>
                </div>
            </main>
        </div>
    );
}
