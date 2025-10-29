import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isMobile() {
  if (typeof window !== "undefined") {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  return false;
}
export const prismScale = isMobile() ? 2.0 : 4.0;

export function isTablet() {
  if (typeof window !== "undefined") {
    return /Tablet|iPad/i.test(navigator.userAgent);
  }
  return false;
}

export function isDesktop() {
  if (typeof window !== "undefined") {
    return !/Mobi|Android|Tablet|iPad/i.test(navigator.userAgent);
  }
  return false;
}
