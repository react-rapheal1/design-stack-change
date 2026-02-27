"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    ChevronRight,
    Container,
    Globe05,
    HelpCircle,
    HomeLine,
    LayersTwo01,
    LogOut01,
    Menu01,
    MessageSmileCircle,
    Settings01,
    ShoppingCart01,
    User01,
    UserPlus01,
    Users01,
    XClose,
    Zap,
} from "@untitledui/icons";
import {
    FlagAd, FlagAe, FlagAf, FlagAg, FlagAl, FlagAm, FlagAo, FlagAr, FlagAt, FlagAu, FlagAz,
    FlagBa, FlagBb, FlagBd, FlagBe, FlagBf, FlagBg, FlagBh, FlagBi, FlagBj, FlagBn, FlagBo,
    FlagBr, FlagBs, FlagBt, FlagBw, FlagBy, FlagBz,
    FlagCa, FlagCd, FlagCf, FlagCh, FlagCl, FlagCm, FlagCn, FlagCo, FlagCr, FlagCu, FlagCy, FlagCz,
    FlagDe, FlagDj, FlagDk, FlagDm, FlagDo, FlagDz,
    FlagEc, FlagEe, FlagEg, FlagEr, FlagEs, FlagEt,
    FlagFi, FlagFj, FlagFm, FlagFr,
    FlagGa, FlagGb, FlagGd, FlagGe, FlagGh, FlagGm, FlagGn, FlagGq, FlagGr, FlagGt, FlagGw, FlagGy,
    FlagHn, FlagHr, FlagHt, FlagHu,
    FlagId, FlagIe, FlagIl, FlagIn, FlagIq, FlagIr, FlagIs, FlagIt,
    FlagJm, FlagJo, FlagJp,
    FlagKe, FlagKg, FlagKh, FlagKi, FlagKm, FlagKn, FlagKp, FlagKr, FlagKw, FlagKz,
    FlagLa, FlagLb, FlagLc, FlagLi, FlagLk, FlagLr, FlagLs, FlagLt, FlagLu, FlagLv, FlagLy,
    FlagMa, FlagMc, FlagMd, FlagMe, FlagMg, FlagMh, FlagMk, FlagMl, FlagMm, FlagMn,
    FlagMr, FlagMt, FlagMu, FlagMv, FlagMw, FlagMx, FlagMy, FlagMz,
    FlagNa, FlagNe, FlagNg, FlagNi, FlagNl, FlagNo, FlagNp, FlagNr, FlagNz,
    FlagOm,
    FlagPa, FlagPe, FlagPg, FlagPh, FlagPk, FlagPl, FlagPs, FlagPt, FlagPw, FlagPy,
    FlagQa,
    FlagRo, FlagRs, FlagRu, FlagRw,
    FlagSa, FlagSb, FlagSc, FlagSe, FlagSg, FlagSi, FlagSk, FlagSl, FlagSm, FlagSn, FlagSo,
    FlagSr, FlagSs, FlagSt, FlagSv, FlagSy, FlagSz,
    FlagTd, FlagTg, FlagTh, FlagTj, FlagTl, FlagTm, FlagTn, FlagTo, FlagTr, FlagTt, FlagTv, FlagTw, FlagTz,
    FlagUa, FlagUg, FlagUs, FlagUy, FlagUz,
    FlagVc, FlagVe, FlagVn, FlagVu,
    FlagWs,
    FlagYe,
    FlagZa, FlagZm, FlagZw,
} from "@untitledui/country-flags";
import { Button as AriaButton, DialogTrigger, Popover } from "react-aria-components";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Select, type SelectItemType } from "@/components/base/select/select";
import { RaydaLogo } from "@/components/foundations/logo/rayda-logo";
import { cx } from "@/utils/cx";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const navItems = [
    { label: "Overview", href: "#" },
    { label: "Orders", href: "#" },
    { label: "Marketplace", href: "#", current: true },
    { label: "Storage", href: "#" },
    { label: "Catalogs", href: "#" },
    { label: "Employees", href: "#" },
    { label: "All Equipments", href: "#" },
];

const countries: SelectItemType[] = [
    { id: "af", label: "Afghanistan", icon: FlagAf },
    { id: "al", label: "Albania", icon: FlagAl },
    { id: "dz", label: "Algeria", icon: FlagDz },
    { id: "ad", label: "Andorra", icon: FlagAd },
    { id: "ao", label: "Angola", icon: FlagAo },
    { id: "ag", label: "Antigua and Barbuda", icon: FlagAg },
    { id: "ar", label: "Argentina", icon: FlagAr },
    { id: "am", label: "Armenia", icon: FlagAm },
    { id: "au", label: "Australia", icon: FlagAu },
    { id: "at", label: "Austria", icon: FlagAt },
    { id: "az", label: "Azerbaijan", icon: FlagAz },
    { id: "bs", label: "Bahamas", icon: FlagBs },
    { id: "bh", label: "Bahrain", icon: FlagBh },
    { id: "bd", label: "Bangladesh", icon: FlagBd },
    { id: "bb", label: "Barbados", icon: FlagBb },
    { id: "by", label: "Belarus", icon: FlagBy },
    { id: "be", label: "Belgium", icon: FlagBe },
    { id: "bz", label: "Belize", icon: FlagBz },
    { id: "bj", label: "Benin", icon: FlagBj },
    { id: "bt", label: "Bhutan", icon: FlagBt },
    { id: "bo", label: "Bolivia", icon: FlagBo },
    { id: "ba", label: "Bosnia and Herzegovina", icon: FlagBa },
    { id: "bw", label: "Botswana", icon: FlagBw },
    { id: "br", label: "Brazil", icon: FlagBr },
    { id: "bn", label: "Brunei", icon: FlagBn },
    { id: "bg", label: "Bulgaria", icon: FlagBg },
    { id: "bf", label: "Burkina Faso", icon: FlagBf },
    { id: "bi", label: "Burundi", icon: FlagBi },
    { id: "cv", label: "Cabo Verde" },
    { id: "kh", label: "Cambodia", icon: FlagKh },
    { id: "cm", label: "Cameroon", icon: FlagCm },
    { id: "ca", label: "Canada", icon: FlagCa },
    { id: "cf", label: "Central African Republic", icon: FlagCf },
    { id: "td", label: "Chad", icon: FlagTd },
    { id: "cl", label: "Chile", icon: FlagCl },
    { id: "cn", label: "China", icon: FlagCn },
    { id: "co", label: "Colombia", icon: FlagCo },
    { id: "km", label: "Comoros", icon: FlagKm },
    { id: "cg", label: "Congo (Republic)" },
    { id: "cd", label: "Congo (DRC)", icon: FlagCd },
    { id: "cr", label: "Costa Rica", icon: FlagCr },
    { id: "ci", label: "Côte d'Ivoire" },
    { id: "hr", label: "Croatia", icon: FlagHr },
    { id: "cu", label: "Cuba", icon: FlagCu },
    { id: "cy", label: "Cyprus", icon: FlagCy },
    { id: "cz", label: "Czechia", icon: FlagCz },
    { id: "dk", label: "Denmark", icon: FlagDk },
    { id: "dj", label: "Djibouti", icon: FlagDj },
    { id: "dm", label: "Dominica", icon: FlagDm },
    { id: "do", label: "Dominican Republic", icon: FlagDo },
    { id: "ec", label: "Ecuador", icon: FlagEc },
    { id: "eg", label: "Egypt", icon: FlagEg },
    { id: "sv", label: "El Salvador", icon: FlagSv },
    { id: "gq", label: "Equatorial Guinea", icon: FlagGq },
    { id: "er", label: "Eritrea", icon: FlagEr },
    { id: "ee", label: "Estonia", icon: FlagEe },
    { id: "sz", label: "Eswatini", icon: FlagSz },
    { id: "et", label: "Ethiopia", icon: FlagEt },
    { id: "fj", label: "Fiji", icon: FlagFj },
    { id: "fi", label: "Finland", icon: FlagFi },
    { id: "fr", label: "France", icon: FlagFr },
    { id: "ga", label: "Gabon", icon: FlagGa },
    { id: "gm", label: "Gambia", icon: FlagGm },
    { id: "ge", label: "Georgia", icon: FlagGe },
    { id: "de", label: "Germany", icon: FlagDe },
    { id: "gh", label: "Ghana", icon: FlagGh },
    { id: "gr", label: "Greece", icon: FlagGr },
    { id: "gd", label: "Grenada", icon: FlagGd },
    { id: "gt", label: "Guatemala", icon: FlagGt },
    { id: "gn", label: "Guinea", icon: FlagGn },
    { id: "gw", label: "Guinea-Bissau", icon: FlagGw },
    { id: "gy", label: "Guyana", icon: FlagGy },
    { id: "ht", label: "Haiti", icon: FlagHt },
    { id: "hn", label: "Honduras", icon: FlagHn },
    { id: "hu", label: "Hungary", icon: FlagHu },
    { id: "is", label: "Iceland", icon: FlagIs },
    { id: "in", label: "India", icon: FlagIn },
    { id: "id", label: "Indonesia", icon: FlagId },
    { id: "ir", label: "Iran", icon: FlagIr },
    { id: "iq", label: "Iraq", icon: FlagIq },
    { id: "ie", label: "Ireland", icon: FlagIe },
    { id: "il", label: "Israel", icon: FlagIl },
    { id: "it", label: "Italy", icon: FlagIt },
    { id: "jm", label: "Jamaica", icon: FlagJm },
    { id: "jp", label: "Japan", icon: FlagJp },
    { id: "jo", label: "Jordan", icon: FlagJo },
    { id: "kz", label: "Kazakhstan", icon: FlagKz },
    { id: "ke", label: "Kenya", icon: FlagKe },
    { id: "ki", label: "Kiribati", icon: FlagKi },
    { id: "kw", label: "Kuwait", icon: FlagKw },
    { id: "kg", label: "Kyrgyzstan", icon: FlagKg },
    { id: "la", label: "Laos", icon: FlagLa },
    { id: "lv", label: "Latvia", icon: FlagLv },
    { id: "lb", label: "Lebanon", icon: FlagLb },
    { id: "ls", label: "Lesotho", icon: FlagLs },
    { id: "lr", label: "Liberia", icon: FlagLr },
    { id: "ly", label: "Libya", icon: FlagLy },
    { id: "li", label: "Liechtenstein", icon: FlagLi },
    { id: "lt", label: "Lithuania", icon: FlagLt },
    { id: "lu", label: "Luxembourg", icon: FlagLu },
    { id: "mg", label: "Madagascar", icon: FlagMg },
    { id: "mw", label: "Malawi", icon: FlagMw },
    { id: "my", label: "Malaysia", icon: FlagMy },
    { id: "mv", label: "Maldives", icon: FlagMv },
    { id: "ml", label: "Mali", icon: FlagMl },
    { id: "mt", label: "Malta", icon: FlagMt },
    { id: "mh", label: "Marshall Islands", icon: FlagMh },
    { id: "mr", label: "Mauritania", icon: FlagMr },
    { id: "mu", label: "Mauritius", icon: FlagMu },
    { id: "mx", label: "Mexico", icon: FlagMx },
    { id: "fm", label: "Micronesia", icon: FlagFm },
    { id: "md", label: "Moldova", icon: FlagMd },
    { id: "mc", label: "Monaco", icon: FlagMc },
    { id: "mn", label: "Mongolia", icon: FlagMn },
    { id: "me", label: "Montenegro", icon: FlagMe },
    { id: "ma", label: "Morocco", icon: FlagMa },
    { id: "mz", label: "Mozambique", icon: FlagMz },
    { id: "mm", label: "Myanmar", icon: FlagMm },
    { id: "na", label: "Namibia", icon: FlagNa },
    { id: "nr", label: "Nauru", icon: FlagNr },
    { id: "np", label: "Nepal", icon: FlagNp },
    { id: "nl", label: "Netherlands", icon: FlagNl },
    { id: "nz", label: "New Zealand", icon: FlagNz },
    { id: "ni", label: "Nicaragua", icon: FlagNi },
    { id: "ne", label: "Niger", icon: FlagNe },
    { id: "ng", label: "Nigeria", icon: FlagNg },
    { id: "kp", label: "North Korea", icon: FlagKp },
    { id: "mk", label: "North Macedonia", icon: FlagMk },
    { id: "no", label: "Norway", icon: FlagNo },
    { id: "om", label: "Oman", icon: FlagOm },
    { id: "pk", label: "Pakistan", icon: FlagPk },
    { id: "pw", label: "Palau", icon: FlagPw },
    { id: "ps", label: "Palestine", icon: FlagPs },
    { id: "pa", label: "Panama", icon: FlagPa },
    { id: "pg", label: "Papua New Guinea", icon: FlagPg },
    { id: "py", label: "Paraguay", icon: FlagPy },
    { id: "pe", label: "Peru", icon: FlagPe },
    { id: "ph", label: "Philippines", icon: FlagPh },
    { id: "pl", label: "Poland", icon: FlagPl },
    { id: "pt", label: "Portugal", icon: FlagPt },
    { id: "qa", label: "Qatar", icon: FlagQa },
    { id: "ro", label: "Romania", icon: FlagRo },
    { id: "ru", label: "Russia", icon: FlagRu },
    { id: "rw", label: "Rwanda", icon: FlagRw },
    { id: "kn", label: "Saint Kitts and Nevis", icon: FlagKn },
    { id: "lc", label: "Saint Lucia", icon: FlagLc },
    { id: "vc", label: "Saint Vincent and the Grenadines", icon: FlagVc },
    { id: "ws", label: "Samoa", icon: FlagWs },
    { id: "sm", label: "San Marino", icon: FlagSm },
    { id: "st", label: "São Tomé and Príncipe", icon: FlagSt },
    { id: "sa", label: "Saudi Arabia", icon: FlagSa },
    { id: "sn", label: "Senegal", icon: FlagSn },
    { id: "rs", label: "Serbia", icon: FlagRs },
    { id: "sc", label: "Seychelles", icon: FlagSc },
    { id: "sl", label: "Sierra Leone", icon: FlagSl },
    { id: "sg", label: "Singapore", icon: FlagSg },
    { id: "sk", label: "Slovakia", icon: FlagSk },
    { id: "si", label: "Slovenia", icon: FlagSi },
    { id: "sb", label: "Solomon Islands", icon: FlagSb },
    { id: "so", label: "Somalia", icon: FlagSo },
    { id: "za", label: "South Africa", icon: FlagZa },
    { id: "kr", label: "South Korea", icon: FlagKr },
    { id: "ss", label: "South Sudan", icon: FlagSs },
    { id: "es", label: "Spain", icon: FlagEs },
    { id: "lk", label: "Sri Lanka", icon: FlagLk },
    { id: "sd", label: "Sudan" },
    { id: "sr", label: "Suriname", icon: FlagSr },
    { id: "se", label: "Sweden", icon: FlagSe },
    { id: "ch", label: "Switzerland", icon: FlagCh },
    { id: "sy", label: "Syria", icon: FlagSy },
    { id: "tw", label: "Taiwan", icon: FlagTw },
    { id: "tj", label: "Tajikistan", icon: FlagTj },
    { id: "tz", label: "Tanzania", icon: FlagTz },
    { id: "th", label: "Thailand", icon: FlagTh },
    { id: "tl", label: "Timor-Leste", icon: FlagTl },
    { id: "tg", label: "Togo", icon: FlagTg },
    { id: "to", label: "Tonga", icon: FlagTo },
    { id: "tt", label: "Trinidad and Tobago", icon: FlagTt },
    { id: "tn", label: "Tunisia", icon: FlagTn },
    { id: "tr", label: "Türkiye", icon: FlagTr },
    { id: "tm", label: "Turkmenistan", icon: FlagTm },
    { id: "tv", label: "Tuvalu", icon: FlagTv },
    { id: "ug", label: "Uganda", icon: FlagUg },
    { id: "ua", label: "Ukraine", icon: FlagUa },
    { id: "ae", label: "United Arab Emirates", icon: FlagAe },
    { id: "gb", label: "United Kingdom", icon: FlagGb },
    { id: "us", label: "United States", icon: FlagUs },
    { id: "uy", label: "Uruguay", icon: FlagUy },
    { id: "uz", label: "Uzbekistan", icon: FlagUz },
    { id: "vu", label: "Vanuatu", icon: FlagVu },
    { id: "ve", label: "Venezuela", icon: FlagVe },
    { id: "vn", label: "Vietnam", icon: FlagVn },
    { id: "ye", label: "Yemen", icon: FlagYe },
    { id: "zm", label: "Zambia", icon: FlagZm },
    { id: "zw", label: "Zimbabwe", icon: FlagZw },
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

// ---------------------------------------------------------------------------
// Header Navigation
// ---------------------------------------------------------------------------

function HeaderNavigation() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="relative w-full border-b border-[#475467] bg-[#101828]">
            <div className="mx-auto flex h-[72px] w-full items-center justify-between page-px">
                {/* Left: Logo + Nav */}
                <div className="flex items-center gap-4">
                    <a href="/" aria-label="Go to homepage">
                        <RaydaLogo variant="white" />
                    </a>

                    <nav className="hidden lg:block">
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
                        <a
                            href="#"
                            aria-label="Shopping cart"
                            className="flex items-center justify-center rounded-md p-2.5 text-white/70 transition hover:bg-white/10 hover:text-white"
                        >
                            <ShoppingCart01 className="size-5" />
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
                                    className="size-10 bg-[#e6efff] text-sm font-semibold text-[#003999]"
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
                <div className="absolute inset-x-0 top-[72px] z-50 border-b border-[#475467] bg-[#101828] lg:hidden">
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

                        {/* Divider */}
                        <div className="my-3 h-px bg-[#475467]" />

                        {/* Mobile-only actions */}
                        <div className="flex flex-col gap-1 sm:hidden">
                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                <Settings01 className="size-5 text-white/70" />
                                Settings
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10"
                            >
                                <ShoppingCart01 className="size-5 text-white/70" />
                                Shopping cart
                            </a>
                        </div>

                        {/* User info */}
                        <div className="mt-3 flex items-center gap-3 rounded-md px-3 py-2.5">
                            <Avatar
                                alt="Olivia Rhye"
                                initials="OR"
                                size="md"
                                contrastBorder={false}
                                className="size-10 bg-[#e6efff] text-sm font-semibold text-[#003999]"
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
            {/* User info header */}
            <div className="border-b border-[#eaecf0] px-4 py-3">
                <div className="flex items-center gap-3">
                    <Avatar
                        alt="Olivia Rhye"
                        initials="OR"
                        size="md"
                        status="online"
                        contrastBorder={false}
                        className="size-10 bg-[#e6efff] text-sm font-semibold text-[#003999]"
                    />
                    <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#344054]">Olivia Rhye</p>
                        <p className="truncate text-sm text-[#475467]">olivia@rayda.co</p>
                    </div>
                </div>
            </div>

            {/* Menu sections */}
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

function PageHeader() {
    return (
        <div className="w-full page-px">
            <div className="flex flex-col gap-5">
                {/* Title and description */}
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-semibold leading-[32px] text-[#101828] sm:text-[30px] sm:leading-[38px]">Onboard device</h1>
                    <p className="text-sm leading-5 text-[#475467] sm:text-base sm:leading-6">
                        Easily provide your employee&apos;s with the necessary hardware to start their journey in your company.
                    </p>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-border-secondary" />
            </div>

            {/* Breadcrumbs */}
            <div className="mt-6 flex items-center gap-3">
                <a href="#" className="text-[#667085] transition hover:text-[#344054]">
                    <HomeLine className="size-5" />
                </a>
                <ChevronRight className="size-4 text-[#d0d5dd]" />
                <a href="#" className="text-sm font-semibold text-[#003999]">
                    Onboard device
                </a>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Flag Avatar (circular)
// ---------------------------------------------------------------------------

function FlagAvatar({
    Flag,
    size = 48,
    className,
}: {
    Flag: typeof FlagNg;
    size?: number;
    className?: string;
}) {
    return (
        <div
            className={cx(
                "overflow-hidden rounded-full border-[1.5px] border-[#b0cdff]",
                className,
            )}
            style={{ width: size, height: size }}
        >
            <Flag className="size-full" />
        </div>
    );
}

// ---------------------------------------------------------------------------
// Select Country Card
// ---------------------------------------------------------------------------

function SelectCountryCard() {
    const router = useRouter();
    const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

    return (
        <div className="w-full page-px">
            <div className="flex justify-center">
                <div className="w-full max-w-[640px] rounded-2xl bg-white px-4 py-8 shadow-lg sm:px-8 sm:py-10">
                    {/* Flag avatars */}
                    <div className="flex justify-center">
                        <div className="relative h-14 w-[120px]">
                            {/* GB - left */}
                            <FlagAvatar Flag={FlagGb} size={48} className="absolute left-0 top-2" />
                            {/* US - right */}
                            <FlagAvatar Flag={FlagUs} size={48} className="absolute right-0 top-2" />
                            {/* NG - center (on top, larger) */}
                            <FlagAvatar Flag={FlagNg} size={56} className="absolute left-8 top-0 z-10" />
                        </div>
                    </div>

                    {/* Heading */}
                    <div className="mt-6 flex flex-col items-center gap-2 text-center sm:px-6">
                        <h2 className="text-xl font-semibold leading-[30px] text-[#101828]">Select country</h2>
                        <p className="text-base leading-7 text-[#475467] sm:text-lg">
                            Select the country your onboarding the device from
                        </p>
                    </div>

                    {/* Country select */}
                    <div className="mt-6 sm:px-6">
                        <Select
                            items={countries}
                            label="Country"
                            placeholder="Select country"
                            placeholderIcon={Globe05}
                            size="md"
                            hint={selectedCountry ? "Estimated time of delivery is between 2-3 working days." : undefined}
                            onSelectionChange={(key) => setSelectedCountry(key as string)}
                        >
                            {(item) => (
                                <Select.Item key={item.id} {...item}>
                                    {item.label}
                                </Select.Item>
                            )}
                        </Select>
                    </div>

                    {/* Actions */}
                    <div className="mt-10 flex gap-3 pb-6 sm:px-6">
                        <Button color="secondary" size="lg" className="flex-1">
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            className={cx(
                                "flex-1",
                                !selectedCountry && "bg-[#b0cdff] ring-[#b0cdff] hover:bg-[#8fb8ff] hover:ring-[#8fb8ff]",
                            )}
                            onClick={() => {
                                if (selectedCountry) {
                                    const country = countries.find((c) => c.id === selectedCountry);
                                    const params = new URLSearchParams({ country: country?.label ?? selectedCountry });
                                    router.push(`/onboard-device/marketplace?${params.toString()}`);
                                }
                            }}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function OnboardDevicePage() {
    return (
        <div className="flex min-h-screen flex-col bg-[#fcfcfd]">
            <HeaderNavigation />

            <main className="flex flex-1 flex-col gap-6 pb-12 pt-8 sm:gap-8 sm:pb-24 sm:pt-12">
                <PageHeader />
                <SelectCountryCard />
            </main>
        </div>
    );
}
