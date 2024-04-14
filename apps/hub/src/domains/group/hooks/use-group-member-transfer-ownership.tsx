import { useCallback, useState } from "react";
import { ConfirmTransferOwnershipDialog } from "../components/dialogs/confirm-transfer-ownership-dialog";

interface DialogData {
  identityId: string;
}

export function useGroupMemberTransferOwnership(groupId: string) {
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
    confirmTransferOwnership: open,
    dialog: (
      <ConfirmTransferOwnershipDialog
        open={isOpen}
        groupId={groupId}
        identityId={data?.identityId}
        onSuccess={close}
        onOpenChange={close}
      />
    ),
  };
}
