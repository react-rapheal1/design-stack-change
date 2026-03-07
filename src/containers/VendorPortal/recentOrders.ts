/* eslint-disable */
// @ts-nocheck
import { Device } from "./Device";
import { RFQ } from "./RFQ";
import { deviceColors } from "./deviceColors";
import { deviceImages } from "./deviceImages";

const recentOrders: { id: string; devices: Device[]; service: string; amount: string; address: string; dueDate: string; status: string }[] = [
  {
    id: "26678",
    devices: [
      { name: 'LG 27" UltraFine 5K', image: deviceImages.lgMonitor, color: deviceColors.monitor },
      { name: 'MacBook Pro 16"', image: deviceImages.macbook, color: deviceColors.macbook },
      { name: "ASUS ProArt StudioBook", image: deviceImages.asus, color: deviceColors.laptop },
    ],
    service: "Onboarding",
    amount: "$150.00",
    address: "20 Cooper...",
    dueDate: "Jan 9, 2025",
    status: "Pending",
  },
  {
    id: "26677",
    devices: [
      { name: "HP EliteBook 840 G9", image: deviceImages.hp, color: deviceColors.laptop },
      { name: 'Dell UltraSharp 27"', image: deviceImages.dellMonitor, color: deviceColors.monitor },
      { name: "Sony WH-1000XM5", image: deviceImages.sonyHeadphones, color: deviceColors.headset },
      { name: "Logitech MX Master 3S", image: deviceImages.logitechMouse, color: deviceColors.mouse },
    ],
    service: "Offboarding",
    amount: "$150.00",
    address: "1 E 2nd St...",
    dueDate: "Jan 4, 2025",
    status: "Pending",
  },
  {
    id: "26676",
    devices: [
      { name: "Lenovo ThinkPad X1", image: deviceImages.lenovo, color: deviceColors.laptop },
      { name: 'Samsung 32" 4K Monitor', image: deviceImages.samsungMonitor, color: deviceColors.monitor },
      { name: "Microsoft Arc Mouse", image: deviceImages.microsoftMouse, color: deviceColors.mouse },
      { name: "Jabra Evolve2 85", image: deviceImages.jabraHeadphones, color: deviceColors.headset },
    ],
    service: "RFQ",
    amount: "$130.00",
    address: "33 3rd Ave...",
    dueDate: "Jan 9, 2025",
    status: "Pending",
  },
  {
    id: "26675",
    devices: [
      { name: "Dell XPS 15", image: deviceImages.dell, color: deviceColors.laptop },
      { name: "AirPods Pro", image: deviceImages.airpodsPro, color: deviceColors.airpods },
    ],
    service: "Storage",
    amount: "$150.00",
    address: "33 3rd Ave...",
    dueDate: "Jan 9, 2025",
    status: "Pending",
  },
];
export { recentOrders };
