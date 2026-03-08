import { FeedItem } from "../FeedItem";
import { ActivityFeed } from "./ActivityFeed";

function OrderUpdatesCard({ items }: { items: FeedItem[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#eaecf0] bg-white shadow-[0px_1px_3px_rgba(16,24,40,0.1),0px_1px_2px_rgba(16,24,40,0.06)]">
      <div className="px-6 pt-5">
        <p className="text-lg font-semibold text-[#181d27]">Order updates</p>
      </div>
      <div className="mt-4 h-px w-full bg-[#eaecf0]" />
      <div className="px-6 py-6">
        <ActivityFeed items={items} />
      </div>
    </div>
  );
}

export { OrderUpdatesCard };
