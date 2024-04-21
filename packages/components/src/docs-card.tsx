import { ExternalLink } from "lucide-react";
import { ActionCard } from "./action-card";
import { Button } from "./ui/button";
import { ReactNode } from "react";

interface DocsCardProps {
  title: string;
  href?: string;
  description: ReactNode;
  footer?: ReactNode;
}

export const DocsCard = ({
  title,
  href,
  footer,
  description,
}: DocsCardProps) => {
  return (
    <ActionCard
      title={title}
      description={description}
      action={
        <Button asChild variant="outline" endIcon={<ExternalLink />}>
          <a href={href} target="_blank">
            Docs
          </a>
        </Button>
      }
      footer={footer}
    />
  );
};
