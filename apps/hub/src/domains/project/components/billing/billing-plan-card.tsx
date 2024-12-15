import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  Flex,
  SmallText,
  Text,
} from "@rivet-gg/components";
import { Icon, type IconProp } from "@rivet-gg/icons";
import type { ReactNode } from "@tanstack/react-router";

export interface BillingPlanCardProps {
  title: string;
  lead?: string;
  price: string;
  priceLead?: string;
  features: { key?: string; name: ReactNode; icon?: IconProp }[];
  type?: "custom" | "active";
  onSubscribe?: () => void;
  onCancel?: () => void;
  cancelLabel?: string;
}

export function BillingPlanCard({
  title,
  lead,
  price,
  priceLead,
  type,
  features,
  cancelLabel,
  onSubscribe,
  onCancel,
}: BillingPlanCardProps) {
  return (
    <Card className="flex flex-col group hover:border-primary transition-colors">
      <CardHeader>
        <Text className="font-bold text-3xl">{title}</Text>
        {lead ? <SmallText>{lead}</SmallText> : null}
        <div className="pt-8 min-h-[7rem]">
          <p>
            <span className="text-5xl font-bold mr-1 ">{price}</span>
            <span className="text-muted-foreground">
              {type !== "custom" ? "/month" : null}
            </span>
          </p>
          {priceLead ? (
            <SmallText className="text-muted-foreground">{priceLead}</SmallText>
          ) : null}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <Flex direction="col" gap="2" asChild>
          <ul>
            {features.map(({ key, name, icon }) => (
              <Flex items="center" gap="2" key={key || name} asChild>
                <li>
                  {icon ? <Icon icon={icon} className="size-5 " /> : null}
                  <span className="text-muted-foreground">{name}</span>
                </li>
              </Flex>
            ))}
          </ul>
        </Flex>
      </CardContent>
      <CardFooter className="justify-center">
        {type === "custom" ? (
          <a
            href="https://calendly.com/d/zvq-v4z-84t/rivet-founders-15-minute"
            target="_blank"
            rel="noreferrer"
          >
            <Button>Contact</Button>
          </a>
        ) : null}
        {type === "active" && onCancel ? (
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel || "Cancel"}
          </Button>
        ) : null}
        {!type ? <Button onClick={onSubscribe}>Subscribe</Button> : null}
      </CardFooter>
    </Card>
  );
}
