import { faArrowUpRightFromSquare } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ActionCard, Link, Separator } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { gameQueryOptions } from "../../queries";
import { GameBillingPortalButton } from "./game-billing-portal-button";

interface GameBillingCardProps {
  gameId: string;
  children?: ReactNode;
}

export function GameBillingCard({ children, gameId }: GameBillingCardProps) {
  const {
    data: { displayName, developerGroupId },
  } = useSuspenseQuery(gameQueryOptions(gameId));
  return (
    <ActionCard
      title={`${displayName} Billing`}
      action={
        <GameBillingPortalButton
          groupId={developerGroupId}
          intent="general"
          variant="secondary"
          endIcon={<FontAwesomeIcon icon={faArrowUpRightFromSquare} />}
        >
          Manage payment method
        </GameBillingPortalButton>
      }
      description={
        <>
          For questions about billing, please contact{" "}
          <Link href="mailto:billing@rivet.gg">billing@rivet.gg</Link>
        </>
      }
    >
      {children ? (
        <>
          <Separator mb="4" />
          {children}
        </>
      ) : null}
    </ActionCard>
  );
}
