import { ArrowRightIcon } from "lucide-react";
import { ActionCard } from "./action-card";

interface CtaCardProps {
  title: string;
  description: string;
}

export const CtaCard = ({ title, description }: CtaCardProps) => {
  return (
    <ActionCard
      title={title}
      description={description}
      action={<ArrowRightIcon className="h-4 w-4 text-muted-foreground" />}
    />
  );
};
