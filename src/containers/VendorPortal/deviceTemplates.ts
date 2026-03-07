/* eslint-disable */
// @ts-nocheck
import { deviceColors } from "./deviceColors";
import { deviceImages } from "./deviceImages";

const deviceTemplates = [
  { name: 'MacBook Pro 16"', image: deviceImages.macbook, color: deviceColors.macbook, basePrice: 3500 },
  { name: 'MacBook Pro 14"', image: deviceImages.macbook, color: deviceColors.macbook, basePrice: 2500 },
  { name: "Dell XPS 15", image: deviceImages.dell, color: deviceColors.laptop, basePrice: 1800 },
  { name: "HP EliteBook 840", image: deviceImages.hp, color: deviceColors.laptop, basePrice: 1600 },
  { name: "Lenovo ThinkPad X1", image: deviceImages.lenovo, color: deviceColors.laptop, basePrice: 1700 },
  { name: "ASUS ProArt StudioBook", image: deviceImages.asus, color: deviceColors.laptop, basePrice: 2800 },
  { name: 'LG 27" UltraFine 5K', image: deviceImages.lgMonitor, color: deviceColors.monitor, basePrice: 1200 },
  { name: 'Dell UltraSharp 27"', image: deviceImages.dellMonitor, color: deviceColors.monitor, basePrice: 800 },
  { name: 'Samsung 32" 4K Monitor', image: deviceImages.samsungMonitor, color: deviceColors.monitor, basePrice: 600 },
  { name: "Sony WH-1000XM5", image: deviceImages.sonyHeadphones, color: deviceColors.headset, basePrice: 350 },
  { name: "Jabra Evolve2 85", image: deviceImages.jabraHeadphones, color: deviceColors.headset, basePrice: 450 },
  { name: "Logitech MX Master 3S", image: deviceImages.logitechMouse, color: deviceColors.mouse, basePrice: 100 },
  { name: "Microsoft Arc Mouse", image: deviceImages.microsoftMouse, color: deviceColors.mouse, basePrice: 80 },
  { name: "iPhone 15 Pro", image: deviceImages.iphone, color: deviceColors.iphone, basePrice: 1200 },
  { name: 'iPad Pro 12.9"', image: deviceImages.ipad, color: deviceColors.ipad, basePrice: 1100 },
];
export { deviceTemplates };
