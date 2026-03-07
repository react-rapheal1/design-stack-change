import { StarIcon } from "./PanelIcons";

function TestimonialPanel() {
  return (
    <div className="flex flex-1 flex-col justify-center">
      <blockquote className="text-[1.65rem] leading-snug font-bold text-[#0d1117]">
        &ldquo;Delivery of the laptops for new employees happened on the same day and it was such a relief especially because we did not need to do so
        much.&rdquo;
      </blockquote>
      <div className="mt-6 flex items-end justify-between">
        <div>
          <p className="font-bold text-[#0d1117]">Miracle Aremu</p>
          <p className="mt-0.5 text-sm text-[#344054]">Customer Operations at Famasi.</p>
        </div>
        <div className="flex shrink-0 gap-0.5">
          {Array.from({ length: 5 }).map((_, index) => (
            <StarIcon key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export { TestimonialPanel };
