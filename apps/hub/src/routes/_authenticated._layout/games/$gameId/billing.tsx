import { createFileRoute } from "@tanstack/react-router";
import {
  Button,
  ExternalCard,
  Flex,
  Grid,
  Link,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@rivet-gg/components";

import * as GameBillingForm from "@/domains/game/forms/game-billing-form";
import { useSuspenseQueries, useSuspenseQuery } from "@tanstack/react-query";
import { groupBillingQueryOptions } from "@/domains/group/queries";
import {
  gameBillingQueryOptions,
  gameQueryOptions,
} from "@/domains/game/queries";
import { LobbyRegion } from "@/domains/game/components/lobby-region";
import { Rivet as RivetEE } from "@rivet-gg/api-ee";
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

function GameBillingRoute() {
  const { gameId } = Route.useParams();
  const {
    data: {
      game: { developerGroupId, availableRegions },
    },
  } = useSuspenseQuery(gameQueryOptions(gameId));

  const [{ data: groupBilling }, { data: gameBilling }] = useSuspenseQueries({
    queries: [
      groupBillingQueryOptions(developerGroupId),
      gameBillingQueryOptions(gameId),
    ],
  });

  const { open, dialog } = useDialog.ConfirmBillingPlan({ gameId });

  return (
    <>
      {dialog}
      <GameBillingForm.Form
        onSubmit={async (values) => {
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
        }}
        defaultValues={{
          hardwareTier:
            findHardwareTier(
              findTheLargestCoreAmount(gameBilling.plan.dynamicServersCapacity)
                .cores,
            )?.value ?? "1/8",
          capacity: availableRegions.map((region) => {
            const capacity = gameBilling.plan.dynamicServersCapacity.find(
              (capacity) => capacity.region.regionId === region.regionId,
            );
            return {
              universalRegion: region.universalRegion,
              regionId: region.regionId,
              cores: capacity?.cores ?? 0,
            };
          }),
        }}
      >
        <ExternalCard
          label="Manage"
          title="Billing"
          href="https://google.com"
          description={
            <>
              For questions about billing, please contact{" "}
              <Link href="mailto:billing@rivet.gg">billing@rivet.gg</Link>
            </>
          }
          footer={
            <Flex gap="4">
              <GameBillingForm.Reset variant="secondary">
                Cancel
              </GameBillingForm.Reset>
              <GameBillingForm.Submit>Apply</GameBillingForm.Submit>
            </Flex>
          }
        >
          <Separator />
          <Flex gap="4" my="4" items="center" justify="between">
            <Text>Manage servers</Text>
            <Link href="https://rivet.gg/docs/dynamic-servers/concepts/available-tiers">
              Learn more about pricing & dedicated hardware specs
            </Link>
          </Flex>
          <Grid columns="4" my="4">
            <GameBillingForm.HardwareTier />
          </Grid>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead w="full">Region</TableHead>
                <TableHead minW="60">Hardware amount</TableHead>
                <TableHead minW="60" textAlign="right">
                  Price
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <GameBillingForm.CapacityValue>
                {(capacity) =>
                  capacity.map(({ regionId }, index) => {
                    const region = availableRegions.find(
                      (region) => region.regionId === regionId,
                    );
                    return (
                      <TableRow key={regionId}>
                        <TableCell>
                          <LobbyRegion
                            showLabel
                            region={region?.universalRegion ?? "unknown"}
                          />
                        </TableCell>
                        <TableCell>
                          <Flex items="center" gap="4">
                            <GameBillingForm.Capacity
                              index={index}
                              regionId={regionId}
                            />
                            &times; <GameBillingForm.HardwareTierValueLabel />
                          </Flex>
                        </TableCell>
                        <TableCell textAlign="right">
                          <GameBillingForm.RegionTotalPrice index={index} />
                        </TableCell>
                      </TableRow>
                    );
                  })
                }
              </GameBillingForm.CapacityValue>
            </TableBody>

            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Monthly Server Total</TableCell>
                <TableCell textAlign="right">
                  <GameBillingForm.TotalPrice />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </ExternalCard>
      </GameBillingForm.Form>
    </>
  );
}

export const Route = createFileRoute(
  "/_authenticated/_layout/games/$gameId/billing",
)({
  component: GameBillingRoute,
});
