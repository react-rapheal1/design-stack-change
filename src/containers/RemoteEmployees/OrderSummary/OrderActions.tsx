import { InfoOctagon } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { TextArea } from "@/components/base/textarea/textarea";
import { Toggle } from "@/components/base/toggle/toggle";

function OrderActions({
  termsAccepted,
  onTermsChange,
  signatureRequired,
  onSignatureToggleOff,
  onSignatureToggleOn,
  specialInstructions,
  onSpecialInstructionsChange,
  onConfirm,
}: {
  termsAccepted: boolean;
  onTermsChange: (value: boolean) => void;
  signatureRequired: boolean;
  onSignatureToggleOff: () => void;
  onSignatureToggleOn: () => void;
  specialInstructions: string;
  onSpecialInstructionsChange: (value: string) => void;
  onConfirm: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      {}
      <div className="rounded-xl border border-[#e9eaeb] bg-white p-4">
        <Checkbox
          isSelected={termsAccepted}
          onChange={onTermsChange}
          label="Terms and Conditions"
          hint="I acknowledge my responsibility for providing the correct address. I also understand that incorrect information can impact the delivery or recovery process."
        />
      </div>

      {}
      <div className="h-px w-full bg-[#eaecf0]" />

      {}
      <TextArea
        label="Special instructions or notes (Optional)"
        placeholder={'E.g Call when nearby," "Leave at front desk,"  "Building access code: 1234'}
        rows={5}
        value={specialInstructions}
        onChange={onSpecialInstructionsChange}
      />

      {}
      <div className="flex flex-col gap-4">
        {}
        <div className="rounded-xl border border-[#e9eaeb] bg-white p-4">
          <Toggle
            className="w-full [&>div:first-of-type]:shrink-0"
            isSelected={signatureRequired}
            onChange={(val) => (val ? onSignatureToggleOn() : onSignatureToggleOff())}
            label="Signature Required"
            hint={
              signatureRequired ? (
                "Delivery will be attempted only when employee is available to receive. However, this will not always be guaranteed"
              ) : (
                <span className="text-[#d92d20]">Package may be left unattended if no one is available to receive it.</span>
              )
            }
          />
        </div>

        {}
        <div className="rounded-xl border border-[#0c66ff] bg-white p-4">
          <div className="flex gap-2">
            <InfoOctagon className="mt-0.5 size-5 shrink-0 text-[#0c66ff]" />
            <div className="flex flex-col text-sm">
              <p className="font-medium text-[#052b6b]">Signature requirement automatically enabled</p>
              <p className="text-[#0948b5]">(order value exceeds $2,500)</p>
            </div>
          </div>
        </div>
      </div>

      {}
      <Button size="xl" isDisabled={!termsAccepted} className="w-full" onClick={onConfirm}>
        Confirm Details
      </Button>
    </div>
  );
}
export { OrderActions };
