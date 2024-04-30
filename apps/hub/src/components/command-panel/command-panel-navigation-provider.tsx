import { UseNavigateResult, useNavigate } from "@tanstack/react-router";
import {
  ReactNode,
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

type CommandPanelPages =
  | GroupCommandPanelPage
  | GameCommandPanelPage
  | NamespaceCommandPanelPage
  | never;

export type CommandPanelPage = CommandPanelPages;

const CommandPanelNavigationContext = createContext<{
  changePage: (page: CommandPanelPage) => void;
  navigate: UseNavigateResult<string>;
}>({
  changePage: () => {},
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
      value={{ changePage: onChangePage, navigate }}
    >
      {children}
    </CommandPanelNavigationContext.Provider>
  );
}

export const useCommandPanelNavigation = () =>
  useContext(CommandPanelNavigationContext);
