import Link from "next/link";
import { ChevronRight, ClipboardCheck, Home } from "lucide-react";
import { FeaturedIcon } from "@/components/ui/featured-icon";
import type { RFQ } from "../../shared";
import { StatusBadge } from "./StatusBadge";

interface RFQDetailHeaderProps {
  rfq: RFQ;
}

function RFQDetailHeader({ rfq }: RFQDetailHeaderProps) {
  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="py-5 page-px">
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-2 text-sm">
            <li className="flex items-center">
              <Link
                href="/"
                className="flex items-center text-gray-400 transition hover:text-gray-600"
                aria-label="Home"
              >
                <Home className="size-5" />
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="size-4 text-gray-400" />
              <Link
                href="/rayda-admin/rfq-management"
                className="font-medium text-gray-500 transition hover:text-gray-900"
              >
                RFQs
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <ChevronRight className="size-4 text-gray-400" />
              <span className="font-semibold text-brand-600">{rfq.id}</span>
            </li>
          </ol>
        </nav>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <FeaturedIcon
              icon={<ClipboardCheck />}
              color="brand"
              size="md"
            />
            <div>
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                {rfq.id}
              </h1>
              <p className="text-sm text-gray-500">{rfq.company}</p>
            </div>
          </div>
          <StatusBadge status={rfq.status} />
        </div>
      </div>
    </div>
  );
}

export { RFQDetailHeader };
