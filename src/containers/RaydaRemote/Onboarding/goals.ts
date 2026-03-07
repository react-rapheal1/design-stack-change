import { CurrencyDollar, Eye, Package, RefreshCw01, Shield01, ZapFast } from "@untitledui/icons";

export const GOALS = [
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
] as const;

export const goalColorMap: Record<string, { border: string; bg: string; icon: string; check: string; iconBg: string }> = {
  brand: {
    border: "border-brand-600 ring-brand-600",
    bg: "bg-brand-50",
    icon: "text-brand-600",
    check: "bg-brand-600",
    iconBg: "bg-brand-100",
  },
  green: {
    border: "border-green-600 ring-green-600",
    bg: "bg-green-50",
    icon: "text-green-600",
    check: "bg-green-600",
    iconBg: "bg-green-100",
  },
  amber: {
    border: "border-amber-500 ring-amber-500",
    bg: "bg-amber-50",
    icon: "text-amber-600",
    check: "bg-amber-500",
    iconBg: "bg-amber-100",
  },
  purple: {
    border: "border-purple-600 ring-purple-600",
    bg: "bg-purple-50",
    icon: "text-purple-600",
    check: "bg-purple-600",
    iconBg: "bg-purple-100",
  },
  teal: {
    border: "border-teal-600 ring-teal-600",
    bg: "bg-teal-50",
    icon: "text-teal-600",
    check: "bg-teal-600",
    iconBg: "bg-teal-100",
  },
  orange: {
    border: "border-orange-500 ring-orange-500",
    bg: "bg-orange-50",
    icon: "text-orange-600",
    check: "bg-orange-500",
    iconBg: "bg-orange-100",
  },
};
