import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";
import {
  type AlignItemsValuesUtilitiesProps,
  type MarginUtilitiesProps,
  getAlignItemsClass,
  getMarginClass,
  omitAlignItemsProps,
  omitMarginProps,
} from "./helpers";
import {
  type GapUtilitiesProps,
  getGapClass,
  omitGapProps,
} from "./helpers/gap";
import {
  type GridColumnsUtilitiesProps,
  getGridColumnsClass,
  omitGridColumnsProps,
} from "./helpers/grid-columns";
import {
  type WidthUtilitiesProps,
  getWidthClass,
  omitWidthProps,
} from "./helpers/width";

interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<GridColumnsUtilitiesProps>,
    Partial<MarginUtilitiesProps>,
    Partial<GapUtilitiesProps>,
    Partial<WidthUtilitiesProps>,
    Partial<AlignItemsValuesUtilitiesProps> {
  children: ReactNode;
}

const Grid = ({ children, className, ...props }: GridProps) => {
  const htmlProps = omitAlignItemsProps(
    omitMarginProps(omitWidthProps(omitGapProps(omitGridColumnsProps(props)))),
  );
  return (
    <div
      className={cn(
        "grid",
        getGridColumnsClass(props),
        getGapClass(props),
        getWidthClass(props),
        getMarginClass(props),
        getAlignItemsClass(props),
        className,
      )}
      {...htmlProps}
    >
      {children}
    </div>
  );
};

export { Grid };
