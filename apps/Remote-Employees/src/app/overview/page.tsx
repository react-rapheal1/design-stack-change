"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import { Bell02, Settings01 } from "@untitledui/icons";
import { FlagAu, FlagGb, FlagUs, FlagNg, FlagCa, FlagDe, FlagFr } from "@untitledui/country-flags";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { loadProfileUpdate, type ProfileUpdate } from "@/utils/profile-store";
import { cx } from "@/utils/cx";
import { loadNotifications, markAllRead, type NotificationItem } from "@/utils/notification-store";
import { CheckCircle, Mail01, Package } from "@untitledui/icons";

const countryFlags: Record<string, ComponentType<{ className?: string }>> = {
    gb: FlagGb,
    us: FlagUs,
    ng: FlagNg,
    ca: FlagCa,
    de: FlagDe,
    fr: FlagFr,
    au: FlagAu,
};

// ---------------------------------------------------------------------------
// Notification icon map
// ---------------------------------------------------------------------------

const notificationIcons: Record<NotificationItem["type"], { icon: ComponentType<{ className?: string }>; bg: string; color: string }> = {
    success: { icon: CheckCircle, bg: "bg-[#dcfae6]", color: "text-[#17b26a]" },
    info: { icon: Mail01, bg: "bg-[#dbeafe]", color: "text-[#2563eb]" },
    processing: { icon: Package, bg: "bg-[#fef3c7]", color: "text-[#d97706]" },
};

// ---------------------------------------------------------------------------
// Header
// ---------------------------------------------------------------------------

function HeaderNavigation() {
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const unreadCount = notifications.filter((n) => !n.read).length;

    useEffect(() => {
        setNotifications(loadNotifications());
    }, []);

    // Close on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleBellClick = () => {
        if (!isOpen && unreadCount > 0) {
            const updated = notifications.map((n) => ({ ...n, read: true }));
            markAllRead();
            setNotifications(updated);
        }
        setIsOpen((v) => !v);
    };

    return (
        <header className="sticky top-0 z-40 flex w-full shrink-0 flex-col items-center border-b border-[#22262f] bg-[#0c0e12]">
            <div className="flex h-[72px] w-full max-w-[1280px] items-center justify-between px-8">
                <RaydaLogo variant="white" />

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                        <button type="button" className="flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5">
                            <Settings01 className="size-5" />
                        </button>

                        {/* Bell with dropdown */}
                        <div ref={dropdownRef} className="relative">
                            <button
                                type="button"
                                onClick={handleBellClick}
                                className="relative flex size-10 items-center justify-center rounded-md text-[#94979c] hover:bg-white/5"
                            >
                                <Bell02 className="size-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute -top-1 left-6 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#fda29b] px-1 text-[10px] font-medium text-white">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Dropdown panel */}
                            {isOpen && (
                                <div className="absolute right-0 top-[calc(100%+8px)] w-[380px] overflow-hidden rounded-xl border border-[#eaecf0] bg-white shadow-[0px_8px_24px_rgba(0,0,0,0.12)]">
                                    {/* Header */}
                                    <div className="flex items-center justify-between border-b border-[#eaecf0] px-4 py-3">
                                        <p className="text-sm font-semibold text-[#101828]">Notifications</p>
                                        {notifications.length > 0 && (
                                            <span className="text-xs font-medium text-[#667085]">
                                                {notifications.length} notification{notifications.length !== 1 ? "s" : ""}
                                            </span>
                                        )}
                                    </div>

                                    {/* Items */}
                                    {notifications.length === 0 ? (
                                        <div className="px-4 py-8 text-center">
                                            <p className="text-sm text-[#667085]">No notifications</p>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col">
                                            {notifications.map((item, index) => {
                                                const { icon: Icon, bg, color } = notificationIcons[item.type];
                                                return (
                                                    <div
                                                        key={item.id}
                                                        className={cx(
                                                            "flex gap-3 px-4 py-4",
                                                            index < notifications.length - 1 && "border-b border-[#eaecf0]",
                                                        )}
                                                    >
                                                        <div className={cx("flex size-9 shrink-0 items-center justify-center rounded-full", bg)}>
                                                            <Icon className={cx("size-4", color)} />
                                                        </div>
                                                        <div className="flex flex-col gap-0.5">
                                                            <p className="text-sm font-medium text-[#101828]">{item.title}</p>
                                                            <p className="text-xs leading-5 text-[#667085]">{item.description}</p>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="relative size-10 shrink-0 cursor-pointer rounded-full bg-[#22262f]">
                        <span className="absolute inset-0 rounded-full border border-white/[0.12]" />
                        <p className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#94979c]">
                            OR
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}

// ---------------------------------------------------------------------------
// Profile header
// ---------------------------------------------------------------------------

function ProfileHeader() {
    return (
        <div className="relative flex w-full flex-col items-center pb-10">
            {/* Gradient banner */}
            <div className="h-60 w-full overflow-hidden">
                <div
                    className="h-full w-full"
                    style={{
                        background:
                            "radial-gradient(ellipse at 20% 50%, #fde68a 0%, transparent 50%), radial-gradient(ellipse at 50% 30%, #ddd6fe 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #bfdbfe 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, #fbcfe8 0%, transparent 40%), linear-gradient(135deg, #fef3c7 0%, #ede9fe 50%, #dbeafe 100%)",
                    }}
                />
            </div>

            {/* Avatar + content */}
            <div className="mx-auto w-full max-w-[1280px] px-8">
                <div className="-mt-20 flex items-end gap-6">
                    {/* Avatar */}
                    <div className="relative size-40 shrink-0 rounded-[200px] border-4 border-white bg-[#f2f4f7] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]">
                        <p className="absolute inset-0 flex items-center justify-center text-[60px] font-medium leading-[72px] tracking-[-1.2px] text-[#475467]">
                            OR
                        </p>
                    </div>

                    {/* Name + actions */}
                    <div className="flex flex-1 items-end justify-between pb-1">
                        <div className="flex flex-col gap-1">
                            <h1 className="text-[30px] font-semibold leading-[38px] text-[#101828]">
                                Zahir Mays (Product designer)
                            </h1>
                            <p className="text-base text-[#475467]">zahir@rayda.co</p>
                        </div>
                        <Button size="md">Edit profile</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Details bar
// ---------------------------------------------------------------------------

function DetailsBar() {
    const [profile, setProfile] = useState<ProfileUpdate | null>(null);

    useEffect(() => {
        setProfile(loadProfileUpdate());
    }, []);

    const Flag = profile ? (countryFlags[profile.countryId] ?? FlagAu) : FlagAu;
    const location = profile
        ? [profile.stateLabel, profile.countryLabel].filter(Boolean).join(", ")
        : "Melbourne, Australia";
    const phone = profile?.phone ?? "(406) 555-0120";
    const address = profile?.address ?? "Suite 231 763 Sipes Stream, New Elenaburgh, AL 54273";

    return (
        <div className="flex w-full gap-14 rounded-xl bg-[#f9fafb] px-6 py-5">
            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-[#667085]">Location</p>
                <div className="flex items-center gap-2">
                    <Flag className="size-5 shrink-0" />
                    <p className="text-base font-medium text-[#344054]">{location}</p>
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-[#667085]">Department</p>
                <p className="text-base font-medium text-[#344054]">Growth</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-[#667085]">Level</p>
                <p className="text-base font-medium text-[#344054]">Growth manager</p>
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-sm font-medium text-[#667085]">Phone number</p>
                <p className="text-base font-medium text-[#344054]">{phone}</p>
            </div>

            <div className="flex flex-1 flex-col gap-2">
                <p className="text-sm font-medium text-[#667085]">Address</p>
                <p className="text-base font-medium text-[#344054]">{address}</p>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Assets section
// ---------------------------------------------------------------------------

function AssetsSection() {
    return (
        <div className="flex w-full flex-col gap-5">
            {/* Section header */}
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-4">
                    <div className="flex flex-1 flex-col gap-1">
                        <h2 className="text-lg font-semibold text-[#101828]">Assets</h2>
                        <p className="text-sm text-[#475467]">Your recent assets here</p>
                    </div>
                    <div className="flex items-center gap-3">
                                        <Link href="/employee/orders/ORD-1007">
                                            <Button size="md" color="secondary">View Order</Button>
                                        </Link>
                                        <Button size="md">All assets</Button>
                                    </div>
                </div>
                <div className="h-px w-full bg-[#eaecf0]" />
            </div>

            {/* Empty state */}
            <EmptyState>
                <EmptyState.Header pattern="none">
                    <EmptyState.Illustration type="box" />
                </EmptyState.Header>
                <EmptyState.Content>
                    <EmptyState.Title>No assets / catalogues assigned yet</EmptyState.Title>
                    <EmptyState.Description>
                        You don&apos;t have any assets / catalogues assigned to you yet.
                    </EmptyState.Description>
                </EmptyState.Content>
            </EmptyState>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OverviewPage() {
    return (
        <div className="flex min-h-screen flex-col bg-white">
            <HeaderNavigation />

            <main className="flex flex-col items-center gap-8 pb-12 sm:pb-24">
                <ProfileHeader />

                <div className="w-full">
                    <div className="mx-auto flex max-w-[1280px] flex-col gap-8 px-4 sm:px-6 lg:px-8">
                        <DetailsBar />
                        <AssetsSection />
                    </div>
                </div>
            </main>
        </div>
    );
}