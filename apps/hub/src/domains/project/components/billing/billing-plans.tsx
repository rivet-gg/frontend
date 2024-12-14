import { useDialog } from "@/hooks/use-dialog";
import { Rivet as RivetEe } from "@rivet-gg/api-ee";
import { Flex, Grid, H2, Link } from "@rivet-gg/components";
import {
  faBadgeCheck,
  faChartMixed,
  faComments,
  faComputerClassic,
  faEnvelope,
  faGift,
  faHeadset,
  faInfinity,
  faLockA,
  faServer,
  faShareFromSquare,
  faShield,
} from "@rivet-gg/icons";
import { PRICE_MAP } from "../../data/billing-calculate-usage";
import { useBilling } from "./billing-context";
import { BillingPlanCard } from "./billing-plan-card";
import { BillingPlanStatus } from "./billing-plan-status";

interface BillingPlansProps {
  projectId: string;
}

export function BillingPlans({ projectId }: BillingPlansProps) {
  const { dialog, open } = useDialog.ConfirmBillingPlan({ projectId });

  const { plan } = useBilling();

  return (
    <>
      <Flex direction="col" mt="8" gap="2">
        <H2>Plan</H2>
        <BillingPlanStatus />
      </Flex>
      {dialog}
      <Grid columns={{ initial: "1", xl: "4" }} gap="4">
        <BillingPlanCard
          title="Community"
          price={`$${PRICE_MAP[RivetEe.ee.billing.Plan.Trial]}`}
          onSubscribe={() =>
            open({
              plan: RivetEe.ee.billing.Plan.Trial,
            })
          }
          type={plan === RivetEe.ee.billing.Plan.Trial ? "active" : undefined}
          features={[
            {
              name: "50,000 Free Actors",
              icon: faGift,
            },
            { name: "DDoS Mitigation", icon: faShield },
            { name: "Automatic SSL", icon: faLockA },
            { name: "Community Support", icon: faComments },
          ]}
        />
        <BillingPlanCard
          title="Pro"
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
          price={`$${PRICE_MAP[RivetEe.ee.billing.Plan.Indie]}`}
          type={plan === RivetEe.ee.billing.Plan.Indie ? "active" : undefined}
          priceLead="+ Actor Usage"
          features={[
            {
              name: "200,000 Free Actors",
              icon: faGift,
            },
            { name: "Analytics", icon: faChartMixed },
            { name: "Email Support", icon: faEnvelope },
            { name: "Share Features", icon: faShareFromSquare },
          ]}
        />
        <BillingPlanCard
          title="Team"
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
          priceLead="+ Actor Usage"
          features={[
            {
              name: "AWS + G Cloud + Azure",
              icon: faServer,
            },
            { name: "Analytics", icon: faChartMixed },
            { name: "Advanced Support", icon: faHeadset },
            { name: "Share Features", icon: faShareFromSquare },
          ]}
        />
        <BillingPlanCard
          title="Enterprise"
          price="Custom"
          features={[
            {
              name: "Unlimited Projects",
              icon: faInfinity,
            },
            {
              name: "Priority Support",
              icon: faHeadset,
            },
            {
              name: "99.99% SLA",
              icon: faBadgeCheck,
            },
            {
              name: "OIDC SSO Provider",
              icon: faLockA,
            },
            {
              name: "Dedicated Hardware",
              icon: faComputerClassic,
            },
          ]}
          type="custom"
        />
      </Grid>

      <p className="text-center my-4">
        Read more about our plans and see comparison table on our{" "}
        <Link href="https://rivet.gg/pricing" target="_blank" rel="noreferrer">
          pricing page
        </Link>
        .
      </p>
    </>
  );
}
