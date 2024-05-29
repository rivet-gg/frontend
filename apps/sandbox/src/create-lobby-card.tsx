import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  Flex,
} from "@rivet-gg/components";
import { useCreateLobbyMutation } from "./data/rivet";
import * as CreateLobbyForm from "./form/create-lobby-form";

export function CreateLobbyCard() {
  const { mutateAsync } = useCreateLobbyMutation();
  return (
    <CreateLobbyForm.Form
      defaultValues={{
        region: "",
        mode: "",
        maxPlayers: 128,
        tags: "{}",
        config: "{}",
      }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <Flex direction="col" gap="4">
            <CreateLobbyForm.RegionInput />
            <CreateLobbyForm.GameModeInput />
            <CreateLobbyForm.MaxPlayersInput />
            <CreateLobbyForm.TagsInput />
            <CreateLobbyForm.ConfigInput />
            <CreateLobbyForm.PublicInput />
          </Flex>
        </CardContent>

        <CardFooter asChild>
          <Flex gap="4">
            <CreateLobbyForm.Submit
              name="create"
              onSubmit={async (values) => {
                await mutateAsync({
                  gameMode: values.mode,
                  region: values.region,
                  tags: values.tags ? JSON.parse(values.tags) : null,
                  maxPlayers: values.maxPlayers,
                });
              }}
            >
              Create
            </CreateLobbyForm.Submit>
          </Flex>
        </CardFooter>
      </Card>
    </CreateLobbyForm.Form>
  );
}
