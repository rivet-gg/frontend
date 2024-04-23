import { DialogActivityIndicator } from "@/components/dialog-activity-indicator";
import { Dialog, DialogContent } from "@rivet-gg/components";
import {
  lazy,
  ComponentProps,
  useCallback,
  useState,
  Suspense,
  ComponentType,
  useMemo,
} from "react";

export interface DialogContentProps {
  onClose?: () => void;
}

interface DialogConfig {
  autoFocus?: boolean;
}

export const createDialogHook = <
  // we don't know the type of the component, so we use any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component extends Promise<{ default: ComponentType<any> }>,
>(
  component: Component,
  opts: DialogConfig = {},
) => {
  return (props: ComponentProps<Awaited<Component>["default"]>) => {
    const [isOpen, setIsOpen] = useState(false);

    const close = useCallback(() => {
      setIsOpen(false);
    }, []);

    const open = useCallback(() => {
      setIsOpen(true);
    }, []);

    const Content = useMemo(() => lazy(() => component), []);

    return {
      open,
      close,
      dialog: (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent
            onOpenAutoFocus={(e) => {
              if (opts.autoFocus === false) {
                return e.preventDefault();
              }
            }}
          >
            <Suspense fallback={<DialogActivityIndicator />}>
              <Content {...props} onClose={close} />
            </Suspense>
          </DialogContent>
        </Dialog>
      ),
    };
  };
};

export const createDataDialogHook = <
  const DataPropKeys extends string[],
  // we don't know the type of the component, so we use any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component extends Promise<{ default: ComponentType<any> }>,
>(
  keys: DataPropKeys,
  component: Component,
  opts: DialogConfig = {},
) => {
  return (
    props: Omit<
      ComponentProps<Awaited<Component>["default"]>,
      DataPropKeys[number]
    >,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] =
      useState<
        Pick<
          ComponentProps<Awaited<Component>["default"]>,
          DataPropKeys[number]
        >
      >();

    const close = useCallback(() => {
      setIsOpen(false);
    }, []);

    const open = useCallback(
      (
        data: Pick<
          ComponentProps<Awaited<Component>["default"]>,
          DataPropKeys[number]
        >,
      ) => {
        setIsOpen(true);
        setData(data);
      },
      [],
    );

    const Content = useMemo(() => lazy(() => component), []);

    return {
      open,
      dialog: (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent
            onOpenAutoFocus={(e) => {
              if (opts.autoFocus === false) {
                return e.preventDefault();
              }
            }}
          >
            <Suspense fallback={<DialogActivityIndicator />}>
              <Content {...props} {...data} onClose={close} />
            </Suspense>
          </DialogContent>
        </Dialog>
      ),
    };
  };
};

export function useDialog() {}

useDialog.GenerateNamespacePublicToken = createDialogHook(
  import(
    "@/domains/game/components/dialogs/namespace-generate-public-token-dialog"
  ),
  {
    autoFocus: false,
  },
);

useDialog.GenerateGameCloudToken = createDialogHook(
  import("@/domains/game/components/dialogs/game-generate-cloud-token-dialog"),
  {
    autoFocus: false,
  },
);

useDialog.CreateGroupGame = createDialogHook(
  import("@/domains/game/components/dialogs/group-create-game-dialog"),
);

useDialog.CreateGame = createDialogHook(
  import("@/domains/game/components/dialogs/create-game-dialog"),
);

useDialog.ManageCdnAuthUsers = createDialogHook(
  import("@/domains/game/components/dialogs/cdn-manage-auth-users-dialog"),
);

useDialog.CreateNamespace = createDialogHook(
  import("@/domains/game/components/dialogs/create-namespace-dialog"),
);

useDialog.ManageCdnCustomDomains = createDialogHook(
  import("@/domains/game/components/dialogs/cdn-manage-custom-domains-dialog"),
);

useDialog.DeployNamespaceVersion = createDialogHook(
  import("@/domains/game/components/dialogs/deploy-namespace-version-dialog"),
);

useDialog.ConfirmBillingPlan = createDataDialogHook(
  ["plan"],
  import("@/domains/game/components/dialogs/confirm-billing-plan-dialog"),
);
