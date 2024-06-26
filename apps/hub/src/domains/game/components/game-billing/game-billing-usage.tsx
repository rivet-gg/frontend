import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  H2,
} from "@rivet-gg/components";
import { useGameBilling } from "./game-billing-context";
import { GameBillingUsageProgress } from "./game-billing-usage-progress";

export function GameBillingUsage() {
  const {
    activePlan,
    credits: { max, used, overage },
  } = useGameBilling();

  return (
    <>
      <H2 mt="8">Usage</H2>
      <Card>
        <CardHeader>
          <CardTitle>Dynamic Servers</CardTitle>
        </CardHeader>
        <CardContent>
          <GameBillingUsageProgress
            max={max}
            used={used}
            overage={overage}
            plan={activePlan}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Backend (Database)</CardTitle>
        </CardHeader>
        <CardContent>
          <GameBillingUsageProgress isFree plan={activePlan} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Backend (Modules)</CardTitle>
        </CardHeader>
        <CardContent>
          <GameBillingUsageProgress isFree plan={activePlan} />
        </CardContent>
      </Card>
    </>
  );
}
