import { ArrowRightIcon } from "lucide-react";
import { ActionCard, ActionCardProps } from "./action-card";

interface CtaCardProps extends Omit<ActionCardProps, "action"> {}

export const CtaCard = (props: CtaCardProps) => {
  return (
    <ActionCard
      {...props}
      action={<ArrowRightIcon className="h-4 w-4 text-muted-foreground" />}
    />
  );
};
