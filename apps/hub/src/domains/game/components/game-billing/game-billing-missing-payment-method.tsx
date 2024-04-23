import {
  Alert,
  AlertDescription,
  AlertTitle,
  Flex,
} from "@rivet-gg/components";
import { CreditCard } from "lucide-react";
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
        <CreditCard className="h-4 w-4" />
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
