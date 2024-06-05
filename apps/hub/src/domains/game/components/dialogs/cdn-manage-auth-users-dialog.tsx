import * as CdnManageAuthUsersForm from "@/domains/game/forms/cdn-manage-auth-users-form";
import type { DialogContentProps } from "@/hooks/use-dialog";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
  Text,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useCdnManageAuthUsersFormHandler } from "../../hooks/use-cdn-manage-auth-users-form-handler";
import { gameNamespaceQueryOptions } from "../../queries";

interface ContentProps extends DialogContentProps {
  gameId: string;
  namespaceId: string;
}

export default function CdnManageAuthUsersDialogContent({
  gameId,
  namespaceId,
  onClose,
}: ContentProps) {
  const { data } = useSuspenseQuery(
    gameNamespaceQueryOptions({ gameId, namespaceId }),
  );

  const handleSubmit = useCdnManageAuthUsersFormHandler({
    namespaceId,
    gameId,
    onSuccess: onClose,
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
        <DialogTitle>Manage CDN Authentication Users</DialogTitle>
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
