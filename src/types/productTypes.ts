export interface Product {
  id: string;
  name: string;
  unit: string;
  category: string;
  price: number;
  stock: number;
  trend: "up" | "down";
  icon: string;
}
