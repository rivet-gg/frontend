import { UTCDate } from "@date-fns/utc";
import { faCoins } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rivet as RivetEe } from "@rivet-gg/api-ee";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  formatCurrency,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { endOfDay, startOfDay, startOfMonth } from "date-fns";
import {
  BILLING_PLANS_CREDITS_VISIBILITY,
  calculateUsedCredits,
} from "../../data/billing-calculate-usage";
import {
  gameBillingQueryOptions,
  groupBillingUsageQueryOptions,
} from "../../queries";

const today = endOfDay(new UTCDate());
const firstDayOfMonth = startOfDay(startOfMonth(today));

interface GameBillingCreditsProps {
  gameId: string;
  groupId: string;
}

export function GameBillingCredits({
  groupId,
  gameId,
}: GameBillingCreditsProps) {
  const {
    data: { plan },
  } = useSuspenseQuery(gameBillingQueryOptions(gameId));

  const { data } = useSuspenseQuery(
    groupBillingUsageQueryOptions({
      groupId,
      startTs: firstDayOfMonth,
      endTs: today,
    }),
  );

  if (!BILLING_PLANS_CREDITS_VISIBILITY.includes(plan)) {
    return null;
  }

  if (plan === RivetEe.ee.cloud.games.billing.Plan.Studio) {
    return null;
  }

  const gameUsage = data.games.find((game) => game.gameId === gameId);
  const credits = calculateUsedCredits({ usage: gameUsage, plan });

  if (credits < 1) {
    return (
      <Alert variant="destructive" className="animate-shake">
        <FontAwesomeIcon icon={faCoins} className="h-4 w-4" />
        <AlertTitle>Billing Credits</AlertTitle>
        <AlertDescription>
          Your billing credits are running low. You have{" "}
          {formatCurrency(credits)} remaining.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert>
      <FontAwesomeIcon icon={faCoins} className="h-4 w-4" />
      <AlertTitle>Billing Credits</AlertTitle>
      <AlertDescription>
        You have {formatCurrency(credits)} remaining.
      </AlertDescription>
    </Alert>
  );
}
