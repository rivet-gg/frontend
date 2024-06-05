import * as GameCreateForm from "@/domains/game/forms/game-create-form";
import { convertStringToId } from "@/lib/utils";
import type { Rivet } from "@rivet-gg/api";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";
import { useGameCreateMutation } from "../../queries";

interface CreateGameDialogContentProps {
  groupId?: string;
  onSuccess?: (data: Rivet.cloud.games.CreateGameResponse) => void;
}

export default function CreateGameDialogContent({
  onSuccess,
  groupId = "",
}: CreateGameDialogContentProps) {
  const { mutateAsync } = useGameCreateMutation({
    onSuccess,
  });

  return (
    <>
      <GameCreateForm.Form
        onSubmit={async ({ name, slug, developerGroupId }) => {
          await mutateAsync({
            developerGroupId,
            displayName: name,
            nameId: slug || convertStringToId(name),
          });
        }}
        defaultValues={{ name: "", slug: "", developerGroupId: groupId }}
      >
        <DialogHeader>
          <DialogTitle>Create New Game</DialogTitle>
        </DialogHeader>
        <Flex gap="4" direction="col">
          <GameCreateForm.Group />
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
