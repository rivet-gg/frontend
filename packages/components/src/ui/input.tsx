import { type ReactNode, forwardRef } from "react";
import { cn } from "../lib/utils";

import { Slot } from "@radix-ui/react-slot";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  asChild?: boolean;
  children?: ReactNode;
  className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ asChild, className, ...other }, ref) => {
    const Comp = asChild ? Slot : "input";
    return (
      <Comp
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

Input.displayName = "Input";

export { Input };
