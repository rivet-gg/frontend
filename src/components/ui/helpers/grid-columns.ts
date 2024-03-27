import { type Responsive } from "./types";
import { getResponsiveValue } from "./utilities";

type GridColumnsValues = "1" | "2" | "3" | "4" | "5" | "6";

export interface GridColumnsUtilitiesProps {
  columns: Responsive<GridColumnsValues>;
}

export const omitGridColumnsProps = <
  T extends Partial<GridColumnsUtilitiesProps>,
>(
  props: T,
): Omit<T, keyof GridColumnsUtilitiesProps> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { columns, ...rest } = props;
  return rest;
};

export const getGridColumnsClass = (
  props: Partial<GridColumnsUtilitiesProps>,
) => {
  const { columns } = props;

  return [columns && getResponsiveValue(columns, "grid-cols")]
    .filter(Boolean)
    .join(" ");
};
