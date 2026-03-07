import { Button } from "@/components/base/buttons/button";

export function ProfileHeader() {
  return (
    <div className="relative flex w-full flex-col items-center pb-10">
      <div className="h-60 w-full overflow-hidden">
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse at 20% 50%, #fde68a 0%, transparent 50%), radial-gradient(ellipse at 50% 30%, #ddd6fe 0%, transparent 50%), radial-gradient(ellipse at 80% 50%, #bfdbfe 0%, transparent 50%), radial-gradient(ellipse at 60% 80%, #fbcfe8 0%, transparent 40%), linear-gradient(135deg, #fef3c7 0%, #ede9fe 50%, #dbeafe 100%)",
          }}
        />
      </div>
      <div className="mx-auto w-full max-w-[1280px] px-8">
        <div className="-mt-20 flex items-end gap-6">
          <div className="relative size-40 shrink-0 rounded-[200px] border-4 border-white bg-[#f2f4f7] shadow-[0px_12px_16px_-4px_rgba(16,24,40,0.08),0px_4px_6px_-2px_rgba(16,24,40,0.03)]">
            <p className="absolute inset-0 flex items-center justify-center text-[60px] leading-[72px] font-medium tracking-[-1.2px] text-[#475467]">OR</p>
          </div>
          <div className="flex flex-1 items-end justify-between pb-1">
            <div className="flex flex-col gap-1">
              <h1 className="text-[30px] leading-[38px] font-semibold text-[#101828]">Zahir Mays (Product designer)</h1>
              <p className="text-base text-[#475467]">zahir@rayda.co</p>
            </div>
            <Button size="md">Edit profile</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
