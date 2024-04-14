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
  useGroupBanMemberMutation,
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
  const { mutate, isPending } = useGroupBanMemberMutation({
    onSuccess,
  });

  return (
    <>
      <DialogHeader>
        <DialogTitle>Confirm Member Ban</DialogTitle>
        <DialogDescription asChild>
          <div>
            <Text>
              Are you sure you want to ban{" "}
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

interface ConfirmMemberBanDialogProps
  extends DialogProps,
    Partial<ContentProps> {}

export function ConfirmMemberBanDialog({
  groupId,
  identityId,
  onSuccess,
  ...dialogProps
}: ConfirmMemberBanDialogProps) {
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
