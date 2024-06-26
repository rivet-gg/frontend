import type { DialogContentProps } from "@/hooks/use-dialog";
import type { Rivet } from "@rivet-gg/api-ee";
import {
  Button,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Text,
} from "@rivet-gg/components";
import { useUpdateGameBillingMutation } from "../../queries";
import { GameBillingPlanLabel } from "../game-billing/game-billing-plan";

interface ContentProps extends DialogContentProps {
  plan: Rivet.ee.cloud.games.billing.Plan;
  gameId: string;
}

export default function ConfirmBillingPlanDialogContent({
  plan,
  gameId,
  onClose,
}: ContentProps) {
  const { mutate, isPending } = useUpdateGameBillingMutation({
    onSuccess: () => {
      onClose?.();
    },
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Confirm Billing Plan Change</DialogTitle>
      </DialogHeader>
      <Flex gap="4" direction="col">
        <Text>
          Are you sure you want to change your current plan to{" "}
          <GameBillingPlanLabel plan={plan} />?
        </Text>
      </Flex>
      <DialogFooter>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          isLoading={isPending}
          onClick={() => {
            mutate({ plan, gameId });
          }}
        >
          Confirm
        </Button>
      </DialogFooter>
    </>
  );
}
