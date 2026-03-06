"use client";

import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

export type TooltipConfig = {
    title: string;
    description: string;
    /** Optional: highlight a DOM element by id */
    highlightId?: string;
    /** CTA label on the highlighted element, shown as an arrow beacon */
    ctaLabel?: string;
};

export function GuidedTooltip({
    step,
    total,
    title,
    description,
    onNext,
    className,
    ctaLabel,
}: {
    step: number;
    total: number;
    title: string;
    description: string;
    onNext: () => void;
    className?: string;
    ctaLabel?: string;
}) {
    const isLast = step === total - 1;
    const buttonLabel = ctaLabel ?? (isLast ? "Done" : "Select Another Method");

    return (
        <div className={cx("relative w-[380px] rounded-2xl bg-white shadow-xl ring-1 ring-black/[0.06]", className)}>
            {/* Blue dot indicator */}
            <div className="absolute -right-2 -top-2 h-5 w-5 rounded-full bg-brand-600 ring-2 ring-white" />

            <div className="p-5">
                <h3 className="text-base font-bold text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-5 text-tertiary">{description}</p>
            </div>

            <div className="flex items-center justify-between border-t border-[#eaecf0] px-5 py-3">
                <span className="text-sm font-semibold text-tertiary">{step + 1}/{total}</span>
                <Button
                    size="sm"
                    color="tertiary"
                    iconLeading={isLast ? undefined : ArrowLeft}
                    onClick={onNext}
                >
                    {buttonLabel}
                </Button>
            </div>
        </div>
    );
}

/** Glowing ring highlight overlay on a DOM element */
export function ElementHighlight({ elementId }: { elementId: string }) {
    // Uses a CSS outline trick — the highlighted element gets a data attribute,
    // we use a portal-style fixed overlay to draw the ring.
    return null; // DOM-element-based highlights are handled via CSS in parent components
}
