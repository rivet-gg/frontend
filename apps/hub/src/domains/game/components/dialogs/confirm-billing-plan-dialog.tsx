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

interface ContentProps extends DialogContentProps {
  plan: Rivet.ee.cloud.games.billing.PlanConfig;
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
        <DialogTitle>Confirm Purchase</DialogTitle>
      </DialogHeader>
      <Flex gap="4" direction="col">
        <Text>
          If you are downgrading the server amount it will reflect the next
          billing cycle or new servers will be billed immediately at the
          prorated amount.
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
          Purchase
        </Button>
      </DialogFooter>
    </>
  );
}
