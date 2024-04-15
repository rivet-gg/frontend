import { ReactNode } from "react";
import { Flex } from "./ui/flex";
import { H1 } from "./ui/typography";
import { cn } from "./lib/utils";

export interface PageProps {
  className?: string;
  title: ReactNode;
  header?: ReactNode;
  children: ReactNode;
}

export const Page = ({ title, header, children, className }: PageProps) => {
  return (
    <Flex direction="col" gap="4" className={className}>
      <H1 className={cn(header ? "mt-8" : "my-8")}>{title}</H1>
      {header}
      {children}
    </Flex>
  );
};
