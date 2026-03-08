import { verificationSteps } from "../verificationSteps";

function EmployeeVerificationProgress({ completedSteps }: { completedSteps: number }) {
  return (
    <div className="flex flex-col gap-0">
      {verificationSteps.map((step, index) => {
        const done = index < completedSteps;
        const active = index === completedSteps;
        const Icon = step.icon;

        return (
          <div key={step.label} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`flex size-8 shrink-0 items-center justify-center rounded-full ${done ? "bg-[#ecfdf3] text-[#067647]" : active ? "bg-[#e7f0ff] text-[#0948b5]" : "bg-[#f9fafb] text-[#d0d5dd]"}`}
              >
                <Icon className="size-4" />
              </div>
              {index < verificationSteps.length - 1 && <div className={`w-0.5 flex-1 ${done ? "bg-[#abefc6]" : "bg-[#e9eaeb]"}`} style={{ minHeight: 20 }} />}
            </div>
            <div className="pb-4">
              <p className={`text-sm font-medium ${done ? "text-[#067647]" : active ? "text-[#0948b5]" : "text-[#717680]"}`}>{step.label}</p>
              <p className="text-xs text-[#717680]">{step.desc}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export { EmployeeVerificationProgress };
