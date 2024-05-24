import * as GameCreateForm from "@/domains/game/forms/group-create-game-form";
import { convertStringToId } from "@/lib/utils";
import {
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Flex,
} from "@rivet-gg/components";
import { useNavigate } from "@tanstack/react-router";
import { useGameCreateMutation } from "../../queries";

interface ContentProps {
  groupId: string;
}

export default function CreateGroupGameDialogContent({
  groupId,
}: ContentProps) {
  const navigate = useNavigate();
  const { mutateAsync } = useGameCreateMutation({
    onSuccess: (data) => {
      navigate({
        to: "/games/$gameId",
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
