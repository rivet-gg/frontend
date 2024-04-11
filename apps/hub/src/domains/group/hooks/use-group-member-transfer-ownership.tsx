import { useCallback, useState } from "react";
import { ConfirmTransferOwnershipDialog } from "../components/dialogs/confirm-transfer-ownership-dialog";

interface DialogData {
  identityId: string;
}

export function useGroupMemberTransferOwnership(groupId: string) {
  const [data, setData] = useState<DialogData | null>(null);

  const close = useCallback(() => {
    setData(null);
  }, []);

  return {
    confirmTransferOwnership: setData,
    dialog: (
      <ConfirmTransferOwnershipDialog
        open={data !== null}
        groupId={groupId}
        identityId={data?.identityId}
        onSuccess={close}
        onOpenChange={close}
      />
    ),
  };
}
