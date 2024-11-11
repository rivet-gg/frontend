import * as EnvironmentCreateForm from "@/domains/game/forms/environment-create-form";
import type { DialogContentProps } from "@/hooks/use-dialog";
import { convertStringToId } from "@/lib/utils";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { gameQueryOptions, useEnvironmentCreateMutation } from "../../queries";

interface ContentProps extends DialogContentProps {
  gameId: string;
}

export default function CreateEnvironmentDialogContent({
  gameId,
}: ContentProps) {
  const navigate = useNavigate();
  const { data: game } = useSuspenseQuery(gameQueryOptions(gameId));
  const { mutateAsync } = useEnvironmentCreateMutation({
    onSuccess: (data) => {
      navigate({
        to: "/games/$gameId/environments/$environmentId",
        params: { gameId: gameId, environmentId: data.namespaceId },
      });
    },
  });

  return (
    <>
      <EnvironmentCreateForm.Form
        onSubmit={async (values) => {
          await mutateAsync({
            gameId,
            displayName: values.name,
            nameId: values.slug || convertStringToId(values.name),
            versionId: game.versions[0].versionId,
          });
        }}
        defaultValues={{ name: "", slug: "", gameId }}
      >
        <DialogHeader>
          <DialogTitle>Create New Environment</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <EnvironmentCreateForm.Name />
          <EnvironmentCreateForm.Slug />
        </Flex>
        <DialogFooter>
          <EnvironmentCreateForm.Submit type="submit">
            Create
          </EnvironmentCreateForm.Submit>
        </DialogFooter>
      </EnvironmentCreateForm.Form>
    </>
  );
}
