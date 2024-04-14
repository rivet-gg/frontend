import {
  Button,
  Code,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogTitle,
  Strong,
  Text,
} from "@rivet-gg/components";
import {
  groupMemberQueryOptions,
  useGroupKickMemberMutation,
} from "../../queries";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { groupGamesQueryOptions } from "@/domains/game/queries";
import { Suspense } from "react";
import { DialogActivityIndicator } from "@/components/dialog-activity-indicator";

interface ContentProps {
  groupId: string;
  identityId: string;
  onSuccess?: () => void;
}

function Content({ groupId, identityId, onSuccess }: ContentProps) {
  const { data: group } = useSuspenseQuery(groupGamesQueryOptions(groupId));
  const { data: groupMember } = useQuery(
    groupMemberQueryOptions({ identityId, groupId }),
  );
  const { mutate, isPending } = useGroupKickMemberMutation({
    onSuccess,
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Confirm Member Kick</DialogTitle>
        <DialogDescription asChild>
          <div>
            <Text>
              Are you sure you want to kick{" "}
              <Strong>{groupMember?.identity.displayName}</Strong> from group{" "}
              <Code>{group?.displayName}</Code>?
            </Text>
          </div>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          type="submit"
          isLoading={isPending}
          onClick={() => {
            mutate({ groupId, identityId });
          }}
        >
          Confirm
        </Button>
      </DialogFooter>
    </>
  );
}

interface ConfirmMemberKickDialogProps
  extends DialogProps,
    Partial<ContentProps> {}

export function ConfirmMemberKickDialog({
  groupId,
  identityId,
  onSuccess,
  ...dialogProps
}: ConfirmMemberKickDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        {groupId && identityId ? (
          <Suspense fallback={<DialogActivityIndicator />}>
            <Content
              groupId={groupId}
              identityId={identityId}
              onSuccess={onSuccess}
            />
          </Suspense>
        ) : (
          <DialogActivityIndicator />
        )}
      </DialogContent>
    </Dialog>
  );
}
