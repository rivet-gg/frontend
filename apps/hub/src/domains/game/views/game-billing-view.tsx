import { gameQueryOptions } from "@/domains/game/queries";
import { groupBillingQueryOptions } from "@/domains/group/queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { GameBilling } from "../components/game-billing/game-billing";
import { GameBillingMissingPaymentMethod } from "../components/game-billing/game-billing-missing-payment-method";

interface GameBillingViewProps {
  gameId: string;
}

export function GameBillingView({ gameId }: GameBillingViewProps) {
  const {
    data: { developerGroupId },
  } = useSuspenseQuery(gameQueryOptions(gameId));

  const { data: groupBilling } = useSuspenseQuery(
    groupBillingQueryOptions(developerGroupId),
  );

  if (!groupBilling.group.paymentMethodAttachedTs) {
    return <GameBillingMissingPaymentMethod groupId={developerGroupId} />;
  }

  return <GameBilling gameId={gameId} />;
}
