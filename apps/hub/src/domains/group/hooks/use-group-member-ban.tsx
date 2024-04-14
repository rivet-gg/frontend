import { useCallback, useState } from "react";
import { ConfirmMemberBanDialog } from "../components/dialogs/confirm-member-ban-dialog";

interface DialogData {
  identityId: string;
}

export function useGroupMemberBan(groupId: string) {
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
    confirmMemberBan: open,
    dialog: (
      <ConfirmMemberBanDialog
        open={isOpen}
        groupId={groupId}
        identityId={data?.identityId}
        onSuccess={close}
        onOpenChange={close}
      />
    ),
  };
}
