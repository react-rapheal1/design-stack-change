import { Button } from "@/components/base/buttons/button";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

function CurateResponsePrompt({
  actions,
  color = "brand",
  description,
  icon,
  isOpen,
  title,
}: {
  actions: React.ReactNode;
  color?: "brand" | "warning" | "error" | "success";
  description: React.ReactNode;
  icon: React.ComponentType<{ className?: string }>;
  isOpen: boolean;
  title: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-overlay/70">
      <div className="mx-4 w-full max-w-md rounded-xl bg-primary p-6 shadow-xl ring-1 ring-secondary">
        <div className="flex flex-col items-center gap-5 text-center">
          <FeaturedIcon icon={icon} color={color} theme="light" size="lg" />
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold text-primary">{title}</h3>
            <div className="text-sm text-tertiary">{description}</div>
          </div>
          <div className="flex w-full gap-3">{actions}</div>
        </div>
      </div>
    </div>
  );
}

function CurateResponsePromptActions({
  confirmColor,
  confirmLabel,
  onCancel,
  onConfirm,
}: {
  confirmColor: "primary" | "primary-destructive";
  confirmLabel: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <>
      <Button size="md" color="secondary" className="flex-1" onClick={onCancel}>
        Cancel
      </Button>
      <Button size="md" color={confirmColor} className="flex-1" onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </>
  );
}

export { CurateResponsePrompt, CurateResponsePromptActions };
