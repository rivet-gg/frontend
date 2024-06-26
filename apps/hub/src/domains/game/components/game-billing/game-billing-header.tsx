import { Flex, H1 } from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { gameQueryOptions } from "../../queries";

interface GameBillingHeaderProps {
  gameId: string;
  lead?: ReactNode;
  actions?: ReactNode;
}

export function GameBillingHeader({
  gameId,
  actions,
  lead,
}: GameBillingHeaderProps) {
  const {
    data: { displayName },
  } = useSuspenseQuery(gameQueryOptions(gameId));

  return (
    <Flex direction={{ initial: "col", md: "row" }} gap="4" justify="between">
      <Flex direction="col" gap="2">
        <H1>{displayName} Billing</H1>
        {lead}
      </Flex>
      {actions ? <Flex gap="2">{actions}</Flex> : null}
    </Flex>
  );
}
