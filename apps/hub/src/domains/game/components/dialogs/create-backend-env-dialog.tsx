import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";
import * as BackendEnvCreateForm from "@/domains/game/forms/backend-env-create-form";
import {
  useCreateBackendProjectEnvMutation,
  useNamespaceCreateMutation,
} from "../../queries";
import { useNavigate } from "@tanstack/react-router";
import { convertStringToId } from "@/lib/utils";
import { type DialogContentProps } from "@/hooks/use-dialog";

interface ContentProps extends DialogContentProps {
  projectId: string;
  gameId: string;
}

export default function CreateBackendEnvDialogContent({
  projectId,
  gameId,
}: ContentProps) {
  const navigate = useNavigate();
  const { mutateAsync } = useCreateBackendProjectEnvMutation({
    onSuccess: (data) => {
      navigate({
        to: "/games/$gameId/backend/$environmentId",
        params: { gameId: gameId, environmentId: data.environmentId },
      });
    },
  });

  return (
    <>
      <BackendEnvCreateForm.Form
        onSubmit={async (values) => {
          await mutateAsync({
            projectId,
            displayName: values.name,
            nameId: values.slug || convertStringToId(values.name),
            tier: values.tier,
          });
        }}
        defaultValues={{ name: "", slug: "", projectId, tier: "shared" }}
      >
        <DialogHeader>
          <DialogTitle>Create New Backend Environment</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <BackendEnvCreateForm.Name />
          <BackendEnvCreateForm.Slug />
          <BackendEnvCreateForm.Tier />
        </Flex>
        <DialogFooter>
          <BackendEnvCreateForm.Submit type="submit">
            Create
          </BackendEnvCreateForm.Submit>
        </DialogFooter>
      </BackendEnvCreateForm.Form>
    </>
  );
}
