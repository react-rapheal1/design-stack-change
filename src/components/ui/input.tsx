import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  leadingIcon?: React.ReactNode
  trailingIcon?: React.ReactNode
  error?: boolean
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, leadingIcon, trailingIcon, error, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        {leadingIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-gray-500">
            {leadingIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            "flex h-10 w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border-brand-300 focus:outline-none focus:ring-4 focus:ring-brand-100 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500",
            leadingIcon && "pl-10",
            trailingIcon && "pr-10",
            error && "border-error-300 focus:border-error-300 focus:ring-error-100",
            className
          )}
          ref={ref}
          {...props}
        />
        {trailingIcon && (
          <div className="pointer-events-none absolute right-3 flex items-center text-gray-500">
            {trailingIcon}
          </div>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
