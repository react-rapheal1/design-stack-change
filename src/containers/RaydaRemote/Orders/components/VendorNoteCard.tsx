import { MessageTextSquare01 } from "@untitledui/icons";

function VendorNoteCard({ note }: { note: string }) {
  return (
    <div className="rounded-xl border border-[#e9eaeb] bg-white">
      <div className="flex items-center gap-2 border-b border-[#e9eaeb] px-3 py-3">
        <MessageTextSquare01 className="size-4 text-[#717680]" />
        <span className="text-sm font-semibold text-[#414651]">Vendor Note</span>
      </div>
      <div className="px-3 py-3">
        <p className="text-sm leading-relaxed text-[#535862]">{note}</p>
      </div>
    </div>
  );
}

export { VendorNoteCard };
