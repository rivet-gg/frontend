import { HTMLAttributes, ReactNode } from "react";
import {
  GridColumnsUtilitiesProps,
  getGridColumnsClass,
  omitGridColumnsProps,
} from "./helpers/grid-columns";
import { cn } from "@/lib/utils";
import { GapUtilitiesProps, getGapClass, omitGapProps } from "./helpers/gap";

interface GridProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<GridColumnsUtilitiesProps>,
    Partial<GapUtilitiesProps> {
  children: ReactNode;
}

const Grid = ({ children, className, ...props }: GridProps) => {
  const htmlProps = omitGapProps(omitGridColumnsProps(props));
  return (
    <div
      className={cn(
        "grid",
        getGridColumnsClass(props),
        getGapClass(props),
        className,
      )}
      {...htmlProps}
    >
      {children}
    </div>
  );
};

export { Grid };
