/* eslint-disable @typescript-eslint/no-explicit-any */

import { secureFetch } from "api/axios";

import type {
  OrderRecord as Order,
  Product,
  UserProfile,
  CreateOrderPayload,
  AdminUsers,
} from "types/types";

import { create } from "zustand";

// ============================================================
// Auth Store
// ============================================================

interface AuthStore {
  user: UserProfile | null;
  accessToken: string | null;
  isInitialized: boolean;

  setAuth: (user: UserProfile, accessToken: string) => void;
  clearAuth: () => void;
  setInitialized: (value: boolean) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  accessToken: null,
  isInitialized: false,

  setAuth: (user, accessToken) =>
    set({ user, accessToken, isInitialized: true }),

  clearAuth: () =>
    set({ user: null, accessToken: null, isInitialized: true }),

  setInitialized: (value) =>
    set({ isInitialized: value, }),
}));

// ============================================================
// Product Store
// ============================================================

interface ProductStore {
  products: Product[];
  product: Product | null;

  setProducts: (products: Product[]) => void;

  fetchProducts: () => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  fetchProductById: (id: string) => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  product: null,

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    const res: Response = await secureFetch("/products", {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }


    set({ products: data.data.items });

    return {
      success: true,
      message: data.message,
    };
  },

  fetchProductById: async (id: string) => {
    const res: Response = await secureFetch(`/products/${id}`);

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }



    set({ product: data.data });

    return {
      success: true,
      message: data.message,
    };
  },
}));

// ============================================================
// Order Store
// ============================================================

interface OrderStore {
  orders: Order[];

  setOrders: (orders: Order[]) => void;

  fetchOrders: () => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  createOrder: (body: CreateOrderPayload) => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],

  setOrders: (orders) => set({ orders }),

  fetchOrders: async () => {
    const res: Response = await secureFetch("/orders/my");

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }


    set({ orders: data.data.items });

    return {
      success: true,
      message: data.message,
    };
  },

  createOrder: async (body: CreateOrderPayload) => {
    const res: Response = await secureFetch("/orders", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }

    if (res.status === 400) {
      return {
        success: data.success,
        message: data.message,
      };
    }

    if (res.status === 401) {
      return {
        success: false,
        res: 401,
        message: data.message,
      };
    }

    if (res.status === 403) {
      return {
        success: false,
        message: "You are not authorized to perform this action",
      };
    }

    return {
      success: true,
      message: data.message,
    };
  },
}));

// ============================================================
// Admin Store
// ============================================================

interface AdminStore {
  users: AdminUsers[];
  orders: Order[];
  products: Product[];
  logs: any[];

  setOrders: (orders: Order[]) => void;

  fetchUsers: () => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  fetchOrders: () => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  fetchProducts: () => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  fetchLogs: () => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;
}

export const useAdminStore = create<AdminStore>((set) => ({
  users: [],
  orders: [],
  products: [],
  logs: [],

  setOrders: (orders) => set({ orders }),

  fetchUsers: async () => {
    const res: Response = await secureFetch("/admin/users", {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }

    set({ users: data.data.items });

    return {
      success: true,
      message: data.message,
    };
  },

  fetchOrders: async () => {
    const res: Response = await secureFetch("/admin/orders", {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }


    set({ orders: data.data.items });

    return {
      success: true,
      message: data.message,
    };
  },

  fetchProducts: async () => {
    const res: Response = await secureFetch("/admin/products", {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }



    set({ products: data.data.items });

    return {
      success: true,
      message: data.message,
    };
  },

  fetchLogs: async () => {
    const res: Response = await secureFetch("/admin/audit-logs", {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }

    set({ logs: data.data });

    return {
      success: true,
      message: data.message,
    };
  },
}));

// ============================================================
// Farmer Store
// ============================================================

interface FarmerStore {
  orders: Order[];
  products: Product[];

  setOrders: (orders: Order[]) => void;

  fetchOrders: () => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  fetchProducts: () => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  createProduct: (body: Omit<Product, "id">) => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  editProduct: (
    id: string,
    body: Omit<Product, "id">,
  ) => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  deleteProduct: (id: string) => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  acceptOrder: (
    id: string
  ) => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  declineOrder: (
    id: string,
    body: { reason: string }
  ) => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;
}

export const useFarmerStore = create<FarmerStore>((set) => ({
  orders: [],
  products: [],

  setOrders: (orders) => set({ orders }),

  fetchOrders: async () => {
    const res = await secureFetch("/orders/farmer");

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }



    set({ orders: data.data.items });

    return {
      success: true,
      message: data.message,
    };
  },

  fetchProducts: async () => {
    const res: Response = await secureFetch("/products/my", {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }




    set({ products: data.data.items });

    return {
      success: true,
      message: data.message,
    };
  },

  createProduct: async (body: Omit<Product, "id">) => {
    const res: Response = await secureFetch("/products", {
      method: "POST",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }


    set((state) => ({
      products: [...state.products, data.data],
    }));

    return {
      success: true,
      message: data.message,
    };
  },

  editProduct: async (
    id: string,
    body: Omit<Product, "id">,
  ) => {
    const res: Response = await secureFetch(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }

    set((state) => ({
      products: state.products.map((product) =>
        product.id === id ? data.data : product,
      ),
    }));

    return {
      success: true,
      message: data.message,
    };
  },

  deleteProduct: async (id) => {
    const res: Response = await secureFetch(`/products/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }

    set((state) => ({
      products: state.products.filter(
        (product) => product.id !== id,
      ),
    }));

    return {
      success: true,
      message: data.message,
    };
  },

  acceptOrder: async (
    id: string
  ) => {
    const res: Response = await secureFetch(
      `/orders/${id}/accept`,
      {
        method: "POST"
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }


    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === id ? data.data : order,
      ),
    }));

    return {
      success: true,
      message: data.message,
    };
  },
  declineOrder: async (
    id,
    body
  ) => {
    const res: Response = await secureFetch(
      `/orders/${id}/decline`,
      {
        method: "POST",
        body: JSON.stringify(body),
      },
    );

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }



    set((state) => ({
      orders: state.orders.filter(
        (order) => order.id !== id,
      ),
    }));

    return {
      success: true,
      message: data.message,
    };
  },
}));

// ============================================================
// User Store
// ============================================================

interface UserStore {
  user: UserProfile | null;
  products: Product[];

  setUsers: (users: UserProfile[]) => void;

  changePass: (pass: string) => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  fetchUserDetails: () => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;

  editUserDetails: (body: Partial<UserProfile>) => Promise<{
    success: boolean;
    message: string;
    res?: number;
  }>;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  products: [],

  setUsers: (users) => {
    // Kept to match your original store.
    // If users are not actually stored in this store,
    // this function can be removed.
    console.log(users);
  },

  changePass: async (pass: string) => {
    const res: Response = await secureFetch("/api/users/passchg", {
      method: "PUT",
      body: JSON.stringify(pass),
    });

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }

    const data = await res.json();

    return {
      success: data.success,
      message: data.message,
    };
  },

  fetchUserDetails: async () => {
    const res: Response = await secureFetch("/users/me", {
      method: "GET",
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }

    set({ user: data.data });

    return {
      success: true,
      message: data.message,
    };
  },

  editUserDetails: async (
    body: Partial<UserProfile>,
  ) => {
    const res: Response = await secureFetch("/users/me", {
      method: "PUT",
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: "Unable to communicate with server",
      };
    }

    set((state) => ({
      user: {
        ...state.user,
        ...data.data,
      } as UserProfile,
    }));

    return {
      success: true,
      message: data.message,
    };
  },
}));