import {
  Button,
  CommandDialog,
  CommandEmpty,
  CommandInput,
  CommandList,
  CommandLoading,
  cn,
} from "@rivet-gg/components";
import { useMatchRoute } from "@tanstack/react-router";
import {
  type KeyboardEventHandler,
  Suspense,
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { CommandPanelNavigationBreadcrumbs } from "./command-panel/command-panel-navigation-breadcrumbs";
import {
  CommandPanelNavigationProvider,
  type CommandPanelPage,
} from "./command-panel/command-panel-navigation-provider";
import { GameCommandPanelPage } from "./command-panel/command-panel-page/game-command-panel-page";
import { GroupCommandPanelPage } from "./command-panel/command-panel-page/group-command-panel-page";
import { IndexCommandPanelPage } from "./command-panel/command-panel-page/index-command-panel-page";
import { NamespaceCommandPanelPage } from "./command-panel/command-panel-page/namespace-command-panel-page";

export function CommandPanel() {
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [pages, setPages] = useState<CommandPanelPage[]>([]);
  const page = pages[pages.length - 1];
  const matchRoute = useMatchRoute();

  // biome-ignore lint/correctness/useExhaustiveDependencies: we do not want to run this effect on every change of match route
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        startTransition(() => {
          const isTeam = matchRoute({
            to: "/teams/$groupId",
            fuzzy: true,
          }) as { groupId: string } | false;

          if (isTeam) {
            setPages([{ key: "group", params: { groupId: isTeam.groupId } }]);
          }

          const isGame = matchRoute({
            to: "/games/$gameId",
            fuzzy: true,
          }) as { gameId: string } | false;
          if (isGame) {
            setPages([{ key: "game", params: { gameId: isGame.gameId } }]);
          }

          const isNamespace = matchRoute({
            to: "/games/$gameId/namespaces/$namespaceId",
            fuzzy: true,
          }) as { gameId: string; namespaceId: string } | false;
          if (isNamespace) {
            setPages([
              { key: "game", params: { gameId: isNamespace.gameId } },
              {
                key: "namespace",
                params: {
                  gameId: isNamespace.gameId,
                  namespaceId: isNamespace.namespaceId,
                },
              },
            ]);
          }
          setOpen((open) => !open);
        });
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const handlePageChange = useCallback((page: CommandPanelPage) => {
    startTransition(() => {
      setPages((pages) => [...pages, page]);
      setSearch("");
    });
  }, []);

  const handleClose = useCallback(() => {
    startTransition(() => {
      setOpen(false);
      setSearch("");
      setPages([]);
    });
  }, []);

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      // Escape goes to previous page
      // Backspace goes to previous page when search is empty
      if (
        (e.key === "Escape" || (e.key === "Backspace" && !search)) &&
        pages.length > 0
      ) {
        e.preventDefault();
        setPages((pages) => pages.slice(0, -1));
      }
    },
    [pages.length, search],
  );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        className={cn(
          "relative h-8 w-full justify-start rounded-[0.5rem] bg-background text-sm font-normal text-muted-foreground shadow-none hidden md:flex md:w-40 lg:w-64",
        )}
      >
        <span className="hidden lg:inline-flex">Search...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-[0.3rem] top-[0.3rem] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog
        commandProps={{
          onKeyDown: handleKeyDown,
        }}
        open={open}
        onOpenChange={setOpen}
      >
        <CommandPanelNavigationBreadcrumbs pages={pages} />
        <CommandInput
          value={search}
          onValueChange={setSearch}
          placeholder="Type a command or search..."
        />
        <CommandPanelNavigationProvider
          onClose={handleClose}
          onChangePage={handlePageChange}
        >
          <CommandList>
            <Suspense fallback={<CommandLoading>Hang on…</CommandLoading>}>
              <CommandEmpty>No results found.</CommandEmpty>
              {!page ? <IndexCommandPanelPage /> : null}
              {page?.key === "group" ? (
                <GroupCommandPanelPage groupId={page.params.groupId} />
              ) : null}
              {page?.key === "game" ? (
                <GameCommandPanelPage gameId={page.params.gameId} />
              ) : null}
              {page?.key === "namespace" ? (
                <NamespaceCommandPanelPage
                  gameId={page.params.gameId}
                  namespaceId={page.params.namespaceId}
                />
              ) : null}
            </Suspense>
          </CommandList>
        </CommandPanelNavigationProvider>
      </CommandDialog>
    </>
  );
}
