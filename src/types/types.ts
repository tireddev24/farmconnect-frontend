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

export interface CreateProductPayload {
  categoryId: number;
  name: string;
  description: string;
  pricePerUnit: number;
  unit: "bag" | "kg" | "crate" | "ton" | "tubers"; // Using specific units for better validation
  quantityAvailable: number;
  location: string;
  latitude?: number;
  longitude?: number;
  harvestDate?: string; // ISO 8601 string
  expiryDate?: string; // ISO 8601 string
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

export interface ProfileProductCard {
  name: string;
  category: string;
  pricePerUnit: number;
  unit: string;
  quantityAvailable: number;
  harvestDate: string;
  id: string;
}

export interface Quicklink {
  icon: JSX.Element;
  label: string;
  sub: string;
  link?: string;
  disabled?: boolean;
}

export type OrderActivityStatus =
  | "Pending"
  | "Processing"
  | "Dispatched"
  | "Delivered"
  | "Cancelled";

export interface OrderActivity {
  id: string; // UUID from backend
  name: string; // Product name (e.g., "25L Palm Oil")
  date: string; // ISO Date string (e.g., "2026-03-24T...")
  amount: number; // Numeric value for calculations
  status: OrderActivityStatus | string;
  tracking: string; // Unique tracking reference
}

import type { LucideIcon } from "lucide-react"; // Or your preferred icon library

export interface DashboardStat {
  label: string; // e.g., "Total Orders"
  value: string | number; // e.g., "1,250" or 1250
  change: number | string; // e.g., 12 (represents +12% increase)
  icon: LucideIcon; // The component itself: Leaf, ShoppingCart, etc.
  color: string; // The theme color: "green", "orange", "blue"
}
