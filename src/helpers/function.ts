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
