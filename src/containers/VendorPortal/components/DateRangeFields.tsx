function DateRangeFields({
  dueDateFrom,
  dueDateTo,
  onChange,
}: {
  dueDateFrom: string;
  dueDateTo: string;
  onChange: (key: "dueDateFrom" | "dueDateTo", value: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {[
        ["dueDateFrom", "From", dueDateFrom],
        ["dueDateTo", "To", dueDateTo],
      ].map(([key, label, value]) => (
        <div key={key} className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-[#535862]">{label}</label>
          <input
            type="date"
            value={value}
            onChange={(event) => onChange(key as "dueDateFrom" | "dueDateTo", event.target.value)}
            className="rounded-lg border border-[#e9eaeb] px-3 py-2 text-sm text-[#181d27] outline-none focus:border-[#0948b5] focus:ring-2 focus:ring-[#0948b5]/20"
          />
        </div>
      ))}
    </div>
  );
}

export { DateRangeFields };
