"use client";

import { getDayOfWeek, getLocalTimeZone, isToday } from "@internationalized/date";
import type { CalendarCellProps as AriaCalendarCellProps } from "react-aria-components";
import { CalendarCell as AriaCalendarCell, RangeCalendarContext, useLocale, useSlottedContext } from "react-aria-components";
import { cx } from "@/utils/cx";

interface CalendarCellProps extends AriaCalendarCellProps {
  /** Whether the calendar is a range calendar. */
  isRangeCalendar?: boolean;
  /** Whether the cell is highlighted. */
  isHighlighted?: boolean;
}

export const CalendarCell = ({ date, isHighlighted, ...props }: CalendarCellProps) => {
  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const rangeCalendarContext = useSlottedContext(RangeCalendarContext);

  const isRangeCalendar = !!rangeCalendarContext;

  const start = rangeCalendarContext?.value?.start;
  const end = rangeCalendarContext?.value?.end;

  const isAfterStart = start ? date.compare(start) > 0 : true;
  const isBeforeEnd = end ? date.compare(end) < 0 : true;

  const isAfterOrOnStart = start && date.compare(start) >= 0;
  const isBeforeOrOnEnd = end && date.compare(end) <= 0;
  const isInRange = isAfterOrOnStart && isBeforeOrOnEnd;

  const lastDayOfMonth = new Date(date.year, date.month, 0).getDate();
  const isLastDayOfMonth = date.day === lastDayOfMonth;
  const isFirstDayOfMonth = date.day === 1;

  const isTodayDate = isToday(date, getLocalTimeZone());

  // Check if date is a weekend (Saturday = 6, Sunday = 0)
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  return (
    <AriaCalendarCell
      {...props}
      date={date}
      className={({ isDisabled, isUnavailable, isFocusVisible, isSelectionStart, isSelectionEnd, isSelected, isOutsideMonth }) => {
        const isRoundedLeft = isSelectionStart || dayOfWeek === 0;
        const isRoundedRight = isSelectionEnd || dayOfWeek === 6;
        const isDisabledOrUnavailable = isDisabled || isUnavailable;
        // Weekends are non-interactive (can't be start/end) but can be part of range
        const isNonInteractive = isDisabledOrUnavailable || isWeekend;

        return cx(
          "relative size-10 focus:outline-none",
          isRoundedLeft && "rounded-l-full",
          isRoundedRight && "rounded-r-full",
          isInRange && isNonInteractive && "bg-active",
          isSelected && isRangeCalendar && "bg-active",
          isNonInteractive ? "pointer-events-none" : "cursor-pointer",
          isFocusVisible ? "z-10" : "z-0",
          isRangeCalendar && isOutsideMonth && "hidden",

          // Show gradient on last day of month if it's within the selected range.
          isLastDayOfMonth &&
            isSelected &&
            isBeforeEnd &&
            isRangeCalendar &&
            "after:absolute after:inset-0 after:translate-x-full after:bg-gradient-to-l after:from-transparent after:to-bg-active in-[[role=gridcell]:last-child]:after:hidden",

          // Show gradient on first day of month if it's within the selected range.
          isFirstDayOfMonth &&
            isSelected &&
            isAfterStart &&
            isRangeCalendar &&
            "after:absolute after:inset-0 after:-translate-x-full after:bg-gradient-to-r after:from-transparent after:to-bg-active in-[[role=gridcell]:first-child]:after:hidden",
        );
      }}
    >
      {({ isDisabled, isUnavailable, isFocusVisible, isSelectionStart, isSelectionEnd, isSelected, formattedDate }) => {
        const isDisabledOrUnavailable = isDisabled || isUnavailable;
        // Weekends show as disabled visually but can be part of range
        const isVisuallyDisabled = isDisabledOrUnavailable || isWeekend;
        const markedAsSelected = isSelectionStart || isSelectionEnd || (isSelected && !isDisabledOrUnavailable && !isRangeCalendar);

        return (
          <div
            className={cx(
              "relative flex size-full items-center justify-center rounded-full text-sm",
              // Disabled/weekend state - show grayed out text.
              isVisuallyDisabled ? "text-disabled" : "text-secondary hover:text-secondary_hover",
              // Focus ring, visible while the cell has keyboard focus.
              isFocusVisible ? "outline-2 outline-offset-2 outline-focus-ring" : "",
              // Hover state for cells in the middle of the range.
              isSelected && !isVisuallyDisabled && isRangeCalendar ? "font-medium" : "",
              markedAsSelected && "bg-brand-solid font-medium text-white hover:bg-brand-solid_hover hover:text-white",
              // Hover state for non-selected cells.
              !isSelected && !isVisuallyDisabled ? "hover:bg-primary_hover hover:font-medium!" : "",
              !isSelected && isTodayDate && !isVisuallyDisabled ? "bg-active font-medium hover:bg-secondary_hover" : "",
            )}
          >
            {formattedDate}

            {(isHighlighted || isTodayDate) && (
              <div
                className={cx(
                  "absolute bottom-1 left-1/2 size-1.25 -translate-x-1/2 rounded-full",
                  isVisuallyDisabled ? "bg-fg-disabled" : markedAsSelected ? "bg-fg-white" : "bg-fg-brand-primary",
                )}
              />
            )}
          </div>
        );
      }}
    </AriaCalendarCell>
  );
};
