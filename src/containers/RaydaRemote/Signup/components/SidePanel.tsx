const imgBackground = "https://www.figma.com/api/mcp/asset/54ca87a3-b614-40db-be89-26ecf6c7ee01";
const imgNoise = "https://www.figma.com/api/mcp/asset/504d154c-cd88-4755-ac2c-e0a512ac5152";
const imgDashboard = "https://www.figma.com/api/mcp/asset/ca5628f8-0489-45ed-87ec-f8cd7ded5579";

function StarIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
        fill="#101828"
      />
    </svg>
  );
}

export function SidePanel() {
  return (
    <div className="relative hidden h-full overflow-hidden lg:block">
      {/* Background image */}
      <img src={imgBackground} alt="" className="absolute inset-0 h-full w-full object-cover pointer-events-none" />
      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.24] pointer-events-none"
        style={{ backgroundImage: `url('${imgNoise}')`, backgroundSize: "1024px 1024px" }}
      />

      {/* Testimonial */}
      <div className="absolute left-[80px] right-[64px] top-[96px] flex flex-col gap-6">
        <p className="text-[#101828] text-[1.875rem] leading-[2.375rem] font-medium">
          Delivery of the Laptops for new employees happened on the same day and it was such a relief especially because we didn&apos;t need to do so much.
        </p>
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col">
            <p className="text-[#101828] text-lg font-semibold leading-7">— Miracle Aremu</p>
            <p className="text-[#475467] text-base font-medium leading-6">Customer Operations at Famasi.</p>
          </div>
          <div className="flex shrink-0 gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard mockup */}
      <div className="absolute left-[80px] top-[399px] h-[682px] w-[1024px] rounded-xl border-[6px] border-[#101828]">
        <div className="absolute inset-0 rounded-[10px] bg-[#101828] shadow-[0px_32px_64px_-12px_rgba(16,24,40,0.14)]" style={{ inset: "0 8px" }} />
        <img src={imgDashboard} alt="Rayda dashboard preview" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}
