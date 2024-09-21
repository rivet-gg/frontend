import { Icon, faExternalLink } from "@rivet-gg/icons";
import { GameBillingHeader } from "./game-billing-header";
import { GameBillingPlanPeriod } from "./game-billing-plan-period";
import { GameBillingPlans } from "./game-billing-plans";
import { GameBillingPortalButton } from "./game-billing-portal-button";
import { GameBillingSummary } from "./game-billing-summary";
import { GameBillingUsage } from "./game-billing-usage";

interface GameBillingProps {
  gameId: string;
  groupId: string;
}
export function GameBilling({ gameId, groupId }: GameBillingProps) {
  return (
    <>
      <GameBillingHeader
        gameId={gameId}
        lead={<GameBillingPlanPeriod />}
        actions={
          <>
            <GameBillingPortalButton
              groupId={groupId}
              intent="general"
              variant="secondary"
              endIcon={<Icon icon={faExternalLink} />}
            >
              Invoices
            </GameBillingPortalButton>
            <GameBillingPortalButton
              groupId={groupId}
              intent="payment_method_update"
              variant="secondary"
              endIcon={<Icon icon={faExternalLink} />}
            >
              Payment Method
            </GameBillingPortalButton>
          </>
        }
      />
      <GameBillingSummary />
      <GameBillingPlans gameId={gameId} />
      <GameBillingUsage />
    </>
  );
}
