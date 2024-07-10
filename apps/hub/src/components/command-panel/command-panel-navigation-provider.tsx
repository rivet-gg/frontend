import { type UseNavigateResult, useNavigate } from "@tanstack/react-router";
import {
  type ReactNode,
  createContext,
  startTransition,
  useCallback,
  useContext,
} from "react";

type GroupCommandPanelPage = {
  key: "group";
  params: { groupId: string };
};

type GameCommandPanelPage = {
  key: "game";
  params: { gameId: string };
};

type NamespaceCommandPanelPage = {
  key: "namespace";
  params: { gameId: string; namespaceId: string };
};

type BackendCommandPanelPage = {
  key: "backend";
  params: { gameId: string };
};

type BackendEnvironmentPanelPage = {
  key: "environment";
  params: { gameId: string; environmentId: string };
};

type CommandPanelPages =
  | GroupCommandPanelPage
  | GameCommandPanelPage
  | NamespaceCommandPanelPage
  | BackendCommandPanelPage
  | BackendEnvironmentPanelPage
  | never;

export type CommandPanelPage = CommandPanelPages;

const CommandPanelNavigationContext = createContext<{
  changePage: (page: CommandPanelPage) => void;
  close: () => void;
  navigate: UseNavigateResult<string>;
}>({
  changePage: () => {},
  close: () => {},
  navigate: async () => {},
});

export function CommandPanelNavigationProvider({
  children,
  onClose,
  onChangePage,
}: {
  children: ReactNode;
  onClose: () => void;
  onChangePage: (page: CommandPanelPage) => void;
}) {
  const routerNavigate = useNavigate();

  const navigate: UseNavigateResult<string> = useCallback(
    async (params) => {
      startTransition(() => {
        onClose();
        routerNavigate(params);
      });
    },
    [onClose, routerNavigate],
  );

  return (
    <CommandPanelNavigationContext.Provider
      value={{ changePage: onChangePage, close: onClose, navigate }}
    >
      {children}
    </CommandPanelNavigationContext.Provider>
  );
}

export const useCommandPanelNavigation = () =>
  useContext(CommandPanelNavigationContext);
