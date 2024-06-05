import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";
import {
  type CommonHelperProps,
  getCommonHelperClass,
  omitCommonHelperProps,
} from "./helpers";

const badgeVariants = cva(
  "inline-flex items-center tracking-normal rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        warning: "border-warning/60 text-foreground",
        outline:
          "text-foreground group-hover/button:border-foreground/60 group-[.button-secondary]:border-foreground/60",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants>,
    Partial<CommonHelperProps> {}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant }),
          getCommonHelperClass(props),
          className,
        )}
        {...omitCommonHelperProps(props)}
      />
    );
  },
);

export { Badge, badgeVariants };
