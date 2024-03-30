import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { PropsWithChildren } from "react";

interface NavItemProps extends PropsWithChildren<JSX.IntrinsicElements["a"]> {
  asChild?: boolean;
}

export const NavItem = ({ className, asChild, ...props }: NavItemProps) => {
  const Comp = asChild ? Slot : "a";
  return (
    <Comp
      className={cn(
        className,
        " text-muted-foreground transition-colors hover:text-foreground",
      )}
      {...props}
    />
  );
};
