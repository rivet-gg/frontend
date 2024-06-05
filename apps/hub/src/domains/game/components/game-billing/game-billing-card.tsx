import { faArrowUpFromSquare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionCard, Link, Separator } from "@rivet-gg/components";
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
          endIcon={<FontAwesomeIcon icon={faArrowUpFromSquare} />}
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
