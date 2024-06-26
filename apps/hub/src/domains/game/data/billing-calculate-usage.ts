import { Rivet as RivetEe } from "@rivet-gg/api-ee";
import { millisecondsToMonths } from "@rivet-gg/components";

const CREIDTS_MAP = {
  [RivetEe.ee.billing.Plan.Trial]: 5.0,
  [RivetEe.ee.billing.Plan.Indie]: 48.21,
  [RivetEe.ee.billing.Plan.Studio]: 29.0,
};
export const BILLING_PLANS_CREDITS_VISIBILITY: RivetEe.ee.billing.Plan[] = [
  RivetEe.ee.billing.Plan.Indie,
  RivetEe.ee.billing.Plan.Trial,
];

const FACTOR = 16.07;

export function calculateUsedCredits({
  usage,
  plan,
}: {
  usage: RivetEe.ee.billing.GameUsage | undefined;
  plan: RivetEe.ee.billing.Plan;
}) {
  const totalUptime =
    usage?.regions.reduce((acc, region) => acc + region.uptime, 0) ?? 0;
  const monthsOfUptime = millisecondsToMonths(totalUptime);
  const usedCredits = monthsOfUptime * FACTOR;

  return {
    max: CREIDTS_MAP[plan],
    used: usedCredits,
    remaining: CREIDTS_MAP[plan] - usedCredits,
    overage: Math.max(0, usedCredits - CREIDTS_MAP[plan]),
  };
}
