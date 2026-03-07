import type { ComponentType } from "react";
import { Container, Headphones01, Keyboard01, Laptop01, Lightning01, Monitor01, Mouse, Phone01, Tablet01, VideoRecorder } from "@untitledui/icons";
import type { SelectItemType } from "@/components/base/select/select";

const assetTypes: SelectItemType[] = [
  { id: "laptop", label: "Laptop" },
  { id: "monitors", label: "Monitors" },
  { id: "headphones", label: "Headphones" },
  { id: "chargers", label: "Chargers" },
  { id: "keyboard", label: "Keyboard" },
  { id: "mouse", label: "Mouse" },
  { id: "webcam", label: "Webcam" },
  { id: "phone", label: "Phone" },
  { id: "tablet", label: "Tablet" },
  { id: "earpods", label: "Earpods" },
  { id: "other", label: "Other" },
];

const assetTypeIcons: Record<string, ComponentType<{ className?: string }>> = {
  laptop: Laptop01,
  monitors: Monitor01,
  headphones: Headphones01,
  chargers: Lightning01,
  keyboard: Keyboard01,
  mouse: Mouse,
  webcam: VideoRecorder,
  phone: Phone01,
  tablet: Tablet01,
  earpods: Headphones01,
  other: Container,
};

export { assetTypeIcons, assetTypes };
