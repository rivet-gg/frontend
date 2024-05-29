import { ErrorComponent } from "@/components/error-component";
import { groupGamesQueryOptions } from "@/domains/game/queries";
import { useDialog } from "@/hooks/use-dialog";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
  notFound,
} from "@tanstack/react-router";
import { z } from "zod";

function GroupIdErrorComponent(props: ErrorComponentProps) {
  return <ErrorComponent {...props} />;
}

function Modals() {
  const navigate = Route.useNavigate();
  const { groupId } = Route.useParams();
  const { modal } = Route.useSearch();

  const CreateGroupInviteDialog = useDialog.CreateGroupInvite.Dialog;
  const CreateGroupGameDialog = useDialog.CreateGroupGame.Dialog;

  const handleonOpenChange = (value: boolean) => {
    if (!value) {
      navigate({ search: { modal: undefined } });
    }
  };

  return (
    <>
      <CreateGroupInviteDialog
        groupId={groupId}
        dialogProps={{
          open: modal === "invite",
          onOpenChange: handleonOpenChange,
        }}
      />
      <CreateGroupGameDialog
        groupId={groupId}
        dialogProps={{
          open: modal === "create-game",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function GroupIdView() {
  return (
    <>
      <Outlet />
      <Modals />
    </>
  );
}

const searchSchema = z.object({
  modal: z.enum(["invite", "create-game"]).optional(),
});

export const Route = createFileRoute("/_authenticated/_layout/teams/$groupId")({
  validateSearch: (search) => searchSchema.parse(search),
  beforeLoad: async ({ context: { queryClient }, params: { groupId } }) => {
    const data = await queryClient.ensureQueryData(
      groupGamesQueryOptions(groupId),
    );

    const group = data.groups.find((group) => group.groupId === groupId);
    if (!group) {
      throw notFound();
    }
  },
  component: GroupIdView,
  errorComponent: GroupIdErrorComponent,
});
