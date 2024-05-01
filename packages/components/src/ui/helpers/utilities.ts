import { Responsive } from "./types";

export function getResponsiveValue<T extends string>(
  value: Responsive<T> | undefined,
  key: string,
  { useDash }: { useDash?: boolean } = { useDash: true },
) {
  const separator = useDash ? "-" : "";

  if (typeof value === "object") {
    return Object.entries(value)
      .map(([breakpoint, value]) => {
        if (breakpoint === "initial") {
          return `${key}${separator}${value}`;
        }
        return `${breakpoint}:${key}${separator}${value}`;
      })
      .join(" ");
  }

  return `${key}-${value}`;
}
