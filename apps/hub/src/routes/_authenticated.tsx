import { useAuth } from "@/domains/auth/contexts/auth";
import { useDialog } from "@/hooks/use-dialog";
import { FullscreenLoading } from "@rivet-gg/components";
import {
  Navigate,
  Outlet,
  createFileRoute,
  useLocation,
} from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

function Authenticated() {
  const auth = useAuth();
  const location = useLocation();

  if (auth.isProfileLoading) {
    return <FullscreenLoading />;
  }

  if (!auth.profile?.identity.isRegistered) {
    return <Navigate to="/login" search={{ redirect: location.href }} />;
  }
  return (
    <>
      <Modals />
      <Outlet />
    </>
  );
}

const searchSchema = z.object({
  modal: z.enum(["create-game", "create-group"]).or(z.string()).optional(),
  groupId: z.string().optional().catch(undefined),
});

export const Route = createFileRoute("/_authenticated")({
  validateSearch: zodSearchValidator(searchSchema),
  component: Authenticated,
});

function Modals() {
  const navigate = Route.useNavigate();
  const search = Route.useSearch();

  const CreateGroupGameDialog = useDialog.CreateGame.Dialog;
  const CreateGroupDialog = useDialog.CreateGroup.Dialog;

  if (!search || !("modal" in search)) {
    return;
  }

  const { groupId, modal } = search;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };
  return (
    <>
      <CreateGroupGameDialog
        groupId={groupId}
        onSuccess={async (data) =>
          await navigate({
            to: "/games/$gameId",
            params: { gameId: data.gameId },
          })
        }
        dialogProps={{
          open: modal === "create-game",
          onOpenChange: handleonOpenChange,
        }}
      />
      <CreateGroupDialog
        onSuccess={async (data) =>
          await navigate({
            to: "/teams/$groupId",
            params: { groupId: data.groupId },
          })
        }
        dialogProps={{
          open: modal === "create-group",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}
