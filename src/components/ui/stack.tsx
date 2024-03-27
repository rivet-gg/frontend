import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";
import {
  MarginUtilitiesProps,
  getMarginClass,
  omitMarginProps,
} from "./helpers/margin";
import {
  PaddingUtilitiesProps,
  getPaddingsClass,
  omitPaddingProps,
} from "./helpers/padding";
import { GapUtilitiesProps, getGapClass, omitGapProps } from "./helpers/gap";
import {
  FlexDirectionUtilitiesProps,
  getFlexDirectionClass,
  omitFlexDirectionProps,
} from "./helpers/flex-direction";
import {
  JustifyContentUtilitiesProps,
  getJustifyContentClass,
  omitJustifyContentProps,
} from "./helpers/justify-content";
import {
  AlignItemsValuesUtilitiesProps,
  getAlignItemsClass,
  omitAlignItemsProps,
} from "./helpers/align-items";

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<MarginUtilitiesProps>,
    Partial<PaddingUtilitiesProps>,
    Partial<GapUtilitiesProps>,
    Partial<FlexDirectionUtilitiesProps>,
    Partial<JustifyContentUtilitiesProps>,
    Partial<AlignItemsValuesUtilitiesProps> {
  children: ReactNode;
}

const VStack = (props: Omit<StackProps, "direction">) => {
  return <Stack {...props} direction="col" />;
};

const HStack = (props: Omit<StackProps, "direction">) => {
  return <Stack {...props} direction="row" />;
};

const Stack = ({ children, className, ...props }: StackProps) => {
  const htmlProps = omitAlignItemsProps(
    omitJustifyContentProps(
      omitFlexDirectionProps(
        omitGapProps(omitPaddingProps(omitMarginProps(props))),
      ),
    ),
  );
  return (
    <div
      className={cn(
        "flex",
        getMarginClass(props),
        getPaddingsClass(props),
        getGapClass(props),
        getFlexDirectionClass(props),
        getJustifyContentClass(props),
        getAlignItemsClass(props),
        className,
      )}
      {...htmlProps}
    >
      {children}
    </div>
  );
};

export { HStack, VStack, Stack };
