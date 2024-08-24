import { dataCentersQueryOptions } from "@/domains/game/queries";
import {
  Flex,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { ComponentProps } from "react";
import { GameServerDatacenter } from "./game-server-datacenter";

interface GameServerDatacenterSelectProps
  extends ComponentProps<typeof Select> {
  gameId: string;
  environmentId: string;
}

export function GameServerDatacenterSelect({
  gameId,
  environmentId,
  ...props
}: GameServerDatacenterSelectProps) {
  const { data } = useSuspenseQuery(
    dataCentersQueryOptions({ gameId, environmentId }),
  );

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select datacenter..." />
      </SelectTrigger>
      <SelectContent>
        {data.map((datacenter) => (
          <SelectItem key={datacenter.id} value={datacenter.id}>
            <Flex gap="2" items="center">
              <GameServerDatacenter
                showLabel
                gameId={gameId}
                environmentId={environmentId}
                datacenterId={datacenter.id}
              />
            </Flex>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
