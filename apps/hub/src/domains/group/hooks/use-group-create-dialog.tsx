import { useCallback, useState } from "react";
import { CreateGroupDialog } from "../components/dialogs/create-group-dialog";

export function useGroupCreateDialog() {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);

  return {
    openGroupCreateDialog: open,
    dialog: <CreateGroupDialog open={isOpen} onOpenChange={close} />,
  };
}
