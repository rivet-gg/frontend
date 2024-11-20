import { regionsQueryOptions } from "@/domains/project/queries";
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
import { ServerDatacenter } from "./server-datacenter";

interface ServerDatacenterSelectProps extends ComponentProps<typeof Select> {
  projectId: string;
  environmentId: string;
}

export function ServerDatacenterSelect({
  projectId,
  environmentId,
  ...props
}: ServerDatacenterSelectProps) {
  const { data } = useSuspenseQuery(
    regionsQueryOptions({ projectId, environmentId }),
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
              <ServerDatacenter
                showLabel
                projectId={projectId}
                environmentId={environmentId}
                regionId={datacenter.id}
              />
            </Flex>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
