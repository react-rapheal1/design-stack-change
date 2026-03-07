import { SearchMd } from "@untitledui/icons";
import type { Provider } from "./data";

function HrisProviderGrid({
  onConnect,
  onSearchChange,
  providers,
  search,
}: {
  onConnect: (provider: Provider) => void;
  onSearchChange: (value: string) => void;
  providers: Provider[];
  search: string;
}) {
  return (
    <div className="p-6">
      <div className="mb-5 flex h-10 items-center gap-2 rounded-lg border border-[#d0d5dd] bg-white px-3">
        <SearchMd className="size-4 shrink-0 text-tertiary" />
        <input
          type="text"
          placeholder="Search for integration"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          className="flex-1 bg-transparent text-sm text-primary outline-none placeholder:text-placeholder"
        />
      </div>
      <div className="grid grid-cols-4 gap-3">
        {providers.map((provider) => (
          <div key={provider.key} className="flex flex-col rounded-xl border border-[#eaecf0] p-4">
            <div
              className="mb-3 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white"
              style={{ backgroundColor: provider.color }}
            >
              {provider.letter}
            </div>
            <p className="text-sm font-semibold text-primary">{provider.name}</p>
            <p className="mb-3 text-xs text-tertiary">Disconnected</p>
            <button
              onClick={() => onConnect(provider)}
              className="w-full cursor-pointer rounded-lg border border-[#d0d5dd] py-1.5 text-sm font-medium text-secondary transition duration-100 hover:bg-[#f9fafb]"
            >
              Connect
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export { HrisProviderGrid };
