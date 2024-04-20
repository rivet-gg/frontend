import { Rivet } from "@rivet-gg/api";
import bcrypt from "bcryptjs";
import {
  useNamespaceUpdateCdnAuthUserMutation,
  useNamespaceRemoveCdnAuthUserMutation,
  gameQueryOptions,
  gameNamespaceQueryOptions,
} from "../queries";
import { useCallback } from "react";
import { SubmitHandler } from "@/domains/game/forms/cdn-manage-auth-users";
import { queryClient } from "@/queries/global";

const SALT = bcrypt.genSaltSync(10);

type CdnNamespaceAuthPasswordUser = Pick<
  Rivet.cloud.CdnNamespaceAuthUser,
  "user"
> & {
  password: string;
};

function computeUsersDiff(
  existingUsers: Rivet.cloud.CdnNamespaceAuthUser["user"][],
  newUsers: CdnNamespaceAuthPasswordUser[],
) {
  const update: CdnNamespaceAuthPasswordUser[] = [];
  const create: CdnNamespaceAuthPasswordUser[] = [];
  const errors: { idx: number; error: string }[] = [];
  const remove: Rivet.cloud.CdnNamespaceAuthUser["user"][] = [];

  for (const [idx, user] of newUsers.entries()) {
    if (existingUsers.includes(user.user)) {
      // Update the user
      if (user.password.length > 1) {
        update.push(user);
      }
    } else {
      if (user.password.length < 1) {
        errors.push({
          idx,
          error: "Password must be at least 1 character long",
        });
      } else {
        // Create the user
        create.push(user);
      }
    }
  }

  for (const user of existingUsers) {
    if (!newUsers.find((u) => u.user === user)) {
      // Remove the user
      remove.push(user);
    }
  }

  return { update, create, errors, remove };
}

interface UseCdnManageAuthUsersProps {
  gameId: string;
  namespaceId: string;
  userList: Rivet.cloud.CdnNamespaceAuthUser[];
  onSuccess?: () => void;
}

export function useCdnManageAuthUsers({
  onSuccess,
  gameId,
  userList,
  namespaceId,
}: UseCdnManageAuthUsersProps) {
  const { mutateAsync: updateUser } = useNamespaceUpdateCdnAuthUserMutation();
  const { mutateAsync: removeUser } = useNamespaceRemoveCdnAuthUserMutation();

  return useCallback<SubmitHandler>(
    async (values, form) => {
      const diff = computeUsersDiff(
        userList.map((user) => user.user),
        values.users,
      );
      if (diff.errors.length > 0) {
        diff.errors.forEach(({ idx, error }) => {
          form.setError(`users.${idx}.password`, {
            type: "manual",
            message: error,
          });
        });
        return;
      }

      await Promise.all([
        ...[...diff.update, ...diff.create].map((user) =>
          updateUser({
            gameId,
            namespaceId,
            user: user.user,
            password: bcrypt.hashSync(user.password, SALT),
          }),
        ),
        ...diff.remove.map((user) =>
          removeUser({
            gameId,
            namespaceId,
            user,
          }),
        ),
      ]);

      await queryClient.invalidateQueries(gameQueryOptions(gameId));
      await queryClient.invalidateQueries(
        gameNamespaceQueryOptions({ gameId, namespaceId }),
      );
      onSuccess?.();
    },
    [gameId, namespaceId, onSuccess, removeUser, updateUser, userList],
  );
}
