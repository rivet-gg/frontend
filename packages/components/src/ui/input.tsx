import { cn } from "@/lib/utils";
import { ElementType, ReactNode, forwardRef } from "react";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "./helpers/polymorphic";

type Props = { children?: ReactNode; className?: string };

type InputStylesProps<C extends ElementType = "input"> =
  PolymorphicComponentPropsWithRef<C, Props>;

export const InputStyles = forwardRef(
  <C extends ElementType = "input">(
    { as, className, ...other }: InputStylesProps<C>,
    ref?: PolymorphicRef<C>,
  ) => {
    const Component = as || "input";
    return (
      <Component
        ref={ref}
        {...other}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      />
    );
  },
);

export interface InputProps extends InputStylesProps<"input"> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type, ...props }, ref) => {
    return <InputStyles as="input" type={type} ref={ref} {...props} />;
  },
);
Input.displayName = "Input";

export { Input };
