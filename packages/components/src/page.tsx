import { ReactNode } from "react";
import { Flex } from "./ui/flex";
import { H1 } from "./ui/typography";

export interface PageProps {
  className?: string;
  title: string;
  children: ReactNode;
}

export const Page = ({ title, children, className }: PageProps) => {
  return (
    <Flex direction="col" gap="4" className={className}>
      <H1 className="my-8">{title}</H1>
      {children}
    </Flex>
  );
};
