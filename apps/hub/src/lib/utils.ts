import { RivetError } from "@rivet-gg/api";

export function convertStringToId(x: string): string {
  return x.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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
