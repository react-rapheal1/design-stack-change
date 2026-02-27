"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    AlertCircle,
    ArrowLeft,
    ArrowRight,
    Check,
    CheckCircle,
    ChevronDown,
    ChevronRight,
    Clock,
    ClipboardCheck,
    Edit05,
    HomeLine,
    Menu01,
    MessageTextSquare01,
    Settings01,
    Star01,
    XCircle,
    XClose,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { ButtonGroup, ButtonGroupItem } from "@/components/base/button-group/button-group";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { InputBase } from "@/components/base/input/input";
import { InputGroup } from "@/components/base/input/input-group";
import { TextArea } from "@/components/base/textarea/textarea";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";

import {
    type RFQ,
    type RFQStatus,
    type DeviceResponseType,
    type CurationData,
    type CurationDevicePricing,
    mockRFQs,
    navItems,
    countryCodeMap,
    formatCurrency,
    formatDateTime,
    getStatusConfig,
} from "../_shared";

// ---------------------------------------------------------------------------
// Header Navigation (shared pattern)
// ---------------------------------------------------------------------------

function HeaderNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative w-full border-b border-[#475467] bg-primary-solid">
            <div className="flex h-[72px] w-full items-center justify-between page-px">
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
                    <Avatar
                        alt="Jane Admin"
                        initials="JA"
                        size="md"
                        contrastBorder={false}
                        className="hidden size-10 bg-[#e6efff] text-sm font-semibold text-[#003999] sm:flex"
                    />
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
// Shared Small Components
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

function StatusBadge({ status }: { status: RFQStatus }) {
    const config = getStatusConfig(status);
    return (
        <Badge size="sm" type="pill-color" color={config.color}>
            {config.label}
        </Badge>
    );
}

function ResponseTypeBadge({ type }: { type: DeviceResponseType }) {
    const config: Record<DeviceResponseType, { label: string; color: "success" | "blue" | "error" }> = {
        quoted: { label: "Quoted", color: "success" },
        alternative: { label: "Alternative", color: "blue" },
        unavailable: { label: "Unavailable", color: "error" },
    };
    const { label, color } = config[type];
    return <Badge size="sm" color={color} type="pill-color">{label}</Badge>;
}

function VendorNoteDropdown({ note }: { note: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-t border-secondary">
            <div
                role="button"
                tabIndex={0}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen((prev) => !prev);
                }}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.stopPropagation();
                        setIsOpen((prev) => !prev);
                    }
                }}
                className="flex w-full items-center gap-1.5 px-4 py-2 text-xs text-quaternary transition hover:text-tertiary"
            >
                <MessageTextSquare01 className="size-3.5 shrink-0" />
                <span>Vendor note</span>
                <ChevronDown className={cx("ml-auto size-3.5 transition duration-150", isOpen && "rotate-180")} />
            </div>
            {isOpen && (
                <div className="px-4 pb-3">
                    <p className="text-xs leading-relaxed text-tertiary">{note}</p>
                </div>
            )}
        </div>
    );
}

function SuccessToast({ isVisible, onDismiss, message }: { isVisible: boolean; onDismiss: () => void; message: string }) {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(onDismiss, 5000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onDismiss]);

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-[#abefc6] bg-[#ecfdf3] px-4 py-3 shadow-lg animate-in slide-in-from-bottom-4 duration-300">
            <CheckCircle className="size-5 text-[#067647]" />
            <span className="text-sm font-medium text-[#067647]">{message}</span>
            <button type="button" onClick={onDismiss} className="ml-2 rounded p-1 hover:bg-[#d1fadf]">
                <XClose className="size-4 text-[#067647]" />
            </button>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Curate Response Modal (Flow 3) — full-screen overlay
// ---------------------------------------------------------------------------

function CurateResponseModal({
    rfq,
    vendorId,
    isOpen,
    onClose,
    onSend,
}: {
    rfq: RFQ | null;
    vendorId: string;
    isOpen: boolean;
    onClose: () => void;
    onSend: (rfq: RFQ, curation: CurationData) => void;
}) {
    const [devicePricing, setDevicePricing] = useState<CurationDevicePricing[]>([]);
    const [notes, setNotes] = useState("");
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showDiscardModal, setShowDiscardModal] = useState(false);
    const [hasChanges, setHasChanges] = useState(false);

    const vendor = rfq?.vendorResponses.find((v) => v.vendorId === vendorId);

    useEffect(() => {
        if (rfq && vendor) {
            if (rfq.curation && rfq.curation.selectedVendorId === vendorId) {
                setDevicePricing(rfq.curation.devicePricing);
                setNotes(rfq.curation.notes);
            } else {
                setDevicePricing(
                    rfq.devices.map((_, idx) => {
                        const dr = vendor.deviceResponses[idx];
                        const vendorPrice = dr.type === "quoted" ? dr.quotedPrice! : dr.type === "alternative" ? dr.alternativePrice! : 0;
                        return {
                            mode: "markup",
                            markupPercent: 10,
                            fixedPrice: Math.round(vendorPrice * 1.1),
                            isUnavailable: dr.type === "unavailable",
                        };
                    }),
                );
                setNotes(vendor.vendorNote ?? "");
            }
            setHasChanges(false);
        }
    }, [rfq, vendor, vendorId]);

    if (!rfq || !vendor) return null;

    const updatePricing = (idx: number, updates: Partial<CurationDevicePricing>) => {
        setHasChanges(true);
        setDevicePricing((prev) => prev.map((p, i) => (i === idx ? { ...p, ...updates } : p)));
    };

    const getVendorPrice = (idx: number): number => {
        const dr = vendor.deviceResponses[idx];
        if (dr.type === "quoted" && dr.quotedPrice) return dr.quotedPrice;
        if (dr.type === "alternative" && dr.alternativePrice) return dr.alternativePrice;
        return 0;
    };

    const getCustomerPrice = (idx: number): number => {
        const pricing = devicePricing[idx];
        if (!pricing || pricing.isUnavailable) return 0;
        const vendorPrice = getVendorPrice(idx);
        if (pricing.mode === "markup") {
            return Math.round(vendorPrice * (1 + pricing.markupPercent / 100));
        }
        return pricing.fixedPrice;
    };

    const getEffectiveMarkup = (idx: number): number => {
        const pricing = devicePricing[idx];
        if (!pricing || pricing.isUnavailable) return 0;
        const vendorPrice = getVendorPrice(idx);
        if (vendorPrice === 0) return 0;
        if (pricing.mode === "fixed") {
            return Math.round(((pricing.fixedPrice - vendorPrice) / vendorPrice) * 100);
        }
        return pricing.markupPercent;
    };

    const vendorCostTotal = rfq.devices.reduce((sum, d, i) => {
        if (devicePricing[i]?.isUnavailable) return sum;
        return sum + getVendorPrice(i) * d.quantity;
    }, 0);

    const customerPriceTotal = rfq.devices.reduce((sum, d, i) => {
        if (devicePricing[i]?.isUnavailable) return sum;
        return sum + getCustomerPrice(i) * d.quantity;
    }, 0);

    const totalMarkup = customerPriceTotal - vendorCostTotal;
    const totalMarkupPercent = vendorCostTotal > 0 ? ((totalMarkup / vendorCostTotal) * 100).toFixed(1) : "0.0";

    const curation: CurationData = {
        selectedVendorId: vendorId,
        devicePricing,
        notes,
    };

    const quotedDeviceCount = devicePricing.filter((p) => !p.isUnavailable).length;

    if (!isOpen) return null;

    return (
        <>
            <div className="fixed inset-0 z-50 flex flex-col bg-primary">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-secondary py-4 page-px">
                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => hasChanges ? setShowDiscardModal(true) : onClose()}
                            className="flex items-center gap-1.5 text-sm font-semibold text-tertiary transition hover:text-primary"
                        >
                            <ArrowLeft className="size-4" />
                            Back to Review
                        </button>
                    </div>
                    <div className="text-center">
                        <h2 className="text-lg font-semibold text-primary">Curate Response for {rfq.id}</h2>
                        <p className="text-sm text-tertiary">Vendor: {vendor.vendorName}</p>
                    </div>
                    <div className="w-32" />
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto">
                    <div className="mx-auto max-w-3xl py-6 page-px">
                        <div className="flex flex-col gap-4">
                            {rfq.devices.map((device, idx) => {
                                const dr = vendor.deviceResponses[idx];
                                const pricing = devicePricing[idx];
                                if (!pricing) return null;
                                const vendorPrice = getVendorPrice(idx);

                                return (
                                    <div key={idx} className={cx(
                                        "rounded-xl border border-secondary bg-primary shadow-xs",
                                        dr.type === "unavailable" && "opacity-60",
                                    )}>
                                        <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                                            <div className="flex items-center gap-1.5">
                                                <span className="text-sm font-semibold text-primary">{device.name}</span>
                                                <span className="text-sm text-quaternary">&times;{device.quantity}</span>
                                            </div>
                                            <ResponseTypeBadge type={dr.type} />
                                        </div>

                                        <div className="p-4">
                                            {dr.type === "unavailable" ? (
                                                <div className="flex items-center gap-2 text-sm text-error-primary">
                                                    <XCircle className="size-4 shrink-0" />
                                                    <span>Vendor marked as unavailable: {dr.unavailableReason}</span>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-4">
                                                    {/* Vendor Quote & Customer Budget */}
                                                    <div className="flex flex-col gap-0 rounded-lg bg-secondary">
                                                        <div className="flex items-center justify-between px-3 py-2">
                                                            <span className="text-sm text-tertiary">Vendor Quote</span>
                                                            <span className="text-sm font-semibold text-primary">
                                                                {formatCurrency(vendorPrice)}/unit
                                                            </span>
                                                        </div>
                                                        {device.unitBudget != null && (
                                                            <div className="flex items-center justify-between border-t border-tertiary px-3 py-2">
                                                                <span className="text-sm text-tertiary">Customer Budget</span>
                                                                <span className="text-sm font-medium text-tertiary">
                                                                    {formatCurrency(device.unitBudget)}/unit
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>

                                                    {/* Alternative Offered */}
                                                    {dr.type === "alternative" && (
                                                        <div className="rounded-lg border border-utility-blue-200 bg-utility-blue-50 px-3 py-2.5">
                                                            <p className="text-xs font-medium text-utility-blue-700 uppercase tracking-wide">Alternative Offered</p>
                                                            <p className="mt-1 text-sm font-medium text-utility-blue-700">{dr.alternativeName}</p>
                                                            {dr.alternativeSpecs && (
                                                                <p className="mt-0.5 text-xs text-utility-blue-600">{dr.alternativeSpecs}</p>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Mark as Unavailable */}
                                                    <Checkbox
                                                        size="sm"
                                                        label="Mark as Unavailable"
                                                        isSelected={pricing.isUnavailable}
                                                        onChange={(isSelected) => updatePricing(idx, { isUnavailable: isSelected })}
                                                    />

                                                    {/* Pricing Controls */}
                                                    {!pricing.isUnavailable && (
                                                        <div className="flex flex-col gap-3 rounded-lg border border-tertiary p-3">
                                                            <div className="flex items-center gap-3">
                                                                <span className="text-sm font-medium text-secondary">Pricing</span>
                                                                <ButtonGroup
                                                                    size="sm"
                                                                    selectedKeys={new Set([pricing.mode === "markup" ? `markup-${idx}` : `fixed-${idx}`])}
                                                                    onSelectionChange={(keys) => {
                                                                        const selected = [...keys][0] as string;
                                                                        if (selected?.startsWith("markup")) {
                                                                            const newFixed = Math.round(vendorPrice * (1 + pricing.markupPercent / 100));
                                                                            updatePricing(idx, { mode: "markup", fixedPrice: newFixed });
                                                                        } else {
                                                                            updatePricing(idx, { mode: "fixed" });
                                                                        }
                                                                    }}
                                                                >
                                                                    <ButtonGroupItem id={`markup-${idx}`}>
                                                                        Markup %
                                                                    </ButtonGroupItem>
                                                                    <ButtonGroupItem id={`fixed-${idx}`}>
                                                                        Fixed Price
                                                                    </ButtonGroupItem>
                                                                </ButtonGroup>
                                                            </div>

                                                            {pricing.mode === "markup" ? (
                                                                <div className="flex flex-wrap items-center gap-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-sm text-tertiary">Markup</span>
                                                                        <input
                                                                            type="number"
                                                                            value={pricing.markupPercent}
                                                                            onChange={(e) => {
                                                                                const markup = Number(e.target.value) || 0;
                                                                                const newFixed = Math.round(vendorPrice * (1 + markup / 100));
                                                                                updatePricing(idx, { markupPercent: markup, fixedPrice: newFixed });
                                                                            }}
                                                                            className="w-20 rounded-lg bg-primary px-3 py-2 text-sm text-primary shadow-xs ring-1 ring-border-primary ring-inset transition duration-100 ease-linear focus:ring-2 focus:ring-brand focus:outline-hidden"
                                                                            min={0}
                                                                            max={200}
                                                                        />
                                                                        <span className="text-sm text-tertiary">%</span>
                                                                    </div>
                                                                    <span className="text-sm text-quaternary">=</span>
                                                                    <span className="text-sm font-semibold text-primary">
                                                                        {formatCurrency(getCustomerPrice(idx))}/unit
                                                                    </span>
                                                                </div>
                                                            ) : (
                                                                <div className="flex flex-wrap items-center gap-3">
                                                                    <div className="flex items-center gap-2">
                                                                        <span className="text-sm text-tertiary">Price</span>
                                                                        <InputGroup
                                                                            className="w-28"
                                                                            value={String(pricing.fixedPrice)}
                                                                            onChange={(value) => {
                                                                                const fixed = Number(value) || 0;
                                                                                const effectiveMarkup = vendorPrice > 0 ? Math.round(((fixed - vendorPrice) / vendorPrice) * 100) : 0;
                                                                                updatePricing(idx, { fixedPrice: fixed, markupPercent: effectiveMarkup });
                                                                            }}
                                                                            aria-label="Customer price"
                                                                            leadingAddon={<InputGroup.Prefix>$</InputGroup.Prefix>}
                                                                        >
                                                                            <InputBase inputMode="numeric" pattern="[0-9]*" placeholder="0" />
                                                                        </InputGroup>
                                                                        <span className="text-sm text-tertiary">per unit</span>
                                                                    </div>
                                                                    <span className="text-sm text-quaternary">=</span>
                                                                    <span className="text-sm text-tertiary">
                                                                        Markup: <span className="font-semibold text-primary">{getEffectiveMarkup(idx)}%</span>
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Note to Customer */}
                            <div className="rounded-xl border border-secondary bg-primary shadow-xs">
                                <div className="border-b border-secondary px-4 py-3">
                                    <span className="text-sm font-semibold text-primary">Note to Customer</span>
                                </div>
                                <div className="p-4">
                                    <TextArea
                                        value={notes}
                                        onChange={(value) => {
                                            setNotes(value);
                                            setHasChanges(true);
                                        }}
                                        placeholder="Add any relevant details e.g warranty terms, SLA, etc."
                                        rows={3}
                                        textAreaClassName="resize-none"
                                    />
                                </div>
                            </div>

                            {/* Summary */}
                            <div className="rounded-xl border border-secondary bg-secondary_alt p-4">
                                <p className="mb-3 text-sm font-semibold text-primary">Summary</p>
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-tertiary">Vendor Cost Total</span>
                                        <span className="font-medium text-primary">{formatCurrency(vendorCostTotal)}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-tertiary">Customer Price Total</span>
                                        <span className="font-semibold text-primary">{formatCurrency(customerPriceTotal)}</span>
                                    </div>
                                    <div className="border-t border-secondary pt-2">
                                        <div className="flex items-center justify-between rounded-md bg-success-secondary px-2 py-1.5 text-sm">
                                            <span className="text-success-primary">Total Markup</span>
                                            <span className="font-semibold text-success-primary">
                                                {formatCurrency(totalMarkup)} ({totalMarkupPercent}%)
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-secondary py-4 page-px">
                    <Button
                        size="md"
                        color="secondary"
                        onClick={() => hasChanges ? setShowDiscardModal(true) : onClose()}
                    >
                        Close
                    </Button>
                    <Button
                        size="md"
                        color="primary"
                        iconTrailing={ArrowRight}
                        onClick={() => setShowConfirmModal(true)}
                    >
                        Send to Customer
                    </Button>
                </div>
            </div>

            {/* Discard Changes Modal */}
            {showDiscardModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-overlay/70">
                    <div className="mx-4 w-full max-w-md rounded-xl bg-primary p-6 shadow-xl ring-1 ring-secondary">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <FeaturedIcon icon={AlertCircle} color="warning" theme="light" size="lg" />
                            <div>
                                <h3 className="text-lg font-semibold text-primary">Discard unsaved changes?</h3>
                                <p className="mt-1 text-sm text-tertiary">
                                    You have unsaved pricing changes. Closing now will discard all modifications you've made.
                                </p>
                            </div>
                            <div className="flex w-full gap-3">
                                <Button
                                    size="md"
                                    color="secondary"
                                    className="flex-1"
                                    onClick={() => setShowDiscardModal(false)}
                                >
                                    Keep Editing
                                </Button>
                                <Button
                                    size="md"
                                    color="primary-destructive"
                                    className="flex-1"
                                    onClick={() => {
                                        setShowDiscardModal(false);
                                        onClose();
                                    }}
                                >
                                    Discard & Close
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Confirmation Modal (Flow 4) */}
            {showConfirmModal && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-overlay/70">
                    <div className="mx-4 w-full max-w-md rounded-xl bg-primary p-6 shadow-xl ring-1 ring-secondary">
                        <div className="flex flex-col items-center gap-4 text-center">
                            <FeaturedIcon icon={ClipboardCheck} color="brand" theme="light" size="lg" />
                            <div>
                                <h3 className="text-lg font-semibold text-primary">Send Response to Customer?</h3>
                                <p className="mt-1 text-sm text-tertiary">
                                    You're about to send a curated response for {rfq.id}:
                                </p>
                            </div>
                            <div className="w-full rounded-lg bg-secondary p-3 text-left text-sm">
                                <div className="flex flex-col gap-1.5">
                                    <div className="flex justify-between">
                                        <span className="text-tertiary">Devices quoted</span>
                                        <span className="font-medium text-primary">{quotedDeviceCount}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-tertiary">Vendor</span>
                                        <span className="font-medium text-primary">{vendor.vendorName}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-tertiary">Customer total</span>
                                        <span className="font-semibold text-primary">{formatCurrency(customerPriceTotal)}</span>
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-tertiary">The customer will be notified and can accept or reject.</p>
                            <div className="flex w-full gap-3">
                                <Button
                                    size="md"
                                    color="secondary"
                                    className="flex-1"
                                    onClick={() => setShowConfirmModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    size="md"
                                    color="primary"
                                    className="flex-1"
                                    onClick={() => {
                                        setShowConfirmModal(false);
                                        onSend(rfq, curation);
                                    }}
                                >
                                    Confirm & Send
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// ---------------------------------------------------------------------------
// RFQ Detail Page
// ---------------------------------------------------------------------------

export default function RFQDetailPage() {
    const params = useParams();
    const router = useRouter();
    const rfqId = params.id as string;

    // Find the RFQ from mock data
    const [rfq, setRfq] = useState<RFQ | null>(null);
    const [selectedVendorId, setSelectedVendorId] = useState<string>("");

    // Curation modal state
    const [curatingRFQ, setCuratingRFQ] = useState<RFQ | null>(null);
    const [curatingVendorId, setCuratingVendorId] = useState<string>("");

    // Toast state
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const found = mockRFQs.find((r) => r.id === rfqId);
        if (found) {
            setRfq(found);
            // Only pre-select if RFQ already has a curation (draft/sent/confirmed/rejected)
            if (found.curation) {
                setSelectedVendorId(found.curation.selectedVendorId);
            } else {
                // No default selection — admin must explicitly choose
                setSelectedVendorId("");
            }
        }
    }, [rfqId]);

    if (!rfq) {
        return (
            <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
                <HeaderNavigation />
                <main className="flex flex-1 items-center justify-center">
                    <div className="text-center">
                        <p className="text-lg font-semibold text-primary">RFQ not found</p>
                        <p className="mt-1 text-sm text-tertiary">The request "{rfqId}" does not exist.</p>
                        <Button
                            size="md"
                            color="secondary"
                            className="mt-4"
                            onClick={() => router.push("/rfq-management")}
                        >
                            Back to RFQs
                        </Button>
                    </div>
                </main>
            </div>
        );
    }

    const totalQuantity = rfq.devices.reduce((sum, d) => sum + d.quantity, 0);
    const isReadOnly = rfq.status === "fully_accepted" || rfq.status === "partially_accepted" || rfq.status === "customer_rejected" || rfq.status === "expired";
    const isSent = rfq.status === "response_sent";
    const isPending = rfq.status === "pending_vendors";
    const selectedVendor = rfq.vendorResponses.find((v) => v.vendorId === selectedVendorId);

    // Sort vendor responses: earliest responder first
    const sortedVendorResponses = [...rfq.vendorResponses].sort(
        (a, b) => new Date(a.respondedAt).getTime() - new Date(b.respondedAt).getTime(),
    );

    // Handlers
    const handleCurate = () => {
        setCuratingRFQ(rfq);
        setCuratingVendorId(selectedVendorId);
    };

    const handleSendToCustomer = (r: RFQ, curation: CurationData) => {
        setRfq({ ...r, status: "response_sent", curation, sentAt: new Date().toISOString() });
        setCuratingRFQ(null);
        setSelectedVendorId(curation.selectedVendorId);
        setSuccessMessage(`Response sent to customer for ${r.id}`);
        setShowSuccessToast(true);
    };

    const handleRecall = () => {
        const updated = { ...rfq, status: "vendors_responded" as RFQStatus, sentAt: undefined };
        setRfq(updated);
        const vendorId = rfq.curation?.selectedVendorId || rfq.vendorResponses[0]?.vendorId || "";
        setCuratingRFQ(updated);
        setCuratingVendorId(vendorId);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
            <HeaderNavigation />

            <main className="flex flex-1 flex-col">
                {/* Page Header with Breadcrumb */}
                <div className="border-b border-secondary bg-primary">
                    <div className="py-5 page-px">
                        {/* Breadcrumb */}
                        <nav aria-label="Breadcrumb" className="mb-4">
                            <ol className="flex items-center gap-2 text-sm">
                                <li className="flex items-center">
                                    <Link
                                        href="/"
                                        className="flex items-center text-fg-quaternary transition hover:text-fg-secondary"
                                        aria-label="Home"
                                    >
                                        <HomeLine className="size-5" />
                                    </Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <ChevronRight className="size-4 text-fg-quaternary" />
                                    <Link
                                        href="/rfq-management"
                                        className="font-medium text-tertiary transition hover:text-primary"
                                    >
                                        RFQs
                                    </Link>
                                </li>
                                <li className="flex items-center gap-2">
                                    <ChevronRight className="size-4 text-fg-quaternary" />
                                    <span className="font-semibold text-brand-secondary">{rfq.id}</span>
                                </li>
                            </ol>
                        </nav>

                        {/* Title + Status */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex size-10 items-center justify-center rounded-lg border border-secondary bg-primary shadow-xs">
                                    <ClipboardCheck className="size-5 text-fg-quaternary" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-primary sm:text-2xl">
                                        {rfq.id}
                                    </h1>
                                    <p className="text-sm text-tertiary">{rfq.company}</p>
                                </div>
                            </div>
                            <StatusBadge status={rfq.status} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 py-6 page-px">
                    <div>
                        <div className="flex flex-col gap-6">
                            {/* Status Banners */}
                            {isPending && (
                                <div className="flex items-start gap-3 rounded-lg border border-[#fedf89] bg-[#fffaeb] p-4">
                                    <Clock className="size-5 shrink-0 text-[#dc6803]" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold text-[#b54708]">Waiting for Vendor Responses</span>
                                        <span className="text-sm text-[#b54708]">This RFQ has been sent to vendors. Waiting for quotes.</span>
                                    </div>
                                </div>
                            )}

                            {isSent && (
                                <div className="flex items-start gap-3 rounded-lg border border-[#b2ddff] bg-[#eff8ff] p-4">
                                    <CheckCircle className="size-5 shrink-0 text-[#175cd3]" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold text-[#175cd3]">Response Sent to Customer</span>
                                        <span className="text-sm text-[#175cd3]">
                                            Curated response was sent on {formatDateTime(rfq.sentAt!)}. Waiting for customer decision.
                                        </span>
                                    </div>
                                </div>
                            )}

                            {rfq.status === "fully_accepted" && (
                                <div className="flex items-start gap-3 rounded-lg border border-[#abefc6] bg-[#ecfdf3] p-4">
                                    <CheckCircle className="size-5 shrink-0 text-[#067647]" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold text-[#067647]">Fully Accepted</span>
                                        <span className="text-sm text-[#067647]">The customer has accepted all devices in this quote.</span>
                                    </div>
                                </div>
                            )}

                            {rfq.status === "partially_accepted" && (
                                <div className="flex items-start gap-3 rounded-lg border border-[#d6bbfb] bg-[#f9f5ff] p-4">
                                    <AlertCircle className="size-5 shrink-0 text-[#6941c6]" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold text-[#6941c6]">Partially Accepted</span>
                                        <span className="text-sm text-[#6941c6]">
                                            The customer accepted {rfq.acceptedDevices?.filter(Boolean).length} of {rfq.devices.length} devices in this quote.
                                        </span>
                                    </div>
                                </div>
                            )}

                            {rfq.status === "customer_rejected" && (
                                <div className="flex items-start gap-3 rounded-lg border border-[#fecdca] bg-[#fef3f2] p-4">
                                    <XCircle className="size-5 shrink-0 text-[#d92d20]" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold text-[#b42318]">Customer Rejected</span>
                                        <span className="text-sm text-[#b42318]">
                                            {rfq.rejectionReason || "The customer rejected this quote."}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {rfq.status === "expired" && (
                                <div className="flex items-start gap-3 rounded-lg border border-[#e9eaeb] bg-[#fafafa] p-4">
                                    <Clock className="size-5 shrink-0 text-[#535862]" />
                                    <div className="flex flex-col gap-1">
                                        <span className="text-sm font-semibold text-[#535862]">Expired</span>
                                        <span className="text-sm text-[#535862]">This RFQ has expired without a response.</span>
                                    </div>
                                </div>
                            )}

                            {/* Two-Column Summary */}
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                {/* Customer Request — takes 2 cols */}
                                <div className="rounded-xl border border-secondary bg-primary shadow-xs lg:col-span-2">
                                    <div className="border-b border-secondary px-5 py-3.5">
                                        <span className="text-sm font-semibold text-secondary">Customer Request</span>
                                    </div>
                                    <div className="p-5">
                                        <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-tertiary">Company</span>
                                                <span className="text-sm font-medium text-primary">{rfq.company}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-tertiary">Country</span>
                                                <div className="flex items-center gap-1.5">
                                                    <CountryFlag country={rfq.country} />
                                                    <span className="text-sm font-medium text-primary">{rfq.country}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-tertiary">Submitted</span>
                                                <span className="text-sm font-medium text-primary">{formatDateTime(rfq.createdAt)}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-tertiary">Budget</span>
                                                <span className="text-sm font-medium text-primary">
                                                    {rfq.budget > 0 ? (
                                                        <>
                                                            {formatCurrency(rfq.budget)}
                                                            {rfq.devices.some((d) => d.unitBudget == null) && (
                                                                <span className="text-tertiary"> (partial)</span>
                                                            )}
                                                        </>
                                                    ) : (
                                                        <span className="text-tertiary">Not specified</span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Devices List */}
                                        <div className="mt-5 border-t border-secondary pt-4">
                                            <div className="mb-3 flex items-center justify-between">
                                                <span className="text-sm font-medium text-primary">
                                                    Devices ({totalQuantity})
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                {rfq.devices.map((device, idx) => {
                                                    const accepted = rfq.acceptedDevices?.[idx];
                                                    const showAcceptance = rfq.customerDecision === "partially_accepted" || rfq.customerDecision === "fully_accepted";
                                                    return (
                                                        <div key={idx} className={cx(
                                                            "flex items-center justify-between text-sm",
                                                            showAcceptance && accepted === false && "opacity-50",
                                                        )}>
                                                            <span className="flex items-center gap-2 text-tertiary">
                                                                {showAcceptance && (
                                                                    accepted
                                                                        ? <CheckCircle className="size-4 shrink-0 text-[#067647]" />
                                                                        : <XCircle className="size-4 shrink-0 text-[#d92d20]" />
                                                                )}
                                                                {device.name} × {device.quantity}
                                                            </span>
                                                            <span className={cx("font-medium", device.unitBudget != null ? "text-primary" : "text-tertiary")}>
                                                                {device.unitBudget != null ? formatCurrency(device.unitBudget * device.quantity) : "—"}
                                                            </span>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Request Info — takes 1 col */}
                                <div className="rounded-xl border border-secondary bg-primary shadow-xs">
                                    <div className="border-b border-secondary px-5 py-3.5">
                                        <span className="text-sm font-semibold text-secondary">Request Info</span>
                                    </div>
                                    <div className="flex flex-col gap-3 p-5">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-tertiary">RFQ ID</span>
                                            <span className="text-sm font-medium text-primary">{rfq.id}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-tertiary">Status</span>
                                            <StatusBadge status={rfq.status} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-tertiary">Submitted</span>
                                            <span className="text-sm font-medium text-primary">{formatDateTime(rfq.createdAt)}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-tertiary">Vendor Quotes</span>
                                            <span className="text-sm font-medium text-primary">
                                                {rfq.vendorResponses.length > 0
                                                    ? `${rfq.vendorResponses.length} vendor${rfq.vendorResponses.length !== 1 ? "s" : ""}`
                                                    : "—"}
                                            </span>
                                        </div>
                                        {rfq.sentAt && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-tertiary">Sent</span>
                                                <span className="text-sm font-medium text-primary">{formatDateTime(rfq.sentAt!)}</span>
                                            </div>
                                        )}
                                        {rfq.customerDecision && (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm text-tertiary">Decision</span>
                                                <span className={cx(
                                                    "text-sm font-medium",
                                                    rfq.customerDecision === "fully_accepted" ? "text-success-primary"
                                                        : rfq.customerDecision === "partially_accepted" ? "text-[#6941c6]"
                                                        : "text-error-primary",
                                                )}>
                                                    {rfq.customerDecision === "fully_accepted" ? "Fully Accepted"
                                                        : rfq.customerDecision === "partially_accepted" ? "Partially Accepted"
                                                        : "Rejected"}
                                                </span>
                                            </div>
                                        )}
                                        {rfq.rejectionReason && (
                                            <div className="flex flex-col gap-1 border-t border-secondary pt-3">
                                                <span className="text-xs font-medium text-tertiary uppercase tracking-wide">Rejection Reason</span>
                                                <span className="text-sm text-error-primary">{rfq.rejectionReason}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Vendor Quotes Section */}
                            {!isPending && rfq.vendorResponses.length > 0 && (
                                <div className="rounded-xl border border-secondary bg-primary shadow-xs">
                                    <div className="border-b border-secondary px-5 py-3.5">
                                        <span className="text-sm font-semibold text-secondary">
                                            Vendor Quotes ({rfq.vendorResponses.length} vendor{rfq.vendorResponses.length !== 1 ? "s" : ""} responded)
                                        </span>
                                    </div>
                                    <div className="overflow-x-auto p-5">
                                        <div className="min-w-max">
                                            {/* Vendor Selection Cards */}
                                            {!isReadOnly && !isSent && (
                                                <div className="mb-6">
                                                    <p className="mb-3 text-xs font-medium text-tertiary uppercase tracking-wide">
                                                        Select a vendor for this RFQ
                                                    </p>
                                                    <div className="flex gap-3">
                                                        {sortedVendorResponses.map((vendor) => {
                                                            const isSelected = selectedVendorId === vendor.vendorId;
                                                            return (
                                                                <button
                                                                    key={vendor.vendorId}
                                                                    type="button"
                                                                    onClick={() => setSelectedVendorId(vendor.vendorId)}
                                                                    className={cx(
                                                                        "flex min-w-[240px] max-w-[240px] shrink-0 flex-col rounded-xl border-2 text-left transition",
                                                                        isSelected
                                                                            ? "border-brand-solid bg-[#eff8ff] ring-1 ring-brand"
                                                                            : "border-secondary hover:border-tertiary",
                                                                    )}
                                                                >
                                                                    <div className="flex items-center justify-between px-4 pt-4 pb-3">
                                                                        <span className="text-sm font-semibold text-primary">
                                                                            {vendor.vendorName}
                                                                        </span>
                                                                        <div
                                                                            className={cx(
                                                                                "flex size-5 items-center justify-center rounded-full border-2 transition",
                                                                                isSelected
                                                                                    ? "border-brand-solid bg-brand-solid"
                                                                                    : "border-[#d0d5dd]",
                                                                            )}
                                                                        >
                                                                            {isSelected && (
                                                                                <div className="size-2 rounded-full bg-white" />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                    <div className="border-t border-secondary px-4 pt-3 pb-1">
                                                                        <span className="text-2xl font-semibold text-primary">
                                                                            {formatCurrency(vendor.totalPrice)}
                                                                        </span>
                                                                        <p className="mt-0.5 text-xs text-tertiary">Total quote</p>
                                                                    </div>
                                                                    <div className="px-4 pt-1 pb-3 text-xs text-quaternary">
                                                                        {formatDateTime(vendor.respondedAt)}
                                                                    </div>
                                                                    {vendor.vendorNote && (
                                                                        <VendorNoteDropdown note={vendor.vendorNote} />
                                                                    )}
                                                                </button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Sent/ReadOnly: Show selected vendor */}
                                            {(isReadOnly || isSent) && selectedVendor && (
                                                <div className="mb-6 flex items-center justify-between rounded-xl border border-brand bg-[#eff8ff] p-4">
                                                    <div className="flex items-center gap-2">
                                                        <Star01 className="size-4 text-brand-secondary" />
                                                        <span className="text-sm font-semibold text-primary">
                                                            {selectedVendor.vendorName}
                                                        </span>
                                                        <span className="text-xs text-tertiary">Selected Vendor</span>
                                                    </div>
                                                    <span className="text-sm font-semibold text-primary">
                                                        {formatCurrency(selectedVendor.totalPrice)}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Per-Device Comparison */}
                                            <p className="mb-4 text-xs font-medium text-tertiary uppercase tracking-wide">
                                                Per-Device Comparison
                                            </p>
                                            <div className="flex flex-col gap-6">
                                                {rfq.devices.map((device, deviceIdx) => {
                                                    const deviceAccepted = rfq.acceptedDevices?.[deviceIdx];
                                                    const showAcceptance = rfq.customerDecision === "partially_accepted" || rfq.customerDecision === "fully_accepted";
                                                    return (
                                                    <div key={deviceIdx} className={cx(showAcceptance && deviceAccepted === false && "opacity-50")}>
                                                        <div className="mb-3 flex items-center gap-2">
                                                            {showAcceptance && (
                                                                deviceAccepted
                                                                    ? <CheckCircle className="size-4 shrink-0 text-[#067647]" />
                                                                    : <XCircle className="size-4 shrink-0 text-[#d92d20]" />
                                                            )}
                                                            <p className="text-sm font-semibold text-primary">
                                                                {device.name}{" "}
                                                                <span className="font-normal text-tertiary">(×{device.quantity})</span>
                                                            </p>
                                                            {showAcceptance && deviceAccepted === false && (
                                                                <span className="rounded-full bg-[#fef3f2] px-2 py-0.5 text-xs font-medium text-[#b42318]">Declined</span>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-3">
                                                            {sortedVendorResponses.map((vendor) => {
                                                                const dr = vendor.deviceResponses[deviceIdx];
                                                                if (!dr) return null;
                                                                const isSelected = vendor.vendorId === selectedVendorId;

                                                                return (
                                                                    <div
                                                                        key={vendor.vendorId}
                                                                        className={cx(
                                                                            "min-w-[240px] max-w-[240px] shrink-0 rounded-xl border transition",
                                                                            isSelected
                                                                                ? "border-brand bg-[#eff8ff] shadow-sm"
                                                                                : "border-secondary",
                                                                        )}
                                                                    >
                                                                        <div className="flex items-center justify-between px-4 pt-4 pb-3">
                                                                            <span className="text-xs font-medium text-tertiary">
                                                                                {vendor.vendorName}
                                                                            </span>
                                                                            {isSelected && (
                                                                                <span className="flex items-center gap-1 text-xs font-semibold text-brand-secondary">
                                                                                    <Star01 className="size-3" />
                                                                                    CHOSEN
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                        <div className={cx(
                                                                            "border-t px-4 pt-3 pb-4",
                                                                            isSelected ? "border-brand/20" : "border-secondary",
                                                                        )}>
                                                                            <div className="mb-2">
                                                                                <ResponseTypeBadge type={dr.type} />
                                                                            </div>
                                                                            {dr.type === "quoted" && (
                                                                                <div className="mt-3">
                                                                                    <span className="text-2xl font-semibold text-primary">
                                                                                        {formatCurrency(dr.quotedPrice!)}
                                                                                    </span>
                                                                                    <span className="text-sm text-tertiary">/unit</span>
                                                                                </div>
                                                                            )}
                                                                            {dr.type === "alternative" && (
                                                                                <div className="mt-3 flex min-w-0 flex-col gap-1">
                                                                                    <span className="truncate text-sm font-medium text-primary" title={dr.alternativeName}>{dr.alternativeName}</span>
                                                                                    {dr.alternativeSpecs && (
                                                                                        <span className="truncate text-xs text-tertiary" title={dr.alternativeSpecs}>{dr.alternativeSpecs}</span>
                                                                                    )}
                                                                                    <div className="mt-1">
                                                                                        <span className="text-2xl font-semibold text-primary">
                                                                                            {formatCurrency(dr.alternativePrice!)}
                                                                                        </span>
                                                                                        <span className="text-sm text-tertiary">/unit</span>
                                                                                    </div>
                                                                                </div>
                                                                            )}
                                                                            {dr.type === "unavailable" && (
                                                                                <p className="mt-3 text-xs text-error-primary">
                                                                                    {dr.unavailableReason}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Sticky Footer */}
                {!isReadOnly && !isPending && (
                    <div className="sticky bottom-0 border-t border-secondary bg-primary py-4 page-px">
                        <div className="flex items-center justify-between">
                            {isSent ? (
                                <>
                                    <Button
                                        size="md"
                                        color="secondary"
                                        onClick={() => router.push("/rfq-management")}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        size="md"
                                        color="primary"
                                        iconLeading={Edit05}
                                        onClick={handleRecall}
                                    >
                                        Recall & Edit
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        size="md"
                                        color="secondary"
                                        onClick={() => router.push("/rfq-management")}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="md"
                                        color="primary"
                                        iconLeading={Edit05}
                                        isDisabled={!selectedVendorId}
                                        onClick={handleCurate}
                                    >
                                        Prepare Quote
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                )}

                {/* Read-only footer */}
                {isReadOnly && (
                    <div className="sticky bottom-0 border-t border-secondary bg-primary py-4 page-px">
                        <div className="flex items-center justify-start">
                            <Button
                                size="md"
                                color="secondary"
                                onClick={() => router.push("/rfq-management")}
                            >
                                Back to RFQs
                            </Button>
                        </div>
                    </div>
                )}
            </main>

            {/* Curate Response Modal */}
            <CurateResponseModal
                rfq={curatingRFQ}
                vendorId={curatingVendorId}
                isOpen={!!curatingRFQ}
                onClose={() => setCuratingRFQ(null)}
                onSend={handleSendToCustomer}
            />

            {/* Success Toast */}
            <SuccessToast
                isVisible={showSuccessToast}
                onDismiss={() => setShowSuccessToast(false)}
                message={successMessage}
            />
        </div>
    );
}
