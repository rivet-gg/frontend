import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { ReactNode } from "react";

export interface ActionCardProps {
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  action?: ReactNode;
  footer?: ReactNode;
}

export const ActionCard = ({
  title,
  action,
  footer,
  description,
  children,
}: ActionCardProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="font-bold">{title}</CardTitle>
          {action}
        </div>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </CardHeader>
      <CardContent>{children}</CardContent>
      {footer ? <CardFooter>{footer}</CardFooter> : null}
    </Card>
  );
};
