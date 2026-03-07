/* eslint-disable */
// @ts-nocheck
import { RFQ } from "./RFQ";

const _legacyRfqs: Array<Omit<RFQ, "createdAt">> = [
  {
    id: "26680",
    devices: [
      {
        name: 'LG 27UP850-W 27" 4K Monitor',
        quantity: 2,
        unitPrice: 450,
        assetType: "Monitor",
        description:
          "27-inch 4K UHD IPS display with HDR10 support, 99% sRGB color gamut, USB-C connectivity with 96W power delivery, and VESA mount compatible. Requires height-adjustable stand.",
      },
      {
        name: "Alienware 18 Area-51 Gaming Laptop",
        quantity: 2,
        unitPrice: 4200,
        assetType: "Laptop",
        description:
          'High-performance gaming laptop with Intel Core i9-13980HX, 64GB DDR5 RAM, 2TB NVMe SSD, NVIDIA RTX 4090, 18" QHD+ 165Hz display. For game development workstations.',
      },
      {
        name: "Razer BlackWidow V4 Pro Keyboard",
        quantity: 2,
        assetType: "Peripheral",
        description:
          "Mechanical gaming keyboard with Razer Green switches, USB-C and Bluetooth connectivity, Chroma RGB backlight, dedicated media controls, and magnetic wrist rest included.",
      },
    ],
    country: "United States",
    deliveryAddress: "20 Cooper Square, New York, NY 10003, USA",
    dueDate: "Jan 9, 2025",
    notes: "Need devices for new game development team. Priority on high-performance specs.",
  },
  {
    id: "26681",
    devices: [
      {
        name: 'Dell UltraSharp U3223QE 32" 4K Monitor',
        quantity: 1,
        unitPrice: 1100,
        assetType: "Monitor",
        description:
          "32-inch 4K IPS Black panel with USB-C hub (90W PD), built-in KVM switch, excellent color accuracy for design work. Preferred for creative professionals.",
      },
      {
        name: "CalDigit TS4 Thunderbolt 4 Dock",
        quantity: 1,
        unitPrice: 400,
        assetType: "Accessory",
        description:
          "18-port Thunderbolt 4 dock with 98W power delivery, supports dual 4K or single 8K displays, 2.5GbE ethernet, and SD card reader. For MacBook Pro setup.",
      },
    ],
    country: "United States",
    deliveryAddress: "1 E 2nd St, New York, NY 10003, USA",
    dueDate: "Jan 16, 2025",
    budget: "$2,500 - $3,000",
  },
  {
    id: "26682",
    devices: [
      {
        name: "Herman Miller Aeron Chair",
        quantity: 3,
        unitPrice: 1395,
        assetType: "Furniture",
        description:
          "Size B ergonomic office chair with graphite frame, PostureFit SL lumbar support, fully adjustable arms, forward tilt and tilt limiter. 12-year warranty required.",
      },
      {
        name: "Fully Jarvis Standing Desk",
        quantity: 3,
        unitPrice: 750,
        assetType: "Furniture",
        description:
          '72" x 30" electric standing desk with bamboo top and black frame. Height range 25.5" - 51.1" with 4 programmable memory presets. Cable management included.',
      },
      {
        name: "BenQ ScreenBar Monitor Light",
        quantity: 3,
        assetType: "Accessory",
        description:
          "Monitor-mounted LED light bar with auto-dimming, adjustable color temperature (2700K-6500K), USB powered, asymmetric optical design prevents screen glare.",
      },
    ],
    country: "United States",
    deliveryAddress: "33 3rd Ave, New York, NY 10003, USA",
    dueDate: "Jan 16, 2025",
    notes: "Setting up new remote workstations for engineering team.",
  },
  {
    id: "26683",
    devices: [
      {
        name: 'MacBook Pro 14" M3 Pro',
        quantity: 5,
        assetType: "Laptop",
        description: "14-inch Liquid Retina XDR display, M3 Pro chip, 18GB unified memory, 512GB SSD. For software development team expansion.",
      },
      {
        name: "Apple Magic Keyboard with Touch ID",
        quantity: 5,
        assetType: "Peripheral",
        description: "Wireless keyboard with Touch ID, numeric keypad, USB-C charging. Space Gray finish to match MacBook Pro.",
      },
    ],
    country: "United States",
    deliveryAddress: "100 5th Ave, New York, NY 10011, USA",
    dueDate: "Jan 20, 2025",
    notes: "New developer onboarding batch. Need devices by end of month.",
  },
  {
    id: "26684",
    devices: [
      {
        name: 'Samsung 49" Odyssey G9 Monitor',
        quantity: 2,
        assetType: "Monitor",
        description: "49-inch DQHD (5120x1440) curved gaming monitor, 240Hz, 1ms response time, HDR1000. For trading desk setup.",
      },
    ],
    country: "United States",
    deliveryAddress: "200 Park Ave, New York, NY 10166, USA",
    dueDate: "Jan 22, 2025",
  },
  {
    id: "26685",
    devices: [
      {
        name: "iPhone 15 Pro Max",
        quantity: 10,
        assetType: "Phone",
        description: "256GB, Natural Titanium. Corporate mobile devices for sales team with MDM enrollment required.",
      },
      {
        name: "Apple AirPods Pro 2",
        quantity: 10,
        assetType: "Audio",
        description: "Wireless earbuds with Active Noise Cancellation, USB-C charging case. For sales team mobile setup.",
      },
    ],
    country: "United States",
    deliveryAddress: "350 Madison Ave, New York, NY 10017, USA",
    dueDate: "Jan 25, 2025",
    notes: "Sales team equipment refresh. Engraving not required.",
  },
  {
    id: "26686",
    devices: [
      {
        name: "Dell Precision 5680 Workstation",
        quantity: 3,
        unitPrice: 3500,
        assetType: "Laptop",
        description: "16-inch 4K OLED, Intel Core i9-13900H, 64GB RAM, 2TB SSD, NVIDIA RTX 4000. For CAD/3D modeling work.",
      },
      {
        name: 'Dell UltraSharp 32" 6K Monitor',
        quantity: 3,
        assetType: "Monitor",
        description: "32-inch 6K IPS Black, Thunderbolt 4, 140W PD, built-in colorimeter. Reference-grade color accuracy.",
      },
    ],
    country: "United States",
    deliveryAddress: "55 Water St, New York, NY 10041, USA",
    dueDate: "Feb 1, 2025",
    notes: "Architecture team workstations. Color accuracy is critical.",
  },
  {
    id: "26687",
    devices: [
      {
        name: "Logitech Rally Bar",
        quantity: 4,
        unitPrice: 2999,
        assetType: "Conference",
        description: "All-in-one video bar for medium rooms, 4K camera, AI-powered auto-framing, integrated speakers and mics.",
      },
      {
        name: "Logitech Tap IP Controller",
        quantity: 4,
        assetType: "Conference",
        description: "10.1-inch touch controller for video conferencing, supports Teams, Zoom, Meet. PoE powered.",
      },
    ],
    country: "United States",
    deliveryAddress: "1 World Trade Center, New York, NY 10007, USA",
    dueDate: "Feb 5, 2025",
    notes: "Conference room upgrades for floors 45-48.",
  },
  {
    id: "26688",
    devices: [
      {
        name: "Lenovo ThinkPad X1 Carbon Gen 11",
        quantity: 8,
        assetType: "Laptop",
        description: "14-inch 2.8K OLED, Intel Core i7-1365U, 16GB RAM, 512GB SSD. Lightweight for frequent travelers.",
      },
    ],
    country: "United States",
    deliveryAddress: "375 Park Ave, New York, NY 10152, USA",
    dueDate: "Feb 8, 2025",
    notes: "Executive team laptop refresh. Premium support required.",
  },
  {
    id: "26689",
    devices: [
      {
        name: "Microsoft Surface Pro 9",
        quantity: 6,
        unitPrice: 1599,
        assetType: "Tablet",
        description: "13-inch PixelSense display, Intel Core i7, 16GB RAM, 256GB SSD. With Surface Pro Signature Keyboard.",
      },
      {
        name: "Microsoft Surface Pen 2",
        quantity: 6,
        unitPrice: 129,
        assetType: "Peripheral",
        description: "Rechargeable stylus with haptic feedback, 4096 pressure levels. For note-taking and design work.",
      },
      {
        name: "Microsoft Surface Dock 2",
        quantity: 6,
        assetType: "Accessory",
        description: "Dual 4K display support, 199W power supply, USB-C/A ports, audio port, Gigabit Ethernet.",
      },
    ],
    country: "United States",
    deliveryAddress: "450 Lexington Ave, New York, NY 10017, USA",
    dueDate: "Feb 10, 2025",
    notes: "Field sales team mobile workstations. Need lightweight setup.",
  },
];
export { _legacyRfqs };
