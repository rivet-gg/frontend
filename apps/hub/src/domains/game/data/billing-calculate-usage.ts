import { Rivet as RivetEe } from "@rivet-gg/api-ee";
import { millisecondsToMonths } from "@rivet-gg/components";

const CREIDTS_MAP = {
  [RivetEe.ee.cloud.games.billing.Plan.Trial]: 5.0,
  [RivetEe.ee.cloud.games.billing.Plan.Indie]: 48.21,
  [RivetEe.ee.cloud.games.billing.Plan.Studio]: 29.0,
};
export const BILLING_PLANS_CREDITS_VISIBILITY: RivetEe.ee.cloud.games.billing.Plan[] =
  [
    RivetEe.ee.cloud.games.billing.Plan.Indie,
    RivetEe.ee.cloud.games.billing.Plan.Trial,
  ];

const FACTOR = 16.07;

export function calculateUsedCredits({
  usage,
  plan,
}: {
  usage: RivetEe.ee.billing.GameUsage | undefined;
  plan: RivetEe.ee.cloud.games.billing.Plan;
}) {
  const totalUptime =
    usage?.regions.reduce((acc, region) => acc + region.uptime, 0) ?? 0;
  const monthsOfUptime = millisecondsToMonths(totalUptime);
  const usedCredits = monthsOfUptime * FACTOR;
  return CREIDTS_MAP[plan] - usedCredits;
}
