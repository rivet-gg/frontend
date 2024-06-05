import type { ReactNode } from "react";
import { cn } from "./lib/utils";
import { Flex } from "./ui/flex";
import { Skeleton } from "./ui/skeleton";
import { H1 } from "./ui/typography";

export interface PageProps {
  className?: string;
  title?: ReactNode;
  header?: ReactNode;
  children: ReactNode;
}

export const Page = ({ title, header, children, className }: PageProps) => {
  return (
    <Flex direction="col" gap="4" className={cn(className, !title && "pt-4")}>
      {title ? <H1 className={cn(header ? "mt-8" : "my-8")}>{title}</H1> : null}
      {header}
      {children}
    </Flex>
  );
};

Page.Skeleton = () => {
  return (
    <Flex direction="col" gap="4">
      <Skeleton className="h-8 w-1/2" />
      <Skeleton className="h-1/2 w-full" />
    </Flex>
  );
};
