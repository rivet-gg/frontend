import { Responsive } from "./types";

export const getResponsiveValue = <T extends string>(
  value: Responsive<T> | undefined,
  key: string,
) => {
  if (typeof value === "object") {
    return Object.entries(value)
      .map(([breakpoint, value]) => {
        return `${breakpoint}:${key}-${value}`;
      })
      .join(" ");
  }

  return `${key}-${value}`;
};
