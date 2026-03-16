import { ChevronDown, MessageTextSquare01 } from "@untitledui/icons";
import { cx } from "@/utils/cx";

function VendorNoteDropdown({ isOpen, note, onToggle }: { isOpen: boolean; note: string; onToggle: () => void }) {
  return (
    <div className="border-t border-secondary">
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.stopPropagation();
            onToggle();
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

export { VendorNoteDropdown };
