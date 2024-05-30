import { z } from "zod";

export const jsonString = z.custom<string>((val) => {
  if (typeof val === "string") {
    try {
      JSON.parse(val);
      return true;
    } catch {
      return false;
    }
  }
  return false;
});