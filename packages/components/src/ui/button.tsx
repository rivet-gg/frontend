import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import {
  PolymorphicComponentPropsWithRef,
  PolymorphicRef,
} from "./helpers/polymorphic";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

interface Props extends VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  fullWidth?: boolean;
  endIcon?: React.ReactElement;
}

type ButtonProps<C extends React.ElementType = "input"> =
  PolymorphicComponentPropsWithRef<C, Props>;

const Button = React.forwardRef(
  <C extends React.ElementType = "input">(
    {
      as,
      className,
      variant,
      size,
      fullWidth,
      isLoading,
      endIcon,
      disabled,
      children,
      ...props
    }: ButtonProps<C>,
    ref: PolymorphicRef<C>,
  ) => {
    const Comp = as ? as : "button";

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && "w-full",
        )}
        ref={ref}
        {...props}
        disabled={isLoading || disabled}
      >
        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
        {endIcon ? React.cloneElement(endIcon, { className: "ml-2" }) : null}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
