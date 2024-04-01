import { type Responsive } from "./types";
import { getResponsiveValue } from "./utilities";

type JustifyContentValues = "start" | "end" | "center" | "between" | "around";

export interface JustifyContentUtilitiesProps {
  justify: Responsive<JustifyContentValues>;
}

export function omitJustifyContentProps<
  T extends Partial<JustifyContentUtilitiesProps>,
>(props: T): Omit<T, keyof JustifyContentUtilitiesProps> {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { justify, ...rest } = props;
  return rest;
}

export function getJustifyContentClass(
  props: Partial<JustifyContentUtilitiesProps>,
) {
  const { justify } = props;

  return [justify && getResponsiveValue(justify, "justify")]
    .filter(Boolean)
    .join(" ");
}
