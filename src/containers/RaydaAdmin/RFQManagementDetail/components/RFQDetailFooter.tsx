import { Edit05 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

function RFQDetailFooter({
  canCurate,
  onBack,
  onCurate,
  onRecall,
  showRecall,
}: {
  canCurate: boolean;
  onBack: () => void;
  onCurate: () => void;
  onRecall: () => void;
  showRecall: boolean;
}) {
  return (
    <div className="sticky bottom-0 border-t border-secondary bg-primary py-4 page-px">
      <div className="flex items-center justify-between">
        <Button size="md" color="secondary" onClick={onBack}>
          {showRecall ? "Back" : "Cancel"}
        </Button>
        {showRecall ? (
          <Button size="md" color="primary" iconLeading={Edit05} onClick={onRecall}>
            Recall & Edit
          </Button>
        ) : (
          <Button size="md" color="primary" iconLeading={Edit05} isDisabled={!canCurate} onClick={onCurate}>
            Prepare Quote
          </Button>
        )}
      </div>
    </div>
  );
}

export { RFQDetailFooter };
