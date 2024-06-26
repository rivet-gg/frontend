import { Rivet } from "@rivet-gg/api-ee";
import { Badge, Skeleton } from "@rivet-gg/components";
import { useQuery } from "@tanstack/react-query";
import { gameBillingQueryOptions } from "../../queries";

const BILLING_PLAN_LABELS = {
  [Rivet.ee.cloud.games.billing.Plan.Indie]: "Indie Plan",
  [Rivet.ee.cloud.games.billing.Plan.Studio]: "Studio Plan",
  [Rivet.ee.cloud.games.billing.Plan.Trial]: "Trial Plan",
};

const BILLING_PLAN_COLORS = {
  [Rivet.ee.cloud.games.billing.Plan.Indie]: "default",
  [Rivet.ee.cloud.games.billing.Plan.Studio]: "default",
  [Rivet.ee.cloud.games.billing.Plan.Trial]: "secondary",
} as const;

interface GameBillingPlanProps {
  gameId: string;
}

export function GameBillingPlan({ gameId }: GameBillingPlanProps) {
  const { data, isLoading, isError } = useQuery(
    gameBillingQueryOptions(gameId),
  );

  if (isError) {
    return null;
  }

  if (isLoading) {
    return <Skeleton className="w-12 h-6" />;
  }

  if (!data) {
    return null;
  }

  return (
    <Badge variant={BILLING_PLAN_COLORS[data.plan]}>
      <GameBillingPlanLabel plan={data.plan} />
    </Badge>
  );
}

export function GameBillingPlanLabel({
  plan,
}: { plan: Rivet.ee.cloud.games.billing.Plan }) {
  return BILLING_PLAN_LABELS[plan];
}
