import type { ComponentType } from "react";
import { Container, Headphones01, Keyboard01, Laptop01, Monitor01, Mouse, Phone01, Speaker01, Tablet01, VideoRecorder } from "@untitledui/icons";

type IconComponent = ComponentType<{ className?: string }>;

const assetTypeIcons: Record<string, IconComponent> = {
  Accessory: Keyboard01,
  Audio: Headphones01,
  Conference: VideoRecorder,
  Furniture: Container,
  Laptop: Laptop01,
  Monitor: Monitor01,
  Peripheral: Mouse,
  Phone: Phone01,
  Speaker: Speaker01,
  Tablet: Tablet01,
};

export { assetTypeIcons };
