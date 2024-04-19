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
        <Button
          as="a"
          href={href}
          target="_blank"
          variant="outline"
          endIcon={<ExternalLink />}
        >
          Docs
        </Button>
      }
      footer={footer}
    />
  );
};
