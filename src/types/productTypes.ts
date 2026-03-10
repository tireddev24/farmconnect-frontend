export interface Product {
  id: string;
  orderId: string;
  name: string;
  unit: string;
  category: "grains" | "legumes" | "tubers" | string; // Expandable union type
  price: number;
  stock: number;
  trend: "up" | "down" | "stable";
  icon: string;
  seller?: string;
  buyer?: string;
}
