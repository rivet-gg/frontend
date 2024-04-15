import { useCallback, useState } from "react";
import { CreateNamespaceDialog } from "../components/dialogs/create-namespace-dialog";

export function useNamespaceCreateDialog(gameId: string) {
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
      <CreateNamespaceDialog
        open={isOpen}
        gameId={gameId}
        onOpenChange={close}
      />
    ),
  };
}
