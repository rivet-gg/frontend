import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";
import * as NamespaceCreateForm from "@/domains/game/forms/namespace-create-form";
import { gameQueryOptions, useNamespaceCreateMutation } from "../../queries";
import { useNavigate } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { DialogActivityIndicator } from "@/components/dialog-activity-indicator";
import { Suspense } from "react";
import { convertStringToId } from "@/lib/utils";

interface ContentProps {
  gameId: string;
}

function Content({ gameId }: ContentProps) {
  const navigate = useNavigate();
  const { data: game } = useSuspenseQuery(gameQueryOptions(gameId));
  const { mutateAsync } = useNamespaceCreateMutation({
    onSuccess: (data) => {
      navigate({
        to: "/games/$gameId/namespaces/$namespaceId/",
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
            versionId: game.game.versions[0].versionId,
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

interface CreateNamespaceDialogProps
  extends DialogProps,
    Partial<ContentProps> {}

export function CreateNamespaceDialog({
  gameId,
  ...dialogProps
}: CreateNamespaceDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        {gameId ? (
          <Suspense fallback={<DialogActivityIndicator />}>
            <Content gameId={gameId} />
          </Suspense>
        ) : (
          <DialogActivityIndicator />
        )}
      </DialogContent>
    </Dialog>
  );
}
