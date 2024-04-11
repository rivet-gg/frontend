import { useCallback, useState } from "react";
import { ConfirmTransferOwnershipDialog } from "../components/dialogs/confirm-transfer-ownership-dialog";

interface DialogData {
  groupId: string;
  memberIdentityId: string;
}

export function useGroupMemberTransferOwnership() {
  const [data, setData] = useState<DialogData | null>(null);

  const close = useCallback(() => {
    setData(null);
  }, []);

  return {
    confirmTransferOwnership: setData,
    dialog: (
      <ConfirmTransferOwnershipDialog
        open={data !== null}
        groupId={data?.groupId}
        memberIdentityId={data?.memberIdentityId}
        onSuccess={close}
        onOpenChange={close}
      />
    ),
  };
}
