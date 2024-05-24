import { type HTMLAttributes, type ReactNode, forwardRef } from "react";
import { cn } from "../lib/utils";
import {
  type CommonHelperProps,
  getCommonHelperClass,
  omitCommonHelperProps,
} from "./helpers";
import {
  type AlignItemsValuesUtilitiesProps,
  getAlignItemsClass,
  omitAlignItemsProps,
} from "./helpers/align-items";
import {
  type FlexDirectionUtilitiesProps,
  getFlexDirectionClass,
  omitFlexDirectionProps,
} from "./helpers/flex-direction";
import {
  type GapUtilitiesProps,
  getGapClass,
  omitGapProps,
} from "./helpers/gap";
import {
  type JustifyContentUtilitiesProps,
  getJustifyContentClass,
  omitJustifyContentProps,
} from "./helpers/justify-content";

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

const Flex = forwardRef<HTMLDivElement, StackProps>(
  ({ children, className, ...props }, ref) => {
    const htmlProps = omitAlignItemsProps(
      omitJustifyContentProps(
        omitFlexDirectionProps(omitGapProps(omitCommonHelperProps(props))),
      ),
    );
    return (
      <div
        ref={ref}
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
  },
);

export { HStack, VStack, Flex };
