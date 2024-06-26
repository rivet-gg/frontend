import { AnimatedCurrency, Grid, ValueCard } from "@rivet-gg/components";
import { useGameBilling } from "./game-billing-context";

export function GameBillingSummary() {
  const {
    credits: { overage, remaining },
  } = useGameBilling();

  return (
    <Grid columns={{ initial: "1", md: "3" }} gap="4">
      <ValueCard
        title="Current bill total"
        value={<AnimatedCurrency value={overage} />}
      />
      <ValueCard
        title="Credits remaining"
        value={<AnimatedCurrency value={remaining} />}
      />
    </Grid>
  );
}
