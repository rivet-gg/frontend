import { Rivet } from "@rivet-gg/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import type { ComponentProps } from "react";

interface ServerNetworkProtocolSelectProps
  extends ComponentProps<typeof Select> {
  onValueChange?(value: Rivet.servers.PortProtocol): void;
}

export function ServerNetworkProtocolSelect({
  ...props
}: ServerNetworkProtocolSelectProps) {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select port protocol..." />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(Rivet.servers.PortProtocol).map(([key, value]) => (
          <SelectItem key={key} value={value}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
