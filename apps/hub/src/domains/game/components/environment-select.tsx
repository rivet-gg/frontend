import { gameEnvironmentsQueryOptions } from "@/domains/game/queries";
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

interface EnvironmentSelectProps extends ComponentProps<typeof Select> {
  gameId: string;
  showCreateEnvironment?: boolean;
  onCreateClick?: () => void;
}

export function EnvironmentSelect({
  showCreateEnvironment,
  onCreateClick,
  onValueChange,
  gameId,
  ...props
}: EnvironmentSelectProps) {
  const { data } = useSuspenseQuery(gameEnvironmentsQueryOptions(gameId));

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
        <SelectValue placeholder="Select environment..." />
      </SelectTrigger>
      <SelectContent>
        {showCreateEnvironment ? (
          <>
            <SelectItem value="create">
              <Flex gap="2" items="center">
                <Icon className="size-4" icon={faCirclePlus} />
                Create new environment
              </Flex>
            </SelectItem>
            <SelectSeparator />
          </>
        ) : null}
        {data.map((environment) => (
          <SelectItem
            key={environment.namespaceId}
            value={environment.namespaceId}
          >
            {environment.displayName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
