import { useCallback, useState } from "react";
import { ConfirmMemberKickDialog } from "../components/dialogs/confirm-member-kick-dialog";

interface DialogData {
  identityId: string;
}

export function useGroupMemberKickDialog(groupId: string) {
  const [data, setData] = useState<DialogData | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback((data: DialogData) => {
    setData(data);
    setIsOpen(true);
  }, []);

  return {
    confirmMemberKick: open,
    dialog: (
      <ConfirmMemberKickDialog
        open={isOpen}
        groupId={groupId}
        identityId={data?.identityId}
        onSuccess={close}
        onOpenChange={close}
      />
    ),
  };
}
