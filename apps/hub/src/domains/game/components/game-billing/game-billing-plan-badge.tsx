import { useIntersectionObserver } from "@react-hookz/web";
import { Rivet } from "@rivet-gg/api-ee";
import { Badge, Skeleton } from "@rivet-gg/components";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import { gameBillingQueryOptions } from "../../queries";

const BILLING_PLAN_LABELS = {
  [Rivet.ee.billing.Plan.Indie]: "Indie Plan",
  [Rivet.ee.billing.Plan.Studio]: "Studio Plan",
  [Rivet.ee.billing.Plan.Trial]: "Trial Plan",
};

const BILLING_PLAN_COLORS = {
  [Rivet.ee.billing.Plan.Indie]: "default",
  [Rivet.ee.billing.Plan.Studio]: "default",
  [Rivet.ee.billing.Plan.Trial]: "secondary",
} as const;

interface GameBillingPlanBadgeProps {
  gameId: string;
}

export function GameBillingPlanBadge({ gameId }: GameBillingPlanBadgeProps) {
  const ref = useRef<HTMLDivElement>(null);

  const intersection = useIntersectionObserver(ref, {
    root: null,
    rootMargin: "0px",
    threshold: [1],
  });

  const { data, isSuccess } = useQuery(
    gameBillingQueryOptions(gameId, {
      enabled: intersection?.isIntersecting ?? false,
    }),
  );

  if (isSuccess) {
    return (
      <Badge variant={BILLING_PLAN_COLORS[data.plan]}>
        <GameBillingPlanLabel plan={data.plan} />
      </Badge>
    );
  }

  return <Skeleton ref={ref} className="w-12 h-6" />;
}

export function GameBillingPlanLabel({
  plan,
}: { plan: Rivet.ee.billing.Plan }) {
  return BILLING_PLAN_LABELS[plan];
}
