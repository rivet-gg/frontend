import { ActionCard, Link, Separator } from "@rivet-gg/components";
import { ExternalLink } from "lucide-react";
import type { ReactNode } from "react";
import { GameBillingPortalButton } from "./game-billing-portal-button";

interface GameBillingCardProps {
  groupId: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function GameBillingCard({
  children,
  footer,
  groupId,
}: GameBillingCardProps) {
  return (
    <ActionCard
      title="Billing"
      action={
        <GameBillingPortalButton
          groupId={groupId}
          intent="general"
          variant="secondary"
          endIcon={<ExternalLink />}
        >
          Manage billing
        </GameBillingPortalButton>
      }
      footer={footer}
      description={
        <>
          For questions about billing, please contact{" "}
          <Link href="mailto:billing@rivet.gg">billing@rivet.gg</Link>
        </>
      }
    >
      <Separator mb="4" />
      {children}
    </ActionCard>
  );
}
