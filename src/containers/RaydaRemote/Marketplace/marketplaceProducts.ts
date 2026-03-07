interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
  badge?: { label: string; color: "purple" | "fuchsia" };
}

const products: Product[] = [
  { id: "1", name: 'Apple MacBook Air 13" M1 Chip 8GB 256GB 2020 Model - Gray', price: "$95,000", image: "/devices/laptops/macbook.png" },
  {
    id: "2",
    name: "Samsung Galaxy S24 - 256GB, 5G LTE, Green (Refurbished)",
    price: "$12,999",
    image: "/devices/phones/samsung.png",
    badge: { label: "Refurbished", color: "purple" },
  },
  { id: "3", name: 'Dell UltraSharp 27" 4K USB-C Monitor', price: "$9,000", image: "/devices/monitors/dell.png" },
  {
    id: "4",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    price: "$21,900",
    image: "/devices/accessories/headphones/sony.png",
    badge: { label: "Used", color: "fuchsia" },
  },
  { id: "5", name: "Apple AirPods Pro (2nd Generation) with MagSafe Case", price: "$2,000", image: "/devices/accessories/earpods/airpods-pro.png" },
  { id: "6", name: "Logitech MX Master 3S Wireless Performance Mouse", price: "$5,900", image: "/devices/accessories/mice/logitech-mx.png" },
];

export { products };
export type { Product };
