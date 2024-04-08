import { ReactNode } from "react";
import { CommonHelperProps, getCommonHelperClass } from "./ui/helpers";
import { cn } from "./lib/utils";

export interface SidebarNavigationProps extends Partial<CommonHelperProps> {
  children: ReactNode;
}

export function SidebarNavigation({
  children,
  ...props
}: SidebarNavigationProps) {
  return (
    <nav
      className={cn(
        "grid gap-4 text-sm text-muted-foreground",
        getCommonHelperClass(props),
      )}
    >
      {children}
    </nav>
  );
}
