/* eslint-disable */
// @ts-nocheck
import { CatalogDevice } from "./CatalogDevice";
import { deviceImages } from "./deviceImages";

const catalogDevices: CatalogDevice[] = [
  { id: "cat-1", name: 'MacBook Pro 14"', category: "Laptop", price: 1999, specs: "M3 Pro, 18GB RAM, 512GB SSD", image: deviceImages.macbook },
  { id: "cat-2", name: 'MacBook Pro 16"', category: "Laptop", price: 3499, specs: "M3 Max, 36GB RAM, 1TB SSD", image: deviceImages.macbook },
  { id: "cat-3", name: "Dell XPS 15", category: "Laptop", price: 1799, specs: "Intel i7, 32GB RAM, 1TB SSD", image: deviceImages.dell },
  { id: "cat-4", name: "HP EliteBook 840", category: "Laptop", price: 1599, specs: "Intel i7, 16GB RAM, 512GB SSD", image: deviceImages.hp },
  { id: "cat-5", name: "Lenovo ThinkPad X1", category: "Laptop", price: 1649, specs: "Intel i7, 16GB RAM, 512GB SSD", image: deviceImages.lenovo },
  { id: "cat-6", name: "ASUS ProArt StudioBook", category: "Laptop", price: 2499, specs: "Intel i9, 32GB RAM, 1TB SSD", image: deviceImages.asus },
  { id: "cat-7", name: 'LG 27" UltraFine 5K', category: "Monitor", price: 1299, specs: "5K, USB-C, 27 inch", image: deviceImages.lgMonitor },
  { id: "cat-8", name: 'Dell UltraSharp 32"', category: "Monitor", price: 899, specs: "4K, USB-C Hub, 32 inch", image: deviceImages.dellMonitor },
  { id: "cat-9", name: 'Samsung 34" Curved', category: "Monitor", price: 699, specs: "WQHD, 100Hz, 34 inch", image: deviceImages.samsungMonitor },
  { id: "cat-10", name: 'iPad Pro 12.9"', category: "Tablet", price: 1099, specs: "M2, 256GB, WiFi", image: deviceImages.ipad },
  { id: "cat-11", name: "Samsung Galaxy Tab S9", category: "Tablet", price: 849, specs: "Snapdragon, 256GB, WiFi", image: deviceImages.samsungTablet },
  { id: "cat-12", name: "Microsoft Surface Pro", category: "Tablet", price: 999, specs: "Intel i5, 256GB, WiFi", image: deviceImages.surface },
  { id: "cat-13", name: "Sony WH-1000XM5", category: "Audio", price: 349, specs: "Wireless, ANC, 30hr battery", image: deviceImages.sonyHeadphones },
  { id: "cat-14", name: "Jabra Evolve2 85", category: "Audio", price: 449, specs: "Wireless, ANC, UC certified", image: deviceImages.jabraHeadphones },
  { id: "cat-15", name: "Logitech MX Master 3S", category: "Peripheral", price: 99, specs: "Wireless, 8000 DPI, USB-C", image: deviceImages.logitechMouse },
];
export { catalogDevices };
