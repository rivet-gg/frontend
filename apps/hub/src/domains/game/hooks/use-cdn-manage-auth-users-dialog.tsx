import { useCallback, useState } from "react";
import { CdnManageAuthUsersDialog } from "../components/dialogs/cdn-manage-auth-users-dialog";

interface UseCdnManageAuthUsersDialogProps {
  gameId: string;
  namespaceId: string;
}

export function useCdnManageAuthUsersDialog({
  gameId,
  namespaceId,
}: UseCdnManageAuthUsersDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    open,
    dialog: (
      <CdnManageAuthUsersDialog
        open={isOpen}
        gameId={gameId}
        namespaceId={namespaceId}
        onOpenChange={close}
      />
    ),
  };
}
