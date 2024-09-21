import { useDialog } from "@/hooks/use-dialog";
import { Rivet as RivetEe } from "@rivet-gg/api-ee";
import { Flex, Grid, H2, WithTooltip } from "@rivet-gg/components";
import {
  Icon,
  faBug,
  faChartMixed,
  faClockRotateLeft,
  faCoins,
  faComputerClassic,
  faEarthAmericas,
  faInfoCircle,
  faLockA,
  faMemoPad,
  faNetworkWired,
  faPhoneVolume,
  faServer,
  faShield,
  faUpRightAndDownLeftFromCenter,
} from "@rivet-gg/icons";
import { PRICE_MAP } from "../../data/billing-calculate-usage";
import {
  LobbyRegionIcon,
  LobbyRegionName,
} from "../game-matchmaker/lobby-region";
import { useGameBilling } from "./game-billing-context";
import { GameBillingPlanCard } from "./game-billing-plan-card";
import { GameBillingPlanStatus } from "./game-billing-plan-status";

interface GameBillingPlansProps {
  gameId: string;
}

export function GameBillingPlans({ gameId }: GameBillingPlansProps) {
  const { dialog, open } = useDialog.ConfirmBillingPlan({ gameId });

  const { plan } = useGameBilling();

  return (
    <>
      <Flex direction="col" mt="8" gap="2">
        <H2>Plan</H2>
        <GameBillingPlanStatus />
      </Flex>
      {dialog}
      <Grid columns={{ initial: "1", xl: "3" }} gap="4">
        <GameBillingPlanCard
          title="Indie"
          lead="Fixed price suitable for indies & hobbyists"
          price={`$${PRICE_MAP[RivetEe.ee.billing.Plan.Indie]}`}
          onSubscribe={() =>
            open({
              plan: RivetEe.ee.billing.Plan.Indie,
            })
          }
          onCancel={() =>
            open({
              plan: RivetEe.ee.billing.Plan.Trial,
            })
          }
          type={plan === RivetEe.ee.billing.Plan.Indie ? "active" : undefined}
          features={[
            {
              name: "Run up to 6 flex servers ($48.21 in credits)",
              icon: faCoins,
            },
            {
              key: "region-support",
              name: (
                <>
                  <div>
                    Supports{" "}
                    <WithTooltip
                      trigger={
                        <span>
                          3 regions{" "}
                          <Icon icon={faInfoCircle} className="size-3 mb-0.5" />
                        </span>
                      }
                      content={["fra", "lax", "osa"].map((regionNameId) => {
                        return (
                          <Flex gap="2" key={regionNameId} items="center">
                            <LobbyRegionIcon
                              className="w-3"
                              regionNameId={regionNameId}
                            />
                            <LobbyRegionName regionNameId={regionNameId} />
                          </Flex>
                        );
                      })}
                    />
                  </div>
                </>
              ),
              icon: faServer,
            },
            { name: "DDoS Mitigation", icon: faShield },
            { name: "Log & metrics aggregation", icon: faMemoPad },
            {
              name: "No downtime deploys & rollbacks",
              icon: faClockRotateLeft,
            },
            { name: "Automatic SSL for WebSockets & TLS", icon: faLockA },
            { name: "Crash Reporting", icon: faBug },
            { name: "Analytics", icon: faChartMixed },
            { name: "Automatic geographic routing", icon: faEarthAmericas },
          ]}
        />
        <GameBillingPlanCard
          title="Studio"
          lead="Suitable for most games that need to scale"
          onSubscribe={() =>
            open({
              plan: RivetEe.ee.billing.Plan.Studio,
            })
          }
          onCancel={() =>
            open({
              plan: RivetEe.ee.billing.Plan.Trial,
            })
          }
          price={`$${PRICE_MAP[RivetEe.ee.billing.Plan.Studio]}`}
          type={plan === RivetEe.ee.billing.Plan.Studio ? "active" : undefined}
          priceLead="+ Resource Usage"
          features={[
            {
              name: "Everything in the Indie Plan and:",
            },
            {
              name: "$29 in usage credits",
              icon: faCoins,
            },
            {
              name: (
                <>
                  <div>
                    Supports{" "}
                    <WithTooltip
                      trigger={
                        <span>
                          8 regions{" "}
                          <Icon icon={faInfoCircle} className="size-3 mb-0.5" />
                        </span>
                      }
                      content={[
                        "atl",
                        "bom",
                        "fra",
                        "gru",
                        "lax",
                        "osa",
                        "sin",
                        "syd",
                      ].map((regionNameId) => {
                        return (
                          <Flex gap="2" key={regionNameId} items="center">
                            <LobbyRegionIcon
                              className="w-3"
                              regionNameId={regionNameId}
                            />
                            <LobbyRegionName regionNameId={regionNameId} />
                          </Flex>
                        );
                      })}
                    />
                  </div>
                </>
              ),
              icon: faServer,
            },
            {
              name: "No resource scaling limits",
              icon: faUpRightAndDownLeftFromCenter,
            },
          ]}
        />
        <GameBillingPlanCard
          title="Enterprise"
          lead="Large games & complex projects"
          price="Custom pricing"
          features={[
            {
              name: "Everything in the Studio Plan and:",
            },
            {
              name: "Self host your own servers",
              icon: faNetworkWired,
            },
            {
              name: "Bring your own hardware",
              icon: faComputerClassic,
            },
            {
              name: "Enterprise support",
              icon: faPhoneVolume,
            },
          ]}
          type="custom"
        />
      </Grid>
    </>
  );
}
