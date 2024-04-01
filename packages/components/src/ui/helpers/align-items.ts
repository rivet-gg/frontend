import { type Responsive } from "./types";
import { getResponsiveValue } from "./utilities";

type AlignItemsValues = "start" | "end" | "center" | "baseline" | "stretch";

export interface AlignItemsValuesUtilitiesProps {
  items: Responsive<AlignItemsValues>;
}

export function omitAlignItemsProps<
  T extends Partial<AlignItemsValuesUtilitiesProps>,
>(props: T): Omit<T, keyof AlignItemsValuesUtilitiesProps> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { items, ...rest } = props;
  return rest;
}

export function getAlignItemsClass(
  props: Partial<AlignItemsValuesUtilitiesProps>,
) {
  const { items } = props;

  return [items && getResponsiveValue(items, "items")]
    .filter(Boolean)
    .join(" ");
}
