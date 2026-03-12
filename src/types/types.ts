export interface Product {
  id: string;
  name: string;
  unit: string;
  category: "grains" | "legumes" | "tubers" | string; // Expandable union type
  price: number;
  stock?: string;
  trend?: "up" | "down" | "stable";
  icon?: string;
  location?: string;
  desc?: string;
  seller?: string;
  buyer?: string;
}

export interface Order {
  id: string;
  orderId: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock?: string;
  status?:
    | "awaiting-confirmation"
    | "approved"
    | "shipped"
    | "delivered"
    | string;
  trend?: "up" | "down" | "stable";
  icon?: string;
  location?: string;
  desc?: string;
  date?: string;
  seller?: string;
  buyer?: string;
  quantity: number;
  totalAmount: number;
}

export interface AdminUsers {
  success: boolean;
  message: string;
  data: {
    items: [
      {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        phoneNumber: string;
        role: "Buyer" | "Farmer" | "Admin";
        status: "Active" | "Banned";
        isEmailVerified: boolean;
        createdAt: string;
      },
    ];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  timestamp: string;
}
