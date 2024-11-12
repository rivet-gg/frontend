import type { Rivet as RivetEe } from "@rivet-gg/api-ee";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type ReactNode, createContext, useContext } from "react";

import { clusterQueryOptions } from "@/domains/auth/queries/bootstrap";
import { startOfMonth } from "date-fns";
import { calculateUsedCredits } from "../../data/billing-calculate-usage";
import {
  gameBillingQueryOptions,
  gameBillingUsageQueryOptions,
} from "../../queries";

interface GameBillingContextValue {
  gameId: string;
  activePlan: RivetEe.ee.billing.Plan;
  plan: RivetEe.ee.billing.Plan;
  credits: {
    max: number;
    used: number;
    overage: number;
    remaining: number;
    total: number;
  };
  subscription: RivetEe.ee.billing.Subscription | undefined;
}

export const GameBillingContext = createContext<
  GameBillingContextValue | undefined
>(undefined);

interface BillingSubscriptionProviderProps {
  gameId: string;
  groupId: string;
  subscription: RivetEe.ee.billing.Subscription | undefined;
  plan: RivetEe.ee.billing.Plan;
  activePlan: RivetEe.ee.billing.Plan;
  children?: ReactNode;
}

const today = new Date();
const firstDayOfMonth = startOfMonth(today);

function BillingSubscriptionProvider({
  gameId,
  subscription,
  plan,
  activePlan,
  groupId,
  children,
}: BillingSubscriptionProviderProps) {
  const { data: usage } = useSuspenseQuery(
    gameBillingUsageQueryOptions({
      gameId,
      groupId,
      startTs: subscription?.periodStartTs || firstDayOfMonth,
      endTs: subscription?.periodEndTs || today,
    }),
  );

  const credits = calculateUsedCredits({ usage, plan: activePlan });

  return (
    <GameBillingContext.Provider
      value={{ gameId, plan, credits, subscription, activePlan }}
    >
      {children}
    </GameBillingContext.Provider>
  );
}

interface GameBillingProviderProps {
  gameId: string;
  groupId: string;
  children?: ReactNode;
}
function Content({ gameId, groupId, children }: GameBillingProviderProps) {
  const { data } = useSuspenseQuery(gameBillingQueryOptions(gameId));

  if (data) {
    return (
      <BillingSubscriptionProvider
        groupId={groupId}
        gameId={gameId}
        subscription={data.subscription}
        {...data}
      >
        {children}
      </BillingSubscriptionProvider>
    );
  }
  return children;
}

export const GameBillingProvider = ({
  gameId,
  groupId,
  children,
}: GameBillingProviderProps) => {
  const { data } = useSuspenseQuery(clusterQueryOptions());

  if (data === "oss") {
    return children;
  }

  return (
    <Content gameId={gameId} groupId={groupId}>
      {children}
    </Content>
  );
};

export const useGameBilling = () => {
  const context = useContext(GameBillingContext);
  if (!context) {
    throw new Error("useGameBilling must be used within a GameBillingProvider");
  }
  return context;
};

export const useOptionalGameBilling = () => {
  return useContext(GameBillingContext);
};
