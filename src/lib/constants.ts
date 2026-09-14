
export const USER_ROLES = {
    Admin: "Admin",
    Farmer: "Farmer",
    Buyer: "Buyer",
    Transporter: "Transporter",
} as const;

export const ACCOUNT_STATUSES = {
    Active: "Active",
    Pending: "Pending",
    Suspended: "Suspended",
} as const;

export const PRODUCT_UNITS = {
    kg: "kg",
    bag: "bag",
    crate: "crate",
    ton: "ton",
    tubers: "tubers",
} as const


export const MEASUREMENT_UNITS = [
    { id: 0, name: "Select Measurement Unit", color: "gray.500" },
    { id: 1, name: "kg", color: "teal.500" },
    { id: 2, name: "bag", color: "blue.500" },
    { id: 3, name: "crate", color: "green.500" },
    { id: 4, name: "ton", color: "orange.500" },
    { id: 5, name: "tuber", color: "purple.500" }
]


export const categories = [
    { id: 0, name: "Select Category", color: "gray.500" },
    { id: 1, name: "Grains & Cereals", color: "teal.500" },
    { id: 2, name: "Vegetables", color: "blue.500" },
    { id: 3, name: "Fruits", color: "green.500" },
    { id: 4, name: "Tubers & Roots", color: "orange.500" },
    { id: 5, name: "Legumes", color: "purple.500" },
    { id: 6, name: "Livestock & Poultry", color: "cyan.500" },
    { id: 7, name: "Dairy & Eggs", color: "pink.500" },
    { id: 8, name: "Herbs & Spices", color: "yellow.500" },
];

export type OrderStatus =
    | "Pending"
    | "Accepted"
    | "Declined"
    | "Processing"
    | "Dispatched"
    | "Delivered"
    | "Cancelled";

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
    Pending: "orange", // Awaiting action
    Accepted: "cyan", // Confirmed by farmer
    Declined: "red", // Rejected/Error
    Processing: "blue", // In production/packaging
    Dispatched: "purple", // In transit
    Delivered: "green", // Success/Complete
    Cancelled: "gray", // Terminated
} as const;
