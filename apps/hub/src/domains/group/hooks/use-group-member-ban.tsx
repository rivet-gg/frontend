import { useCallback, useState } from "react";
import { ConfirmMemberBanDialog } from "../components/dialogs/confirm-member-ban-dialog";

interface DialogData {
  identityId: string;
}

export function useGroupMemberBan(groupId: string) {
  const [data, setData] = useState<DialogData | null>(null);

  const close = useCallback(() => {
    setData(null);
  }, []);

  return {
    confirmMemberBan: setData,
    dialog: (
      <ConfirmMemberBanDialog
        open={data !== null}
        groupId={groupId}
        identityId={data?.identityId}
        onSuccess={close}
        onOpenChange={close}
      />
    ),
  };
}
