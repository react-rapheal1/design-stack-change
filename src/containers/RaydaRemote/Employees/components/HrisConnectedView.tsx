import { ChevronDown, X } from "@untitledui/icons";
import { BadgeWithDot } from "@/components/base/badges/badges";
import type { Provider } from "../data";

function HrisConnectedView({
  notifEmail,
  onNotifEmailChange,
  provider,
  syncFreq,
}: {
  notifEmail: string;
  onNotifEmailChange: (value: string) => void;
  provider: Provider | null;
  syncFreq: string;
}) {
  return (
    <div className="p-6">
      <p className="mb-4 text-sm text-tertiary">Last sync • 22 Jan at 10:40am</p>
      {provider && <ConnectedProviderCard provider={provider} />}
      <p className="mb-4 text-sm font-semibold text-brand-700">Sync Settings</p>
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-secondary">
          Sync Frequency <span className="text-error-primary">*</span>
        </label>
        <div className="flex h-10 cursor-pointer items-center justify-between rounded-lg border border-[#d0d5dd] px-3">
          <span className="text-sm text-primary">{syncFreq}</span>
          <ChevronDown className="size-4 text-tertiary" />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-secondary">Notification Email</label>
        <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-lg border border-[#d0d5dd] px-3 py-2">
          {notifEmail && (
            <span className="inline-flex items-center gap-1 rounded-md bg-[#f2f4f7] px-2 py-0.5 text-sm text-secondary">
              {notifEmail}
              <button onClick={() => onNotifEmailChange("")} className="text-tertiary transition duration-100 hover:text-primary">
                <X className="size-3" />
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function ConnectedProviderCard({ provider }: { provider: Provider }) {
  const accountUrl = `rayda.${provider.name.toLowerCase().replace(/\s+/g, "")}.com`;

  return (
    <div className="mb-6 flex items-center gap-4 rounded-xl border border-[#eaecf0] p-4">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
        style={{ backgroundColor: provider.color }}
      >
        {provider.letter}
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-primary">{provider.name}</p>
        <p className="text-xs text-tertiary">Next sync in: 13 minutes</p>
      </div>
      <div className="mr-4 text-right">
        <p className="text-sm font-medium text-primary">{accountUrl}</p>
        <p className="text-xs text-tertiary">Found in your {provider.name} account URL</p>
      </div>
      <BadgeWithDot size="sm" color="success">Connected</BadgeWithDot>
    </div>
  );
}

export { HrisConnectedView };
