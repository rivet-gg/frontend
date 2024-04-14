import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogTitle,
  Flex,
  Label,
  Text,
  CopyArea,
} from "@rivet-gg/components";
import { Suspense } from "react";
import { DialogActivityIndicator } from "@/components/dialog-activity-indicator";
import * as GroupInviteForm from "@/domains/group/forms/group-invite-form";
import { useGroupInviteMutation } from "../../queries";

interface ContentProps {
  groupId: string;
  onClose?: () => void;
}

function Content({ groupId, onClose }: ContentProps) {
  const { mutateAsync, data } = useGroupInviteMutation();

  if (data) {
    return (
      <>
        <DialogHeader>
          <DialogTitle>Create Group Invite</DialogTitle>
        </DialogHeader>
        <Flex direction="col" gap="4">
          <Text>
            Share this code or link to allow people to join your group.
          </Text>
          <Flex direction="col" gap="2">
            <Label>Code</Label>
            <CopyArea value={data.code} />
          </Flex>
          <Flex direction="col" gap="2">
            <Label>Link</Label>
            <CopyArea value={`${window.location.origin}/invite/${data.code}`} />
          </Flex>
        </Flex>
        <DialogFooter onClick={onClose}>
          <Button variant="secondary">Close</Button>
        </DialogFooter>
      </>
    );
  }

  return (
    <>
      <GroupInviteForm.Form
        onSubmit={async (values) => {
          await mutateAsync({
            groupId,
            ttl: values.expTime,
            useCount: values.isInfinite ? 0 : values.usageCount,
          });
        }}
        defaultValues={{ isInfinite: true }}
      >
        <DialogHeader>
          <DialogTitle>Create Group Invite</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <GroupInviteForm.ExpirationTime />
          <GroupInviteForm.Infinite />
          <GroupInviteForm.UsageCount />
        </Flex>
        <DialogFooter>
          <GroupInviteForm.Submit type="submit" onClick={() => {}}>
            Create
          </GroupInviteForm.Submit>
        </DialogFooter>
      </GroupInviteForm.Form>
    </>
  );
}

interface CreateGroupInviteDialogProps
  extends DialogProps,
    Partial<ContentProps> {}

export function CreateGroupInviteDialog({
  groupId,
  onClose,
  ...dialogProps
}: CreateGroupInviteDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        {groupId ? (
          <Suspense fallback={<DialogActivityIndicator />}>
            <Content groupId={groupId} onClose={onClose} />
          </Suspense>
        ) : (
          <DialogActivityIndicator />
        )}
      </DialogContent>
    </Dialog>
  );
}
