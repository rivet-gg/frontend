import { ReactNode } from "react";
import { Flex } from "./ui/flex";

interface ValueDisplayProps {
  label: ReactNode;
  value: ReactNode;
}

export function ValueDisplay({ label, value }: ValueDisplayProps) {
  return (
    <Flex direction="col">
      <p className="text-sm font-medium">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </Flex>
  );
}
