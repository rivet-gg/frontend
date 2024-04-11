import { groupOnwerQueryOptions } from "@/domains/game/queries";
import { selfProfileIdentityIdQueryOptions } from "@/domains/user/queries";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  Button,
  DropdownMenuContent,
  DropdownMenuItem,
  Dialog,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";

interface GroupMemberSettingsMenuProps {
  identityId: string;
  groupId: string;

  onTransferOwnership?: (data: {
    groupId: string;
    memberIdentityId: string;
  }) => void;
  onBan?: () => void;
}

export function GroupMemberSettingsMenu({
  groupId,
  identityId,
  onTransferOwnership,
  onBan,
}: GroupMemberSettingsMenuProps) {
  const { data: selfProfileIdentityId } = useSuspenseQuery(
    selfProfileIdentityIdQueryOptions(),
  );
  const { data: groupOwnerIdentityId } = useSuspenseQuery(
    groupOnwerQueryOptions(groupId),
  );
  if (
    selfProfileIdentityId !== groupOwnerIdentityId ||
    groupOwnerIdentityId === identityId
  ) {
    return null;
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline">
          <MoreVertical className="h-3.5 w-3.5" />
          <span className="sr-only">More</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {groupOwnerIdentityId !== identityId ? (
          <DropdownMenuItem
            onSelect={() =>
              onTransferOwnership?.({ groupId, memberIdentityId: identityId })
            }
          >
            Transfer ownership
          </DropdownMenuItem>
        ) : null}
        <DropdownMenuItem onSelect={onBan}>Ban</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
