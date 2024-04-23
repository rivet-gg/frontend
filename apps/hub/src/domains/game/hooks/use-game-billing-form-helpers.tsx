import { Rivet as RivetEE } from "@rivet-gg/api-ee";
import * as GameBillingForm from "@/domains/game/forms/game-billing-form";
import { useCallback } from "react";
import { useDialog } from "@/hooks/use-dialog";

const findTheLargestCoreAmount = (
  capacity: RivetEE.ee.cloud.games.billing.DynamicServersCapacityRegion[] = [],
) => {
  return capacity.reduce((acc, curr) => {
    return curr.cores > acc.cores ? curr : acc;
  });
};

const findHardwareTier = (cores: number) => {
  for (const tier of [...GameBillingForm.hardwareTierValues].reverse()) {
    if (cores % tier.multiplier === 0) {
      return tier;
    }
  }
};

interface UseGameBillingFormHelpersProps {
  gameId: string;
  plan: RivetEE.ee.cloud.games.billing.Plan;
  availableRegions: RivetEE.cloud.RegionSummary[];
}

export function useGameBillingFormHelpers({
  plan,
  gameId,
  availableRegions,
}: UseGameBillingFormHelpersProps) {
  const { open, dialog } = useDialog.ConfirmBillingPlan({ gameId });
  const defaultValues = {
    hardwareTier:
      findHardwareTier(
        findTheLargestCoreAmount(plan.dynamicServersCapacity).cores,
      )?.value ?? "1/8",

    capacity: availableRegions.map((region) => {
      const capacity = plan.dynamicServersCapacity.find(
        (capacity) => capacity.region.regionId === region.regionId,
      );
      return {
        universalRegion: region.universalRegion,
        regionId: region.regionId,
        cores: capacity?.cores ?? 0,
      };
    }),
  };

  const onSubmit = useCallback<GameBillingForm.SubmitHandler>(
    async (values) => {
      const hardwareTier = GameBillingForm.hardwareTierValues.find(
        (tier) => tier.value === values.hardwareTier,
      );
      open({
        plan: {
          dynamicServersCapacity: values.capacity.map(
            ({ regionId, cores }) => ({
              regionId,
              cores: cores * (hardwareTier?.multiplier ?? 1),
            }),
          ),
        },
      });
    },
    [open],
  );

  return {
    onSubmit,
    defaultValues,
    dialog,
  };
}
