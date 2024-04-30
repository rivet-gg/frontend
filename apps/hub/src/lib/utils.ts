import { RivetError } from "@rivet-gg/api";
import { z } from "zod";

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

export function hasMethod<TName extends string>(
  obj: unknown,
  methodName: TName,
): obj is { [key: string]: unknown } & { [K in TName]: () => unknown } {
  return z
    .object({
      [methodName]: z.function(),
    })
    .safeParse(obj).success;
}
