import { Input } from "@/components/base/input/input";
import { STEP_META, TOTAL_STEPS } from "./stepMeta";
import type { Answers } from "./types";

function CompanyDetailsPage({
  answers,
  showErrors,
  onAnswer,
}: {
  answers: Answers;
  showErrors: boolean;
  onAnswer: (key: string, value: string) => void;
}) {
  const meta = STEP_META[3];
  const businessName = (answers.businessName as string) ?? "";
  const companyAddress = (answers.companyAddress as string) ?? "";

  return (
    <div className="flex flex-col gap-10">
      <div>
        <p className="text-xs font-semibold tracking-widest text-brand-600 uppercase">
          Step 4 of {TOTAL_STEPS} · {meta.label}
        </p>
        <h2 className="mt-1.5 text-2xl font-bold text-primary">{meta.heading}</h2>
        <p className="mt-1 text-sm text-tertiary">{meta.sub}</p>
      </div>

      <div className="flex flex-col gap-5">
        <div>
          <Input
            label="Business name"
            placeholder="Acme Inc."
            value={businessName}
            onChange={(v) => onAnswer("businessName", v)}
          />
          {showErrors && !businessName.trim() && <p className="mt-1 text-xs text-error-primary">This field is required.</p>}
        </div>
        <div>
          <Input
            label="Company address"
            placeholder="123 Main St, City, Country"
            value={companyAddress}
            onChange={(v) => onAnswer("companyAddress", v)}
          />
          {showErrors && !companyAddress.trim() && <p className="mt-1 text-xs text-error-primary">This field is required.</p>}
        </div>
      </div>
    </div>
  );
}

export { CompanyDetailsPage };
