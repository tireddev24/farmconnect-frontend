import {
  categories,
  ORDER_STATUS_COLORS,
  type OrderStatus,
} from "@/lib/constants";
import type { Product } from "@/types/types";

export const formatDate = (dateString: string | null | undefined, monthType: "short" | "long" = "short", dayType: "numeric" | "2-digit" = "numeric", yearType: "numeric" | "2-digit" = "numeric") => {
  if (!dateString || dateString.startsWith("0001")) {
    return "Not Available";
  }

  const date = new Date(dateString);

  // Check if the date is actually valid
  if (isNaN(date.getTime())) return "Invalid Date";



  return new Intl.DateTimeFormat("en-NG", {
    day: dayType,
    month: monthType,
    year: yearType,
  }).format(date);
};

export const returnCategory = (
  text: string,
  setProduce?: React.Dispatch<React.SetStateAction<Product>>,
) => {
  categories.find((cat) => {
    if (cat.name.toLowerCase() == text.toLowerCase()) {
      setProduce!((prevProduce) => ({
        ...prevProduce,
        categoryId: Number(cat.id),
      }));
    }
  });
};

export const returnCategoryName = (id: number) => {
  const catname = categories.find((cat) => {
    if (cat.id == id) {
      return cat.name;
    }
  });

  return catname?.name;
};

export const returnCategoryId = (name: string) => {
  const catname = categories.find((cat) => {
    if (cat.name.toLowerCase() == name.toLowerCase()) {
      return cat.id;
    }
  });

  if (!catname) return 0;

  return catname?.id;
};

export const returnFullName = (name1: string, name2: string): string => {
  return name1 + " " + name2;
};

export const getStatusColor = (status: string): string => {
  // Check if the status exists in our map
  if (status in ORDER_STATUS_COLORS) {
    return ORDER_STATUS_COLORS[status as OrderStatus];
  }
  return "gray"; // Fallback for unknown statuses
};


export const formatPlural = (unit: string, quantity: number) => {
  if (quantity > 1 && unit !== "kg") {
    return `${unit}s`;
  }
  return unit;
}

export const getTotalSpent = (array: any[], key: string) => {
  return array.reduce((acc, data) => acc + data[key], 0);
}

export const formatCurrency = (amount: string | number, currency: string = "NGN") => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: currency,
  }).format(Number(amount));
}


export const filterProductsDisplay = (data: Product[], value1: string = "all", value2: string = "") => {

  if (value1 === "all" && value2 === "") return data;

  if (value2.toLowerCase() !== "" && value1 === "all") {
    const res = data.filter((item: any) => item["name"]?.toLowerCase().startsWith(value2.toLowerCase()) === true);
    return res;
  }

  const res = data.filter((item: any) => { return item["categoryName"]?.toLowerCase() === value1 && (value2 !== "" ? item["name"]?.toLowerCase().startsWith(value2) : true) });
  return res;
}