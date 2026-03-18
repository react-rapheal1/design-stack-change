import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-100 text-gray-700",
        brand: "bg-brand-50 text-brand-700",
        success: "bg-success-50 text-success-700",
        warning: "bg-warning-50 text-warning-700",
        error: "bg-error-50 text-error-700",
        "gray-blue": "bg-gray-blue-50 text-gray-blue-700",
        "blue-light": "bg-blue-light-50 text-blue-light-700",
        blue: "bg-blue-50 text-blue-700",
        indigo: "bg-indigo-50 text-indigo-700",
        purple: "bg-purple-50 text-purple-700",
        pink: "bg-pink-50 text-pink-700",
        orange: "bg-orange-50 text-orange-700",
        // Outline variants
        "outline-default": "border border-gray-300 bg-white text-gray-700",
        "outline-brand": "border border-brand-300 bg-white text-brand-700",
        "outline-success": "border border-success-300 bg-white text-success-700",
        "outline-warning": "border border-warning-300 bg-white text-warning-700",
        "outline-error": "border border-error-300 bg-white text-error-700",
      },
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
        lg: "px-3 py-1 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  dot?: boolean
  icon?: React.ReactNode
  iconTrailing?: React.ReactNode
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, size, dot, icon, iconTrailing, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(badgeVariants({ variant, size, className }))}
        {...props}
      >
        {dot && (
          <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
        )}
        {icon}
        {children}
        {iconTrailing}
      </span>
    )
  }
)
Badge.displayName = "Badge"

export { Badge, badgeVariants }
