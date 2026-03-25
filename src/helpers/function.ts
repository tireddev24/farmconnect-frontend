import { categories } from "data/constant";
import type { Product } from "types/types";

export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString || dateString.startsWith("0001")) {
    return "Not Available";
  }

  const date = new Date(dateString);

  // Check if the date is actually valid
  if (isNaN(date.getTime())) return "Invalid Date";

  return new Intl.DateTimeFormat("en-NG", {
    day: "numeric",
    month: "short",
    year: "numeric",
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
    if (cat.name == name) {
      return cat.id;
    }
  });

  return catname?.id;
};

export const returnFullName = (name1: string, name2: string): string => {
  return name1 + " " + name2;
};
