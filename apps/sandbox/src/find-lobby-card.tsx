import { CardContent, CardFooter, Flex } from "@rivet-gg/components";
import { useFindLobbyMutation } from "./data/rivet";
import * as FindLobbyForm from "./form/find-lobby-form";

export function FindLobbyCard() {
  const { mutateAsync } = useFindLobbyMutation();
  return (
    <FindLobbyForm.Form
      defaultValues={{
        maxPlayers: 128,
        tags: "{}",
        config: "{}",
      }}
    >
      <CardContent className="flex-1">
        <Flex direction="col" gap="4">
          <FindLobbyForm.RegionInput />
          <FindLobbyForm.GameModeInput />
          <FindLobbyForm.MaxPlayersInput />
          <FindLobbyForm.TagsInput />
        </Flex>
      </CardContent>

      <CardFooter asChild>
        <Flex gap="4">
          <FindLobbyForm.Submit
            name="create"
            onSubmit={async (values) => {
              await mutateAsync({
                gameModes: values.mode,
                regions: values.region,
                tags: values.tags ? JSON.parse(values.tags) : null,
                maxPlayers: values.maxPlayers,
              });
            }}
          >
            Find
          </FindLobbyForm.Submit>
        </Flex>
      </CardFooter>
    </FindLobbyForm.Form>
  );
}
