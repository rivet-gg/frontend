import { RivetError } from "@rivet-gg/api";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isRivetError(
  error: unknown,
): error is RivetError & { body: { message: string } } {
  return (
    error instanceof RivetError &&
    typeof error.body === "object" &&
    error.body !== null &&
    Object.hasOwn(error.body, "message")
  );
}