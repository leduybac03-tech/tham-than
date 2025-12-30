import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatVisit = (dateVisit, timeVisit) => {
  const date = new Date(dateVisit);
  const formattedDate = date.toLocaleDateString("vi-VN"); // dd/mm/yyyy
  return `${formattedDate} - ${timeVisit}`;
};