import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogTitle,
  Flex,
  Text,
} from "@rivet-gg/components";
import { gameNamespaceQueryOptions } from "../../queries";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DialogActivityIndicator } from "@/components/dialog-activity-indicator";
import * as CdnManageAuthUsersForm from "@/domains/game/forms/cdn-manage-auth-users";
import { Suspense } from "react";
import { useCdnManageAuthUsers } from "../../hooks/use-cdn-manage-auth-users";

interface ContentProps {
  gameId: string;
  namespaceId: string;
  onSuccess?: () => void;
}

function Content({ gameId, namespaceId, onSuccess }: ContentProps) {
  const { data } = useSuspenseQuery(
    gameNamespaceQueryOptions({ gameId, namespaceId }),
  );

  const handleSubmit = useCdnManageAuthUsers({
    namespaceId,
    gameId,
    onSuccess,
    userList: data.namespace.config.cdn.authUserList,
  });

  return (
    <CdnManageAuthUsersForm.Form
      onSubmit={handleSubmit}
      defaultValues={{
        users: data.namespace.config.cdn.authUserList.map((user) => ({
          ...user,
          password: "",
        })),
      }}
    >
      <DialogHeader>
        <DialogTitle>Manage CDN authentication users</DialogTitle>
      </DialogHeader>
      <Flex gap="4" direction="col">
        <Text>
          Once this page is refreshed, none of the entered passwords will show
          up here. You can edit the password for any given user by inputting a
          new one.
        </Text>
        <CdnManageAuthUsersForm.Users />
      </Flex>
      <DialogFooter>
        <CdnManageAuthUsersForm.Submit>Save</CdnManageAuthUsersForm.Submit>
      </DialogFooter>
    </CdnManageAuthUsersForm.Form>
  );
}

interface CdnManageAuthUsersDialogProps
  extends DialogProps,
    Partial<ContentProps> {}

export function CdnManageAuthUsersDialog({
  gameId,
  namespaceId,
  ...dialogProps
}: CdnManageAuthUsersDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        {gameId && namespaceId ? (
          <Suspense fallback={<DialogActivityIndicator />}>
            <Content
              gameId={gameId}
              namespaceId={namespaceId}
              onSuccess={() => dialogProps.onOpenChange?.(false)}
            />
          </Suspense>
        ) : (
          <DialogActivityIndicator />
        )}
      </DialogContent>
    </Dialog>
  );
}
