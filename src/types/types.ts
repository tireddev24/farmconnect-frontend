
import { type ACCOUNT_STATUSES, USER_ROLES, PRODUCT_UNITS } from "@/lib/constants";
import type { LucideIcon } from "lucide-react"; // Or your preferred icon library
import type { JSX } from "react";

export interface UserProfile {
  id: string; // UUID
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  role: UserRole // String literal types for safety
  status: AccountStatus
  isEmailVerified: boolean;
  createdAt: string; // ISO 8601 Date string
  profileImageUrl: string | null;
  address: string | null;
  state: string | null;
}



export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
export type AccountStatus = typeof ACCOUNT_STATUSES[keyof typeof ACCOUNT_STATUSES];

export type ProductUnit = typeof PRODUCT_UNITS[keyof typeof PRODUCT_UNITS];


export interface Product {
  id: string;
  categoryId: number;
  categoryName?: string
  name: string;
  description: string | null;
  pricePerUnit: number;
  unit: ProductUnit;
  quantityAvailable: number;
  location: string | null;
  latitude: number | null;
  longitude: number | null;
  harvestDate: string;
  expiryDate: string | null;
  farmerName?: string;
}



type orderStatus = "pending" | "awaiting-confirmation" | "approved" | "shipped" | "delivered";

export interface Order {
  id: string;
  orderId: string;
  name: string;
  category: string;
  price: number;
  unit: string;
  stock?: string;
  status: orderStatus;
  trend?: "up" | "down" | "stable";
  icon?: string;
  location?: string;
  desc?: string;
  date?: string;
  seller?: string;
  buyer?: string;
  quantity: number;
  items?: Partial<OrderProduct>


}


export interface OrderProduct {
  id?: string
  productId: string;
  productName: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalPrice: number;
}


export interface OrderRecord {
  id: string; // UUID
  orderNumber: string; // e.g., "FC202603171197"
  status: orderStatus;
  subTotal: number;
  deliveryFee: number;
  totalAmount: number;
  deliveryAddress: string;
  notes: string
  createdAt: string; // Or Date if you parse it
  updatedAt: string;
  buyerName: string;
  farmerName: string;
  items: OrderProduct[]; // The nested array
  delivery: {
    status: string;
    dropoffAddress: string;
    trackingCode: string;
  }
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
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserProfile
  status: AccountStatus
  isEmailVerified: boolean;
  createdAt: string;

}



export interface category {
  id: number;
  name: string;
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


export interface DashboardStat {
  label: string; // e.g., "Total Orders"
  value: string | number; // e.g., "1,250" or 1250
  change: number | string; // e.g., 12 (represents +12% increase)
  icon: LucideIcon; // The component itself: Leaf, ShoppingCart, etc.
  color: string; // The theme color: "green", "orange", "blue"
}

