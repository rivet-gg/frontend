import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "../lib/utils";
import {
  type CommonHelperProps,
  getCommonHelperClass,
  omitCommonHelperProps,
} from "./helpers";

const badgeVariants = cva(
  "inline-block tracking-normal rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 whitespace-nowrap max-w-full overflow-hidden truncate",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground",
        secondary: "border-transparent bg-secondary text-secondary-foreground ",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground",
        "destructive-muted":
          "border-transparent bg-muted-destructive text-muted-destructive-foreground",
        warning: "border-warning/60 text-foreground",
        outline: "text-foreground",
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
