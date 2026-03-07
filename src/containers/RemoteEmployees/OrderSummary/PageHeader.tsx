import { ChevronRight, HomeLine } from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";

function PageHeader({ termsAccepted, onConfirm }: { termsAccepted: boolean; onConfirm: () => void }) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-5">
          {}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl leading-[32px] font-semibold text-[#181d27] sm:text-[30px] sm:leading-[38px]">Order summary</h1>
              <p className="text-base leading-6 text-[#535862]">View the details of your order and explore popular add-ons for businesses like yours</p>
            </div>
            <Button color="primary" size="md" isDisabled={!termsAccepted} className="shrink-0" onClick={onConfirm}>
              Confirm Details
            </Button>
          </div>

          {}
          <div className="h-px w-full bg-border-secondary" />

          {}
          <nav className="flex flex-wrap items-center gap-2">
            <Link href="/remote-employees/overview" className="rounded p-1 text-[#535862] transition hover:text-[#344054]">
              <HomeLine className="size-4" />
            </Link>
            <ChevronRight className="size-3 text-[#d5d7da]" />
            <Link href="/rayda-remote/onboard-device" className="px-2 py-1 text-sm font-semibold text-[#535862] transition hover:text-[#344054]">
              Onboard device
            </Link>
            <ChevronRight className="size-3 text-[#d5d7da]" />
            <span className="px-2 py-1 text-sm font-semibold text-[#535862]">...</span>
            <ChevronRight className="size-3 text-[#d5d7da]" />
            <span className="px-2 py-1 text-sm font-semibold text-[#0948b5]">Order summary</span>
          </nav>
        </div>
      </div>
    </div>
  );
}
export { PageHeader };
