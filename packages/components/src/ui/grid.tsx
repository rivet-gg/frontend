import { HTMLAttributes, ReactNode } from "react";
import {
  GridColumnsUtilitiesProps,
  getGridColumnsClass,
  omitGridColumnsProps,
} from "./helpers/grid-columns";
import { cn } from "@/lib/utils";
import { GapUtilitiesProps, getGapClass, omitGapProps } from "./helpers/gap";
import {
  WidthUtilitiesProps,
  getWidthClass,
  omitWidthProps,
} from "./helpers/width";
import {
  AlignItemsValuesUtilitiesProps,
  MarginUtilitiesProps,
  getAlignItemsClass,
  getMarginClass,
  omitAlignItemsProps,
  omitMarginProps,
} from "./helpers";

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
