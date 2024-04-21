import { useCallback, useState } from "react";
import { CdnManageCustomDomainsDialog } from "../components/dialogs/cdn-manage-custom-domains-dialog";

interface UseCdnManageCustomDomainsDialogProps {
  gameId: string;
  namespaceId: string;
}

export function useCdnManageCustomDomainsDialog({
  gameId,
  namespaceId,
}: UseCdnManageCustomDomainsDialogProps) {
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
      <CdnManageCustomDomainsDialog
        open={isOpen}
        gameId={gameId}
        namespaceId={namespaceId}
        onOpenChange={close}
      />
    ),
  };
}
