/* eslint-disable @next/next/no-img-element */
import { equipmentItems } from "./data";

function EquipmentCard() {
  return (
    <div className="rounded-2xl border border-[#e9eaeb] bg-white p-5 sm:p-8">
      {}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <h2 className="text-xl leading-8 font-medium text-[#181d27] sm:text-2xl">Equipment</h2>
          <p className="text-sm leading-5 text-[#535862]">All the equipment for this order</p>
        </div>
        <div className="h-px w-full bg-border-secondary" />
      </div>

      {}
      <div className="mt-8 flex flex-col">
        {equipmentItems.map((item, index) => (
          <div key={item.id}>
            <div className="flex items-center gap-4">
              <div className="size-12 shrink-0 overflow-hidden rounded-[10px] bg-[#f2f4f7]">
                <img src={item.image} alt={item.name} className="size-full object-contain" />
              </div>
              <p className="truncate text-base text-[#181d27]">{item.name}</p>
            </div>
            {index < equipmentItems.length - 1 && <div className="my-4 h-px w-full bg-border-secondary" />}
          </div>
        ))}
      </div>
    </div>
  );
}
export { EquipmentCard };
