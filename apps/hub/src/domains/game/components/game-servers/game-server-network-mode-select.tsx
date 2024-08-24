import { Rivet } from "@rivet-gg/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import type { ComponentProps } from "react";

interface GameServerNetworkModeSelectProps
  extends ComponentProps<typeof Select> {
  onValueChange?(value: Rivet.servers.NetworkMode): void;
}

export function GameServerNetworkModeSelect({
  ...props
}: GameServerNetworkModeSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select network mode..." />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(Rivet.servers.NetworkMode).map(([key, value]) => (
          <SelectItem key={key} value={value}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
