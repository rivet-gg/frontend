import * as GameBillingForm from "@/domains/game/forms/game-billing-form";
import {
  Flex,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQueries } from "@tanstack/react-query";
import { useGameBillingFormHelpers } from "../../hooks/use-game-billing-form-helpers";
import { gameBillingQueryOptions, gameQueryOptions } from "../../queries";
import { LobbyRegion } from "../lobby-region";
import { GameBillingCard } from "./game-billing-card";

interface GameBillingProps {
  gameId: string;
}
export function GameBilling({ gameId }: GameBillingProps) {
  const [
    {
      data: { plan },
    },
    {
      data: { developerGroupId, availableRegions },
    },
  ] = useSuspenseQueries({
    queries: [gameBillingQueryOptions(gameId), gameQueryOptions(gameId)],
  });

  const { dialog, onSubmit, defaultValues } = useGameBillingFormHelpers({
    plan,
    gameId,
    availableRegions,
  });

  return (
    <GameBillingForm.Form onSubmit={onSubmit} defaultValues={defaultValues}>
      <GameBillingForm.HardwareMultiplier />
      <GameBillingCard
        groupId={developerGroupId}
        footer={
          <Flex gap="4">
            <GameBillingForm.Submit>Apply</GameBillingForm.Submit>
            <GameBillingForm.Reset variant="secondary">
              Reset
            </GameBillingForm.Reset>
          </Flex>
        }
      >
        {dialog}
        <Flex gap="4" items="center" justify="between">
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
                  return (
                    <TableRow key={regionId}>
                      <TableCell>
                        <LobbyRegion
                          showLabel
                          gameId={gameId}
                          regionId={regionId}
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
      </GameBillingCard>
    </GameBillingForm.Form>
  );
}
