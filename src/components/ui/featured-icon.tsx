import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const featuredIconVariants = cva(
  "inline-flex items-center justify-center rounded-full",
  {
    variants: {
      color: {
        brand: "bg-brand-100 text-brand-600",
        gray: "bg-gray-100 text-gray-600",
        error: "bg-error-100 text-error-600",
        warning: "bg-warning-100 text-warning-600",
        success: "bg-success-100 text-success-600",
      },
      size: {
        xs: "h-6 w-6",
        sm: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-14 w-14",
      },
    },
    defaultVariants: {
      color: "brand",
      size: "md",
    },
  }
)

const iconSizeMap = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-7 w-7",
}

export interface FeaturedIconProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof featuredIconVariants> {
  icon: React.ReactNode
}

const FeaturedIcon = React.forwardRef<HTMLDivElement, FeaturedIconProps>(
  ({ className, color, size, icon, ...props }, ref) => {
    const iconSize = iconSizeMap[size || "md"]
    
    return (
      <div
        ref={ref}
        className={cn(featuredIconVariants({ color, size }), className)}
        {...props}
      >
        {React.isValidElement(icon) 
          ? React.cloneElement(icon as React.ReactElement<{ className?: string }>, {
              className: cn(iconSize, (icon as React.ReactElement<{ className?: string }>).props?.className),
            })
          : icon}
      </div>
    )
  }
)
FeaturedIcon.displayName = "FeaturedIcon"

export { FeaturedIcon, featuredIconVariants }
