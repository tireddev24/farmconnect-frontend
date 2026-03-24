// export interface Product {
//   id: string;
//   name: string;
//   unit: string;
//   category: "grains" | "legumes" | "tubers" | string; // Expandable union type
//   price: number;
//   stock?: string;
//   trend?: "up" | "down" | "stable";
//   icon?: string;
//   location?: string;
//   desc?: string;
//   seller?: string;
//   buyer?: string;
// }

export interface Product {
  id?: string;
  categoryId: number;
  name: string;
  description: string;
  pricePerUnit: number; // In JS/TS, all numbers are 'number'
  unit: string;
  quantityAvailable: number;
  isAvailable: boolean;
  location?: string;
  latitude?: number;
  longitude?: number;
  harvestDate?: Date; // Converted from string to Date object
  expiryDate?: Date;
  createdAt?: Date;
  categoryName?: string;
  farmerName?: string;
  farmerRating?: number;
  imageUrls?: string[]; // Array of strings
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

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface CreateOrderPayload {
  items: OrderItem[];
  deliveryAddress: string;
  deliveryLatitude: number;
  deliveryLongitude: number;
  notes: string;
}

export interface OrderItemDetail {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface OrderRecord {
  id: string; // UUID
  orderNumber: string; // e.g., "FC202603171197"
  status: "Pending" | "Processing" | "Completed" | "Cancelled"; // Strict status typing
  subTotal: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddress: string;
  createdAt: string; // Or Date if you parse it
  updatedAt: string;
  buyerName: string;
  farmerName: string;
  items: OrderItemDetail[]; // The nested array
}

export interface FarmerOrderItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}

export interface DeliveryInfo {
  id: string;
  status: "Unassigned" | "Assigned" | "InTransit" | "Delivered";
  dropoffAddress: string;
  trackingCode: string;
}
export interface FarmerOrders {
  id: string;
  orderNumber: string;
  status: "Pending" | "Paid" | "Processing" | "Completed" | "Cancelled";
  subTotal: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddress: string;
  notes: string;
  createdAt: string; // ISO Date String
  updatedAt: string;
  buyerName: string;
  farmerName: string;
  items: FarmerOrderItem[];
  delivery: DeliveryInfo;
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

export interface UserProfile {
  id: string; // UUID
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: "Farmer" | "Buyer" | "Admin"; // String literal types for safety
  status: "Active" | "Inactive" | "Suspended";
  isEmailVerified: boolean;
  createdAt: string; // ISO 8601 Date string
}

export interface category {
  id: number;
  name: string;
}
