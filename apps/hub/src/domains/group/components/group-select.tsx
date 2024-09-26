import { gamesQueryOptions } from "@/domains/game/queries";
import { GroupAvatar } from "@/domains/group/components/group-avatar";
import {
  Flex,
  Select,
  SelectContent,
  SelectItem,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@rivet-gg/components";
import { Icon, faCirclePlus } from "@rivet-gg/icons";
import { useSuspenseQuery } from "@tanstack/react-query";
import { type ComponentProps, useCallback } from "react";

interface GroupSelectProps extends ComponentProps<typeof Select> {
  showCreateGroup?: boolean;
  onCreateClick?: () => void;
}

export function GroupSelect({
  showCreateGroup,
  onCreateClick,
  onValueChange,
  ...props
}: GroupSelectProps) {
  const { data } = useSuspenseQuery(gamesQueryOptions());

  const handleValueChange = useCallback(
    (value: string) => {
      if (value === "create") {
        onCreateClick?.();
        return;
      }
      onValueChange?.(value);
    },
    [onCreateClick, onValueChange],
  );

  return (
    <Select {...props} onValueChange={handleValueChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select team..." />
      </SelectTrigger>
      <SelectContent>
        {showCreateGroup ? (
          <>
            <SelectItem value="create">
              <Flex gap="2" items="center">
                <Icon className="size-4" icon={faCirclePlus} />
                Create new team
              </Flex>
            </SelectItem>
            <SelectSeparator />
          </>
        ) : null}
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
