import { CheckCircle } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

function CustomRequestSuccess({ onClose }: { onClose: () => void }) {
  return (
    <div className="flex w-full flex-col items-center rounded-xl bg-white px-6 py-8 shadow-xl sm:px-10 sm:py-10">
      <div className="flex size-12 items-center justify-center rounded-full bg-[#d1fadf]">
        <CheckCircle className="size-6 text-[#039855]" />
      </div>
      <h2 className="mt-4 text-center text-lg font-semibold text-[#101828]">Request Submitted Successfully!</h2>
      <p className="mt-2 text-center text-sm text-[#475467]">
        Thank you for submitting your custom device request. Our team has received your specifications and will review them carefully.
      </p>
      <div className="mt-5 w-full rounded-lg bg-[#f9fafb] px-4 py-3">
        <p className="text-sm font-semibold text-[#344054]">Expected Response Time</p>
        <p className="mt-1 text-sm text-[#475467]">You can expect to hear from us within 2-3 working days with a quote and next steps.</p>
      </div>
      <div className="mt-8 flex w-full gap-3">
        <Button color="secondary" size="lg" className="flex-1" onClick={onClose}>
          Close
        </Button>
        <Button size="lg" className="flex-1" href="/rayda-remote/orders">
          View requests
        </Button>
      </div>
    </div>
  );
}

export { CustomRequestSuccess };
