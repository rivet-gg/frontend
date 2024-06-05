import * as NamespaceCreateForm from "@/domains/game/forms/namespace-create-form";
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
import { gameQueryOptions, useNamespaceCreateMutation } from "../../queries";

interface ContentProps extends DialogContentProps {
  gameId: string;
}

export default function CreateNamespaceDialogContent({ gameId }: ContentProps) {
  const navigate = useNavigate();
  const { data: game } = useSuspenseQuery(gameQueryOptions(gameId));
  const { mutateAsync } = useNamespaceCreateMutation({
    onSuccess: (data) => {
      navigate({
        to: "/games/$gameId/namespaces/$namespaceId",
        params: { gameId: gameId, namespaceId: data.namespaceId },
      });
    },
  });

  return (
    <>
      <NamespaceCreateForm.Form
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
          <DialogTitle>Create New Namespace</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <NamespaceCreateForm.Name />
          <NamespaceCreateForm.Slug />
        </Flex>
        <DialogFooter>
          <NamespaceCreateForm.Submit type="submit">
            Create
          </NamespaceCreateForm.Submit>
        </DialogFooter>
      </NamespaceCreateForm.Form>
    </>
  );
}
