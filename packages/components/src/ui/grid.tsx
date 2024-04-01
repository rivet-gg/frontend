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

interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<GridColumnsUtilitiesProps>,
    Partial<GapUtilitiesProps>,
    Partial<WidthUtilitiesProps> {
  children: ReactNode;
}

const Grid = ({ children, className, ...props }: GridProps) => {
  const htmlProps = omitWidthProps(omitGapProps(omitGridColumnsProps(props)));
  return (
    <div
      className={cn(
        "grid",
        getGridColumnsClass(props),
        getGapClass(props),
        getWidthClass(props),
        className,
      )}
      {...htmlProps}
    >
      {children}
    </div>
  );
};

export { Grid };
