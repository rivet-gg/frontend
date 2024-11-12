import { projectBuildsQueryOptions } from "@/domains/project/queries";
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
import { ServerTags } from "./server-tags";

interface ServerBuildSelectProps extends ComponentProps<typeof Select> {
  projectId: string;
  environmentId: string;
}

export function ServerBuildSelect({
  projectId,
  environmentId,
  ...props
}: ServerBuildSelectProps) {
  const { data } = useSuspenseQuery(
    projectBuildsQueryOptions({ projectId, environmentId }),
  );

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select build..." />
      </SelectTrigger>
      <SelectContent>
        {data.length === 0 ? (
          <SelectItem value="invalid" disabled>
            No builds available
          </SelectItem>
        ) : null}
        {data.map((build) => (
          <SelectItem key={build.id} value={build.id}>
            <Flex gap="2" items="center">
              {build.name}
              <ServerTags tags={build.tags} />
            </Flex>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
