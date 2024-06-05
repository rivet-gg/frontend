import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../lib/utils";
import {
  type AlignItemsValuesUtilitiesProps,
  type MarginUtilitiesProps,
  type PaddingUtilitiesProps,
  getAlignItemsClass,
  getMarginClass,
  getPaddingClass,
  omitAlignItemsProps,
  omitMarginProps,
  omitPaddingProps,
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
    Partial<AlignItemsValuesUtilitiesProps>,
    Partial<PaddingUtilitiesProps> {
  children: ReactNode;
}

const Grid = ({ children, className, ...props }: GridProps) => {
  const htmlProps = omitPaddingProps(
    omitAlignItemsProps(
      omitMarginProps(
        omitWidthProps(omitGapProps(omitGridColumnsProps(props))),
      ),
    ),
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
        getPaddingClass(props),
        className,
      )}
      {...htmlProps}
    >
      {children}
    </div>
  );
};

export { Grid };
