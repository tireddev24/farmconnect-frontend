import { type Product } from "../types/types";
export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Cocoa",
    unit: "per kg",
    category: "grains",
    price: 4500,
    stock: "120",
    trend: "up",
    icon: "🍫",
    seller: "Seller",
  },
  {
    id: "2",
    name: "Yam Tubers",
    unit: "per crate",
    category: "tubers",
    price: 12000,
    stock: "120",

    trend: "down",
    icon: "🥔",
    seller: "Seller",
  },
  {
    id: "3",
    name: "Carrot ",
    unit: "per crate",
    category: "tubers",
    price: 2000,
    stock: "120",
    trend: "down",
    icon: "🥕",
    seller: "Seller",
  },

  // Add more here...
];
