import { RivetError } from "@rivet-gg/api";
import { z } from "zod";

export function convertStringToId(x: string): string {
  return x.toLowerCase().replace(/[^a-z0-9]+/g, "-");
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

export function noop() {}
