import { useCallback, useState } from "react";
import { ConfirmMemberKickDialog } from "../components/dialogs/confirm-member-kick-dialog";

interface DialogData {
  identityId: string;
}

export function useGroupMemberKick(groupId: string) {
  const [data, setData] = useState<DialogData | null>(null);

  const close = useCallback(() => {
    setData(null);
  }, []);

  return {
    confirmMemberKick: setData,
    dialog: (
      <ConfirmMemberKickDialog
        open={data !== null}
        groupId={groupId}
        identityId={data?.identityId}
        onSuccess={close}
        onOpenChange={close}
      />
    ),
  };
}
