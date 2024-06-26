import { Rivet } from "@rivet-gg/api-ee";
import { SmallText } from "@rivet-gg/components";
import { format } from "date-fns";
import { useGameBilling } from "./game-billing-context";
import { GameBillingPlanLabel } from "./game-billing-plan-badge";

export function GameBillingPlanStatus() {
  const { activePlan, plan, subscription } = useGameBilling();

  if (!subscription) {
    return null;
  }

  if (
    activePlan === Rivet.ee.billing.Plan.Trial &&
    plan === Rivet.ee.billing.Plan.Trial
  ) {
    return null;
  }

  if (activePlan === plan) {
    return (
      <SmallText>
        Renews on {format(subscription.periodEndTs, "MMMM do")}
      </SmallText>
    );
  }

  if (activePlan !== plan) {
    return (
      <SmallText>
        Downgrades from <GameBillingPlanLabel plan={activePlan} /> to{" "}
        <GameBillingPlanLabel plan={plan} /> on{" "}
        {format(subscription.periodEndTs, "MMMM do")}
      </SmallText>
    );
  }
}
