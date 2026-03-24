export const categories = [
  { id: 0, name: "--Category--" },
  { id: 1, name: "  Grains & Cereals" },
  { id: 2, name: "Vegetables" },
  { id: 3, name: "Fruits" },
  { id: 4, name: "Tubers & Roots" },
  { id: 5, name: "Legumes" },
  // { id: 6, name: "Livestock and Poultry" },
  { id: 7, name: "Dairy & Eggs" },
  { id: 8, name: "Herbs & Spices" },
];

export const ORDER_STATUS_COLORS = {
  Pending: "orange", // Awaiting action
  Accepted: "cyan", // Confirmed by farmer
  Declined: "red", // Rejected/Error
  Processing: "blue", // In production/packaging
  Dispatched: "purple", // In transit
  Delivered: "green", // Success/Complete
  Cancelled: "gray", // Terminated
} as const;
