import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ReactNode } from "react";

interface CtaCardProps {
  title: string;
  description: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
}

export const ActionCard = ({
  title,
  action,
  footer,
  description,
}: CtaCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-bold">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent>{description}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
};
