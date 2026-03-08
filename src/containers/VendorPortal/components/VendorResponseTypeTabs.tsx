import { Edit05, SwitchHorizontal01, XCircle } from "@untitledui/icons";
import { Tabs } from "@/components/application/tabs/tabs";
import { ResponseType } from "../ResponseType";

function VendorResponseTypeTabs({ responseType, onChange }: { responseType: ResponseType; onChange: (value: ResponseType) => void }) {
  return (
    <Tabs selectedKey={responseType} onSelectionChange={(key) => onChange(key as ResponseType)} className="w-full">
      <Tabs.List type="button-minimal" size="sm" fullWidth items={[]}>
        <Tabs.Item key="quote" id="quote">
          <Edit05 className="size-4 shrink-0" />
          <span>Quote</span>
        </Tabs.Item>
        <Tabs.Item key="alternative" id="alternative">
          <SwitchHorizontal01 className="size-4 shrink-0" />
          <span className="hidden sm:inline">Alternative</span>
          <span className="sm:hidden">Alt</span>
        </Tabs.Item>
        <Tabs.Item key="unavailable" id="unavailable">
          <XCircle className="size-4 shrink-0" />
          <span className="hidden sm:inline">Unable to Fulfill</span>
          <span className="sm:hidden">N/A</span>
        </Tabs.Item>
      </Tabs.List>
    </Tabs>
  );
}

export { VendorResponseTypeTabs };
