import { faExclamationTriangle } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, AlertTitle, Button, Flex } from "@rivet-gg/components";
import { Link } from "@tanstack/react-router";
import { BILLING_PLANS_CREDITS_VISIBILITY } from "../../data/billing-calculate-usage";
import { useOptionalGameBilling } from "./game-billing-context";

export function GameBillingOverageWarning() {
  const billing = useOptionalGameBilling();

  if (!billing) {
    return null;
  }

  const {
    gameId,
    activePlan,
    credits: { overage },
  } = billing;

  if (overage <= 0 || !BILLING_PLANS_CREDITS_VISIBILITY.includes(activePlan)) {
    return null;
  }

  return (
    <Alert variant="destructive" className="animate-shake" mb="8">
      <FontAwesomeIcon className="size-4" icon={faExclamationTriangle} />
      <Flex justify="between" items="center">
        <AlertTitle className="leading-normal">
          You have exceeded your credit limit for this billing period.
          <br />
          Please upgrade your plan to avoid service interruption.
        </AlertTitle>
        <Button size="sm" variant="destructive" asChild>
          <Link to="/games/$gameId/billing" params={{ gameId }}>
            Manage Billing
          </Link>
        </Button>
      </Flex>
    </Alert>
  );
}
