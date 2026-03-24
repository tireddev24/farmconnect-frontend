/* eslint-disable @typescript-eslint/no-explicit-any */
import { url } from "api/axios";
import type { CreateOrderPayload, CreateProductPayload } from "types/types";
import { create } from "zustand";

const token = JSON.parse(sessionStorage.getItem("accessToken")!);

export const useProductStore: any = create((set) => ({
  products: [],
  product: {},
  setProducts: (products: []) => set({ products }),
  fetchProducts: async () => {
    const res: Response = await fetch(`${url}/products`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ products: data.data });
    return { success: true, message: data.message };
  },
  fetchProductById: async (id: string) => {
    const res: Response = await fetch(`${url}/products/${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ product: data.data });
    return { success: true, message: data.message };
  },
}));

export const useOrderStore: any = create((set) => ({
  orders: [],
  setOrders: (orders: []) => set({ orders }),
  fetchOrders: async () => {
    const res: Response = await fetch(`${url}/orders/my`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ orders: data.data.items });
    return { success: true, message: data.message };
  },
  createOrder: async (body: CreateOrderPayload) => {
    const res: Response = await fetch(`${url}/orders`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    // set({ orders: data.data.items });
    return { success: true, message: data.message };
  },
}));

export const useAdminStore: any = create((set) => ({
  users: [],
  orders: [],
  products: [],
  logs: [],
  setOrders: (orders: []) => set({ orders }),
  fetchUsers: async () => {
    const res: Response = await fetch(`${url}/admin/users`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ users: data });
    return { success: true, message: data.message };
  },
  fetchOrders: async () => {
    const res: Response = await fetch(`${url}/admin/orders`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ orders: data.data.items });
    return { success: true, message: data.message };
  },
  fetchProducts: async () => {
    const res: Response = await fetch(`${url}/admin/products`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ products: data.data.items });
    return { success: true, message: data.message };
  },
  fetchLogs: async () => {
    const res: Response = await fetch(`${url}/admin/audit-logs`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ logs: data.data });
    return { success: true, message: data.message };
  },
}));

export const useFarmerStore: any = create((set) => ({
  orders: [],
  products: [],
  setOrders: (orders: []) => set({ orders }),
  fetchOrders: async () => {
    const res: Response = await fetch(`${url}/orders/farmer`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ orders: data.data.items });
    return { success: true, message: data.message };
  },
  fetchProducts: async () => {
    const res: Response = await fetch(`${url}/products`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ products: data.data.items });
    return { success: true, message: data.message };
  },
  createProduct: async (body: CreateProductPayload) => {
    const res: Response = await fetch(`${url}/products`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    if (!res) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }
    if (res.status === 400) {
      return { success: data.success, message: data.message };
    }

    if (res.status === 401) {
      return { success: false, res: 401, message: data.message };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    set({ products: data.data.items });
    return { success: true, message: data.message };
  },
}));
