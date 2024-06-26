import { format } from "date-fns";
import { useGameBilling } from "./game-billing-context";

export function GameBillingPlanPeriod() {
  const { subscription } = useGameBilling();

  if (!subscription) {
    return null;
  }

  return (
    <p>
      Billing period: {format(subscription.periodStartTs, "MMMM do")} -{" "}
      {format(subscription.periodEndTs, "MMMM do")}
    </p>
  );
}
