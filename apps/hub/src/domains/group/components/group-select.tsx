import { gamesQueryOptions } from "@/domains/game/queries";
import { GroupAvatar } from "@/domains/group/components/group-avatar";
import {
  Flex,
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ComponentProps } from "react";

interface GroupSelectProps extends ComponentProps<typeof Select> {}

export function GroupSelect(props: GroupSelectProps) {
  const { data } = useSuspenseQuery(gamesQueryOptions());

  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Select team..." />
      </SelectTrigger>
      <SelectContent>
        {data.map((group) => (
          <SelectItem key={group.groupId} value={group.groupId}>
            <Flex gap="2" items="center">
              <GroupAvatar
                className="size-5"
                displayName={group.displayName}
                avatarUrl={group.avatarUrl}
              />
              {group.displayName}
            </Flex>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
