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

interface BillingPlanCardProps {
  title: string;
  lead: string;
  price: string;
  priceLead?: string;
  features: { key?: string; name: ReactNode; icon?: IconProp }[];
  type?: "custom" | "active";
  onSubscribe?: () => void;
  onCancel?: () => void;
}

export function BillingPlanCard({
  title,
  lead,
  price,
  priceLead,
  type,
  features,
  onSubscribe,
  onCancel,
}: BillingPlanCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <Text className="font-bold text-3xl">{title}</Text>
        <SmallText>{lead}</SmallText>
        <div className="pt-8 min-h-[7rem]">
          <p>
            <span className="text-5xl font-bold mr-1 ">{price}</span>
            {type !== "custom" ? "/month" : null}
          </p>
          {priceLead ? <SmallText>{priceLead}</SmallText> : null}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <Flex direction="col" gap="2" asChild>
          <ul>
            {features.map(({ key, name, icon }) => (
              <Flex items="center" gap="2" key={key || name} asChild>
                <li>
                  {icon ? <Icon icon={icon} className="size-5 " /> : null}
                  {name}
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
        {type === "active" ? (
          <Button variant="secondary" onClick={onCancel}>
            Cancel Plan
          </Button>
        ) : null}
        {!type ? <Button onClick={onSubscribe}>Subscribe</Button> : null}
      </CardFooter>
    </Card>
  );
}
