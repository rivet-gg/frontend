import { useCallback, useState } from "react";
import { CreateGameDialog } from "../components/dialogs/create-game-dialog";

export function useGameCreateDialog(groupId: string) {
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
      <CreateGameDialog open={isOpen} groupId={groupId} onOpenChange={close} />
    ),
  };
}
