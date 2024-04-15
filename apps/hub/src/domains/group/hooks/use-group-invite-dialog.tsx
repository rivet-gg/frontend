import { useCallback, useState } from "react";
import { CreateGroupInviteDialog } from "../components/dialogs/create-group-invite-dialog";

export function useGroupInviteDialog(groupId: string) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    openGroupInviteDialog: open,
    dialog: (
      <CreateGroupInviteDialog
        open={isOpen}
        groupId={groupId}
        onClose={close}
        onOpenChange={close}
      />
    ),
  };
}
