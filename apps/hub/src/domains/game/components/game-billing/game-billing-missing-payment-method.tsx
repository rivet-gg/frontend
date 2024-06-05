import { faCreditCard } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Flex,
} from "@rivet-gg/components";
import { GameBillingCard } from "./game-billing-card";
import { GameBillingPortalButton } from "./game-billing-portal-button";

interface GameBillingMissingPaymentMethodProps {
  groupId: string;
}

export function GameBillingMissingPaymentMethod({
  groupId,
}: GameBillingMissingPaymentMethodProps) {
  return (
    <GameBillingCard groupId={groupId}>
      <Alert>
        <FontAwesomeIcon className="size-4" icon={faCreditCard} />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          <Flex direction="col" items="start" gap="4">
            You must add a payment method before you can add servers to your
            project.
            <GameBillingPortalButton
              intent="payment_method_update"
              groupId={groupId}
            >
              Add payment method
            </GameBillingPortalButton>
          </Flex>
        </AlertDescription>
      </Alert>
    </GameBillingCard>
  );
}
