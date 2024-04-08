import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";
import {
  MarginUtilitiesProps,
  getMarginClass,
  omitMarginProps,
} from "./helpers/margin";
import {
  PaddingUtilitiesProps,
  getPaddingClass,
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
import {
  WidthUtilitiesProps,
  getWidthClass,
  omitWidthProps,
} from "./helpers/width";

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<MarginUtilitiesProps>,
    Partial<PaddingUtilitiesProps>,
    Partial<GapUtilitiesProps>,
    Partial<FlexDirectionUtilitiesProps>,
    Partial<JustifyContentUtilitiesProps>,
    Partial<AlignItemsValuesUtilitiesProps>,
    Partial<WidthUtilitiesProps> {
  children: ReactNode;
}

const VStack = (props: Omit<StackProps, "direction">) => {
  return <Flex {...props} direction="col" />;
};

const HStack = (props: Omit<StackProps, "direction">) => {
  return <Flex {...props} direction="row" />;
};

const Flex = ({ children, className, ...props }: StackProps) => {
  const htmlProps = omitWidthProps(
    omitAlignItemsProps(
      omitJustifyContentProps(
        omitFlexDirectionProps(
          omitGapProps(omitPaddingProps(omitMarginProps(props))),
        ),
      ),
    ),
  );
  return (
    <div
      className={cn(
        "flex",
        getMarginClass(props),
        getPaddingClass(props),
        getGapClass(props),
        getFlexDirectionClass(props),
        getJustifyContentClass(props),
        getAlignItemsClass(props),
        getWidthClass(props),
        className,
      )}
      {...htmlProps}
    >
      {children}
    </div>
  );
};

export { HStack, VStack, Flex };
