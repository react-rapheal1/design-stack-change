import { ChevronRight, ClipboardCheck, HomeLine } from "@untitledui/icons";
import Link from "next/link";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { RFQ } from "../../shared";
import { StatusBadge } from "./StatusBadge";

function RFQDetailHeader({ rfq }: { rfq: RFQ }) {
  return (
    <div className="border-b border-secondary bg-primary">
      <div className="py-5 page-px">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-sm">
            <li className="flex items-center">
              <Link href="/" className="flex items-center text-fg-quaternary transition hover:text-fg-secondary" aria-label="Home">
                <HomeLine className="size-5" />
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="size-4 text-fg-quaternary" />
              <Link href="/rayda-admin/rfq-management" className="font-medium text-tertiary transition hover:text-primary">
                RFQs
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="size-4 text-fg-quaternary" />
              <span className="font-semibold text-brand-secondary">{rfq.id}</span>
            </li>
          </ol>
        </nav>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <FeaturedIcon color="brand" icon={ClipboardCheck} theme="modern-neue" size="md" />
            <div>
              <h1 className="text-xl font-semibold text-primary sm:text-2xl">{rfq.id}</h1>
              <p className="text-sm text-tertiary">{rfq.company}</p>
            </div>
          </div>
          <StatusBadge status={rfq.status} />
        </div>
      </div>
    </div>
  );
}

export { RFQDetailHeader };
