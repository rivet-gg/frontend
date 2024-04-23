import { useSuspenseQuery } from "@tanstack/react-query";
import { groupBillingQueryOptions } from "@/domains/group/queries";
import { gameQueryOptions } from "@/domains/game/queries";
import { GameBillingMissingPaymentMethod } from "../components/game-billing/game-billing-missing-payment-method";
import { GameBilling } from "../components/game-billing/game-billing";

interface GameBillingViewProps {
  gameId: string;
}

export function GameBillingView({ gameId }: GameBillingViewProps) {
  const {
    data: {
      game: { developerGroupId },
    },
  } = useSuspenseQuery(gameQueryOptions(gameId));

  const { data: groupBilling } = useSuspenseQuery(
    groupBillingQueryOptions(developerGroupId),
  );

  if (!groupBilling.group.paymentMethodAttachedTs) {
    return <GameBillingMissingPaymentMethod groupId={developerGroupId} />;
  }

  return <GameBilling gameId={gameId} />;
}
