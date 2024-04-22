import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";
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
  CommonHelperProps,
  getCommonHelperClass,
  omitCommonHelperProps,
} from "./helpers";

export interface StackProps
  extends HTMLAttributes<HTMLDivElement>,
    Partial<CommonHelperProps>,
    Partial<GapUtilitiesProps>,
    Partial<FlexDirectionUtilitiesProps>,
    Partial<JustifyContentUtilitiesProps>,
    Partial<AlignItemsValuesUtilitiesProps> {
  children: ReactNode;
}

const VStack = (props: Omit<StackProps, "direction">) => {
  return <Flex {...props} direction="col" />;
};

const HStack = (props: Omit<StackProps, "direction">) => {
  return <Flex {...props} direction="row" />;
};

const Flex = ({ children, className, ...props }: StackProps) => {
  const htmlProps = omitAlignItemsProps(
    omitJustifyContentProps(
      omitFlexDirectionProps(omitGapProps(omitCommonHelperProps(props))),
    ),
  );
  return (
    <div
      className={cn(
        "flex",
        getCommonHelperClass(props),
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

export { HStack, VStack, Flex };
