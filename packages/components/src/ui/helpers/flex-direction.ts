import { type Responsive } from "./types";
import { getResponsiveValue } from "./utilities";

type FlexDirectionValues = "col" | "col-reverse" | "row" | "row-reverse";

export interface FlexDirectionUtilitiesProps {
  direction: Responsive<FlexDirectionValues>;
}

export function omitFlexDirectionProps<
  T extends Partial<FlexDirectionUtilitiesProps>,
>(props: T): Omit<T, keyof FlexDirectionUtilitiesProps> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { direction, ...rest } = props;
  return rest;
}

export function getFlexDirectionClass(
  props: Partial<FlexDirectionUtilitiesProps>,
) {
  const { direction } = props;

  return [direction && getResponsiveValue(direction, "flex")]
    .filter(Boolean)
    .join(" ");
}
