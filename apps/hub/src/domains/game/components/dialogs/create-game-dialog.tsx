import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogProps,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";
import * as GameCreateForm from "@/domains/game/forms/game-create-form";
import { useGameCreateMutation } from "../../queries";
import { useNavigate } from "@tanstack/react-router";
import { DialogActivityIndicator } from "@/components/dialog-activity-indicator";
import { Suspense } from "react";
import { convertStringToId } from "@/lib/utils";

interface ContentProps {
  groupId: string;
}

function Content({ groupId }: ContentProps) {
  const navigate = useNavigate();
  const { mutateAsync } = useGameCreateMutation({
    onSuccess: (data) => {
      navigate({
        to: "/games/$gameId/",
        params: { gameId: data.gameId },
      });
    },
  });

  return (
    <>
      <GameCreateForm.Form
        onSubmit={async (values) => {
          await mutateAsync({
            developerGroupId: groupId,
            displayName: values.name,
            nameId: values.slug || convertStringToId(values.name),
          });
        }}
        defaultValues={{ name: "", slug: "" }}
      >
        <DialogHeader>
          <DialogTitle>Create New Game</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <GameCreateForm.Name />
          <GameCreateForm.Slug />
        </Flex>
        <DialogFooter>
          <GameCreateForm.Submit type="submit">Create</GameCreateForm.Submit>
        </DialogFooter>
      </GameCreateForm.Form>
    </>
  );
}

interface CreateGameDialogProps extends DialogProps, Partial<ContentProps> {}

export function CreateGameDialog({
  groupId,
  ...dialogProps
}: CreateGameDialogProps) {
  return (
    <Dialog {...dialogProps}>
      <DialogContent>
        {groupId ? (
          <Suspense fallback={<DialogActivityIndicator />}>
            <Content groupId={groupId} />
          </Suspense>
        ) : (
          <DialogActivityIndicator />
        )}
      </DialogContent>
    </Dialog>
  );
}
