import { useCallback, useState } from "react";
import { DeployNamespaceVersionDialog } from "../components/dialogs/deploy-namespace-version-dialog";

interface UseDeployNamespaceVersionDialogProps {
  gameId: string;
  namespaceId: string;
}

interface DialogData {
  versionId: string;
}

export function useDeployNamespaceVersionDialog({
  gameId,
  namespaceId,
}: UseDeployNamespaceVersionDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<DialogData | null>(null);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const open = useCallback((data: DialogData) => {
    setData(data);
    setIsOpen(true);
  }, []);

  return {
    open,
    dialog: (
      <DeployNamespaceVersionDialog
        open={isOpen}
        gameId={gameId}
        versionId={data?.versionId}
        namespaceId={namespaceId}
        onOpenChange={close}
      />
    ),
  };
}
