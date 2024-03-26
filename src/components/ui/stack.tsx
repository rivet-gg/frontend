import { ReactNode } from "react";

const VStack = ({ children }: { children: ReactNode }) => {
  return <div className="flex flex-col gap-4">{children}</div>;
};

const HStack = ({ children }: { children: ReactNode }) => {
  return <div className="flex gap-4">{children}</div>;
};

export { HStack, VStack };
