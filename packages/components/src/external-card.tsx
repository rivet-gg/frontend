import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { ActionCard, type ActionCardProps } from "./action-card";
import { Button } from "./ui/button";

export interface ExternalCardProps extends Omit<ActionCardProps, "label"> {
  href: string;
  label: ReactNode;
}

export const ExternalCard = ({ href, label, ...props }: ExternalCardProps) => {
  return (
    <ActionCard
      {...props}
      action={
        <Button asChild variant="outline" endIcon={<ExternalLink />}>
          <a href={href} target="_blank" rel="noreferrer">
            {label}
          </a>
        </Button>
      }
    />
  );
};
