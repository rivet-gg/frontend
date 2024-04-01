import { ArrowRightIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface CtaCardProps {
  title: string;
  description: string;
}

export const CtaCard = ({ title, description }: CtaCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="font-bold">{title}</CardTitle>
        <ArrowRightIcon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <p className="text-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};
