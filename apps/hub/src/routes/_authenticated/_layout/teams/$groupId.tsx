import { ErrorComponent } from "@/components/error-component";
import * as Layout from "@/domains/project/layouts/group-layout";
import { useDialog } from "@/hooks/use-dialog";
import { ls } from "@/lib/ls";
import {
  type ErrorComponentProps,
  Outlet,
  createFileRoute,
} from "@tanstack/react-router";
import { zodSearchValidator } from "@tanstack/router-zod-adapter";
import { z } from "zod";

export function GroupIdErrorComponent(props: ErrorComponentProps) {
  return (
    <Layout.Root>
      <ErrorComponent {...props} />
    </Layout.Root>
  );
}

function Modals() {
  const navigate = Route.useNavigate();
  const { groupId } = Route.useParams();
  const { modal } = Route.useSearch();

  const CreateGroupInviteDialog = useDialog.CreateGroupInvite.Dialog;
  const CreateGroupProjectDialog = useDialog.CreateGroupProject.Dialog;
  const ConfirmLeaveGroupDialog = useDialog.ConfirmLeaveGroup.Dialog;

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
      <CreateGroupProjectDialog
        groupId={groupId}
        dialogProps={{
          open: modal === "create-group-project",
          onOpenChange: handleonOpenChange,
        }}
      />
      <ConfirmLeaveGroupDialog
        groupId={groupId}
        onSuccess={() => navigate({ to: "/" })}
        dialogProps={{
          open: modal === "leave",
          onOpenChange: handleonOpenChange,
        }}
      />
    </>
  );
}

function GroupIdView() {
  return (
    <Layout.Root>
      <Outlet />
      <Modals />
    </Layout.Root>
  );
}

const searchSchema = z.object({
  modal: z
    .enum(["invite", "create-group-project", "leave"])
    .or(z.string())
    .optional(),
});

export const Route = createFileRoute("/_authenticated/_layout/teams/$groupId")({
  validateSearch: zodSearchValidator(searchSchema),
  component: GroupIdView,
  errorComponent: GroupIdErrorComponent,
  pendingComponent: Layout.Root.Skeleton,
  beforeLoad: ({ params: { groupId }, context: { auth } }) => {
    ls.set(`rivet-lastteam-${auth.profile?.identity.identityId}`, groupId);
  },
});
