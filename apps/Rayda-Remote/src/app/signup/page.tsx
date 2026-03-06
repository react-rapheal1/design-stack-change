"use client";

import { type ComponentType, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown, Eye, EyeOff } from "@untitledui/icons";
import { FlagAu, FlagCa, FlagDe, FlagFr, FlagGb, FlagNg, FlagUs, FlagZa, FlagKe, FlagGh } from "@untitledui/country-flags";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Input } from "@/components/base/input/input";
import { Label } from "@/components/base/input/label";
import { Button } from "@/components/base/buttons/button";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";

const PHONE_COUNTRIES = [
    { id: "us", label: "United States", icon: FlagUs },
    { id: "gb", label: "United Kingdom", icon: FlagGb },
    { id: "ng", label: "Nigeria", icon: FlagNg },
    { id: "ca", label: "Canada", icon: FlagCa },
    { id: "de", label: "Germany", icon: FlagDe },
    { id: "fr", label: "France", icon: FlagFr },
    { id: "au", label: "Australia", icon: FlagAu },
    { id: "za", label: "South Africa", icon: FlagZa },
    { id: "ke", label: "Kenya", icon: FlagKe },
    { id: "gh", label: "Ghana", icon: FlagGh },
];

const PHONE_DIAL_CODES: Record<string, string> = {
    us: "+1",
    gb: "+44",
    ng: "+234",
    ca: "+1",
    de: "+49",
    fr: "+33",
    au: "+61",
    za: "+27",
    ke: "+254",
    gh: "+233",
};

// ---------------------------------------------------------------------------
// Decorative side panel
// ---------------------------------------------------------------------------

function SidePanel() {
    return (
        <div
            className="relative hidden h-full flex-col overflow-hidden lg:flex"
            style={{
                background: "linear-gradient(160deg, #e8a0c8 0%, #c8a8e8 25%, #a8b8f0 55%, #90cce0 100%)",
            }}
        >
            {/* Grain texture */}
            <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]" xmlns="http://www.w3.org/2000/svg">
                <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#grain)" />
            </svg>

            {/* Content */}
            <div className="relative flex h-full flex-col px-10 py-12">
                {/* Testimonial */}
                <div className="flex flex-1 flex-col justify-center">
                    <blockquote className="text-[1.65rem] font-bold leading-snug text-[#0d1117]">
                        "Delivery of the Laptops for new employees happened on the same day and it was such a relief especially because we didn't need to do so much."
                    </blockquote>

                    <div className="mt-6 flex items-end justify-between">
                        <div>
                            <p className="font-bold text-[#0d1117]">— Miracle Aremu</p>
                            <p className="mt-0.5 text-sm text-[#344054]">Customer Operations at Famasi.</p>
                        </div>
                        {/* 5 stars */}
                        <div className="flex gap-0.5 shrink-0">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <svg key={i} className="size-5 text-[#0d1117]" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Dashboard mockup — floats at the bottom, bleeds off */}
                <div className="mt-8 overflow-hidden rounded-t-2xl shadow-2xl">
                    {/* Dark nav bar */}
                    <div className="flex items-center gap-1 bg-[#0f1629] px-5 py-3">
                        {/* Logo */}
                        <div className="flex items-center gap-1.5 mr-4">
                            <svg className="size-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                                <circle cx="12" cy="12" r="9" />
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
                            </svg>
                            <span className="text-xs font-bold tracking-widest text-white">RAYDA</span>
                        </div>
                        {["Dashboard", "Orders", "Departments", "Catalogs"].map((item, i) => (
                            <span
                                key={item}
                                className={cx(
                                    "px-3 py-1.5 rounded-md text-xs font-medium transition duration-100",
                                    i === 0 ? "bg-white/15 text-white" : "text-white/50",
                                )}
                            >
                                {item}
                            </span>
                        ))}
                    </div>

                    {/* White content */}
                    <div className="bg-white px-5 py-4">
                        <h3 className="text-sm font-bold text-[#101828]">Overview</h3>
                        <p className="text-xs text-[#667085]">Your current sales summary and activity.</p>

                        <div className="mt-3 grid grid-cols-2 gap-2.5">
                            {[
                                { label: "Today's revenue", value: "$1,280", change: "↑ 10%" },
                                { label: "Today's orders", value: "14", change: "↑ 12%" },
                            ].map((stat) => (
                                <div key={stat.label} className="rounded-xl border border-[#eaecf0] p-3">
                                    <div className="flex items-start justify-between">
                                        <p className="text-xs text-[#667085]">{stat.label}</p>
                                        <svg className="size-3 text-[#98a2b3]" viewBox="0 0 16 16" fill="currentColor">
                                            <circle cx="8" cy="4" r="1" /><circle cx="8" cy="8" r="1" /><circle cx="8" cy="12" r="1" />
                                        </svg>
                                    </div>
                                    <div className="mt-1 flex items-end justify-between">
                                        <p className="text-xl font-bold text-[#101828]">{stat.value}</p>
                                        <span className="text-xs font-semibold text-green-600">{stat.change}</span>
                                    </div>
                                    <p className="mt-2 text-right text-xs font-medium text-brand-600">View report</p>
                                </div>
                            ))}
                        </div>

                        {/* Chart */}
                        <div className="mt-3">
                            <p className="text-xs font-bold text-[#101828]">Onboarding report</p>
                            <div className="relative mt-2 h-20">
                                <svg className="h-full w-full" viewBox="0 0 300 64" preserveAspectRatio="none">
                                    <defs>
                                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                                        </linearGradient>
                                    </defs>
                                    {/* Upper line */}
                                    <path d="M0,46 C30,44 60,43 90,41 C120,39 150,42 180,40 C210,38 240,34 270,30 C285,28 295,26 300,24" stroke="#3b82f6" strokeWidth="2" fill="none" />
                                    <path d="M0,46 C30,44 60,43 90,41 C120,39 150,42 180,40 C210,38 240,34 270,30 C285,28 295,26 300,24 L300,64 L0,64 Z" fill="url(#chartFill)" />
                                    {/* Lower line */}
                                    <path d="M0,54 C30,53 60,52 90,51 C120,50 150,51 180,50 C210,49 240,47 270,44 C285,43 295,42 300,41" stroke="#93c5fd" strokeWidth="1.5" fill="none" />
                                </svg>
                                {/* X-axis labels */}
                                <div className="absolute bottom-0 left-0 right-0 flex justify-between px-1">
                                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((m) => (
                                        <span key={m} className="text-[9px] text-[#98a2b3]">{m}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <p className="mt-2 text-xs font-bold text-[#101828]">Start creating content</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Sign-up page
// ---------------------------------------------------------------------------

export default function SignupPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [phoneCountry, setPhoneCountry] = useState("us");
    const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        businessName: "",
        workEmail: "",
        phone: "",
        password: "",
    });

    const isValid = formData.name.trim() && formData.businessName.trim() && formData.workEmail.trim() && formData.password.length >= 8;

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (isValid) {
            router.push(`/signup/check-email?email=${encodeURIComponent(formData.workEmail)}`);
        }
    }

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left: Form */}
            <div className="flex flex-1 flex-col h-full overflow-hidden px-6 sm:px-10 lg:max-w-[560px] lg:px-16">
                {/* Logo */}
                <div className="shrink-0 pt-8">
                    <RaydaLogo />
                </div>

                {/* Form content — vertically centered in remaining space */}
                <div className="flex flex-1 flex-col justify-center">
                    <div className="w-full max-w-[400px]">
                        <div className="mb-6">
                            <h1 className="text-3xl font-bold text-primary">Create your account</h1>
                            <p className="mt-2 text-base text-tertiary">
                                Get your team up and running in under 3 minutes.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Input
                                size="md"
                                label="Full name"
                                placeholder="Alex Johnson"
                                value={formData.name}
                                onChange={(v) => setFormData((p) => ({ ...p, name: v }))}
                            />

                            <Input
                                size="md"
                                label="Business name"
                                placeholder="Acme Inc."
                                value={formData.businessName}
                                onChange={(v) => setFormData((p) => ({ ...p, businessName: v }))}
                            />

                            <Input
                                size="md"
                                label="Work email"
                                placeholder="you@company.com"
                                type="email"
                                value={formData.workEmail}
                                onChange={(v) => setFormData((p) => ({ ...p, workEmail: v }))}
                            />

                            {/* Phone number field */}
                            <div className="flex flex-col gap-1.5">
                                <Label>Phone number</Label>
                                <div className="flex items-center overflow-hidden rounded-lg border border-primary bg-primary shadow-xs transition-shadow duration-100 ease-linear focus-within:ring-2 focus-within:ring-brand">
                                    {/* Country code dropdown trigger */}
                                    <DialogTrigger isOpen={isPhoneDropdownOpen} onOpenChange={setIsPhoneDropdownOpen}>
                                        <AriaButton
                                            className={({ isFocused }) =>
                                                cx(
                                                    "flex h-full shrink-0 items-center gap-1.5 border-r border-primary px-3 py-2.5 transition duration-100 ease-linear",
                                                    isFocused && "outline-none ring-2 ring-brand ring-inset",
                                                )
                                            }
                                        >
                                            <span className="text-sm font-medium text-secondary">{phoneCountry.toUpperCase()}</span>
                                            <ChevronDown className="size-4 text-fg-quaternary" />
                                        </AriaButton>
                                        <Popover
                                            placement="bottom start"
                                            className="w-64 overflow-hidden rounded-lg border border-secondary bg-primary shadow-lg outline-none"
                                        >
                                            <div className="max-h-60 overflow-y-auto py-1">
                                                {PHONE_COUNTRIES.map((c) => {
                                                    const Flag = c.icon as ComponentType<{ className?: string }>;
                                                    return (
                                                        <button
                                                            key={c.id}
                                                            type="button"
                                                            className={cx(
                                                                "flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left transition hover:bg-secondary",
                                                                phoneCountry === c.id && "bg-secondary",
                                                            )}
                                                            onClick={() => {
                                                                setPhoneCountry(c.id);
                                                                setIsPhoneDropdownOpen(false);
                                                            }}
                                                        >
                                                            {Flag && <Flag className="size-5 shrink-0 overflow-hidden rounded-full" />}
                                                            <span className="text-sm font-medium text-primary">{c.label}</span>
                                                            <span className="ml-auto text-sm text-tertiary">{PHONE_DIAL_CODES[c.id]}</span>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        </Popover>
                                    </DialogTrigger>

                                    {/* Dial code display */}
                                    <span className="pl-3 text-md text-placeholder select-none">{PHONE_DIAL_CODES[phoneCountry]}</span>

                                    {/* Phone number input */}
                                    <input
                                        type="tel"
                                        className="w-full bg-transparent py-2.5 pr-3.5 pl-1.5 text-md text-primary outline-none placeholder:text-placeholder"
                                        value={formData.phone}
                                        onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                                        placeholder="(555) 000-0000"
                                    />
                                </div>
                            </div>

                            {/* Password field */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-secondary">Password</label>
                                <div className="relative flex items-center rounded-lg bg-primary shadow-xs ring-1 ring-primary ring-inset transition-shadow duration-100 focus-within:ring-2 focus-within:ring-brand">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Min. 8 characters"
                                        value={formData.password}
                                        onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                                        className="w-full bg-transparent px-3.5 py-2.5 text-md text-primary outline-none placeholder:text-placeholder"
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 text-fg-quaternary transition hover:text-fg-tertiary"
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
                                    </button>
                                </div>
                                <p className="text-sm text-tertiary">Must be at least 8 characters.</p>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="mt-1 w-full"
                                isDisabled={!isValid}
                            >
                                Get started
                            </Button>
                        </form>

                        <p className="mt-6 text-center text-sm text-tertiary">
                            Already have an account?{" "}
                            <Button href="/login" color="link-color" size="sm" className="font-semibold">
                                Sign in
                            </Button>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="shrink-0 pb-8 text-center text-xs text-quaternary">
                    © {new Date().getFullYear()} Rayda. All rights reserved.
                </p>
            </div>

            {/* Right: Decorative panel */}
            <div className="hidden flex-1 lg:block">
                <SidePanel />
            </div>
        </div>
    );
}
