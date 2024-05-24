import { Button, type ButtonProps } from "@rivet-gg/components";
import { useCreateBillingPortalSessionMutation } from "../../queries";

interface GameBillingPortalButtonProps extends ButtonProps {
  groupId: string;
  intent: "general" | "payment_method_update";
}

export function GameBillingPortalButton({
  groupId,
  intent,
  ...props
}: GameBillingPortalButtonProps) {
  const { mutate, isPending } = useCreateBillingPortalSessionMutation();
  return (
    <Button
      type="button"
      {...props}
      isLoading={isPending}
      onClick={() => mutate({ groupId, intent })}
    />
  );
}
